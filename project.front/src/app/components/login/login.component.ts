import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { usersApi } from '../../interfaces/usersInterface';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],


})
export class LoginComponent {
  loginForm: FormGroup;
  passwordType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      lemail: ['', [Validators.required, Validators.email]],
      lpassword: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const userApi: usersApi = {
        email: this.loginForm.get('lemail')?.value,
        password: this.loginForm.get('lpassword')?.value
      };

      this.usersService.login(userApi).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error logging in', err);
          alert('Invalid credentials. Please try again.');
        }
      });
    } else {
      alert('Invalid form');
    }
  }

  ltogglePasswordVisibility(event: any): void {
    this.passwordType = event.target.checked ? 'text' : 'password';
  }
}
