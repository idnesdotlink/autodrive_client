import env from '@environtment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { BaseModule } from '@modules/base.module'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
// import { ComponentsModule } from '@modules/components.module'
import { MinComponentsModule } from '@modules/min-components.module'
import { AppRoutingModule } from '@modules/app-routing.module'
import { AuthenticationService } from '@services/authentication.service'
import { AuthenticationInterceptorService } from '@services/authentication-interceptor.service';
import { MockRequestInterceptorService } from '@services/mock-request-interceptor.service';

// components
import { AppRootComponent } from '@components/app-root'
import { InstallService } from '@services/install.service';
import { CacheService } from '@services/cache.service'
@NgModule({
  imports: [
    // service-worker
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: env.sw }),
    BrowserAnimationsModule,
    BrowserModule,
    BaseModule,
    AppRoutingModule,
    MinComponentsModule,
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
      useClass: MockRequestInterceptorService, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService, multi: true
    }
  ]
})
export class AppModule { }
