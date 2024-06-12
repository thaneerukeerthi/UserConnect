import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router,
     private authService: AuthService,  private userService: UserService) {
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

      this.authService.signUp(formData).subscribe(
        response => {
          if (response.status === true) {
            this.userService.setCurrentUser(response.user); 
            alert('User registered successfully!');
            this.router.navigate(['/login']);
          } else {
            console.log("Failed to Register", response)
            alert('Registration failed: ' + response.msg);
          }
        },
        error => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      );
    }
  }
  
  goToLogin(){
    this.router.navigate(['/login'])
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

}
