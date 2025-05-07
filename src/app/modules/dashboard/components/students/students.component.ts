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

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent  {
  
}
