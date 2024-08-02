import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usersApi } from '../../interfaces/usersInterface';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }
  login(): void {
    if (this.loginForm.valid) {
      const userApi: usersApi = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };
  
      this.usersService.login(userApi).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error logging in', err);
          // Mostrar mensaje de error al usuario
          alert('Invalid credentials. Please try again.');
        }
      });
    } else {
      console.error('Invalid form');
    }
  }
  
  
}
