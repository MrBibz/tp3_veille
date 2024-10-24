import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ResultatsService } from '../resultats/resultats.service';

@Injectable({
  providedIn: 'root'
})
export class StatutsService {
  private statutSelectionneSubject = new Subject<string>();
  private resultatsService!: ResultatsService;

  constructor(
    private injector: Injector
  ) { }

  private getResultatsService(): ResultatsService {
    if (!this.resultatsService) {
      this.resultatsService = this.injector.get(ResultatsService);
    }
    return this.resultatsService;
  }

  setStatutSelectionne(statut: string): void {
    this.statutSelectionneSubject.next(statut);
    this.getResultatsService().updateStatutSelectionne(statut);
  }

  getStatutSelectionneObservable(): Observable<string> {
    return this.statutSelectionneSubject.asObservable();
  }
}
