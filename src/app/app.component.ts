import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  navigationStarted() {
    throw new Error('Method not implemented.');
  }
  // tslint:disable-next-line: member-ordering
  title = 'app';
}
