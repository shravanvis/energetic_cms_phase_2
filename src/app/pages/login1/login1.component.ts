import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLoginurlComponent } from 'app/modals/add-loginurl/add-loginurl.component';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {

  id;
  loginurlList = [];

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    // this.id = this.utilService.getUserID();
    this.list();
  }

  list_loginurl = [];

  list() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'loginurlRoute').then((result) => {
      console.log(result);
      this.list_loginurl = result.result;
    })
  }

  addLoginurl() {
    const modalRef = this.modalService.open(AddLoginurlComponent, {
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

  editLoginurl(loginurl) {
    const modalRef = this.modalService.open(AddLoginurlComponent, {
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
    modalRef.componentInstance.Loginurl = loginurl;
  }

  deleteLoginurl(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'loginurlRoute/deleteLoginurl/' + id).then((result) => {
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
