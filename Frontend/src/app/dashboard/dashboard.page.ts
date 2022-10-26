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

  constructor(private router: Router, http: HttpClient, public authService: AuthService, public moviesDisplay: DisplayService) { }

  ngOnInit() {
    this.moviesDisplay.getMovies().subscribe(res=>{
      console.log(res);
      this.movies = res.results;
    });

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  }
