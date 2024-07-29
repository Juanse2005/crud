import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { usersApi } from '../../interfaces/usersInterface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit {
  
  userList: usersApi[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.usersService.getData().subscribe({
      next: (result: usersApi[]) => { 
        this.userList = result; 
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }
}
