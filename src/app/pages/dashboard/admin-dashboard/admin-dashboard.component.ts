import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageViewModel, LocalStorageViewModelcampus } from 'src/app/modules/auth/components/login/model/local-storage-view';
import { DashboardService } from 'src/app/modules/dashboard/services/dashboard.service';
import { CampusService } from 'src/app/shared-services/Global_Services/campus.service';
import { OrganizationService } from 'src/app/shared-services/Global_Services/organization.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  dashboardAllDataList: any;
  private unsubscribe: Subscription[] = [];
  organizationList: any;
  campusList : any[] =[];
  userCode = localStorage.getItem("userCode");
  roleId = localStorage.getItem("roleId");
  organizationCode: any;
  campusCode: any;
  constructor(
    private orgService: OrganizationService,
    private campusService: CampusService,
    private cdr: ChangeDetectorRef,
    private dashBoardService: DashboardService
  ) {
    this.organizationList = JSON.parse(localStorage.getItem("Organization")!);
    if (!this.organizationList) {
      const orgSubs = this.orgService.getOrganizationObs().subscribe((orgCode) => {
        this.organizationCode = orgCode;
        this.setCampusList();
      });
      this.unsubscribe.push(orgSubs);
    } else {
      this.organizationCode = this.organizationList[0].CODE;
      this.setCampusList();
    }
  }
  ngOnInit(): void {}
  setCampusList(){
    this.campusList = JSON.parse(localStorage.getItem("CampusList")!);
    if(!this.campusList){
      const campusServiceUnsubscirbe = this.campusService.getOrgCampusList( this.organizationCode)
      .subscribe((res:any) => {
        this.campusList = res.ResponseObj;
        this.campusCode = this.campusList[0].CAMPUS_CODE;
        let camList: LocalStorageViewModelcampus[] = [];
        camList.push({ KEY: 'CAMPUS', ID:0, NAME:this.campusList[0].CAMPUS_NAME,CODE:this.campusList[0].CAMPUS_CODE });
        this.campusService.setCampusinLocalStorage(camList);
        this.getDashBoardAllData();
      });
    this.unsubscribe.push(campusServiceUnsubscirbe);
    }else{
      this.campusCode = this.campusList[0].CODE;
      this.getDashBoardAllData();
    }
  }
  getDashBoardAllData() {
    const DashboardAllData = this.dashBoardService
      .getDashboardAllData(this.organizationCode, this.campusCode)
      .subscribe((response: any) => {
        this.dashboardAllDataList = response;
        this.dashBoardService.sendData(this.dashboardAllDataList);
        this.cdr.detectChanges();
      });
    this.unsubscribe.push(DashboardAllData);
  }
  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
