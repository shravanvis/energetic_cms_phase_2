import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveUserComponent } from 'app/modals/approve-user/approve-user.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  allCustomers = [];
  allAgents = [];

  Customers_tab = true;
  Agents_tab = false;

  READ_NOTIFICATION_CSS = 'readNotification';
  UNREAD_NOTIFICATION_CSS = 'unreadNotification';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    private apiService: ApiService,
    private modalService: NgbModal,
    private toaster: ToastrService,
  ) { }

  openCustomers() {
    this.Customers_tab = true;
    this.Agents_tab = false;
  }

  openAgents() {
    this.Agents_tab = true;
    this.Customers_tab = false;
  }

  ngOnInit(): void {
    this.getallAgents();
    this.getallCustomers();
  }

  getallAgents() {
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllAgents").then((result) => {
      if (result.status) {
        // this.allAgents = result.result.filter(result => (result.status == 0))
        this.allAgents = result.result.filter(result => (result.status == 0))
        console.log(this.allAgents);
      } else {
        this.toaster.error(result.message)
      }
    }, (error) => {
      console.log(error);
      this.toaster.error("something went wrong")
    })
  }

  getallCustomers() {
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllCustomers").then((result) => {
      if (result.status) {
        this.allCustomers = result.result.filter(result => (result.status == 0))
        console.log(this.allAgents);
      } else {
        this.toaster.error(result.message)
      }
    }, (error) => {
      console.log(error);
      this.toaster.error("something went wrong")
    })
  }

  openUser(item) {
    const modalRef = this.modalService.open(ApproveUserComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallAgents();
      this.getallCustomers();
    })
    // modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.item = item;
  }
}
