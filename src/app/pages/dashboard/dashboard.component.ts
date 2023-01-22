import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {UtilService} from '../../service/util.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

    public canvas: any;
    public ctx;
    public chartColor;
    public chartEmail;
    public chartHours;

    constructor(
        private apiService: ApiService,
        private modalService: NgbModal,
        private router: Router,
        private utilService: UtilService
    ) {
    }

    chefContent: boolean = false;
    adminContent: boolean = false;

    ngOnInit() {

       
     
        }

        
    

}
