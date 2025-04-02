import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Flight } from "../../model/flight";
import { computed, inject } from "@angular/core";
import { FlightFilter } from "../../model/flight-filter";
import { FlightService } from "../../data-access/flight.service";
import { pipe, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";


const entityStateFlights = {
    id: [5, 3, 7] as number[],
    entities: {
        3: {
            id: 3,
            from: 'Hamburg',
            to: 'Graz',
            date: '',
            delayed: false
        } as Record<number, Flight>
    }
};

export const BookingStore = signalStore(
    { providedIn: 'root' },
    withState({
        filter: {
            from: 'Hamburg',
            to: 'Graz',
            urgent: false
        },
        basket: {
            3: true,
            5: true
        } as Record<number, boolean>,
        flights: [] as Flight[]
    }),
    withComputed(store => ({
        delayedFlight: computed(
            () => store.flights().filter(flight => flight.delayed)
        )
    })),
    // Updaters
    withMethods(store => ({
        setFlights: (flights: Flight[]) => patchState(store, { flights }),
        setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    })),
    // Side-Effects
    withMethods((
        store,
        flightService = inject(FlightService)
    ) => ({
        loadFlights: rxMethod<FlightFilter>(pipe(
            switchMap(filter => flightService.find(
                filter.from,
                filter.to,
                filter.urgent
            )),
            tapResponse(
                flights => store.setFlights(flights),
                err => console.log(err)
            )
        ))
    })),
    withHooks(store => ({
        onInit: () => store.loadFlights(store.filter)
    }))
);
