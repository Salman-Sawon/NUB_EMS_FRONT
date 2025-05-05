import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { UserInfo } from '../model/user-info';
import { AccReferenceDataViewModel, ReferenceDataViewModel } from '../model/reference-data-view-model';
import { BehaviorSubject, Observable, Subscription, catchError, of, takeUntil } from 'rxjs';
import { RequestMessage } from 'src/app/modules/result/models/request-message';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private referenceDataList:ReferenceDataViewModel[] = [];
  private accRefDataList: AccReferenceDataViewModel[]=[];
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
// public fields
currentUser$!: Observable<UserModel>;
isLoading$: Observable<boolean>;
currentUserSubject: BehaviorSubject<UserModel>;
isLoadingSubject: BehaviorSubject<boolean>;
request: RequestMessage = new RequestMessage();


get currentUserValue(): UserModel {
  return this.currentUserSubject.value;
}

set currentUserValue(user: UserModel) {
  this.currentUserSubject.next(user);
}

  constructor(private httpClient:HttpClient,
    private authService: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined!);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.authService.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }
  logIn(userInfo:UserInfo){
    return this.httpClient.post(UrlConstants.login, userInfo);
  }
  getOrganization(userCode: any) {
    let params = new HttpParams();
    params = params.set('userCode', userCode);
    this.httpClient.get(UrlConstants.getAllReferenceDataList, {params: params})
                  .subscribe((res:any) => {
                    this.referenceDataList = res.ResponseObj;
                    let dataList:any[] = [];
                     //Version
                     dataList = [];
                     dataList = this.referenceDataList.filter(w=>w.KEY == 'VERSION');
                     if(dataList.length>0)
                     {
                       localStorage.setItem('versionList', JSON.stringify(dataList));
                     }

                     //Shift
                     dataList = [];
                     dataList = this.referenceDataList.filter(w=>w.KEY == 'SHIFT');
                     if(dataList.length>0)
                     {
                      localStorage.setItem('shiftList', JSON.stringify(dataList));
                     }

                      //Version
                      dataList = [];
                      dataList = this.referenceDataList.filter(w=>w.KEY == 'CLASS');
                      if(dataList.length>0)
                      {
                        localStorage.setItem('classList', JSON.stringify(dataList));
                      }

                      //Session
                     dataList = [];
                     dataList = this.referenceDataList.filter(w=>w.KEY == 'SESSION');
                     if(dataList.length>0)
                     {


                     dataList.sort((a: { NAME: number; }, b: { NAME: number; }) => {
                        if (a.NAME > b.NAME) { return -1; }
                        if (a.NAME < b.NAME) { return 1; }
                        return 0;
                      });



                      localStorage.setItem('sessionList', JSON.stringify(dataList));
                     }
                     //Group
                     dataList = [];
                     dataList = this.referenceDataList.filter(w=>w.KEY == 'GROUP');
                     if(dataList.length>0)
                     {
                      localStorage.setItem('groupList', JSON.stringify(dataList));
                     }
                      //Section
                      dataList = [];
                      dataList = this.referenceDataList.filter(w=>w.KEY == 'SECTION');
                      if(dataList.length>0)
                      {
                        localStorage.setItem('sectionList', JSON.stringify(dataList));
                      }
                         //Year
                         dataList = [];
                         dataList = this.referenceDataList.filter(w=>w.KEY == 'YEAR');
                         if(dataList.length>0)
                         {
                           localStorage.setItem('yearList', JSON.stringify(dataList));
                         }
                        //Semester
                        dataList = [];
                        dataList = this.referenceDataList.filter(w=>w.KEY == 'SEMESTER');
                        if(dataList.length>0)
                        {
                          localStorage.setItem('semesterList', JSON.stringify(dataList));
                        }
                        //Visibility
                        dataList = [];
                        dataList = this.referenceDataList.filter(w=>w.KEY == 'VISIBILITY');
                        if(dataList.length>0)
                        {
                          localStorage.setItem('visibility', JSON.stringify(dataList));
                        }
                        //Cureent Session
                        dataList = [];
                        dataList = this.referenceDataList.filter(w=> w.KEY == 'CUR_SESSION');
                        if(dataList.length>0){
                          localStorage.setItem('curSessionList', JSON.stringify(dataList));
                        }
                  });
  }


  getCurSession(userCode: any) {
    let params = new HttpParams();
    params = params.set('userCode', userCode);
    this.httpClient.get(UrlConstants.getCurSessionList, {params: params})
                  .subscribe((res:any) => {
                   let dataList = [];
                    dataList = res.ResponseObj;
                    if(dataList.length>0)
                        {
                          localStorage.setItem('CurrentSessionList', JSON.stringify(dataList));
                        }
    });
  }



  getAccRefData(orgCode: any) {
    let params = new HttpParams();
    params = params.set('ORG_CODE', orgCode);
    this.httpClient.get(UrlConstants.getAccRefData, {params: params})
                  .subscribe((res:any) => {
                    this.accRefDataList = res.ResponseObj;
                    if(this.accRefDataList.length>0){
                      localStorage.setItem('accAllHeadList', JSON.stringify(this.accRefDataList));
                    }
                    let dataList:any[] = [];
                     //ACC_HEAD
                     dataList = [];
                     dataList = this.accRefDataList.filter(w=>w.KEY == 'ACC_HEAD');
                     if(dataList.length>0)
                     {
                       localStorage.setItem('accHeadList', JSON.stringify(dataList));
                     }

                     //CASH_HEAD
                     dataList = [];
                     dataList = this.accRefDataList.filter(w=>w.KEY == 'CASH_HEAD');
                     if(dataList.length>0)
                     {
                      localStorage.setItem('accCashHeadList', JSON.stringify(dataList));
                     }

                      //BANK_HEAD
                      dataList = [];
                      dataList = this.accRefDataList.filter(w=>w.KEY == 'BANK_HEAD');
                      if(dataList.length>0)
                      {
                        localStorage.setItem('accBankHeadList', JSON.stringify(dataList));
                      }
                  });
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
