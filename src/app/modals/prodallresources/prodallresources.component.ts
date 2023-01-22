import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AddProdResourcesComponent } from '../add-prod-resources/add-prod-resources.component';

@Component({
  selector: 'app-prodallresources',
  templateUrl: './prodallresources.component.html',
  styleUrls: ['./prodallresources.component.css']
})
export class ProdallresourcesComponent implements OnInit {
  @Input() prodid = null;

  name: string = "";
  value: string = "";
  id: string = "";

  resources: any = [];

  addbtn: boolean = false;
  editbtn: boolean = false;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    public apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.prodid != null) {
    }
    this.getresbyId();
  }


  getresbyId() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productResources/getProductResourcesByProductId/' + this.prodid).then((result) => {
      // alert(JSON.stringify(result));
      this.resources = result.result;
    })
  }

  addnew() {
    const modalRef = this.modalService.open(AddProdResourcesComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getresbyId();
    })
    modalRef.componentInstance.prodid = this.prodid;
  }

  editres(item) {
    const modalRef = this.modalService.open(AddProdResourcesComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getresbyId();
    })
    modalRef.componentInstance.editprod = item;
    modalRef.componentInstance.prodid = this.prodid;
  }

  deleteres(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productResources/deleteProductResources/' + id).then((result) => {
      if (result.status) {
        this.getresbyId();
      } else {
        alert("something went wrong");
      }
    }, (error) => {
      console.log('error:-' + JSON.stringify(error));
    })
  }

  close() {
    this.activeModal.close();
  }
}
