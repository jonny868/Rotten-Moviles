import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DisplayService } from '../services/display.service';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { CommentModalPage } from '../comment-modal/comment-modal.page';
import { SocialService } from '../services/social.service';
import { RateModalPage } from '../rate-modal/rate-modal.page';

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
  obtainedComments: [];
  comments: any = [];
  user: any;
  parsedUser: any;
  rate = {
    username: '',
    userId: '',
    rate: Number,
    movieId: '',
  };
  obtainedRates: any = [{rate:Number}];
  totalRating;

  constructor(
    private social: SocialService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    public moviesDisplay: DisplayService,
    private toast: ToastController,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.getData();
  }
  async getData() {
    this.user = localStorage.getItem('user');
    this.parsedUser = JSON.parse(this.user);
    this.id = this.route.snapshot.paramMap.get('id');
    await this.moviesDisplay.getMovieById(this.id).subscribe(
      (res) => {
        // this.movie.push(res);
        this.movie = res;
      },
      (err) => console.error(err)
    );
    this.social.getComments().subscribe(
      (res) => {
        this.obtainedComments = res;
        this.comments = this.obtainedComments.reverse();
      },
      (err) => console.error(err)
    );
    this.social.getRates().subscribe((res) => {
      this.obtainedRates = res;
      console.log(this.obtainedRates);
      for (const rates of this.obtainedRates) {
        this.totalRating = rates.rates+this.totalRating;
        console.log(this.totalRating);
        //quede en la suma del rating para calcular el rating total.
      }
    });
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
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Rate this movie',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            //takes the data
            this.rate.username = this.parsedUser.username;
            // eslint-disable-next-line no-underscore-dangle
            this.rate.userId = this.parsedUser._id;
            this.rate.rate = alertData;
            this.rate.movieId = this.id;
            this.social.rateMovie(this.rate).subscribe((res) => {
              console.log(res);
            });
            this.social.getRates().subscribe((res) => {
              this.obtainedRates = res;
              console.log(this.obtainedRates);
              for (const rate of this.obtainedRates) {
                this.totalRating += this.obtainedRates[rate];
              }
              console.log(this.totalRating);
            });
          },
        },
      ],
      inputs: [
        {
          label: '1 *',
          type: 'radio',
          value: 1,
        },
        {
          label: '2 *',
          type: 'radio',
          value: 2,
        },
        {
          label: '3 *',
          type: 'radio',
          value: 3,
        },
        {
          label: '4 *',
          type: 'radio',
          value: 4,
        },
        {
          label: '5 *',
          type: 'radio',
          value: 5,
        },
      ],
    });

    await alert.present();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  search(name) {
    this.router.navigate([`/search/${name}`], name);
  }
  reloadSocial(): any {
    this.social.getComments().subscribe(
      (res) => {
        this.obtainedComments = res;
        this.comments = this.obtainedComments.reverse();
        console.log(this.comments);
      },
      (err) => console.error(err)
    );
  }
  async openRatingModal() {
    const modal = await this.modalController.create({
      component: RateModalPage,
      componentProps: { value: 123 },
    });

    await modal.present();
  }

  async openCommentModal() {
    const modal = await this.modalController.create({
      component: CommentModalPage,
      componentProps: {
        data: this.movie,
      },
    });
    await modal.present();
    const { data: commentRes, role } = await modal.onWillDismiss();
    console.log(commentRes);
    if (role === 'Submitted') {
      this.comments = commentRes.reverse();
    }
  }
}
