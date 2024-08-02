import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usersApi } from '../../interfaces/usersInterface';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  addUser: FormGroup;
  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    this.addUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }
  add(): void {
    
    if (this.addUser.valid) {
      const userApi: usersApi = {
        username: this.addUser.get('username')?.value,
        password: this.addUser.get('password')?.value
      };

      this.usersService.saveData(userApi).subscribe({
        next: () => {
          this.router.navigate(['/home'])
          alert('User created successfully!');
        },
        error: (err) => {
          console.error('Error fetching data', err);
        }
      });
    } else {
      console.error('Invalid form');
    }
  }
}
