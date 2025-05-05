import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  constructor(private httpClient: HttpClient) {

  }
  getMenuListFromDB(userCode: string, roleId: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('userCode', userCode);
    params = params.set('roleId', roleId);
    return this.httpClient.get(UrlConstants.GetDBMenuListNew, { params: params });
  }

  GetDBMenuList() {
    let menuList: any = [];
    let userCode: any = localStorage.getItem('userCode');
    let roleId: any = localStorage.getItem('roleId');
    if (localStorage.getItem('menuList')) {
      return JSON.parse(localStorage.getItem('menuList')!);
    } else {
      this.getMenuListFromDB(userCode, roleId).subscribe((res) => {
        menuList = res.ResponseObj;
        localStorage.setItem('menuList', JSON.stringify(menuList));
      });
      return menuList;
    }
  }
}
