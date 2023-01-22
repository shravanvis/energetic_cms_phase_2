import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateOemSection1Component } from '../../modals/add-update-oem-section1/add-update-oem-section1.component';
import { UtilService } from '../../service/util.service';

@Component({
    selector: 'app-oem-section1',
    templateUrl: './oem-section1.component.html',
    styleUrls: ['./oem-section1.component.css']
})
export class OemSection1Component implements OnInit {


    id;
    oemsec1List = [];

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
        this.alloemsection2();
    }

    list_oemsec1 = [];

    list() {
        this.list_oemsec1 = [];
        this.apiService.getAPI(this.apiService.BASE_URL + 'oem/section1').then((result) => {
            console.log(result);
            if (result.status) {

                for (let i = 0; i < result.result.length; i++) {
                    let imgs = this.apiService.BASE_IMAGE_URL + result.result[i].image;
                    let title = result.result[i].title
                    let description = result.result[i].description
                    let maindesc = result.result[i].maindesc
                    let id = result.result[i].id
                    this.list_oemsec1.push({
                        image: imgs,
                        title: title,
                        description: description,
                        maindesc: maindesc,
                        id: id
                    });
                }
            }
        })
    }

    addOemSec1() {
        const modalRef = this.modalService.open(AddUpdateOemSection1Component, {
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

    editOemSec1(oemsec1) {
        const modalRef = this.modalService.open(AddUpdateOemSection1Component, {
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
        modalRef.componentInstance.OemSec1 = oemsec1;
    }

    deleteOemSec1(id) {
        this.apiService.getAPI(this.apiService.BASE_URL + 'oem/deleteOemSec1/' + id).then((result) => {
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

    // for section 2
    description: string = '';
    title: string = '';

    alloemsection2() {
        this.apiService.getAPI(this.apiService.BASE_URL + 'oem/getOemSec2/1').then((result) => {
            this.description = result.result.description;
            this.title = result.result.title;
        })
    }

    save() {
        const formData = new FormData();
        formData.append('description', this.description);
        formData.append('title', this.title);
        formData.append('id', '1');
        this.apiService.postAPI(this.apiService.BASE_URL + 'oem/updateOemSec2', formData).then((result) => {
            if (result.status) {
                // alert("Success");
                this.alloemsection2()
            } else {
                alert("Not found");
            }
        }, (error) => {
            alert("something went wrong");
        })
    }
}
