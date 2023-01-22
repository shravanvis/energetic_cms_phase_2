import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateContactUsComponent } from 'app/modals/add-update-contact-us/add-update-contact-us.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
 closeResult = '';
  ContactUs: any = [];

  title: string = "";
  description: string = "";
  more: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getContactUs();
  }

  addcontact() {
    const modalRef = this.modalService.open(AddUpdateContactUsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getContactUs()
    })
  }

  editContactUs(contact) {
    const modalRef = this.modalService.open(AddUpdateContactUsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getContactUs()
    })
    modalRef.componentInstance.contact = contact;
  }


  getContactUs() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'contactUs').then((result) => {
      this.ContactUs = result.result;
    })
  }

  deleteContactUs(id: number) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'contactUs/deleteContactUs/' + id).then((result) => {
      if (result.status) {
        alert("Deleted");
        this.getContactUs()
      } else {
        alert("Not found");
      }

    }, (error) => {
      alert("something went wrong");
    })
  }

}
