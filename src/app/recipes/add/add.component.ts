import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { RecipeService } from 'src/app/services';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  ingredients!: FormGroup;
  steps!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  categoryOptions = ['category_01', 'category_02', 'category_03', 'category_04', 'category_05',
    'Vorspeisen', 'Hauptspeisen', 'Desserts', 'Snacks', 'Getränke',
    'Spaghetti', 'Rind', 'Geflügel', 'Fisch', 'Schwein', 'Vegetarisch', 'Vegan',
    'Italienisch', 'Deutsch', 'Japanisch', 'Indisch', 'Mexikanisch', 'Andere'];

  einheit = ['Liter', 'Milliliter', 'Kilogramm', 'Gramm', 'Milligramm', 'Stück']

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService

  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [''],
      description: [''],
      imageURL: [''],
      servings: [1],
      prepTime: [0],
      ingredients: this.formBuilder.group({
        amount: [''],
        unit: [''],
        ingredient: [''],
      }),

      steps: this.formBuilder.group({
        order: [1],
        description: [''],
      }),

      category: ['']
    });

    this.form.get('imageURL')?.valueChanges.subscribe(() => {
      this.updateImagePreview();
    });
  }

  get f() { return this.form.controls; }

  updateImagePreview() {
    const imageURLControl = this.form.get('imageURL');
    const imagePreviewElement = this.el.nativeElement.querySelector('.image-preview');

    if (imageURLControl?.valid) {
      this.renderer.setStyle(imagePreviewElement, 'background-image', `url(${imageURLControl.value})`);
      this.renderer.setStyle(imagePreviewElement, 'background-size', 'cover');
      this.renderer.setStyle(imagePreviewElement, 'background-position', 'center');
    } else {
      this.renderer.removeStyle(imagePreviewElement, 'background-image');
    }
  }

  validateCategories(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedCategories = control.value as string[];

      if (selectedCategories && selectedCategories.length > 3) {
        return { maxCategories: true };
      }

      return null;
    };
  }

  onSubmit() {
    this.submitted = true;

    this.error = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.recipeService.createNewRecipe(
      this.f['title'].value,
      this.f['description'].value,
      this.f['imageURL'].value,
      this.f['servings'].value,
      this.f['prepTime'].value,
      this.f['ingredients'].get('amount')!.value,
      this.f['ingredients']!.get('unit')!.value,
      this.f['ingredients'].get('ingredient')!.value,
      this.f['steps'].get('order')!.value,
      this.f['steps'].get('description')!.value,
      this.f['category'].value,
    )
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: errorMessage => {
          this.error = errorMessage;
          this.loading = false;
        }
      });
  }
}
