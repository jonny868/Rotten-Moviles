import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private moviesURL='https://api.themoviedb.org/3/trending/movie/week?api_key=282b6d09f6f45f1e42a00db6299ccdb9';

  constructor(private http: HttpClient) { }

  getMovies(){
    return this.http.get<any>(this.moviesURL);
  }

}
