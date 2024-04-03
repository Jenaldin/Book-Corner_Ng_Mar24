import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private userApi: UserService,
    private router: Router,
  ) {}

  get isLoggedIn(): boolean {
    return this.userApi.isLoggedIn;
  }

  get username(): string {
    return this.userApi.user?.username || '';
  }

  logout() {
    this.userApi.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
