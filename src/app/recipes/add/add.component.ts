import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  // Define the category options
  categoryOptions = ['category_01', 'category_02', 'category_03', 'category_04', 'category_05', 'Other'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
      servings: [1, [Validators.required]],
      prepTime: [0, [Validators.required]],
      amount: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      ingredient: ['', [Validators.required]],
      step: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  get f() { return this.form.controls; }

  addIngredient() {
  }

  removeIngredient() {
  }

  addStep() {
  }

  removeStep() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log('Form Submitted!', this.form.value);
  }
}
