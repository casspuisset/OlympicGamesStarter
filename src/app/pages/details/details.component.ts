import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { medalsCountService } from 'src/app/core/services/medals.service';
import { OlympicParticipation } from 'src/app/core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { KeysValue } from 'src/app/core/models/KeysValue';

@Component({
  selector: 'app-details',
  imports: [RouterLink, NgxChartsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  standalone: true,
})
export class DetailsComponent implements OnInit {
  //Observable with data
  public olympics$: Observable<Array<OlympicCountry>> = of([]);
  //Array to irrigate the lineChart
  public lineChartData: {
    name: string;
    series: KeysValue[];
  }[] = [];
  //Array with medals number for each editions
  medalsByEdition: KeysValue[] = [];
  //Array with medals number for each editions with dates
  medalsTimeline: Array<{
    name: string;
    series: KeysValue[];
  }> = [];
  //Total of medals for this country
  countryMedals: number;
  //Total of JOs
  JOsNumber: number;
  //Total of athletes
  countryAthletes: number;

  // options for line-chart
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
    private olympicService: OlympicService,
    private router: Router
  ) {
    this.countryMedals = 0;
    this.JOsNumber = 0;
    this.countryAthletes = 0;
  }
  countryPath = this.route.snapshot.params['countryName'];

  ngOnInit(): void {
    this.countryPath = this.route.snapshot.params['countryName'];
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((value) => {
      this.createCountryArray(value);
    });
  }

  /**
   * Extract data for the country that matches the url by searching its name 
   * @param oldarray values from olympics$ with all countries data
   */
  createCountryArray(oldarray: OlympicCountry[]) {
    if (oldarray) {
      //check if url matches a country's name in olympics$ data
      let thisCountry: OlympicCountry | undefined = oldarray.find(
        (country: OlympicCountry) => country.country == this.countryPath
      );

      if (
        thisCountry !== undefined &&
        thisCountry.country === this.countryPath
      ) {
        //Total number of medals
        this.countryMedals = this.medalsCount.medalsCount(
          thisCountry.participations
        );
        //Total number of JOs
        this.JOsNumber = thisCountry.participations.length;
        //Total number of athletes
        this.countryAthletes = this.athletesCount(thisCountry.participations);

        //data for line-chart
        thisCountry.participations.forEach((edition) => {
          let editionToPush: KeysValue = {
            name: edition.year.toString(),
            value: edition.medalsCount,
          };
          this.medalsByEdition.push(editionToPush);
        });
        let medalFromYear = {
          name: thisCountry.country,
          series: this.medalsByEdition,
        };
        this.medalsTimeline.push(medalFromYear);
        this.lineChartData = this.medalsTimeline;
      } else {
        //if url doesn't match a country's name in olympics$ data, redirect to error page
        this.router.navigateByUrl(`${this.countryPath}/error`);
      }
    }
  }

  /**
   * Return number of athletes from the component's country with all editions
   * @param array data for this country
   * @returns number of athletes
   */
  athletesCount(array: Array<OlympicParticipation>) {
    let totalCount: number = 0;
    array.forEach((participation: OlympicParticipation) => {
      totalCount = totalCount + participation.athleteCount;
    });
    return totalCount;
  }
}
