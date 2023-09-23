import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  isRTL: boolean = false;

  constructor(private router: Router) {}

  toggleDirection() {
    this.isRTL = !this.isRTL;
  }

  isValidPassword(): boolean {
    if (!this.password) {
      return true;
    }

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    return (
      uppercaseRegex.test(this.password) &&
      lowercaseRegex.test(this.password) &&
      specialCharacterRegex.test(this.password)
    );
  }

  login() {
    if (this.username && this.password && this.isValidPassword()) {
     
      this.router.navigate(['/dashboard']);
      
    }
  }
}
