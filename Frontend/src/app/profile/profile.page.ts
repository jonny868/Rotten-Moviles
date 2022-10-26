import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public authService: AuthService ,private router: Router) { }

  ngOnInit() {
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
