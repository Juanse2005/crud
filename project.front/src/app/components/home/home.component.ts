import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent,SignUpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
