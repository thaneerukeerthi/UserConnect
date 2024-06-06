import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any;

constructor(private router: Router){}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
  }

  goToSignUp(){
    this.router.navigate(['/sign-up'])
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

}
