import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateApplicationsComponent } from '../../modals/add-update-applications/add-update-applications.component';
import { UtilService } from '../../service/util.service';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {


    id;
    applicationsList = [];

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

    list_applications = [];

    list() {
        this.list_applications = [];
        this.apiService.getAPI(this.apiService.BASE_URL + 'applications').then((result) => {
            console.log(result);
            if (result.status) {

                for (let i = 0; i < result.result.length; i++) {
                    let imgs = this.apiService.BASE_IMAGE_URL + result.result[i].image;
                    let title = result.result[i].title
                    let description = result.result[i].description
                    let button_name = result.result[i].button_name
                    let id = result.result[i].id
                    this.list_applications.push({
                        image: imgs,
                        title: title,
                        description: description,
                        button_name: button_name,
                        id: id
                    });
                }
            }
        })
    }

    addApplications() {
        const modalRef = this.modalService.open(AddUpdateApplicationsComponent, {
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

    editApplications(applications) {
        const modalRef = this.modalService.open(AddUpdateApplicationsComponent, {
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
        modalRef.componentInstance.Applications = applications;
    }

    deleteApplications(id) {
        var result = confirm("Are you sure to delete?");
        if (result) {
            this.apiService.getAPI(this.apiService.BASE_URL + 'applications/deleteApplications/' + id).then((result) => {
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
}
