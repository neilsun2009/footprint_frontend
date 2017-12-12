import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../api/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  openSidenav: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.openSidenav = false;
    this.loadScript('/assets/js/plupload.full.min.js');
    this.loadScript('/assets/js/moxie.min.js');
    this.loadScript('/assets/js/qiniu.min.js');
  }

  loadScript(url) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
  }

  ngOnInit() {
    // hide global loading
    setTimeout(() => {
      document.getElementById('global-loading').style.display = 'none';
    }, 500);
  }

  logout() {
    this.authService.logout(() => {
      this.authService.hasLoggedIn = false;
      this.authService.user = null;
      this.router.navigate(['/']);
    }, (err) => {
      alert(err.message);
      console.log(err);
    });
  }

  toggleSidenav() {
    this.openSidenav = !this.openSidenav;
  }

}
