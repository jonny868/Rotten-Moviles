import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  img = '../../assets/images/Rotten App-logos_white.png';
  user = {
    email: '',
    password: '',
  };
  userdata: any;
  constructor(private router: Router, public authService: AuthService, private toastController: ToastController ) {}
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Username or password incorrect',
      duration: 1500,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }


  goToRegister() {
    this.router.navigate(['/register']);
  }

  signin() {
    return this.authService.logInUser(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.userdata = JSON.stringify(res.user);
        localStorage.setItem('user',this.userdata);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.presentToast();
        console.error(err);

      }
    );
  }
}
