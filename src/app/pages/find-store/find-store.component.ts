import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFindComponent } from 'app/modals/add-find/add-find.component';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-find-store',
  templateUrl: './find-store.component.html',
  styleUrls: ['./find-store.component.css']
})
export class FindStoreComponent implements OnInit {
  AllData = [];

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getall();
  }

  add() {
    const modalRef = this.modalService.open(AddFindComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getall()
    })
  }

  edit(find) {
    const modalRef = this.modalService.open(AddFindComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getall()
    })
    modalRef.componentInstance.find = find;
  }

  delete(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'store/deleteStore/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getall()
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }

  getall() {
    this.AllData = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "store").then((result) => {
      if (result.status) {
        this.AllData = result.result
      } else {
        this.toast.error(result.message)
      }
    }, (error) => {
      console.log(error);
      this.toast.error("something went wrong")
    })
  }
}
