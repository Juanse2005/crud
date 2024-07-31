import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usersApi } from '../../interfaces/usersInterface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule],
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
          this.addUser.patchValue({
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

  add(): void {
    if (this.addUser.valid) {
      const userApi: usersApi = {
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