import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { medalsCountService } from 'src/app/core/services/medals.service';
import { OlympicParticipation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  countryMedals: number;
  JOsNumber: number;
  countryAthletes: number;

  constructor(
    private route: ActivatedRoute,
    private medalsCount: medalsCountService,
    private olympicService: OlympicService
  ) {
    this.countryMedals = 0;
    this.JOsNumber = 0;
    this.countryAthletes = 0;
  }

  countryPath = this.route.snapshot.params['countryName'];

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(take(2)).subscribe((value) => {
      this.createCountryArray(value);
    });
  }

  createCountryArray(oldarray: any) {
    oldarray.forEach((olympicCountry: OlympicCountry) => {
      if (olympicCountry.country === this.countryPath) {
        this.countryMedals = this.medalsCount.medalsCount(
          olympicCountry.participations
        );
        this.JOsNumber = olympicCountry.participations.length;
        this.countryAthletes = this.athletesCount(
          olympicCountry.participations
        );
      }
    });
  }

  athletesCount(array: Array<OlympicParticipation>) {
    let totalCount: number = 0;
    array.forEach((participation: OlympicParticipation) => {
      totalCount = totalCount + participation.athleteCount;
    });
    return totalCount;
  }
}
