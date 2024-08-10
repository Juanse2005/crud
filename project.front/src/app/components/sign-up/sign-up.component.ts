import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Agrega CommonModule aquí
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  addUser: FormGroup;
  passwordType: string = 'password';

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    this.addUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void { }

  add(): void {
    if (this.addUser.valid) {
      const userApi = {
        email: this.addUser.get('email')?.value,
        username: this.addUser.get('username')?.value,
        password: this.addUser.get('password')?.value
      };

      this.usersService.saveData(userApi).subscribe({
        next: () => {
          this.router.navigate(['/home']);
          alert('User created successfully!');
        },
        error: (err) => {
          console.error('Error fetching data', err);
        }
      });
    }
  }

  togglePasswordVisibility(event: any): void {
    this.passwordType = event.target.checked ? 'text' : 'password';
  }

  private passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // No validation if the field is empty
    }
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    if (!hasSpecialChar) {
      return { passwordStrength: true };
    }
    return null;
  }
}
