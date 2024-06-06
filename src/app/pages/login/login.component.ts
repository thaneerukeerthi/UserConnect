import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser') || '{}');
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
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      if (storedUser && storedUser.user_email === formData.user_email && storedUser.user_password === formData.user_password) {
        if (formData.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({
            user_email: formData.user_email,
            user_password: formData.user_password
          }));
        } else {
          localStorage.removeItem('rememberedUser');
        }

        localStorage.setItem('currentUser', JSON.stringify(storedUser));
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid email or password.');
      }
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
