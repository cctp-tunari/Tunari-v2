import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const hasAccess = await this.userService.checkAdminAccess();
    if (!hasAccess) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
