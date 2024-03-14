
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { RecipeService } from 'src/app/services';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    imageURL: ['', Validators.required],
    servings: [1, Validators.required],
    prepTime: [0, Validators.required],
    ingredients: this.formBuilder.array([]),
    steps: this.formBuilder.array([]),
    category: [[], [this.validateCategories()]]
  });

  loading = false;
  submitted = false;
  error?: string;

  categoryOptions = ['Vorspeisen', 'Hauptspeisen', 'Desserts', 'Snacks', 'Getränke',
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
    this.form.get('imageURL')?.valueChanges.subscribe(() => {
      this.updateImagePreview();
    });
  }

  get f() {
    return this.form.controls;
  }

  get ingredients() {
    return this.form.controls["ingredients"] as FormArray;
  }

  get steps() {
    return this.form.controls["steps"] as FormArray;
  }

  createIngredientFormGroup(): FormGroup {
    return this.formBuilder.group({
      amount: ['', Validators.required],
      unit: ['', Validators.required],
      ingredient: ['', Validators.required],
    });
  }

  addIngredient() {
    const IngredientForm = this.formBuilder.group({
      amount: ['', Validators.required],
      unit: ['', Validators.required],
      ingredient: ['', Validators.required],
    });

    this.ingredients.push(IngredientForm);
  }

  addStep() {
    const stepForm = this.formBuilder.group({
      order: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.steps.push(stepForm);
  }

  deleteIngredient(lessonIndex: number) {
    this.ingredients.removeAt(lessonIndex);
  }

  deleteStep(lessonIndex: number) {
    this.steps.removeAt(lessonIndex);
  }

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
      this.f['title'].value!,
      this.f['description'].value!,
      this.f['imageURL'].value!,
      this.f['servings'].value!,
      this.f['prepTime'].value!,
      this.ingredients.value,
      this.steps.value,
      this.f['category'].value!,
    )
      .pipe(first())
      .subscribe({
        next: () => {
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
