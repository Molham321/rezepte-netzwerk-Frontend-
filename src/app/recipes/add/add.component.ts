import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  categoryOptions = ['category_01', 'category_02', 'category_03', 'category_04', 'category_05', 'Other'];
  einheit = ['Liter', 'Milliliter', 'Kilogramm', 'Gramm', 'Milligramm', 'Stück']

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
      servings: [1, [Validators.required]],
      prepTime: [0, [Validators.required]],
      ingredients: this.formBuilder.array([]),
      steps: this.formBuilder.array([]),
      category: ['', [Validators.required, this.validateCategories()]]
    });

    this.addIngredient();
    this.addStep();

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

  addIngredient() {
    const ingredient = this.formBuilder.group({
      amount: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      ingredient: ['', [Validators.required]],
    });

    (this.form.get('ingredients') as FormArray).push(ingredient);
    this.addIngredientToDOM();
  }

  addStep() {
    const step = this.formBuilder.group({
      order: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    (this.form.get('steps') as FormArray).push(step);
    this.addStepToDOM();
  }

  removeIngredient() {
    const formArray = this.form.get('ingredients') as FormArray;

    if (formArray.length > 1) {
      formArray.removeAt(formArray.length - 1);
      this.removeIngredientFromDOM();
    }
  }

  removeStep() {
    const formArray = this.form.get('steps') as FormArray;

    if (formArray.length > 1) {
      formArray.removeAt(formArray.length - 1);
      this.removeStepFromDOM();
    }
  }


  addIngredientToDOM() {
    const wrapperDiv = this.renderer.createElement('div');
    this.renderer.addClass(wrapperDiv, 'full-width');

    const matFormField1 = this.createMatFormField('amount', 'Menge', 'number');
    const matFormField2 = this.createMatFormField('unit', 'Einheit', 'text');
    const matFormField3 = this.createMatFormField('ingredient', 'Zutat', 'text');

    this.renderer.appendChild(wrapperDiv, matFormField1);
    this.renderer.appendChild(wrapperDiv, matFormField2);
    this.renderer.appendChild(wrapperDiv, matFormField3);

    this.renderer.appendChild(this.el.nativeElement.querySelector('.ingredients-container'), wrapperDiv);
  }

  addStepToDOM() {
    const wrapperDiv = this.renderer.createElement('div');
    this.renderer.addClass(wrapperDiv, 'full-width');

    const matFormField1 = this.createMatFormField('order', 'Reihenfolge', 'number');
    const matFormField2 = this.createMatFormField('description', 'Beschreibung', 'text');

    this.renderer.appendChild(wrapperDiv, matFormField1);
    this.renderer.appendChild(wrapperDiv, matFormField2);

    this.renderer.appendChild(this.el.nativeElement.querySelector('.steps-container'), wrapperDiv);
  }

  private createMatFormField(formControlName: string, label: string, type: string) {
    const matFormField = this.renderer.createElement('mat-form-field');
    const matLabel = this.renderer.createElement('mat-label');
    const input = this.renderer.createElement('input');

    this.renderer.setProperty(input, 'formControlName', formControlName);
    this.renderer.setProperty(input, 'placeholder', label);
    this.renderer.setProperty(input, 'type', type);

    this.renderer.appendChild(matLabel, this.renderer.createText(label));
    this.renderer.appendChild(matFormField, matLabel);
    this.renderer.appendChild(matFormField, input);

    return matFormField;
  }

  removeIngredientFromDOM() {
    const ingredientsContainer = this.el.nativeElement.querySelector('.ingredients-container');
    const lastChild = ingredientsContainer.lastChild;

    if (lastChild) {
      this.renderer.removeChild(ingredientsContainer, lastChild);
    }
  }

  removeStepFromDOM() {
    const stepsContainer = this.el.nativeElement.querySelector('.steps-container');
    const lastChild = stepsContainer.lastChild;

    if (lastChild) {
      this.renderer.removeChild(stepsContainer, lastChild);
    }
  }


  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log('Form Submitted!', this.form.value);
  }
}
