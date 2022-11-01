import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SocialService } from '../services/social.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user;
  parseDuser;

  constructor(public authService: AuthService ,private router: Router, private route: ActivatedRoute, private social: SocialService) { }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    //PERFIL DEL USUARIO
    // // await this.social.getProfile(this.user.username).subscribe(res=>{
    // //   console.log(res);
    // // },
    // err => console.error(err));
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
