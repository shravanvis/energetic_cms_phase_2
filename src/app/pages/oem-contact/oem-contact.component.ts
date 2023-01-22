import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateOemContactsComponent } from '../../modals/add-update-oem-contacts/add-update-oem-contacts.component';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-oem-contact',
  templateUrl: './oem-contact.component.html',
  styleUrls: ['./oem-contact.component.css']
})
export class OemContactComponent implements OnInit {

  id;
    oemContactList = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private utilService: UtilService,
        private apiService: ApiService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        // this.id = this.utilService.getUserID();
        this.list();
    }

    list_oemContact = [];

    list() {
        this.list_oemContact = [];
        this.apiService.getAPI(this.apiService.BASE_URL + 'oem/contact').then((result) => {
            console.log(result);
            if (result.status) {

                for (let i = 0; i < result.result.length; i++) {
                    let country = result.result[i].country
                    let name = result.result[i].name
                    let position = result.result[i].position
                    let phone = result.result[i].phone
                    let email = result.result[i].email
                    let address = result.result[i].address
                    let id = result.result[i].id
                    this.list_oemContact.push({
                        name: name,
                        country: country,
                        position: position,
                        phone: phone,
                        address: address,
                        email: email,
                        id: id
                    });
                }
            }
        })
    }

    addOemContact() {
        const modalRef = this.modalService.open(AddUpdateOemContactsComponent, {
            backdrop: 'static',
            size: <any>'profiletutor',
            keyboard: false,
            centered: true
        });
        modalRef.closed.subscribe((result) => {
            console.log('dismissed:-' + JSON.stringify(result));
            this.list()
        })
        modalRef.componentInstance.id = this.id;
    }

    editOemContact(oemcontact) {
        const modalRef = this.modalService.open(AddUpdateOemContactsComponent, {
            backdrop: 'static',
            size: <any>'profiletutor',
            keyboard: false,
            centered: true
        });
        modalRef.closed.subscribe((result) => {
            console.log('dismissed:-' + JSON.stringify(result));
            this.list()
        })
        modalRef.componentInstance.id = this.id;
        modalRef.componentInstance.oemcontact = oemcontact;
    }

    deleteOemContact(id) {
        this.apiService.getAPI(this.apiService.BASE_URL + 'oem/deleteOemContact/' + id).then((result) => {
            if (result.status) {
                alert("Deleted");
                this.list()
            } else {
                alert("Not found");
            }

        }, (error) => {
            alert("something went wrong");
        })
    }


}
