// frontend/src/app/app.component.ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DropdownGenresComponent} from './dropdown-genres/dropdown-genres.component';
import {ResultatsComponent} from './resultats/resultats.component';
import {BarreRechercheComponent} from './barre-recherche/barre-recherche.component';
import {RadioStatutComponent} from './radio-statut/radio-statut.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DropdownGenresComponent, ResultatsComponent, BarreRechercheComponent, RadioStatutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'Bibz Anime';

}
