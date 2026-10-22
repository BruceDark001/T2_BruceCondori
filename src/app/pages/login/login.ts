import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        
    
        localStorage.setItem('token', response.token || response); 

        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error de autenticación', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
  