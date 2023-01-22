import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AddSpecialProductComponent } from '../add-special-product/add-special-product.component';

@Component({
  selector: 'app-special-products',
  templateUrl: './special-products.component.html',
  styleUrls: ['./special-products.component.css']
})
export class SpecialProductsComponent implements OnInit {

 
  @Input() prodid = null;


  specialProductId: string = "";
  id: string = "";

  Data:any=[];

  addbtn: boolean = false;
  editbtn: boolean = false;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.prodid != null) {
    }
    this.getSpecialPro();
   
  }


  getSpecialPro() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'specialProduct/getSpecialProductByProductId/' + this.prodid).then((result) => {
      // alert(JSON.stringify(result));
      this.Data = result.result;
    })
  }
 
  add() {
    const modalRef = this.modalService.open(AddSpecialProductComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getSpecialPro();
    })
    modalRef.componentInstance.prodid = this.prodid;
  }

  edit(item) {
    const modalRef = this.modalService.open(AddSpecialProductComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getSpecialPro();
    })
    modalRef.componentInstance.editprod = item;
    modalRef.componentInstance.prodid = this.prodid;
  }

  delete(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'specialProduct/deleteProductSpecialProduct/' + id).then((result) => {
      if (result.status) {
        this.getSpecialPro();
      } else {
        alert("something went wrong");
      }
    }, (error) => {
      console.log('error:-' + JSON.stringify(error));
    })
  }

  close() {
    this.activeModal.close();
  }

}
