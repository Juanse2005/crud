import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { usersApi } from '../../interfaces/usersInterface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule] 
})
export class DashboardComponent implements OnInit {

  userList: usersApi[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.usersService.getAll().subscribe({
      next: (result: usersApi[]) => {
        this.userList = result;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }


  deleteUser(id?: number): void {
    if (id !== undefined) {
      this.usersService.deleteData(id).subscribe({
        next: () => {
          this.userList = this.userList.filter(user => user.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el usuario', err);
        }
      });
    } else {
      console.error('No se proporcionó un ID de usuario');
    }
  }
}
