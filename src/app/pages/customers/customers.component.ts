import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomersComponent } from 'app/modals/add-customers/add-customers.component';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  allCustomers = [];

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getallCustomers();
  }

  add() {
    const modalRef = this.modalService.open(AddCustomersComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallCustomers();
    })
  }

  edit(cust) {
    const modalRef = this.modalService.open(AddCustomersComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallCustomers()
    })
    modalRef.componentInstance.cust = cust;
  }

  delete(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'user/deleteUser/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getallCustomers();
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }

  getallCustomers() {
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllCustomers").then((result) => {
      if (result.status) {
        this.allCustomers = result.result.filter(result => (result.status == 1 || result.status == 2))
      } else {
        this.toast.error(result.message)
      }
    }, (error) => {
      console.log(error);
      this.toast.error("something went wrong")
    })
  }
}
