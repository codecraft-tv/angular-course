import { Component } from '@angular/core';
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-login',
  template: `
  <a> 
    <span *ngIf="needsLogin">Login</span>
    <span *ngIf="!needsLogin">Logout</span>
  </a>
`
})
export class LoginComponent implements OnInit {

  needsLogin: boolean = true;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.isAuthenticated().then((authenticated) => {
      this.needsLogin = !authenticated;
    })
  }
}