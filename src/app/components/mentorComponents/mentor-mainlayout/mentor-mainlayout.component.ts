import { Component, OnInit, OnDestroy, AfterViewInit, Inject, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalService } from 'src/app/services/common/local.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AppComponent } from 'src/app/app.component';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mentor-mainlayout',
  templateUrl: './mentor-mainlayout.component.html',
  styleUrls: ['./mentor-mainlayout.component.css']
})
export class MentorMainlayoutComponent extends NavigationService implements OnInit, OnDestroy, AfterViewInit {

  elementLoading: boolean;
  loaderSubscribe: Subscription;
  user = new UserModel();
  userName: any;
  active = false;
  title: any;


  constructor(router: Router,
    private route: ActivatedRoute,
    @Inject(forwardRef(() => AppComponent)) private appComm: AppComponent,
    private globalService: GlobalService,
    private cdref: ChangeDetectorRef) {
    super(router);
    this.subscribeNavigationEnd();
  }

  ngOnInit() {
    if (LocalService.getLogStatus() !== 'true' ) {
      LocalService.logout();
      this.router.navigate(['login']);
    }

    if (AuthService.isTeacher()) {
      this.router.navigate(['mentor-home']);
    }
    this.userName = LocalService.getUserName();

    this.loaderSubscribe = this.globalService.loader
      .subscribe(status => {
        this.elementLoading = status;
        this.cdref.detectChanges();
      });

  }

  subscribeNavigationEnd() {
    this.router
        .events
        .filter(e => e instanceof NavigationEnd)
        .map(() => this.route)
        .map(route => {
            if (route.firstChild) {
                route = route.firstChild;
            }

            return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .subscribe(data => this.title = data.title);
}

logOut() {
  try {
          LocalService.logout();
          this.router.navigate(['login']);
  } catch {
    this.router.navigate(['login']);
  }

}

  ngOnDestroy() {
    this.loaderSubscribe.unsubscribe();
  }

  navigationStarted() {
    this.elementLoading = false;
    this.appComm.navigationStarted();
  }
  navigationEnded() {
  }
  navigationCanceled() {
  }
  navigationRecognized() {
  }

  nvaigateToComponent(path: string) {
    this.router.navigate(['']);
  }

  viewProfile() {
    this.router.navigate(['/user-profile']);
  }


}
