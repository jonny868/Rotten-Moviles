import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  buttonText = 'Go back';
  checkpw = '';
  user = {
    username: '',
    email: '',
    password: '',
  };
  constructor(
    private toastController: ToastController,
    private register: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Password do not match',
      duration: 1500,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }

  signUp() {
    if (this.checkpw !== this.user.password) {
      return this.presentToast();
    }
    this.register.regUser(this.user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      (err) => console.error(err)
    );
  }
}
