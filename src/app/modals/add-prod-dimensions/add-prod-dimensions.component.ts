import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-prod-dimensions',
  templateUrl: './add-prod-dimensions.component.html',
  styleUrls: ['./add-prod-dimensions.component.css']
})
export class AddProdDimensionsComponent implements OnInit {
  @Input() prodid = null;
  @Input() editprod = null;

  name: string = "";
  value: string = "";
  id: string = "";


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
      this.name = this.editprod.name;
      this.value = this.editprod.value;
      this.id = this.editprod.id;
    }
    this.getdimbyId();
  }


  getdimbyId() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productDimension/getProductDimensionByProductId/' + this.prodid).then((result) => {
    })
  }

  validation() {
    if (this.name == '') {
      this.toast.error('Please enter title');
      return false;
    }
    if (this.value == '') {
      this.toast.error('Please enter value');
      return false;
    }
    return true;
  }

  adddim() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('product_id', this.prodid);
      formData.append('name', this.name);
      formData.append('value', this.value);

      this.apiService.postAPI(this.apiService.BASE_URL + 'productDimension/addProductDimension/', formData).then((result) => {
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

  editdimensions(item) {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('id', this.id);
      formData.append('name', this.name);
      formData.append('value', this.value);
      formData.append('product_id', this.prodid);

      this.apiService.postAPI(this.apiService.BASE_URL + 'productDimension/updateProductDimension', formData).then((result) => {
        if (result.status) {
          this.getdimbyId();
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
      this.editdimensions(this.editprod);
    }
    else {
      this.adddim();
    }
  }

  close() {
    this.activeModal.close();
  }
}
