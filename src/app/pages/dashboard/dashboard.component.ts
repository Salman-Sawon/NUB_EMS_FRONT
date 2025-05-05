import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit, OnDestroy {
  dashboardAllDataList: any;
  private unsubscribe: Subscription[] = [];
  organizationList: any;
  campusList : any[] =[];
  userCode = localStorage.getItem("userCode");
  userType = localStorage.getItem("userType");
  roleId = localStorage.getItem("roleId");
  organizationCode: any;
  campusCode: any;
  constructor(
  ) {
    this.organizationList = JSON.parse(localStorage.getItem("Organization")!);
  }
  ngOnInit(): void {}


  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
