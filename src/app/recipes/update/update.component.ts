
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { IRecipe, IUser } from 'src/app/interfaces';
import { RecipeService } from 'src/app/services';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {

  currentRecipeId: string = "";
  currentRecipe!: IRecipe;
  recipeDate: string = "";
  recipeOwner!: IUser;

  loading = false;
  submitted = false;
  error?: string;

  form = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    imageURL: ['', Validators.required],
    servings: [1, Validators.required],
    prepTime: [0, Validators.required],
    ingredients: this.formBuilder.array([]),
    steps: this.formBuilder.array([]),
    category: [[''], [this.validateCategories()]]
  });

  categoryOptions = ['Vorspeisen', 'Hauptspeisen', 'Desserts', 'Snacks', 'Getränke',
    'Spaghetti', 'Rind', 'Geflügel', 'Fisch', 'Schwein', 'Vegetarisch', 'Vegan',
    'Italienisch', 'Deutsch', 'Japanisch', 'Indisch', 'Mexikanisch', 'Andere'];

  einheit = ['Liter', 'Milliliter', 'Kilogramm', 'Gramm', 'Milligramm', 'Stück']

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentRecipeId = this.route.snapshot.params['id'];
    this.ReadRecipe(this.currentRecipeId);
  }

  private ReadRecipe(id: string): void {
    this.recipeService.getRecipeById(id).subscribe(
      {
        next: (response) => {
          this.currentRecipe = response;
          this.updateFormValues();
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      }
    )
  }

  private validateCategories(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedCategories = control.value as string[];

      if (selectedCategories && selectedCategories.length > 3) {
        return { maxCategories: true };
      }

      return null;
    };
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

  private updateFormValues() {
    this.form.patchValue({
      title: this.currentRecipe.title,
      description: this.currentRecipe.description,
      imageURL: this.currentRecipe.imageURL,
      servings: this.currentRecipe.servings,
      prepTime: this.currentRecipe.prepTime,
      ingredients: this.currentRecipe.ingredients,
      steps: this.currentRecipe.steps,
      category: this.currentRecipe.category
    });
    this.currentRecipe.ingredients.forEach(ingredient => {
      this.addIngredient();
      const index = this.ingredients.length - 1;
      this.ingredients.at(index).patchValue(ingredient);
    });
    this.currentRecipe.steps.forEach(step => {
      this.addStep();
      const index = this.steps.length - 1;
      this.steps.at(index).patchValue(step);
    });
  }

  onSubmit() {
    this.submitted = true;

    this.error = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.recipeService.updateRecipe(
      this.currentRecipeId,
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
