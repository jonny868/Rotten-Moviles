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
  name: any;

  constructor(
    private router: Router,
    private moviesDisplay: DisplayService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('id');
    console.log(this.name);
    return this.moviesDisplay.getMovieByName(this.name).subscribe(res=>{
      this.movies = res.results;
      console.log(this.movies);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  search(name) {
    this.router.navigate([`/search/${name}`], name);
  }
}
