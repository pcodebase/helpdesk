import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavigationComponent } from './navigation/navigation.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

// Service
import { TicketService } from './ticket.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TicketComponent,
    TicketFormComponent,
    TicketListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [TicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
