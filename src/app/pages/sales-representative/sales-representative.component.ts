import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';
import * as states from '../../../assets/states.json';

@Component({
  selector: 'app-sales-representative',
  templateUrl: './sales-representative.component.html',
  styleUrls: ['./sales-representative.component.css']
})
export class SalesRepresentativeComponent implements OnInit {

  agency_name: string = '';
  territory_expressed: string = '';
  principle_name: string = '';
  website: string = '';
  address: string = '';
  email: string = '';
  phone: string = '';
  state: string = '';
  statecode: string = '';
  id;

  public allStates: any = states;

  statearray = [];

  Representatives: any = [];

  updatebtn: boolean = false;
  addbtn: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.statearray = this.allStates.default;
    this.getSalesRepresentatives();
  }

  addrep() {

    for (let i = 0; i < this.statearray.length; i++) {
      if (this.statearray[i].abbreviation == this.statecode) {
        this.state = this.statearray[i].name;
      }
    }
    let postdata = {
      name: this.agency_name,
      territory: this.territory_expressed,
      principle_name: this.principle_name,
      companyname: this.website,
      email: this.email,
      address: this.address,
      phone: this.phone,
      statecode: this.statecode,
      state: this.state
    }
    console.log(postdata);
    this.apiService.postAPI(this.apiService.BASE_URL + 'salesRep/addSalesRep/', postdata).then((result) => {
      alert(result.message);
      this.getSalesRepresentatives();
    })
  }

  getSalesRepresentatives() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'salesRep').then((result) => {
      this.Representatives = result.result;
    })
  }

  editret(item) {
    this.updatebtn = true;
    this.addbtn = false;
    for (let i = 0; i < this.statearray.length; i++) {
      if (this.statearray[i].abbreviation == this.statecode) {
        this.state = this.statearray[i].name;
      }
    }
    this.agency_name = item.name;
    this.territory_expressed = item.territory;
    this.website = item.companyname;
    this.address = item.address;
    this.principle_name = item.principle_name;
    this.email = item.email;
    this.phone = item.phone;
    this.statecode = item.statecode;
    this.state = item.state;
    this.id = item.id;
    // this.updaterep(item);
  }

  updaterep() {
    for (let i = 0; i < this.statearray.length; i++) {
      if (this.statearray[i].abbreviation == this.statecode) {
        this.state = this.statearray[i].name;
      }
    }
    let postdata = {
      id: this.id,
      name: this.agency_name,
      companyname: this.website,
      territory: this.territory_expressed,
      principle_name: this.principle_name,
      address: this.address,
      phone: this.phone,
      email: this.email,
      statecode: this.statecode,
      state: this.state
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'salesRep/updateSalesRep', postdata).then((result) => {
      alert(result.message)
      this.updatebtn = false;
      this.addbtn = true;
      this.agency_name = '';
      this.website = '';
      this.address = '';
      this.phone = '';
      this.statecode = '';
      this.state = '';
      this.id = '';
      this.getSalesRepresentatives();
    })
  }

  deleteret(id) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'salesRep/deleteSalesRep/' + id).then((result) => {
        alert(result.message)
        this.getSalesRepresentatives();
      })
    }
  }
}
