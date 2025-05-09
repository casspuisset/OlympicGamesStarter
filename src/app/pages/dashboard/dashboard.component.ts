import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { __values } from 'tslib';
import { medalsCountService } from 'src/app/core/services/medals.service';
import { Router } from '@angular/router';
import { KeysValue } from 'src/app/core/models/KeysValue';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [AsyncPipe, CommonModule, NgxChartsModule],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  public olympics$: Observable<Array<OlympicCountry>> = of([]);
  public pieChartData: KeysValue[] = [];

  /**
   * Initialisation of the pie-chart
   */
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#A3333', '#C7B42C', '#AAAAAA'],
  };
  JOsNumber: number = 0;

  constructor(
    private olympicService: OlympicService,
    private medalsCount: medalsCountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(take(2)).subscribe((value) => {
      this.createAnArray(value);
    });
  }

/**
 * Extract data from olympics$ for pie-chart and counters
 * @param oldarray data from olympics$ 
 */
  createAnArray(oldarray: OlympicCountry[]) {
    if (oldarray) {
      let thisOlympicCountry: KeysValue[] = [];
      oldarray.forEach((olympicCountry: OlympicCountry) => {
        let thisCount = this.medalsCount.medalsCount(
          olympicCountry.participations
        );
        this.JOsNumber = olympicCountry.participations.length;
        let resume: KeysValue = {
          name: olympicCountry.country,
          value: thisCount,
        };
        thisOlympicCountry.push(resume);
      });
      this.pieChartData = thisOlympicCountry;
    }
  }

  onSelect(data: {name: string, value: number, label: string}): void {
    this.router.navigateByUrl(`details/${data.name}`);
  }
}
