import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})

export class authGuard implements CanActivate{
  constructor (private authService:AuthService,private router:Router){}
  canActivate():boolean {
    if (this.authService.isAuthenticated())
      return true;
    this.router.navigate(['/login']);
    return false;
  }
}