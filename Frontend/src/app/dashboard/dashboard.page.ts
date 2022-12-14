import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DisplayService } from '../services/display.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public movies = [];
  name = '';
  id = '';
  user: any = {};
  parsedUser: any;

  constructor(
    private router: Router,
    public authService: AuthService,
    public moviesDisplay: DisplayService
  ) {}

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.parsedUser = JSON.parse(this.user);
    console.log(this.parsedUser);
    this.moviesDisplay.getMovies().subscribe((res) => {
      console.log(res);
      this.movies = res.results;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  search(name) {
    this.router.navigate([`/search/${name}`], name);
  }

  movieRe(id) {
    this.router.navigate([`/movies/${id}`], id);
  }
  navigateToProfile(parsedUser){
    // eslint-disable-next-line no-underscore-dangle
    this.router.navigate([`/profile/${this.parsedUser.username}`], parsedUser);
  }
}
