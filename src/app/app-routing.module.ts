import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MasterComponent } from './components/master/master.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdviceComponent } from './components/advice/advice.component';

import { LoginAuthGuard } from './services/login-auth-guard.service';
import { GlobalAuthGuard } from './services/global-auth-guard.service';

const appRoutes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: 'admin/admin.module#AdminModule'
  //   // canLoad: [AuthGuard]
  // },
  {
    path: '',
    component: MasterComponent,
    canActivateChild: [GlobalAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexComponent
      },
      {
        path: 'login',
        canActivate: [LoginAuthGuard],
        component: LoginComponent
      },
      {
        path: 'signup',
        canActivate: [LoginAuthGuard],
        component: SignupComponent
      },
      {
        path: 'advice',
        component: AdviceComponent
      },
      {
        path: '**',
        component: FourOFourComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        // enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
