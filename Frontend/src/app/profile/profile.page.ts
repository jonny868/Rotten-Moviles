import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;
  parseDuser;

  constructor(public authService: AuthService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
