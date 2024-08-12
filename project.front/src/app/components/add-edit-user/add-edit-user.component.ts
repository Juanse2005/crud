import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { usersApi } from '../../interfaces/usersInterface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NavComponent, CommonModule],
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {
  addUser: FormGroup;
  action = 'Add new user';
  id = 0;
  eeditUser: usersApi | undefined;
  passwordType: string = 'password';

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router, private aRoute: ActivatedRoute) {
    this.addUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.isEdit();

    // Enable confirmPassword field if adding a new user
    if (this.action === 'Add new user') {
        this.addUser.get('confirmPassword')?.enable();
    }
}


  isEdit() {
    if (this.id !== 0) {
        this.action = 'Edit user';
        this.usersService.getUserById(this.id).subscribe({
            next: (data) => {
                console.log(data);
                this.eeditUser = data;
                this.addUser.patchValue({
                    email: data.email,
                    username: data.username,
                    password: data.password
                });

                // Disable confirmPassword field if editing
                this.addUser.get('confirmPassword')?.disable();
            },
            error: (err) => {
                console.error('Error fetching data', err);
            }
        });
    }
}


  addEditUser() {
    if (this.eeditUser === undefined) {

      this.add();
    } else {
 
      const userApi: usersApi = {
        id: this.eeditUser.id,
        email: this.addUser.get('email')?.value,
        username: this.addUser.get('username')?.value,
        password: this.addUser.get('password')?.value
      };

      this.usersService.updateData(this.id, userApi).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error updating data', err);
        }
      });
    }
  }

  add(): void {
    if (this.addUser.invalid) {
      console.error('Invalid form');
      return;
    }

    const userApi: usersApi = {
      email: this.addUser.get('email')?.value,
      username: this.addUser.get('username')?.value,
      password: this.addUser.get('password')?.value
    };

    this.usersService.saveData(userApi).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error saving data', err);
      }
    });
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
