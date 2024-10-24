// frontend/src/app/dropdown-genres/dropdown-genres.component.ts
import { Component, OnInit } from '@angular/core';
import { GenresService } from '../services/genres/genres.service';
import { Genre } from '../modeles/genre';
import { NgForOf } from '@angular/common';
import { ResultatsService } from '../services/resultats/resultats.service';

@Component({
  selector: 'app-dropdown-genres',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './dropdown-genres.component.html',
  styleUrls: ['./dropdown-genres.component.css']
})
export class DropdownGenresComponent implements OnInit {

  genres: Genre[] = [];
  genreSelectionne: string = "Sélectionnez un genre";
  selectionParDefaut: string = "Sélectionnez un genre";
  PAGE_PAR_DEFAUT_LORSQUE_GENRE_SELECTIONNE = 1;
  CRITERE: string = "genre";

  constructor(
    private genresService: GenresService,
    private resultatsService: ResultatsService
  ) {}

  ngOnInit(): void {
    this.genresService.genresSubject.subscribe(data => {
      this.genres = data;
    });
  }

  selectionnerGenre(genre: Genre): void {
    this.genreSelectionne = genre.name;
    this.genresService.setGenreSelectionne(genre);

    this.resultatsService.resetDernierePageChargee();
    this.resultatsService.resetResultats();
    this.resultatsService.ajouterCritere(this.CRITERE);

    this.resultatsService.fetchTousLesAnimes(this.PAGE_PAR_DEFAUT_LORSQUE_GENRE_SELECTIONNE).subscribe(data => {
      const filteredAnimes = data.filter(anime =>
        anime.genres.some(animeGenre => animeGenre.mal_id === genre.mal_id)
      );
      this.resultatsService.setResultats(
        filteredAnimes.sort((a, b) => {
          const titleA = a.title || '';
          const titleB = b.title || '';
          return titleA.localeCompare(titleB);
        })
      );
    });
  }
}
