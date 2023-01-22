import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-light-design-layout',
  templateUrl: './light-design-layout.component.html',
  styleUrls: ['./light-design-layout.component.css']
})
export class LightDesignLayoutComponent implements OnInit {

  data: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'lightDesign').then((result) => {
      this.data = result.result;
    })
  }
}
