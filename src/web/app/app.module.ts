import env from '@environtment';
import {ServiceWorkerModule} from '@angular/service-worker';
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {BaseModule} from '@modules/base.module'
import {NgModule} from '@angular/core'
import {ComponentsModule} from '@modules/components.module'
import {AppRoutingModule} from '@modules/app-routing.module'
import {AuthenticationService} from '@services/authentication.service'
import {AuthenticationInterceptor} from '@services/authentication.interceptor';

// components
import {AppRootComponent} from '@components/app-root'
import { InstallService } from '@services/install.service';
import {CacheService} from '@services/cache.service'
@NgModule({
  imports: [
    // service-worker
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: env.sw}),
    BaseModule,
    AppRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    AppRootComponent,
  ],
  bootstrap: [
    AppRootComponent
  ],
  providers: [
    InstallService,
    CacheService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor, multi: true
    }
  ]
})
export class AppModule { }
