import { Component, OnInit } from '@angular/core';
import { map, Observable, of, pipe } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from 'src/assets/mock/data';
import * as d3 from 'd3';
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
  // public pieChartData: { name: string; value: number }[] = [];

  /**
   * Initialisation de la pie-chart sans les valeurs de l'observable
   */
  single!: any[];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#A3333', '#C7B42C', '#AAAAAA'],
  };

  constructor(private olympicService: OlympicService) {
    Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    console.log(this.olympics$);
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
