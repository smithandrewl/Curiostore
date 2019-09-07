import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityFacadeService} from '../shared/facades/security-facade.service';

@Component({
  selector:    'app-portal',
  templateUrl: './portal.component.html',
  styleUrls:   ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(private router: Router, private security: SecurityFacadeService) { }

  ngOnInit() { }

  logout() {

    this.security.clearAlertMessages();
    this.router.navigateByUrl('');
  }
}
