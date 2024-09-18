import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Order Management System';
  showNavBar=true;

  constructor(private router:Router){
    this.router.events.subscribe((event:any)=>{
      if (event.url=="/login")
        this.showNavBar=false;
      else
      this.showNavBar=true;
    })
  }
}
