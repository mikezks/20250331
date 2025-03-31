import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Flight, FlightService } from '../../api-boarding';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-flight-booking',
  imports: [
    RouterOutlet
  ],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class FlightBookingComponent {
  private http = inject(HttpClient);

  constructor() {
    this.http.get<Flight>('https://demo.angulararchitects.io/api/flight?id=3')
      .subscribe(console.log);
  }
}
