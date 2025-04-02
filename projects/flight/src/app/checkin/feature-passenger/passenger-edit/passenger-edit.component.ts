import { NgIf } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util-validation';
import { initialPassenger } from '../../logic-passenger';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-passenger-edit',
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './passenger-edit.component.html',
})
export class PassengerEditComponent {
  private passengerService = inject(PassengerService);

  id = input(0, { transform: numberAttribute });
  passengerResource = this.passengerService.findByIdAsResource(this.id);

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [validatePassengerStatus(['A', 'B', 'C'])]],
  });

  constructor() {
    effect(() => {
      const passenger = this.passengerResource.value();

      if (passenger) {
        this.editForm.patchValue(passenger);
      }
    });
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
