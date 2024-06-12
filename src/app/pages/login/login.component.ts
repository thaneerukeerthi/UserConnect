import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router,
     private authService: AuthService,  private userService: UserService) {
    this.loginForm = this.fb.group({
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    const rememberedUser = JSON.parse(sessionStorage.getItem('rememberedUser') || '{}');
    if (rememberedUser.user_email) {
      this.loginForm.patchValue({
        user_email: rememberedUser.user_email,
        user_password: rememberedUser.user_password,
        rememberMe: true
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log("from data", formData)
      this.authService.login(formData).subscribe(
        response => {
          console.log("Data:", response)
          if (response.status == true) {
            if (formData.rememberMe) {
              sessionStorage.setItem('rememberedUser', JSON.stringify({
                user_email: formData.user_email,
                user_password: formData.user_password
              }));
            } else {
              sessionStorage.removeItem('rememberedUser');
            }

            this.userService.setCurrentUser(response.user_data);
            console.log("response of user",response.user_data,"inner",response.user_data)
            this.router.navigate(['/dashboard']);
          } else {
            alert('Login failed: ' + response.msg);
          }
        },
        error => {
          console.error('Login failed', error);
          alert('Login failed. Please try again.');
        }
      );
    }
  }
  
  forgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  goToSignUp(){
    this.router.navigate(['/sign-up'])
  }

  goToDashboard(){
    this.router.navigate(['/dashboard'])
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
