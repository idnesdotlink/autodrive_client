import env from '@environtment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { BaseModule } from '@modules/base.module'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { MinComponentsModule } from '@modules/min-components.module'
import { AppRoutingModule } from '@modules/app-routing.module'
import { MockRequestInterceptorService } from '@services/mock-request-interceptor.service';
import { ApiService } from '@services/api.service'

import { ApiTokenInterceptorService } from '@services/apiTokenInterceptor.service';
import { ApiErrorInterceptorService } from '@services/apiErrorInterceptor.service'

// components
import { AppRootComponent } from '@components/app-root'
import { CacheService } from '@services/cache.service'
import { AuthenticationCacheService } from '@services/authenticationCache.service'
import { ApiConfigCacheService } from '@services/apiConfigCache.service'
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
    AuthenticationCacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptorService, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService, multi: true
    },
    ApiService,
    CacheService,
    ApiConfigCacheService
  ]
})
export class AppModule { }
