import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-prod-specification',
  templateUrl: './add-prod-specification.component.html',
  styleUrls: ['./add-prod-specification.component.css']
})
export class AddProdSpecificationComponent implements OnInit {
  @Input() prodid = null;
  @Input() editprod = null;

  name: string = "";
  value: string = "";
  id: string = "";

  specfication: any = [];

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
    this.getspecbyId();
  }


  getspecbyId() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productSpecification/getProductSpecificationByProductId/' + this.prodid).then((result) => {
      // alert(JSON.stringify(result));
      this.specfication = result.result;
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

  addspec() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('product_id', this.prodid);
      formData.append('name', this.name);
      formData.append('value', this.value);

      this.apiService.postAPI(this.apiService.BASE_URL + 'productSpecification/addProductSpecification', formData).then((result) => {
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
      formData.append('name', this.name);
      formData.append('value', this.value);
      formData.append('product_id', this.prodid);

      this.apiService.postAPI(this.apiService.BASE_URL + 'productSpecification/updateProductSpecification', formData).then((result) => {
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
