import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { delay, tap } from 'rxjs';
import { FlightService } from './booking/api-boarding';

export const AUTH_STATE = new InjectionToken<boolean>('AUTH_STATE', {
  providedIn: 'root',
  factory: () => true,
});

export function provideInitialFlight(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer((flightService = inject(FlightService)) =>
      flightService.findById(3).pipe(delay(10_000), tap(console.log))
    ),
  ]);
}
