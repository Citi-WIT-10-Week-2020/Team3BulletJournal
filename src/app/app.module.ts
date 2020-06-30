import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';

import { CoffeeChatComponent } from './coffee-chat/coffee-chat.component';
import { NavButtonsHomeComponent } from './nav-buttons-home/nav-buttons-home.component';
import { JournalComponent } from './journal/journal.component';
import { MoodTrackerComponent } from './mood-tracker/mood-tracker.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { SidebarModule } from 'ng-sidebar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        SidebarModule,
        BsDropdownModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        CoffeeChatComponent,
        NavButtonsHomeComponent,
        JournalComponent,
        MoodTrackerComponent,
        UserProfileComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };