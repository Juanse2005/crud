import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { usersApi } from '../../interfaces/usersInterface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { DataTablesModule } from 'angular-datatables';
import $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule, NavComponent, DataTablesModule]
})
export class DashboardComponent implements OnInit {

  userList: usersApi[] = [];
  dtOptions: any = {};

  constructor(
    private usersService: UsersService,
    private router: Router // Inyección del Router aquí
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      autoWidth: true
    };
    this.getData();
  }

  getData(): void {
    this.usersService.getAll().subscribe({
      next: (result: usersApi[]) => {
        this.userList = result;
        // Actualizar DataTable después de obtener los datos
        setTimeout(() => {
          const table = $('#table').DataTable();
          table.clear();
          const data = this.userList.map(user => [
            user.id,
            user.email,
            user.username,
            user.password,
            `<button class="btn btn-warning edit-btn float-end" data-id="${user.id}">Edit</button>`,
            `<button class="btn btn-danger delete-btn float-end" data-id="${user.id}">Delete</button>`
          ]);
          table.rows.add(data).draw();

          // Eliminar eventos previos para evitar múltiples manejadores
          $('#table').off('click', '.edit-btn');
          $('#table').off('click', '.delete-btn');

          // Agregar eventos delegados para botones
          $('#table').on('click', '.edit-btn', (event) => {
            const id = $(event.currentTarget).data('id');
            this.editUser(id);
          });

          $('#table').on('click', '.delete-btn', (event) => {
            const id = $(event.currentTarget).data('id');
            this.deleteUser(id);
          });
        }, 0);
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  editUser(id: number): void {
    console.log('Edit user with ID:', id);
    this.router.navigate(['/edit-user', id]); // Utilizar el Router para la navegación
  }

  deleteUser(id?: number): void {
    if (id !== undefined) {
      this.usersService.deleteData(id).subscribe({
        next: () => {
          window.location.reload();
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
