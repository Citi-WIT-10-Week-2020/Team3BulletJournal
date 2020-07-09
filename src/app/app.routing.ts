import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import { CoffeeChatComponent } from './coffee-chat/coffee-chat.component';
import { JournalComponent } from './journal/journal.component';
import { MoodTrackerComponent } from './mood-tracker/mood-tracker.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoffeeChatPendingMeetingsComponent } from './coffee-chat-pending-meetings/coffee-chat-pending-meetings.component';
import { CoffeeChatRandomFriendsComponent } from './coffee-chat-random-friends/coffee-chat-random-friends.component';
import { CoffeeChatSelectFriendsComponent } from './coffee-chat-select-friends/coffee-chat-select-friends.component';
import { CoffeeChatUpcomingMeetingsComponent } from './coffee-chat-upcoming-meetings/coffee-chat-upcoming-meetings.component';
import { JournalDraftsComponent } from './journal-drafts/journal-drafts.component';
import { JournalFreeWriteComponent } from './journal-free-write/journal-free-write.component';
import { JournalPromptComponent } from './journal-prompt/journal-prompt.component';
import { JournalPublishedComponent } from './journal-published/journal-published.component';
import { MoodTrackerMonthlyChartsComponent } from './mood-tracker-monthly-charts/mood-tracker-monthly-charts.component';
import { MoodTrackerWeeklyChartsComponent } from './mood-tracker-weekly-charts/mood-tracker-weekly-charts.component';
import { UserProfileProfileComponent } from './user-profile-profile/user-profile-profile.component';
import { UserProfileContactsComponent } from './user-profile-contacts/user-profile-contacts.component';
import { UserProfileDashboardComponent } from './user-profile-dashboard/user-profile-dashboard.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'coffee-chat', component: CoffeeChatComponent },
    { path: 'journal', component: JournalComponent},
    { path: 'mood-tracker', component: MoodTrackerComponent},
    { path: 'user-profile', component: UserProfileComponent},


    /*----------------------------------sub-routes---------------------------------------------------------*/

    /*Coffee-chat*/

    { path: 'coffee-chat-pending-meetings', component: CoffeeChatPendingMeetingsComponent },
    { path: 'coffee-chat-random-friends', component: CoffeeChatRandomFriendsComponent },
    { path: 'coffee-chat-select-friends', component: CoffeeChatSelectFriendsComponent },
    { path: 'coffee-chat-upcoming-meetings', component: CoffeeChatUpcomingMeetingsComponent },

    /*Journal*/

    { path: 'journal-drafts', component: JournalDraftsComponent},
    { path: 'journal-free-write', component: JournalFreeWriteComponent},
    { path: 'journal-prompt', component: JournalPromptComponent},
    { path: 'journal-published', component: JournalPublishedComponent},

    /*Mood-tracker*/

    { path: 'mood-tracker-monthly-charts', component: MoodTrackerMonthlyChartsComponent},
    { path: 'mood-tracker-weekly-charts', component: MoodTrackerWeeklyChartsComponent},

    /*User-Profile*/
    { path: 'user-profile-profile', component: UserProfileProfileComponent},
    { path: 'user-profile-contacts', component: UserProfileContactsComponent},
    { path: 'user-profile-dashboard', component: UserProfileDashboardComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const appRoutingModule = RouterModule.forRoot(routes); 