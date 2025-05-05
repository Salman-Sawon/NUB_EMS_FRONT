// import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { DashboardService } from '../../services/dashboard.service';
// declare var google: any;

// @Component({
//   selector: 'app-students',
//   templateUrl: './students.component.html',
//   styleUrls: ['./students.component.scss'],
// })
// export class StudentsComponent implements OnInit, OnDestroy {
//   fakeListShow: boolean = true;
//   isChartAvailable: boolean = true;
//   classWiseStdList: any[];
//   transformedData: any[] = [];
//   private unsubscribe: Subscription[] = [];
//   constructor(
//     private changeDetect: ChangeDetectorRef,
//     private dataService: DashboardService
//   ) {
//      this.getDashBoardData();
//   }
//   ngOnInit(): void {}
//   getDashBoardData() {
//     const dashboardSubs = this.dataService.data$.subscribe((data) => {
//       if (data) {
//         this.classWiseStdList = data.DD.CI;
//         if (this.classWiseStdList.length > 0) {
//           google.charts.load('current', { packages: ['corechart'] });
//           google.charts.setOnLoadCallback(() => this.drawChart());
//         } else {
//           this.isChartAvailable = false;
//           this.fakeListShow = true;
//         }
//         this.changeDetect.detectChanges();
//       }
//     });
//     this.unsubscribe.push(dashboardSubs);
//   }
//   drawChart() {
//     this.isChartAvailable = true;
//     this.fakeListShow = false;
//     const chartData = [
//       ['Students', 'Students per class'],
//       ...this.classWiseStdList.map((item) => [item.CN, item.SC]),
//     ];
//     var options = {
//       is3D: true,
//       backgroundColor: 'transparent',
//       width: 590,
//       height: 484,
//     };
//     var chart = new google.visualization.PieChart(
//       document.getElementById('piechart_3d')
//     );
//     chart.draw(google.visualization.arrayToDataTable(chartData), options);
//     this.changeDetect.detectChanges();
//   }

//   ngOnDestroy(): void {
//     this.unsubscribe.forEach((sb) => sb.unsubscribe());
//   }
// }



import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any[];
};

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit, OnDestroy {
  fakeListShow: boolean = true;
  isChartAvailable: boolean = false;
  classWiseStdList: any[] = [];
  transformedData: any[] = [];
  private unsubscribe: Subscription[] = [];

  chartOptions: Partial<ChartOptions> = {
    series: [],  // Empty array ensures it is not undefined
    chart: {
      type: 'pie',
      width: 600,  // Set width larger (e.g., 600px or more)
      height: 600,  // Set height larger (e.g., 600px or more)
    },
    labels: [],  // Empty array ensures it is not undefined
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  

  constructor(
    private changeDetect: ChangeDetectorRef,
    private dataService: DashboardService
  ) {
    this.getDashBoardData();
  }

  ngOnInit(): void {}

  getDashBoardData() {
   this.dataService.data$.subscribe((data) => {
      if (data) {
        this.classWiseStdList = data.DD.CI;
        this.isChartAvailable = true;
        this.fakeListShow = false;
        if (this.classWiseStdList.length > 0) {
          this.chartOptions.series = this.classWiseStdList.map((item) => item.SC);
          this.chartOptions.labels = this.classWiseStdList.map((item) => item.CN);
          this.isChartAvailable = true;
          this.fakeListShow = false;
          this.changeDetect.detectChanges();
        } else {
          // Reset all chartOptions fields
          this.chartOptions.series = [];
          this.chartOptions.labels = [];
          this.chartOptions.chart = {
            type: 'pie',
            width: 380,
          };
          this.chartOptions.responsive = [];
          this.isChartAvailable = false;
          this.fakeListShow = true;
          this.changeDetect.detectChanges();
        }
  
        this.changeDetect.detectChanges();
      }
    });
  
  
  }
  
  
  

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
