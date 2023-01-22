import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {

  products: boolean;
  about_us: boolean;
  applications: boolean;
  wheretobuy: boolean;
  showResources: boolean;
  customer_support: boolean;
  virtual_showroom: boolean;
  login: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getvalues();
  }


  getvalues() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'menu').then((res) => {
      res.result[0].is_active == 1 ? this.products = true : this.products = false;
      res.result[1].is_active == 1 ? this.about_us = true : this.about_us = false;
      res.result[2].is_active == 1 ? this.applications = true : this.applications = false;
      res.result[3].is_active == 1 ? this.wheretobuy = true : this.wheretobuy = false;
      res.result[4].is_active == 1 ? this.showResources = true : this.showResources = false;
      res.result[6].is_active == 1 ? this.customer_support = true : this.customer_support = false;
      res.result[5].is_active == 1 ? this.virtual_showroom = true : this.virtual_showroom = false;
      res.result[7].is_active == 1 ? this.login = true : this.login = false;
    })
  }

  updateproduct() {
    let formData = new FormData();
    formData.append('id', '1');
    if (this.products == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'menu/updateMenu', formData).then((res) => {
      console.log(res);
    })
  }

  updateabout_us() {
    let formData = new FormData();
    formData.append('id', '2');
    if (this.about_us == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'menu/updateMenu', formData).then((res) => {
      console.log(res);
    })
  }

  updateapplications() {
    let formData = new FormData();
    formData.append('id', '3');
    if (this.applications == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }

    this.apiService.postAPI(this.apiService.BASE_URL + 'menu/updateMenu', formData).then((res) => {
      console.log(res);
    })
  }

  updatewheretobuy() {
    let formData = new FormData();
    formData.append('id', '4');
    if (this.wheretobuy == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'menu/updateMenu', formData).then((res) => {
      console.log(res);
    })
  }

  updateResources() {
    let formData = new FormData();
    formData.append('id', '8');
    if (this.showResources == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'menu/updateMenu', formData).then((res) => {
      console.log(res);
    })
  }

  updatecustomer_support() {
    let formData = new FormData();
    formData.append('id', '11');
    if (this.customer_support == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'menu/updateMenu', formData).then((res) => {
      console.log(res);
    })
  }

  updatevirtual_showroom() {
    let formData = new FormData();
    formData.append('id', '9');
    if (this.virtual_showroom == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'menu/updateMenu', formData).then((res) => {
      console.log(res);
    })
  }

  updatelogin() {
    let formData = new FormData();
    formData.append('id', '12');
    if (this.login == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'menu/updateMenu', formData).then((res) => {
      console.log(res);
    })
  }


  // {
  //   "products": this.products,
  //   "id": 1
  // },
  // {
  //   "about_us": this.about_us,
  //   "id": 2
  // },
  // {
  //   "applications": this.applications,
  //   "id": 3
  // },
  // {
  //   "wheretobuy": this.wheretobuy,
  //   "id": 4
  // },
  // {
  //   "customer_support": this.customer_support,
  //   "id": 5
  // },
  // {
  //   "virtual_showroom": this.virtual_showroom,
  //   "id": 6
  // },
  // {
  //   "login": this.login,
  //   "id": 7
  // }


}
