import {Component, OnInit} from '@angular/core';
import {ResultatsService} from '../services/resultats/resultats.service';
import {Anime} from '../modeles/anime';
import {NgForOf, NgIf} from '@angular/common';
import {GenresService} from '../services/genres/genres.service';

@Component({
  selector: 'app-resultats',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './resultats.component.html',
  styleUrl: './resultats.component.css'
})
export class ResultatsComponent implements OnInit {

  resultats: Anime[] = [];
  criteres: string[] = [];

  constructor(
    private resultatsService: ResultatsService,
    private genresService: GenresService
  ) { }

  majResultats(): void {
    this.resultats = this.resultatsService.getResultats();
  }

  ajouterCritere(critere: string): void {
    this.criteres.push(critere);
  }

  chargerNouvellePage(criteres: string[]): void {
    this.resultatsService.augmenteDernierePageChargee();

    if (criteres.includes("genre")) {
      this.genresService.rechercheParGenre(this.genresService.getGenreSelectionne().mal_id, this.resultatsService.getDernierePageChargee())
        .subscribe((animes: Anime[]) => {
          this.resultatsService.setResultats(animes);
          this.majResultats();
        });
    } else {
      this.resultatsService.fetchTousLesAnimes(this.resultatsService.getDernierePageChargee())
        .subscribe((animes: Anime[])=> {
          this.resultatsService.setResultats(animes);
          this.majResultats();
      })
    }
  }

  ngOnInit(): void {
    this.resultatsService.getResultatsObservable().subscribe(() => {
      this.majResultats();
    });

    this.resultatsService.getCriteresObservable().subscribe((critere: string) => {
      this.ajouterCritere(critere);
    });
  }
}
