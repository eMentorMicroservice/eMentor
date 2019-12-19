import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, Inject, forwardRef, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { NavigationService } from '../../../services/navigation.service';
import { LocalService } from '../../../services/common/local.service';
import { GlobalService } from '../../../services/global.service';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { UserService } from 'src/app/services/user.service';
import { jsFile } from 'src/app/app.constants';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent extends NavigationService implements OnInit, OnDestroy, AfterViewInit {
  isTeacher: boolean;
  elementLoading: boolean;
  loaderSubscribe: Subscription;
  user = new UserModel();
  active = false;
  title: any;


  constructor(router: Router,
    private route: ActivatedRoute,
    @Inject(forwardRef(() => AppComponent)) private appComm: AppComponent,
    private globalService: GlobalService,
    private cdref: ChangeDetectorRef,
    private userService: UserService) {
    super(router);
    this.subscribeNavigationEnd();
  }

  ngOnInit() {
    this.isTeacher = AuthService.isTeacher();
    if (LocalService.getLogStatus() !== 'true' ) {
      LocalService.logout();
      this.router.navigate(['login']);
    }

    this.loaderSubscribe = this.globalService.loader
      .subscribe(status => {
        this.elementLoading = status;
        this.cdref.detectChanges();
      });
    this.screenReload();

  }

  screenReload() {
    this.userService.getUserProfile()
      .subscribe((res) => {
        if (res) {
          this.user = res;
        }
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
ngAfterViewInit() {
  jsFile.forEach((item) => {
    if (document.getElementById(item.name)) {
      document.getElementById(item.name).remove();
    }
    const script = document.createElement('script');
    script.setAttribute('id', item.name);
    script.setAttribute('src', item.src);
    document.body.appendChild(script);
  });
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
