import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'involveU';
  displayLoginDialog: boolean = false;

  showBasicDialog() {
    this.displayLoginDialog = true;
    console.log("test")
  }
}
