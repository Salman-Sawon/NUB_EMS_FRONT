import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, Subject } from 'rxjs';
import { map, catchError, switchMap, finalize, takeUntil } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LocalStorageViewModel, LocalStorageViewModelcampus } from '../components/login/model/local-storage-view';
import {  HttpClient, HttpParams } from '@angular/common/http';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { ReferenceDataViewModel } from '../components/login/model/reference-data-view-model';
import { OrganizationService } from 'src/app/shared-services/Global_Services/organization.service';
import { CampusService } from 'src/app/shared-services/Global_Services/campus.service';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private ngUnsubscribe = new Subject<void>();
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private referenceDataList:ReferenceDataViewModel[] = [];
  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;
  organizationCode: string;
  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private httpClient: HttpClient,
    private orgService: OrganizationService,
    private campusService: CampusService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }



  public isAuthenticated(){
    let token = localStorage.getItem('token');
    if(token != null){
        return true;
    } 
    this.router.navigate(['/auth/login']);
    return false;
  }


  setOrganization(organizationCode:string,organizationName:string,organizationNameBangla:string)
  {
    let orgList:LocalStorageViewModel[] = [];
    orgList.push({ KEY: 'ORG', ID:0, NAME:organizationName,CODE:organizationCode,NAME_BANGLA:organizationNameBangla });
    localStorage.setItem('Organization', JSON.stringify(orgList));
  }


  setCampusList(campusCode:string,campusName:string)
  {
    let orgList:LocalStorageViewModelcampus[] = [];
    orgList.push({ KEY: 'CAMPUS', ID:0, NAME:campusName,CODE:campusCode });
    localStorage.setItem('CampusList', JSON.stringify(orgList));
  }

  getCurSession(userCode: any) {
    let params = new HttpParams();
    params = params.set('userCode', userCode);
    this.httpClient.get(UrlConstants.getCurSessionList, {params: params})
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((res:any) => {
                   let dataList = [];
                    dataList = res.ResponseObj;
                    if(dataList.length>0)
                        {
                          localStorage.setItem('CurrentSessionList', JSON.stringify(dataList));
                        }
    });
  }



  // getCurSession(userCode: any) {
  //   let params = new HttpParams();
  //   params = params.set('userCode', userCode);
  //   this.httpClient.get(UrlConstants.getCurSessionList, {params: params})
  //                 .pipe(takeUntil(this.unsubscribe))
  //                 .subscribe((res:any) => {
  //                  let dataList = [];
  //                   dataList = res.ResponseObj;
  //                   if(dataList.length>0)
  //                       {
  //                         localStorage.setItem('CurrentSessionList', JSON.stringify(dataList));
  //                       }
  //   });
  // }


  getOrganization(userCode: any) {

    let params = new HttpParams();
    params = params.set('userCode', userCode);
    this.httpClient.get(UrlConstants.getAllReferenceDataList, {params: params})
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe((res:any) => {
                    this.referenceDataList = res.ResponseObj;
                    let dataList:any[] = [];
                    dataList = this.referenceDataList.filter(w=>w.KEY == 'ORG');
                    if(dataList.length>0)
                    {
                      this.organizationCode = dataList[0].CODE;
                      this.orgService.setOrganizationCode(this.organizationCode);
                      this.orgService.setOrganizationName(dataList[0].NAME);
                      localStorage.setItem('Organization', JSON.stringify(dataList));
                    }

                    //Campus
                    dataList = [];
                    dataList = this.referenceDataList.filter(w=>w.KEY == 'CAMPUS');
                    if(dataList.length>0)
                    {
                      this.campusService.setCampusName(dataList[0].NAME);
                      localStorage.setItem('CampusList', JSON.stringify(dataList));
                    }

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



  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
