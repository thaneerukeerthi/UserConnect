import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      user_firstname: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required,Validators.minLength(6)]],
      user_phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = {
        ...this.signupForm.value,
        user_lastname: 'Sharma',
        user_city: 'Hyderabad',
        user_zipcode: '500072'
      };

      localStorage.setItem('user', JSON.stringify(formData));
      alert('User registered successfully!');
      this.router.navigate(['/login']);
    }
  }
  
  goToLogin(){
    this.router.navigate(['/login'])
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

}
