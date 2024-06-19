import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {
token!: string;
constructor(private router: Router){};

public menuItems = routes
.map(route => route.children ?? [])
.flat()
.map(route => [
  route,
  ...(route.children ?? []).filter(childRoute => childRoute.path && !childRoute.path.includes(':'))
])
.flat()
.filter(route => route.path && !route.path.includes(':'));

public icons: string[] = ['fa-home', 'fa-user', 'fa-cog'];

}
