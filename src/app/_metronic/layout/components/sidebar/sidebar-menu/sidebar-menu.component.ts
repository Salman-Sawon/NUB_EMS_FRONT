import { Component, OnInit } from '@angular/core';
import { SidebarMenuService } from 'src/app/_metronic/layout/components/sidebar/sidebar-menu/Service/sidebar-menu.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  separatorLabel: string;
  DBmenuList: any;
  ParentMenuList:any;

  constructor(private sideBarMenuService: SidebarMenuService) {
    this.getDBmenuList();
  }

  ngOnInit(): void {
  }
  getDBmenuList() {
    this.DBmenuList = this.sideBarMenuService.GetDBMenuList();
    this.ParentMenuList = this.DBmenuList.filter(
      (w:any) => w.PMIID == 0 && w.ISM === 'Y'
    );
  }
  willSeparatorPrint(separatorGroupId: number, menuItemId: number) {
    let itemCount: number = this.DBmenuList.filter(
      (w:any) => w.SGID == separatorGroupId && w.ISM == 'N'
    ).length;
    if (itemCount > 0) {
      let firstMenuItemId: number = this.DBmenuList.filter(
        (w:any) => w.SGID === separatorGroupId)[0].MIID;
      if (firstMenuItemId == menuItemId) {
        this.separatorLabel = this.DBmenuList.filter(
          (w:any) => w.SGID === separatorGroupId && w.ISM == 'N'
        )[0].MD;
        return 'Y';
      } else {
        return 'N';
      }
    } else {
      return 'N';
    }
  }
  getParentMenuList()
  {
    return this.DBmenuList.filter(
      (w:any) => w.PMIID == 0 && w.ISM === 'Y'
    );

  }
  getChildMenuList(MenuItemId: number) {
    return this.DBmenuList.filter(
      (w:any) => w.PMIID == MenuItemId
    );
  }
}
