import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Genre } from '../../modeles/genre';
import {Anime} from '../../modeles/anime';

@Injectable({
  providedIn: 'root'
})
export class GenresService implements OnInit {
  private getGenresURL = 'http://localhost:8080/genres';
  private rechercheParGenreURL = 'http://localhost:8080/recherche-par-genre/';
  private genreSelectionne!: Genre;
  genres: Genre[] = [];
  genresSubject = new Subject<Genre[]>();

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    console.log("getGenresURL : " + this.getGenresURL);
    return this.http.get<Genre[]>(this.getGenresURL);
  }

  setGenres(genres: Genre[]): void {
    this.genres = genres;
    console.log("genres : " + this.genres);
    this.genresSubject.next(this.genres);
  }

  getGenreSelectionne(): Genre {
    return this.genreSelectionne;
  }

  setGenreSelectionne(genre: Genre): void {
    this.genreSelectionne = genre;
  }

  rechercheParGenre(id: number, pageRequise: number): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.rechercheParGenreURL + id + "/page/" + pageRequise);
  }

  ngOnInit(): void {
    this.getGenres().subscribe(data => {
      this.setGenres(data.sort((a, b) => a.name.localeCompare(b.name)));
    });
    console.log("genres : " + this.genres);
  }
}
