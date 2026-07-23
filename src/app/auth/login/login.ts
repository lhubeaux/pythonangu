import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder)

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
    password: ['',[ Validators.required, Validators.minLength(8)]]
  })

  onSubmit(): void {
  if (this.form.invalid) return;
  console.log(this.form.value);
}

}

