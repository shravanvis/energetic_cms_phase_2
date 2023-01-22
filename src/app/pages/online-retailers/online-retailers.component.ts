import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateOnlineRetailersComponent } from 'app/modals/add-update-online-retailers/add-update-online-retailers.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-online-retailers',
  templateUrl: './online-retailers.component.html',
  styleUrls: ['./online-retailers.component.css']
})
export class OnlineRetailersComponent implements OnInit {
  closeResult = '';
  Retailers: any = [];

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
    this.getonlineRetailers();
  }

  addret() {
    const modalRef = this.modalService.open(AddUpdateOnlineRetailersComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getonlineRetailers()
    })
  }

  editret(ret) {
    const modalRef = this.modalService.open(AddUpdateOnlineRetailersComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getonlineRetailers()
    })
    modalRef.componentInstance.ret = ret;
  }


  getonlineRetailers() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'onlineRetailers').then((result) => {
      this.Retailers = result.result;
    })
  }

  deleteonlineRetailers(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'onlineRetailers/deleteOnlineRetailers/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getonlineRetailers()
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }
}
