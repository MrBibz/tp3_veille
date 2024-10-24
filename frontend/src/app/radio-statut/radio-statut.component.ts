import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StatutsService} from '../services/statuts/statuts.service';
import {ResultatsService} from '../services/resultats/resultats.service';

@Component({
  selector: 'app-radio-statut',
  standalone: true,
  imports: [],
  templateUrl: './radio-statut.component.html',
  styleUrl: './radio-statut.component.css'
})
export class RadioStatutComponent implements OnInit {
  @ViewChild("radioEnCours") radioEnCours!: ElementRef;
  @ViewChild("radioComplete") radioComplete!: ElementRef;
  @ViewChild("radioTous") radioTous!: ElementRef;

  premierePageParDefaut: number = 1;
  statutAiring: string = "airing";
  statutComplete: string = "complete";
  statutTous: string = "";

  constructor(
    private statutsService: StatutsService,
    private resultatsService: ResultatsService
  ) { }

  gestionChangementStatut(): void {
    this.resultatsService.resetDernierePageChargee();
    this.resultatsService.resetResultats();

    if (this.radioEnCours.nativeElement.checked) {
      this.statutsService.setStatutSelectionne(this.statutAiring);
    } else if (this.radioComplete.nativeElement.checked) {
      this.statutsService.setStatutSelectionne(this.statutComplete);
    } else {
      this.statutsService.setStatutSelectionne(this.statutTous);
    }
  }

  ngOnInit(): void {
    this.resultatsService.fetchTousLesAnimes(this.premierePageParDefaut).subscribe(animes => {
      if (!animes) {
        console.error('Fetched animes are null or undefined');
        return;
      }
      this.resultatsService.setResultats(animes);
    });
  }
}
