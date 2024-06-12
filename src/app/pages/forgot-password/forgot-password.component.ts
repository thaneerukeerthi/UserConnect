import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hidePassword: boolean = true;
  showpassord: boolean = true;
  
  constructor(private fb: FormBuilder, private router: Router,
     private authService: AuthService, private userService: UserService) {
    this.resetPasswordForm = this.fb.group({
      user_email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }
  
  ngOnInit(): void {}
  
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['newPassword'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }
  
  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;
      console.log("password", formData) 
      this.authService.login({ user_email: formData.user_email, user_password: formData.newPassword }).subscribe(
        response => {
          console.log("detailes", formData.user_email)
          if (response.status == true) {
            console.log("response",response)
            alert('Password reset successfully.');
            this.router.navigate(['/login']);
          } else {
            console.log("err :", response, )
            alert('No account found with this email.');
          }
        },
        error => {
          console.error('Password reset failed', error);
          alert('Password reset failed. Please try again.');
        }
      );
    }
  }
  
  newPasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  
  passwordVisibility(): void {
    this.showpassord = !this.showpassord;
  }

  goToBack() {
    this.router.navigate(['/login'])
  }
}