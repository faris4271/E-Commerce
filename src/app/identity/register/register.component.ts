import { Component, OnInit } from '@angular/core';
// Import necessary Angular forms modules
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// REMOVE: import { get } from 'node:http'; // This is Node.js specific, not for Angular frontend

@Component({
  selector: 'app-register',
   standalone: false, // Keep this if you are using NgModules
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Corrected styleUrl to styleUrls (it's an array)
})
export class RegisterComponent implements OnInit {

  // Use a more descriptive name like registerForm.
  // Use the definite assignment assertion (!) because it's initialized in ngOnInit
  registerForm!: FormGroup;

  // Password pattern: Minimum 8 characters, at least one uppercase letter,
  // one lowercase letter, one number and one special character from the set !@#$%^&*
  // Note: Escaping special characters within the string might be needed depending on context,
  // but for Validators.pattern, this should generally work.
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // Original regex was: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/
  // Using \d is equivalent to [0-9]. Using @$!%*?& matches the original HTML error message more closely.

  // Inject FormBuilder in the constructor
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form in ngOnInit
    this.initializeForm();
  }

  // Keep form initialization logic clean, often directly in ngOnInit or a private method
  private initializeForm(): void {
    this.registerForm = this.fb.group({
      // Ensure the keys here ('username', 'displayName', etc.) EXACTLY match
      // the formControlName attributes in your HTML template.
      username: ['', [Validators.required]], // Changed 'name' to 'username' to match common usage and likely template intent
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    });
  }

  // --- Getters for easy access in the template ---
  // Ensure each getter returns the correct control!
  // Return type AbstractControl | null is safer as .get() can return null.

  get username(): AbstractControl | null {
    return this.registerForm.get('username');
  }

  get displayName(): AbstractControl | null {
    return this.registerForm.get('displayName');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  // --- Form Submission ---
  onSubmit(): void {
    // Always check if the form is valid before proceeding
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      // Optionally mark all fields as touched to show errors to the user
      this.registerForm.markAllAsTouched();
      return; // Stop the submission process
    }

    // Form is valid, proceed with submission logic
    console.log('Form Submitted!', this.registerForm.value);

    // TODO: Replace console.log with your actual registration logic
    // e.g., call an authentication service
    // this.authService.register(this.registerForm.value).subscribe({
    //   next: (response) => { console.log('Registration successful', response); },
    //   error: (err) => { console.error('Registration failed', err); }
    // });
  }

   // Helper function (optional but recommended) to simplify template checks
   shouldShowError(control: AbstractControl | null): boolean {
    // Check if control exists, is invalid, and has been touched or modified
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}