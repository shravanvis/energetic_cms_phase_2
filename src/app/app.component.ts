import {Component, OnInit} from '@angular/core';
import {ApiService} from "./service/api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {UtilService} from "./service/util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(
      private apiService: ApiService,
      private modalService: NgbModal,
      private router: Router,
      private utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    if (this.utilService.isUserLoggedIn()) {
      // this.router.navigateByUrl('/dashboard')
    } else {
      this.router.navigateByUrl('/login')
    }
  }
}
