import { Injectable } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd, RoutesRecognized } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
export abstract class NavigationService implements AfterViewInit {

  constructor(public router: Router) { }

  ngAfterViewInit(): void {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.navigationStarted();
        }
        else if (event instanceof NavigationEnd) {
          this.navigationEnded();
        }
        else if (event instanceof NavigationCancel) {
          this.navigationCanceled();
        }
        else if (event instanceof RoutesRecognized) {
          this.navigationRecognized();
        }
      });
  }

  abstract navigationStarted();
  abstract navigationEnded();
  abstract navigationCanceled();
  abstract navigationRecognized();


}
