import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-special-product',
  templateUrl: './add-special-product.component.html',
  styleUrls: ['./add-special-product.component.css']
})
export class AddSpecialProductComponent implements OnInit {

  @Input() prodid = null;
  @Input() editprod = null;

  special_product_id: string = "";

  id: string = "";

  specialProduct: any = [];
  specialProducts: any = [];

  addbtn: boolean = false;
  editbtn: boolean = false;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.editprod != null) {
      this.special_product_id = this.editprod.product_special_product_id;
      
      this.id = this.editprod.product_special_product_id;
    }
    this.getspecbyId();
    this.getspec();

  }


  validation() {
    
    return true;
  }
  getspecbyId() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'specialProduct/getSpecialProductByProductId/' + this.prodid).then((result) => {
      // alert(JSON.stringify(result));
      this.specialProduct = result.result;
    })
  }
  getspec() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'specialProduct').then((result) => {
      // alert(JSON.stringify(result));
      this.specialProducts = result.result;
    })
  }

  addspec() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('product_id', this.prodid);
      formData.append('special_pro_id', this.special_product_id);

      this.apiService.postAPI(this.apiService.BASE_URL + 'specialProduct/addProductSpecialProduct', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("something went wrong");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
  }

  editspecification() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('id', this.id);
      formData.append('special_pro_id', this.special_product_id);
      formData.append('product_id', this.prodid);

      this.apiService.postAPI(this.apiService.BASE_URL + 'specialProduct/updateProductSpecialProduct', formData).then((result) => {
        if (result.status) {
          this.getspecbyId();
          this.activeModal.close();
        } else {
          alert("something went wrong");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
  }

  save() {
    if (this.editprod != null) {
      this.editspecification();
    }
    else {
      this.addspec();
    }
  }

  close() {
    this.activeModal.close();
  }

}
