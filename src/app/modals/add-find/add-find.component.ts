import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-find',
  templateUrl: './add-find.component.html',
  styleUrls: ['./add-find.component.css']
})
export class AddFindComponent implements OnInit {
  @Input() find = null;

  id;
  name: string = "";
  address: string = "";
  city: string = "";
  phone: string = "";
  state: string = "";
  zip: string = "";
  url: string = "";

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.find != null) {
      this.id = this.find.id;
      this.name = this.find.name;
      this.address = this.find.address;
      this.city = this.find.city;
      this.phone = this.find.phone;
      this.state = this.find.state;
      this.zip = this.find.zip;
      this.url = this.find.url;
    }
  }

  save() {
    if (this.find != null) {
      if (this.validation() == true) {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('address', this.address);
        formData.append('city', this.city);
        formData.append('phone', this.phone);
        formData.append('state', this.state);
        formData.append('zip', this.zip);
        formData.append('url', this.url);
        formData.append('id', this.id);
        this.apiService.postAPI(this.apiService.BASE_URL + 'store/updateStore', formData).then((result) => {
          if (result.status) {
            this.activeModal.close();
          }
        }, (error) => {
          console.log('error:-' + JSON.stringify(error));
        })
      }
    } else {
      this.add();
    }
  }

  validation() {
    if (this.name == '') {
      this.toast.error('Please enter name');
      return false;
    }
    return true;
  }

  add() {
    if (this.validation()) {
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('address', this.address);
      formData.append('city', this.city);
      formData.append('phone', this.phone);
      formData.append('state', this.state);
      formData.append('zip', this.zip);
      formData.append('url', this.url);

      this.apiService.postAPI(this.apiService.BASE_URL + 'store/addStore', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
        else {
          this.toast.error(result.message)
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
  }

  close() {
    this.activeModal.close();
  }
}
