import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// used to create fake backend
// import { fakeBackendProvider } from './_helpers';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor} from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { CoffeeChatComponent } from './coffee-chat/coffee-chat.component';
import { NavButtonsHomeComponent } from './nav-buttons-home/nav-buttons-home.component';
// import { CommonService } from './common.service';
import { UserService } from './_services';
import { JournalComponent } from './journal/journal.component';
import { MoodTrackerComponent } from './mood-tracker/mood-tracker.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SidebarModule } from 'ng-sidebar';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CoffeeChatUpcomingMeetingsComponent } from './coffee-chat-upcoming-meetings/coffee-chat-upcoming-meetings.component';
import { CoffeeChatPendingMeetingsComponent } from './coffee-chat-pending-meetings/coffee-chat-pending-meetings.component';
import { CoffeeChatSelectFriendsComponent } from './coffee-chat-select-friends/coffee-chat-select-friends.component';
import { CoffeeChatRandomFriendsComponent } from './coffee-chat-random-friends/coffee-chat-random-friends.component';
import { JournalPublishedComponent } from './journal-published/journal-published.component';
import { JournalFreeWriteComponent } from './journal-free-write/journal-free-write.component';
import { JournalPromptComponent } from './journal-prompt/journal-prompt.component';
import { MoodTrackerWeeklyChartsComponent } from './mood-tracker-weekly-charts/mood-tracker-weekly-charts.component';
import { MoodTrackerMonthlyChartsComponent } from './mood-tracker-monthly-charts/mood-tracker-monthly-charts.component';
import { UserProfileDashboardComponent } from './user-profile-dashboard/user-profile-dashboard.component';
import { UserProfileContactsComponent } from './user-profile-contacts/user-profile-contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { CoffeeChatProfilesComponent } from './coffee-chat-profiles/coffee-chat-profiles.component';
import { CoffeeChatNavbarComponent } from './coffee-chat-navbar/coffee-chat-navbar.component';
import { JournalNavbarComponent } from './journal-navbar/journal-navbar.component';
import { MoodTrackerNavbarComponent } from './mood-tracker-navbar/mood-tracker-navbar.component';
import { UserProfileNavbarComponent } from './user-profile-navbar/user-profile-navbar.component';
import { MoodChosenComponent } from './mood-chosen/mood-chosen.component';
//import { PieChartComponent } from './pie-chart/pie-chart.component';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        SidebarModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgSelectModule
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
        UserProfileComponent,
        NavbarComponent,
        FooterComponent,
        CoffeeChatUpcomingMeetingsComponent,
        CoffeeChatPendingMeetingsComponent,
        CoffeeChatSelectFriendsComponent,
        CoffeeChatRandomFriendsComponent,
        JournalPublishedComponent,
        JournalFreeWriteComponent,
        JournalPromptComponent,
        MoodTrackerWeeklyChartsComponent,
        MoodTrackerMonthlyChartsComponent,
        UserProfileDashboardComponent,
        UserProfileContactsComponent,
        ProfileComponent,
        CoffeeChatProfilesComponent,
        ProfileComponent,
        CoffeeChatNavbarComponent,
        JournalNavbarComponent,
        MoodTrackerNavbarComponent,
        UserProfileNavbarComponent,
        MoodChosenComponent,
        //PieChartComponent

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        //CommonService
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };


