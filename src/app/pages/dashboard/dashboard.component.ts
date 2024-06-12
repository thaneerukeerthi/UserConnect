import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interface/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  UserData: UserData []= [];
constructor(private router: Router,  private userService: UserService){}

  ngOnInit(): void {
    this.UserData = this.userService.getCurrentUser();
    console.log("fetched user Data",this.UserData)
    if (!this.UserData) {
      this.router.navigate(['/login']);
    }
  }
  goToSignUp(){
    this.router.navigate(['/sign-up'])
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

}
