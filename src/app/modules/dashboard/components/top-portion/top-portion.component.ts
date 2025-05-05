import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashBoard } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-top-portion',
  templateUrl: './top-portion.component.html',
  styleUrl: './top-portion.component.scss'
})
export class TopPortionComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  dashBoardData: DashBoard = new DashBoard();
  fakeListShow = true;
  constructor(private dataService: DashboardService) {
    this.getDashBoardData();

  }
  ngOnInit(): void {
  }
  getDashBoardData() {
    this.fakeListShow = true;
    const dashboardSubs = this.dataService.data$.subscribe(data => {
      if(data){
        this.dashBoardData = data.DD.TP;
        this.fakeListShow = false;
      }
    });
      this.unsubscribe.push(dashboardSubs);
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
