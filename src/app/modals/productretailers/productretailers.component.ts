import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateOnlineRetailersComponent } from '../add-update-online-retailers/add-update-online-retailers.component';

@Component({
  selector: 'app-productretailers',
  templateUrl: './productretailers.component.html',
  styleUrls: ['./productretailers.component.css']
})
export class ProductretailersComponent implements OnInit {
  closeResult = '';
  Retailers: any = [];
  @Input() prodid = null;
  prodidRetailers: [] = [];
  retail_id;
  constructor(
    public apiService: ApiService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.getonlineRetailers();
    this.RetailersById();
  }

  addret() {
    let formData = new FormData();
    formData.append('product_id', this.prodid);
    formData.append('retail_id', this.retail_id);
    this.apiService.postAPI(this.apiService.BASE_URL + 'product/addProductRetailer', formData).then((result) => {
      if (result.status) {
        // this.activeModal.close();
        this.RetailersById();
      } else {
        alert("please fill all the fields");
      }
    }, (error) => {
      console.log('error:-' + JSON.stringify(error));
    })
  }

  editret(ret) {
    const modalRef = this.modalService.open(AddUpdateOnlineRetailersComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getonlineRetailers()
    })
    modalRef.componentInstance.ret = ret;
  }


  getonlineRetailers() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'onlineRetailers').then((result) => {
      this.Retailers = result.result;
    })
  }

  RetailersById() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'product/getProductRetailerByProductId/' + this.prodid).then((result) => {
      this.prodidRetailers = result.result;
    })
  }
  deleteonlineRetailers(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'product/deleteProductRetailer/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.RetailersById();
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
}
