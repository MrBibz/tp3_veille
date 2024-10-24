import { Injectable } from '@angular/core';
import { Anime } from '../../modeles/anime';
import {catchError, Observable, of, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultatsService {

  dernierePageChargee: number = 1;
  getTousLesAnimesURL = 'http://localhost:8080/animes/page/';
  statutSelectionne: string = "";
  criteres: string[] = [];
  NOMBRE_DE_RESULTATS_PAR_PAGE: number = 25;
  private criteresSubject = new Subject<string>();


  constructor(
    private http: HttpClient
  ) {}

  private resultats: Anime[] = [];
  private resultatsSubject = new Subject<Anime[]>();

  ajouterCritere(critere: string): void {
    this.criteres.push(critere);
    this.criteresSubject.next(critere);
  }

  getCriteresObservable(): Observable<string> {
    return this.criteresSubject.asObservable();
  }

  getResultats(): Anime[] {
    return this.resultats;
  }

  setResultats(nouveauxResultats: Anime[]): void {
    if (!nouveauxResultats) {
      return;
    }
    this.resultats = [...this.resultats, ...nouveauxResultats];
    this.resultatsSubject.next(this.resultats);
  }

  getResultatsObservable() {
    return this.resultatsSubject.asObservable();
  }

  resetResultats(): void {
    this.resultats = [];
    this.resultatsSubject.next(this.resultats);
  }

  getDernierePageChargee(): number {
    return this.dernierePageChargee;
  }

  resetDernierePageChargee(): void {
    this.dernierePageChargee = 1;
  }

  augmenteDernierePageChargee(): void {
    this.dernierePageChargee++;
  }

  fetchTousLesAnimes(pageRequise: number): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.getTousLesAnimesURL + pageRequise).pipe(
      tap(animes => console.log('Fetched animes:', animes)),
      catchError(error => {
        console.error('Error fetching animes:', error);
        return of([]);
      })
    );
  }

  updateStatutSelectionne(statut: string): void {
    this.statutSelectionne = statut;
  }
}
