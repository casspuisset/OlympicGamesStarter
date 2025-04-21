import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { __values } from 'tslib';
import { OlympicParticipation } from 'src/app/core/models/Participation';
// import {}

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [AsyncPipe, CommonModule, NgxChartsModule],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public pieChartData: { name: string; value: number }[] = [];

  /**
   * Initialisation de la pie-chart sans les valeurs de l'observable
   */
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#A3333', '#C7B42C', '#AAAAAA'],
  };

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(take(2)).subscribe((value) => {
      this.createAnArray(value);
    });
  }

  createAnArray(oldarray: any) {
    oldarray.forEach((olympicCountry: OlympicCountry) => {
      let thisCount = this.medalsCount(olympicCountry.participations);
      let objectToPush = {
        name: olympicCountry.country,
        value: thisCount,
      };
      this.pieChartData.push(objectToPush);
    });
  }

  medalsCount(array: Array<OlympicParticipation>) {
    let totalCount: number = 0;
    array.forEach((participation: OlympicParticipation) => {
      totalCount = totalCount + participation.medalsCount;
    });
    return totalCount;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
