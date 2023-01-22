import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-prod-resources',
  templateUrl: './add-prod-resources.component.html',
  styleUrls: ['./add-prod-resources.component.css']
})
export class AddProdResourcesComponent implements OnInit {
  @Input() prodid = null;
  @Input() editprod = null;

  name: string = "";
  pdf: string = "";
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
      this.id = this.editprod.id;
    }
    this.getspecbyId();
  }


  getspecbyId() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productResources/getProductResourcesByProductId/' + this.prodid).then((result) => {
      this.specfication = result.result;
    })
  }

  validation() {
    if (this.name == '') {
      this.toast.error('Please enter title');
      return false;
    }
    return true;
  }

  onselect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pdf = file
    }
  }
  addspec() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('product_id', this.prodid);
      formData.append('name', this.name);
      formData.append('image', this.pdf);

      this.apiService.postAPI(this.apiService.BASE_URL + 'productResources/addProductResources', formData).then((result) => {
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

  editspecification(item) {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('id', this.id);
      formData.append('name', this.name);
      formData.append('image', this.pdf);
      formData.append('product_id', this.prodid);

      this.apiService.postAPI(this.apiService.BASE_URL + 'productResources/updateProductResources', formData).then((result) => {
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
      this.editspecification(this.editprod);
    }
    else {
      this.addspec();
    }
  }

  close() {
    this.activeModal.close();
  }
}
