import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../interfaces/movie';
import { AuthService } from '../services/auth.service';
import { DisplayService } from '../services/display.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movie = {};
  // public movie: Movie;
  name: any;
  id: any;

  constructor(
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    public moviesDisplay: DisplayService,
    private toast: ToastController
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    await this.moviesDisplay.getMovieById(this.id).subscribe(res=>{
    // this.movie.push(res);
    this.movie = res;
    console.log(this.movie);
    },
    err => console.error(err)
    );
  }
  async presentToast() {
    const toast = await this.toast.create({
      message: 'You must be logged in to rate or comment',
      duration: 1500,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  search(name) {
    this.router.navigate([`/search/${name}`], name);
  }
}
