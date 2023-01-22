import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-prod-levels',
  templateUrl: './add-prod-levels.component.html',
  styleUrls: ['./add-prod-levels.component.css']
})
export class AddProdLevelsComponent implements OnInit {
  @Input() prodid = null;
  @Input() editprod = null;

  name: string = "";
  price: string = "";
  id: string = "";

  specfication: any = [];

  addbtn: boolean = false;
  editbtn: boolean = false;

  allLevels = [];

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.editprod != null) {
      this.name = this.editprod.level_id;
      this.price = this.editprod.price;
      this.id = this.editprod.id;
    }
    // this.getspecbyId();
    this.getAllLevels();
  }

  getAllLevels() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'user/getAllLevels').then((result) => {
      this.allLevels = result.result;
    })
  }
  validation() {
    if (this.name == '') {
      this.toast.error('Please enter title');
      return false;
    }
    if (this.price == '') {
      this.toast.error('Please enter price');
      return false;
    }
    return true;
  }

  addLevel() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('product_id', this.prodid);
      formData.append('level_id', this.name);
      formData.append('price', this.price);

      this.apiService.postAPI(this.apiService.BASE_URL + 'product/addProductLevel', formData).then((result) => {
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

  editLevel() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('id', this.id);
      formData.append('level_id', this.name);
      formData.append('price', this.price);
      formData.append('product_id', this.prodid);

      this.apiService.postAPI(this.apiService.BASE_URL + 'product/updateProductLevel', formData).then((result) => {
        if (result.status) {
          // this.getspecbyId();
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
      this.editLevel();
    }
    else {
      this.addLevel();
    }
  }

  close() {
    this.activeModal.close();
  }
}
