import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-customersupport',
  templateUrl: './customersupport.component.html',
  styleUrls: ['./customersupport.component.css']
})
export class CustomersupportComponent implements OnInit {

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
    this.apiService.getAPI(this.apiService.BASE_URL + 'customerSupport').then((result) => {
      // this.data = result.result;

      for (let i = 0; i < result.result.length; i++) {
        this.data.push({
          name: result.result[i].name,
          email: result.result[i].email,
          message: result.result[i].message,
          location: result.result[i].location,
          // interest: (result.result[i].interest).split(',').map(i => i.split(':')),
          c_name: (result.result[i].interest).replace('\\',''),
          // c_name: JSON.parse((result.result[i].interest)),

          contact_type: result.result[i].contact_type,
        })
      }

      console.log(this.data)
    })
  }
}
