import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-warranties',
  templateUrl: './warranties.component.html',
  styleUrls: ['./warranties.component.css']
})
export class WarrantiesComponent implements OnInit {

  list_waranties: any = [];

  catname: string = '';
  description: string = '';
  years: string = '';

  AddBtnCat: boolean = true;
  updateBtnCat: boolean = false;

  CatNameid;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getwarranties();
  }

  getwarranties() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'warrantiesDetail/GetWarrantiesDetailByCategory').then((res) => {
      this.list_waranties = res.result;
    })
  }

  saveCat(data, item) {
    if (item != null) {
      this.AddBtnCat = false;
      this.updateBtnCat = true;
      this.CatNameid = item.category.id;
      this.catname = item.category.name;
    }
    else {
      this.AddBtnCat = true;
      this.updateBtnCat = false;
    }
    this.modalService.open(data, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }

  AddCat() {
    this.apiService.postAPI(this.apiService.BASE_URL + 'warranties/addWarranties', {
      "name": this.catname
    }).then((res) => {
      this.toast.success(res.message);
      this.catname = '';
      this.getwarranties();
      this.modalService.dismissAll();
    })
  }

  EditCat() {
    let postdata = {
      "id": this.CatNameid,
      "name": this.catname,
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'warranties/updateWarranties', postdata).then((res) => {
      this.toast.success(res.message);
      this.modalService.dismissAll();
      this.getwarranties();
    })
  }

  deleteCat(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'warranties/deleteWarranties/' + id).then((res) => {
      this.toast.success(res.message);
      this.getwarranties();
    })
  }


  savedesc(data, item) {
    if (item != null) {
      this.AddBtnCat = false;
      this.updateBtnCat = true;
      this.CatNameid = item.category.id;
      this.catname = item.category.name;
    }
    else {
      this.AddBtnCat = true;
      this.updateBtnCat = false;
    }
    this.modalService.open(data, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }


  AddDes() {
    this.apiService.postAPI(this.apiService.BASE_URL + 'warrantiesDetail/addWarrantiesDetail', {
      "category_id": this.CatNameid,
      "description": this.description,
      "years": this.years
    }).then((res) => {
      this.toast.success(res.message);
      this.catname = '';
      this.description = '';
      this.years = '';
      this.getwarranties();
      this.modalService.dismissAll();
    })
  }

  deletedesc(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'warrantiesDetail/deleteWarrantiesDetail/' + id).then((res) => {
      this.toast.success(res.message);
      this.getwarranties();
    })
  }
}
