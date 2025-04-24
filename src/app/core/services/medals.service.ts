import { Injectable } from '@angular/core';
import { OlympicParticipation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class medalsCountService {
  medalsCount(array: Array<OlympicParticipation>) {
    let totalCount: number = 0;
    array.forEach((participation: OlympicParticipation) => {
      totalCount = totalCount + participation.medalsCount;
    });
    return totalCount;
  }
}
