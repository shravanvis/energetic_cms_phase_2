import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AddProdDimensionsComponent } from '../add-prod-dimensions/add-prod-dimensions.component';
import { AddProdSpecificationComponent } from '../add-prod-specification/add-prod-specification.component';

@Component({
  selector: 'app-prodalldimensions',
  templateUrl: './prodalldimensions.component.html',
  styleUrls: ['./prodalldimensions.component.css']
})
export class ProdalldimensionsComponent implements OnInit {
  @Input() prodid = null;

  name: string = "";
  value: string = "";
  id: string = "";

  Dimension: any = [];

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
    this.getdimbyId();
  }


  getdimbyId() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productDimension/getProductDimensionByProductId/' + this.prodid).then((result) => {
      this.Dimension = result.result;
    })
  }

  addnew() {
    const modalRef = this.modalService.open(AddProdDimensionsComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getdimbyId();
    })
    modalRef.componentInstance.prodid = this.prodid;
  }

  editdim(item) {
    const modalRef = this.modalService.open(AddProdDimensionsComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getdimbyId();
    })
    modalRef.componentInstance.editprod = item;
    modalRef.componentInstance.prodid = this.prodid;
  }

  deletedim(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productDimension/deleteProductDimension/' + id).then((result) => {
      if (result.status) {
        this.getdimbyId();
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
