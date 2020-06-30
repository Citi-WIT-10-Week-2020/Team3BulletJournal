import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import { CoffeeChatComponent } from './coffee-chat/coffee-chat.component';
import { JournalComponent } from './journal/journal.component';
import { MoodTrackerComponent } from './mood-tracker/mood-tracker.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'coffee-chat', component: CoffeeChatComponent },
    { path: 'journal', component: JournalComponent},
    { path: 'mood-tracker', component: MoodTrackerComponent},
    { path: 'user-profile', component: UserProfileComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);