import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usersApi } from '../../interfaces/usersInterface';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.valid) {
      const userApi: usersApi = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.usersService.login(userApi).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Navegar al dashboard sin recargar la página
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
}
