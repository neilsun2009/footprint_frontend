import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

import { AdminComponent } from './components/admin/admin.component';
import { IndexComponent } from './components/index/index.component';
import { LogComponent } from './components/log/log.component';
import { AdviceComponent } from './components/advice/advice.component';
import { WallpaperComponent } from './components/wallpaper/wallpaper.component';
import { UserComponent } from './components/user/user.component';
import { TeamComponent } from './components/team/team.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IndexComponent
      },
      {
        path: 'log',
        component: LogComponent
      },
      {
        path: 'advice',
        component: AdviceComponent
      },
      {
        path: 'wallpaper',
        component: WallpaperComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'team',
        component: TeamComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
