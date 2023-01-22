import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AddProdLevelsComponent } from '../add-prod-levels/add-prod-levels.component';

@Component({
  selector: 'app-prodlevels',
  templateUrl: './prodlevels.component.html',
  styleUrls: ['./prodlevels.component.css']
})
export class ProdlevelsComponent implements OnInit {
  @Input() prodid = null;

  name: string = "";
  value: string = "";
  id: string = "";

  levels: any = [];

  addbtn: boolean = false;
  editbtn: boolean = false;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.prodid != null) {
    }
    this.getlevelsbyId();
  }


  getlevelsbyId() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'product/getProductLevelByProductId/' + this.prodid).then((result) => {
      // alert(JSON.stringify(result));
      this.levels = result.result;
    })
  }

  addnew() {
    const modalRef = this.modalService.open(AddProdLevelsComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getlevelsbyId();
    })
    modalRef.componentInstance.prodid = this.prodid;
  }

  editlevel(item) {
    const modalRef = this.modalService.open(AddProdLevelsComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getlevelsbyId();
    })
    modalRef.componentInstance.editprod = item;
    modalRef.componentInstance.prodid = this.prodid;
  }

  deletelevel(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'product/deleteProductLevel/' + id).then((result) => {
      if (result.status) {
        this.getlevelsbyId();
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
