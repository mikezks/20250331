import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Flight, FlightService } from '../../api-boarding';
import { HttpClient } from '@angular/common/http';
import { NavigationComponent } from '../../../shared/ui-common';
import { provideNavigationService } from '../../../shared/logic-navigation';
import { NavigationProviderDirective } from '../../../shared/ui-common/navigation/navigation-provider.directive';


@Component({
  selector: 'app-flight-booking',
  imports: [
    RouterOutlet,
    NavigationComponent,
    NavigationProviderDirective
  ],
  template: `
    <app-navigation class="nav-standalone" />
    <app-navigation [navConfig]="navState" class="nav-standalone" />

    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  providers: [
    provideNavigationService([
      {
        route: 'flight/search',
        label: 'Flight Search',
        icon: 'flight'
      },
    ])
  ]
})
export class FlightBookingComponent {
  private http = inject(HttpClient);
  protected navState = [{
    route: 'flight/departures',
    label: 'Departures',
    icon: 'departures'
  }];

  constructor() {
    this.http.get<Flight>('https://demo.angulararchitects.io/api/flight?id=3')
      .subscribe(console.log);
  }
}
