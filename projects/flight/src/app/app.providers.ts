import { InjectionToken } from "@angular/core";

export const AUTH_STATE = new InjectionToken<boolean>('AUTH_STATE', {
    providedIn: 'root',
    factory: () => false
});
