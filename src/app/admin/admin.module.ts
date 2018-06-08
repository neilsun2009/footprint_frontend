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
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';

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
import { QiniuService } from '../../api/qiniu.service';
import { BgService } from '../../api/bg.service';

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
import { TeamComponent } from './components/team/team.component';
import { DeleteTeamComponent } from './components/team/delete-team/delete-team.component';
import { UpdateTeamComponent } from './components/team/update-team/update-team.component';
import { AddTeamComponent } from './components/team/add-team/add-team.component';
import { ColorComponent } from './components/color/color.component';
import { DeleteColorComponent } from './components/color/delete-color/delete-color.component';
import { AddColorComponent } from './components/color/add-color/add-color.component';
import { UpdateColorComponent } from './components/color/update-color/update-color.component';
import { MatchComponent } from './components/match/match.component';
import { DeleteMatchComponent } from './components/match/delete-match/delete-match.component';
import { AddMatchComponent } from './components/match/add-match/add-match.component';
import { UpdateMatchComponent } from './components/match/update-match/update-match.component';
import { DetailComponent } from './components/detail/detail.component';
import { DeleteCommentComponent } from './components/detail/delete-comment/delete-comment.component';
import { DeleteFieldComponent } from './components/detail/delete-field/delete-field.component';
import { BgComponent } from './components/bg/bg.component';
import { DeleteBgComponent } from './components/bg/delete-bg/delete-bg.component';
import { UpdateBgComponent } from './components/bg/update-bg/update-bg.component';
import { AddBgComponent } from './components/bg/add-bg/add-bg.component';

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
    DeleteUserComponent,
    TeamComponent,
    DeleteTeamComponent,
    UpdateTeamComponent,
    AddTeamComponent,
    ColorComponent,
    DeleteColorComponent,
    AddColorComponent,
    UpdateColorComponent,
    MatchComponent,
    DeleteMatchComponent,
    AddMatchComponent,
    UpdateMatchComponent,
    DetailComponent,
    DeleteCommentComponent,
    DeleteFieldComponent,
    BgComponent,
    UpdateBgComponent,
    AddBgComponent,
    DeleteBgComponent
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
    MatSlideToggleModule,
    MatSelectModule,
    MatSortModule,
    MatTabsModule
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
    QiniuService,
    BgService
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
    DeleteUserComponent,
    DeleteTeamComponent,
    UpdateTeamComponent,
    AddTeamComponent,
    DeleteColorComponent,
    UpdateColorComponent,
    AddColorComponent,
    DeleteMatchComponent,
    UpdateMatchComponent,
    AddMatchComponent,
    DeleteCommentComponent,
    DeleteFieldComponent,
    UpdateBgComponent,
    AddBgComponent,
    DeleteBgComponent
  ]
})
export class AdminModule {}
