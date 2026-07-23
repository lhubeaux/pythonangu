import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
private fb = inject(FormBuilder);

form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  address: this.fb.group({
    street: [''],
    number: [''],
    postalCode: [''],
  }),
  languages: this.fb.array([this.fb.control('')]),
});

get languages(): FormArray {
  return this.form.get('languages') as FormArray;
}
addLanguage(): void {
  this.languages.push(this.fb.control(''));
}

removeLanguage(index: number): void {
  this.languages.removeAt(index);
}

  onSubmit(): void {
  if (this.form.invalid) return;
  console.log(this.form.value);
}

}
