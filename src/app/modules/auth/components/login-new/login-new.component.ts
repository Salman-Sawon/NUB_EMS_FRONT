import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { MenuService } from 'ng-zorro-antd/menu';
import { Subscription, Observable } from 'rxjs';
import { ResponseMessage } from 'src/app/modules/result/models/response-message';
import { AuthService } from '../../services/auth.service';
import { UserInfo } from '../login/model/user-info';
import { LoginService } from '../login/service/login.service';
import { SidebarMenuService } from 'src/app/_metronic/layout/components/sidebar/sidebar-menu/Service/sidebar-menu.service';
import { getToken } from 'firebase/messaging';

@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrl: './login-new.component.scss'
})
export class LoginNewComponent implements OnInit, OnDestroy {
  passwordVisible = false;
  size: NzButtonSize = 'large';
  isLoadingCircle = false;
  isIncorrectPass = false;
  loginForm: FormGroup;
  loginResponse: any;
  validationStatus : string = "";
  loginEncryptData:any;
  user: UserInfo = new UserInfo();
  private unsubscribe: Subscription[] = [];
  returnUrl: string;
  isLoading$: Observable<boolean>;
constructor(private fb: FormBuilder,
  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router,
  private loginService: LoginService,
  private sideBarMenuService: SidebarMenuService,
            private cdr: ChangeDetectorRef) {
  this.loginForm = this.fb.group({
    USER_NAME: [null, Validators.required],
    PASSWORD: [null, Validators.required],
  });
  this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
}

  ngOnInit(): void {
    this.returnUrl =
    this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }
get loginFormControl() {
  return this.loginForm.controls;
}



  login(){
    this.isIncorrectPass = false;
    if(this.loginForm.valid){
      this.user.UserName = this.loginForm.controls["USER_NAME"].value;
      this.user.Password = this.loginForm.controls["PASSWORD"].value;
      this.isLoadingCircle = true;
      const loginSubscr = this.loginService
      .logIn(this.user)
      .subscribe((res: any) => {
        let obj = res;
        if (obj.StatusCode === 1) {
          localStorage.setItem('userCode', obj.ResponseObj.USER_CODE);
          localStorage.setItem('roleId', obj.ResponseObj.ROLE_ID);
          localStorage.setItem('token', obj.ResponseObj.Token);
          localStorage.setItem('userType', obj.ResponseObj.USER_TYPE_DESC);
          localStorage.setItem('userMobile', obj.ResponseObj.MOBILE_NO);
          localStorage.setItem('orgimgbyte', obj.ResponseObj.ORG_IMAGE_BYTE);
          if(obj.ResponseObj.USER_TYPE_DESC !='DC'){
          
             this.authService.setOrganization(obj.ResponseObj.ORG_CODE,obj.ResponseObj.ORG_NAME,obj.ResponseObj.ORG_NAME_BANGLA);
             this.authService.setCampusList(obj.ResponseObj.CAMPUS_CODE,obj.ResponseObj.CAMPUS_NAME);
             this.loginService.getCurSession(obj.ResponseObj.USER_CODE);
             this.loginService.getOrganization(obj.ResponseObj.USER_CODE);
             this.loginService.getAccRefData(obj.ResponseObj.ORG_CODE);
            }else{

              this.authService.setOrganization(obj.ResponseObj.USER_TYPE_DESC,obj.ResponseObj.USER_CODE,'');
              this.authService.setCampusList(obj.ResponseObj.CAMPUS_CODE,obj.ResponseObj.CAMPUS_NAME);
            }
            this.loginService.getOrganization(obj.ResponseObj.USER_CODE);
          this.sideBarMenuService.getMenuListFromDB(obj.ResponseObj.USER_CODE,obj.ResponseObj.ROLE_ID).subscribe((res: any) => {
            if (res.ResponseObj.length > 0) {

              localStorage.setItem('menuList', JSON.stringify(res.ResponseObj));
              // this.router.navigate(['admin/teacher/teacher-entry-form']);

              this.router.navigate([this.returnUrl]);
            }
          });
        } else {
          this.isIncorrectPass = true;
          this.isLoadingCircle = false;
           this.validationStatus = obj.Message;
           this.cdr.detectChanges();
        }
      });
    this.unsubscribe.push(loginSubscr);
    }else{
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.cdr.detectChanges();
    }
  }

  

 

// async  requestFCMToken() {
//   try {
//     // ইউজারের অনুমতি চাওয়া হচ্ছে
//     const permission = await Notification.requestPermission();

//     if (permission !== "granted") {
//       console.error("Notification permission denied.");
//       return;
//     }

//     // টোকেন রিট্রিভ করা হচ্ছে
//     const currentToken = await getToken(messaging, {
//       vapidKey: "BNa3kBNBsU1Ex0fW62gtulFzKht_aStjU14zOUDx-jZmwLFsfikkEEQyv09a6ESR4eX93S3yw5mzEmmkN51cli8",
//     });

//     if (currentToken) {
//       console.log("FCM Device Token:", currentToken);
//     } else {
//       console.log("No registration token available.");
//     }
//   } catch (error) {
//     console.error("Error retrieving FCM token:", error);
//   }
// }









  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb: { unsubscribe: () => any; }) => sb.unsubscribe());
  }
}

