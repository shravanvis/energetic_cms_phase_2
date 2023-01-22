import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-contact-us',
  templateUrl: './add-update-contact-us.component.html',
  styleUrls: ['./add-update-contact-us.component.css']
})
export class AddUpdateContactUsComponent implements OnInit {

  
  @Input() contact = null;

  id;
  title: string = "";
  location: string = "";
  tollfree: string = "";
  phone: string = "";
  fax: string = "";
  email: string = "";
  iframe: string = "";
  direction: string = "";
  type: string = "";
  

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.contact != null) {
      this.id = this.contact.id;
      this.title = this.contact.title;
      this.location = this.contact.location;
      this.tollfree = this.contact.tollfree;
      this.phone = this.contact.phone;
      this.fax = this.contact.fax;
      this.email = this.contact.email;
      this.iframe = this.contact.iframe;
      this.direction = this.contact.direction;
      this.type = this.contact.type;
      
    }
  }


  validation() {
   
    
    return true;
  }



  saveContact() {
    if (this.contact != null) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('location', this.location);
      formData.append('tollfree', this.tollfree);
      formData.append('phone', this.phone);
      formData.append('fax', this.fax);
      formData.append('email', this.email);
      formData.append('iframe', this.iframe);
      formData.append('direction', this.direction);
      formData.append('type', this.type);
      formData.append('id', this.contact.id);
      this.apiService.postAPI(this.apiService.BASE_URL + 'contactUs/updateContactUs', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addret();
    }
  }


  addret() {
    if (this.validation()) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('location', this.location);
      formData.append('tollfree', this.tollfree);
      formData.append('phone', this.phone);
      formData.append('fax', this.fax);
      formData.append('email', this.email);
      formData.append('iframe', this.iframe);
      formData.append('direction', this.direction);
      formData.append('type', this.type);
      this.apiService.postAPI(this.apiService.BASE_URL + 'contactUs/addContactUs', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
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
