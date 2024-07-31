import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usersApi } from '../../interfaces/usersInterface';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {
  addUser: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  add() {
    console.log(this.addUser);  

    const userApi: usersApi = {
      username: this.addUser.get('username')?.value,
      password: this.addUser.get('password')?.value
    }
    console.log(userApi)
  }
}
