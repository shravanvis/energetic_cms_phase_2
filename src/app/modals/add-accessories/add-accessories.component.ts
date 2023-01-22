import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-accessories',
  templateUrl: './add-accessories.component.html',
  styleUrls: ['./add-accessories.component.css']
})
export class AddAccessoriesComponent implements OnInit {
  @Input() prodid = null;
  @Input() editprod = null;

  name: string = "";
  price: string = "";
  description: string = "";
  id: string = "";
  image;
  showImageUrl;

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
      this.price = this.editprod.price;
      this.description = this.editprod.description;
      this.showImageUrl = this.apiService.BASE_IMAGE_URL + this.editprod.image;
    }
  }


  validation() {
    if (this.name == '') {
      this.toast.error('Please enter title');
      return false;
    }
    if (this.price == '') {
      this.toast.error('Please enter value');
      return false;
    }
    return true;
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showImageUrl = reader.result;
      };
    }
  }

  addac() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('product_id', this.prodid);
      formData.append('name', this.name);
      formData.append('image', this.image);
      formData.append('price', this.price);
      formData.append('description', this.description);

      this.apiService.postAPI(this.apiService.BASE_URL + 'product/addProductAccessories', formData).then((result) => {
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

  editacc() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('id', this.id);
      formData.append('name', this.name);
      formData.append('price', this.price);
      formData.append('description', this.description);
      formData.append('product_id', this.prodid);
      formData.append('image', this.image);

      this.apiService.postAPI(this.apiService.BASE_URL + 'product/updateProductAccessories', formData).then((result) => {
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

  save() {
    if (this.editprod != null) {
      this.editacc();
    }
    else {
      this.addac();
    }
  }

  close() {
    this.activeModal.close();
  }
}
