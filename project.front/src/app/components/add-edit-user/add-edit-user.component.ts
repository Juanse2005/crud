import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usersApi } from '../../interfaces/usersInterface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule, NavComponent],
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {
  addUser: FormGroup;
  action = 'Add new user';
  id = 0;
  eeditUser: usersApi | undefined;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router, private aRoute: ActivatedRoute) {
    this.addUser = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.id = + this.aRoute.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.isEdit();
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
          })
        },
        error: (err) => {
          console.error('Error fetching data', err);
        }
      });
    }
  }

  addEditUser() {
    if (this.eeditUser === undefined) {
      // Add new user
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
    } else {
      // Update existing user
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
    if (this.addUser.valid) {
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
          console.error('Error fetching data', err);
        }
      });
    } else {
      console.error('Invalid form');
    }
  }
}