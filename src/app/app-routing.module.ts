import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MasterComponent } from './components/master/master.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { IndexComponent } from './components/index/index.component';

const appRoutes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: 'admin/admin.module#AdminModule'
  //   // canLoad: [AuthGuard]
  // },
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexComponent
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
