import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';

// Importing Firebase & AngularFire2
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Firebase config
import { environment } from '../environments/environment';

// Routes
import { appRoutes } from './routes';

// Material2
import { MaterialdesignModule } from './materialdesign';
import { FlexLayoutModule } from '@angular/flex-layout';

// Services
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { UserService } from './services/user.service';
import { AddfriendComponent } from './components/addfriend/addfriend.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { MyfriendsComponent } from './components/myfriends/myfriends.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SmartDatePipe } from './pipes/smart-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    DashboardComponent,
    NavBarComponent,
    SidebarComponent,
    ProfileComponent,
    AddfriendComponent,
    RequestsComponent,
    ChatFeedComponent,
    MyfriendsComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    SmartDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialdesignModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.config),
    AngularFireModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    AuthguardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
