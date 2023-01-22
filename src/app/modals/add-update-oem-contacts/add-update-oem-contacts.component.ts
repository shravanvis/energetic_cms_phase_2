import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "app/service/api.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-update-oem-contacts',
  templateUrl: './add-update-oem-contacts.component.html',
  styleUrls: ['./add-update-oem-contacts.component.css']
})
export class AddUpdateOemContactsComponent implements OnInit {

  name: string = '';
  enable = false;
  @Input() oemcontact = null;
  id;

  country: string = '';
  phone: string = '';

  position: string='';
  email: string='';
  address: string='';

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  close() {
    this.activeModal.close();
  }

  ngOnInit(): void {
    if (this.oemcontact != null) {
      this.id = this.oemcontact.id;
      this.country = this.oemcontact.country;
      this.name = this.oemcontact.name;
      this.phone = this.oemcontact.phone;
      this.email = this.oemcontact.email;
      this.address = this.oemcontact.address;
      this.position = this.oemcontact.position;

      console.log(this.country);
    }

  }
 

  saveOemContact() {
    if (this.oemcontact != null) {
      let formData = new FormData();
      formData.append('country', this.country);
      formData.append('phone', this.phone);
      formData.append('name', this.name);
      formData.append('address', this.address);
      formData.append('email', this.email);
      formData.append('position', this.position);
      formData.append('id', this.id);
      this.apiService.postAPI(this.apiService.BASE_URL + 'oem/updateOemContact', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addOemContact();
    }
  }

  validation() {
    if (this.country == '') {
      this.toast.error('Please enter country');
      return false;
    }
    if (this.phone == '') {
      this.toast.error('Please enter phone');
      return false;
    }
    if (this.name == '') {
      this.toast.error('Please enter button name');
      return false;
    }
    return true;
  }

  addOemContact() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('country', this.country);
      formData.append('phone', this.phone);
      formData.append('name', this.name);
      formData.append('address', this.address);
      formData.append('email', this.email);
      formData.append('position', this.position);

      this.apiService.postAPI(this.apiService.BASE_URL + 'oem/addOemContact', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
  }

  /*printKeyValuePairs(url: string, postdata) {
    console.log('url:-' + url);
    console.log('--------------FORM DATA---------------');
    let data = '';
    postdata.forEach((value, key) => {
      // console.log(key + ':' + value)
      data += key + ':' + value + '\n';
    });
    console.log(data);
    console.log('--------------FORM DATA---------------');
  }*/


  deleteOemContact() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'oem/deleteOemContact/' + this.oemcontact.id).then((result) => {
      if (result.status) {
        alert("Deleted");
      } else {
        alert("Not found");
      }

    }, (error) => {
      alert("something went wrong");
    })
  }

}
