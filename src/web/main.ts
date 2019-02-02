import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {enableProdMode} from '@angular/core'
import {AppModule} from './app/app.module'
const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
if (process.env.NODE_ENV === 'production') enableProdMode();
bootstrap().catch(err=>console.log(err));
