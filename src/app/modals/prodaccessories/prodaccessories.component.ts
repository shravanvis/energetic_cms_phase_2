import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AddAccessoriesComponent } from '../add-accessories/add-accessories.component';

@Component({
  selector: 'app-prodaccessories',
  templateUrl: './prodaccessories.component.html',
  styleUrls: ['./prodaccessories.component.css']
})
export class ProdaccessoriesComponent implements OnInit {
  @Input() prodid = null;

  allAccessories: any = [];

  search;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProductAccessoriesByProductId();
  }

  getProductAccessoriesByProductId() {
    this.allAccessories = [];
    this.apiService.getAPI(this.apiService.BASE_URL + 'product/getProductAccessoriesByProductId/' + this.prodid).then((result) => {
      if (result.status == true) {
        console.log(result.result[0].description)
        this.allAccessories = result.result
      }
    })
  }

  addac() {
    const modalRef = this.modalService.open(AddAccessoriesComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getProductAccessoriesByProductId();
    })
    modalRef.componentInstance.prodid = this.prodid;
  }

  deleteac(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'product/deleteProductAccessories/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getProductAccessoriesByProductId()
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }

  close() {
    this.activeModal.close();
  }

  editac(item) {
    const modalRef = this.modalService.open(AddAccessoriesComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getProductAccessoriesByProductId();
    })
    modalRef.componentInstance.prodid = this.prodid;
    modalRef.componentInstance.editprod = item;
  }
}
