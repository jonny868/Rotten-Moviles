import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
 private commentsURL = 'http://localhost:3000/api/comments';
 private commentURL = 'http://localhost:3000/api/comment';
 private rateURL = 'http://localhost:3000/api/rate';
 private ratesURL = 'http://localhost:3000/api/rates';

  constructor(private http: HttpClient) { }

 //obtener los comentarios de una pelicula
  getComments(){
    return this.http.get<any>(this.commentsURL);
  }

  //publicar un nnuevo comentario
  postComment(comment){
    return this.http.post<any>(this.commentURL,comment);
  }

  //enviar nuevo rate
  rateMovie(rate){
    return this.http.post<any>(this.rateURL,rate);
  }
  getRates(){
    return this.http.get<any>(this.ratesURL);
  }
}
