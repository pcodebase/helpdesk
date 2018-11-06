import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IT Helpdesk';
  update: boolean = false;

  constructor(updates: SwUpdate) {
    updates.available.subscribe(event => {
      //this.update = true;
      updates.activateUpdate().then(() => document.location.reload());
    })
  }
}
