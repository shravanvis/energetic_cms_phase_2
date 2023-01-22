import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateOemLocationsComponent } from '../../modals/add-update-oem-locations/add-update-oem-locations.component';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-oem-locations',
  templateUrl: './oem-locations.component.html',
  styleUrls: ['./oem-locations.component.css']
})
export class OemLocationsComponent implements OnInit {

 id;
    oemLocationsList = [];

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

    list_oemLocations = [];

    list() {
        this.list_oemLocations = [];
        this.apiService.getAPI(this.apiService.BASE_URL + 'oem/location').then((result) => {
            console.log(result);
            if (result.status) {

                for (let i = 0; i < result.result.length; i++) {
                    let imgs = this.apiService.BASE_IMAGE_URL + result.result[i].image;
                    let headquater = result.result[i].headquater
                    let location = result.result[i].location
                    let fax = result.result[i].fax
                    let phone = result.result[i].phone
                    let id = result.result[i].id
                    this.list_oemLocations.push({
                        image: imgs,
                        headquater: headquater,
                        location: location,
                        phone: phone,
                        fax: fax,
                        id: id
                    });
                }
            }
        })
    }

    addOemLocations() {
        const modalRef = this.modalService.open(AddUpdateOemLocationsComponent, {
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

    editOemLocations(oemlocations) {
        const modalRef = this.modalService.open(AddUpdateOemLocationsComponent, {
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
        modalRef.componentInstance.OemLocations = oemlocations;
    }

    deleteOemLocations(id) {
        this.apiService.getAPI(this.apiService.BASE_URL + 'oem/deleteOemLocation/' + id).then((result) => {
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
