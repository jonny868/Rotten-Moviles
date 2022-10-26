import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DisplayService } from '../services/display.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public movies = [];
  name: string;

  constructor(
    private router: Router,
    private moviesDisplay: DisplayService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => (this.name = params.name));
    console.log(this.name);
    this.moviesDisplay.getMovieByName(this.name).subscribe((res) => {
      console.log(res);
      this.movies = res.results;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  search(name) {
    this.router.navigate(['/search'], name);
  }
}
