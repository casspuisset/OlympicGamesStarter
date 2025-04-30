import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { medalsCountService } from 'src/app/core/services/medals.service';
import { OlympicParticipation } from 'src/app/core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { animation } from '@angular/animations';

@Component({
  // animations: [provideAnimationsAsync(), provideAnimations()],
  selector: 'app-details',
  imports: [RouterLink, NgxChartsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true,
})
export class DetailsComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public lineChartData: {
    name: string;
    series: Array<{ name: string; value: number }>;
  }[] = [];
  medalsByEdition: any[] = [];
  countryMedals: number;
  JOsNumber: number;
  countryAthletes: number;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = true;
  autoScale: boolean = true;

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
    this.countryPath = this.route.snapshot.params['countryName'];
    this.olympics$ = this.olympicService.getOlympics();
    console.log(this.olympics$);
    this.olympics$.subscribe((value) => {
      this.createCountryArray(value);
    });
  }

  createCountryArray(oldarray: any) {
    if (oldarray) {
      let thisCountry: OlympicCountry = oldarray.find(
        (country: any) => country.country == this.countryPath
      );

      if (thisCountry.country === this.countryPath) {
        let medalsTimeline: any[] = [];

        this.countryMedals = this.medalsCount.medalsCount(
          thisCountry.participations
        );
        this.JOsNumber = thisCountry.participations.length;
        this.countryAthletes = this.athletesCount(thisCountry.participations);
        thisCountry.participations.forEach((edition) => {
          let editionToPush = {
            name: edition.year.toString(),
            value: edition.medalsCount,
          };
          this.medalsByEdition.push(editionToPush);
        });
        let medalFromYear = {
          name: thisCountry.country,
          series: this.medalsByEdition,
        };
        medalsTimeline.push(medalFromYear);
        this.lineChartData = medalsTimeline;
      }
    }
  }

  athletesCount(array: Array<OlympicParticipation>) {
    let totalCount: number = 0;
    array.forEach((participation: OlympicParticipation) => {
      totalCount = totalCount + participation.athleteCount;
    });
    return totalCount;
  }
}
