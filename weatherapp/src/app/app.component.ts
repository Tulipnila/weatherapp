import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weatherapp';

  menuDisplay:string='none';

  toggleMenu(){
    this.menuDisplay=(this.menuDisplay === 'block') ? 'none' : 'block'
  }
}
