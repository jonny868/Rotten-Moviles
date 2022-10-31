import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialService } from '../services/social.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.page.html',
  styleUrls: ['./comment-modal.page.scss'],
})
export class CommentModalPage implements OnInit {
  @Input() data: any;
  date = new Date();
  user;
  userStamp;
  comment = {
    username: '',
    userId:'',
    message: '',
    movieId: '',
    createdAt: new Date(),
  };
  commentRes = [];
  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    private commentService: SocialService
  ) {}

  ngOnInit() {
    this.getData();
    this.getComments(this.comment.movieId);
  }
  getData(){
    console.log(this.data);
    this.user = localStorage.getItem('user');
    this.userStamp = JSON.parse(this.user);
    this.comment.username = this.userStamp.username;
    // eslint-disable-next-line no-underscore-dangle
    this.comment.userId = this.userStamp._id;
    this.comment.movieId = this.data.id;
    console.log(this.userStamp);
  }
  async getComments(id){
   this.commentService.getCommentsByMovie(id).subscribe(res=>{
     this.commentRes = res.comments;
    });
  }
  sendComment() {
   this.commentService.postComment(this.comment).subscribe(
      (res) => {console.log(res);
      this.commentRes.push(this.comment);
      this.modalController.dismiss(this.commentRes, 'Submitted');
      },
      (err) => console.log(err)
    );
  }
  async closeModal() {
    await this.modalController.dismiss(null, 'Cancel');
  }
}
