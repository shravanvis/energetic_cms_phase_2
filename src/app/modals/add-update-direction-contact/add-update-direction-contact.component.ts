import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-direction-contact',
  templateUrl: './add-update-direction-contact.component.html',
  styleUrls: ['./add-update-direction-contact.component.css']
})
export class AddUpdateDirectionContactComponent implements OnInit {

  @Input() data = null;

  id;
  title: string = "";
  location: string = "";
  fax: string = "";
  direction: string = "";
  iframe: string = "";

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.id = this.data.id;
      this.title = this.data.title;
      this.location = this.data.location;
      this.fax = this.data.fax;
      this.direction = this.data.direction;
      this.iframe = this.data.iframe;
    }
  }

  savecata() {
    if (this.data != null) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('id', this.data.id);
      formData.append('location', this.location);
      formData.append('fax', this.fax);
      formData.append('direction', this.direction);
      formData.append('iframe', this.iframe);
      formData.append('type', 'directions');
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
      // this.addcata();
    }
  }

  close() {
    this.activeModal.close();
  }
}
