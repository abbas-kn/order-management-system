import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedKey="isAuthenticated"

  constructor(private router:Router) {}

  login(){
    localStorage.setItem(this.authenticatedKey,'true')
  }
  logOut(){
    localStorage.removeItem(this.authenticatedKey,)
    this.router.navigate(['/login']);
  }
  isAuthenticated():boolean{
    return localStorage.getItem(this.authenticatedKey)==='true';
  }
}
