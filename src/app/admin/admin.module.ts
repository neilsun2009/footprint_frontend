import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HttpService } from '../../api/http.service';
import { AuthService } from '../../api/auth.service';
import { AdviceService } from '../../api/advice.service';
import { MatchService } from '../../api/match.service';
import { CommentService } from '../../api/comment.service';
import { UserService } from '../../api/user.service';
import { FieldService } from '../../api/field.service';
import { LogService } from '../../api/log.service';
import { TeamService } from '../../api/team.service';
import { ColorService } from '../../api/color.service';
import { WallpaperService } from '../../api/wallpaper.service';
import { SofaService } from '../../api/sofa.service';

import { AuthGuard } from './services/auth-guard.service';

import { AdminComponent } from './components/admin/admin.component';
import { IndexComponent } from './components/index/index.component';
import { LogComponent } from './components/log/log.component';
import { DeleteLogComponent } from './components/log/delete-log/delete-log.component';
import { UpdateLogComponent } from './components/log/update-log/update-log.component';
import { MatNativeDateModule } from '@angular/material';
import { AddLogComponent } from './components/log/add-log/add-log.component';
import { AdviceComponent } from './components/advice/advice.component';
import { DeleteAdviceComponent } from './components/advice/delete-advice/delete-advice.component';
import { WallpaperComponent } from './components/wallpaper/wallpaper.component';
import { DeleteWallpaperComponent } from './components/wallpaper/delete-wallpaper/delete-wallpaper.component';
import { UpdateWallpaperComponent } from './components/wallpaper/update-wallpaper/update-wallpaper.component';
import { AddWallpaperComponent } from './components/wallpaper/add-wallpaper/add-wallpaper.component';
import { UserComponent } from './components/user/user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';

@NgModule({
  declarations: [
    AdminComponent,
    IndexComponent,
    LogComponent,
    DeleteLogComponent,
    UpdateLogComponent,
    AddLogComponent,
    AdviceComponent,
    DeleteAdviceComponent,
    WallpaperComponent,
    DeleteWallpaperComponent,
    UpdateWallpaperComponent,
    AddWallpaperComponent,
    UserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  providers: [
    HttpService,
    AuthService,
    AdviceService,
    MatchService,
    CommentService,
    UserService,
    FieldService,
    LogService,
    TeamService,
    ColorService,
    WallpaperService,
    SofaService,
    AuthGuard,
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  entryComponents: [
    DeleteLogComponent,
    UpdateLogComponent,
    AddLogComponent,
    DeleteAdviceComponent,
    DeleteWallpaperComponent,
    UpdateWallpaperComponent,
    AddWallpaperComponent,
    DeleteUserComponent
  ]
})
export class AdminModule {}
