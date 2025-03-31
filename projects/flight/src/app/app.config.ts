import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { routerFeature } from "./shared/logic-router-state";
import { UiCoreModule } from "./shared/ui-core/ui-core.module";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";


export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
          StoreModule.forRoot(),
          EffectsModule.forRoot(),
          StoreModule.forFeature(routerFeature),
          UiCoreModule,
        ),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(appRoutes)
    ]
};
