import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hidePassword: boolean = true;
  showpassord: boolean = true;
  
  constructor(private fb: FormBuilder, private router: Router) {
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
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      console.log("stored users", storedUser);
      if (storedUser && storedUser.user_email === formData.user_email) {
        storedUser.user_password = formData.newPassword;
        localStorage.setItem('user', JSON.stringify(storedUser));
        alert('Password reset successfully.');
        this.router.navigate(['/login']);
      } else {
        alert('No account found with this email.');
      }
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