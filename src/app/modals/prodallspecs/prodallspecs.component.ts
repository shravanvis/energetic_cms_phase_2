import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AddProdSpecificationComponent } from '../add-prod-specification/add-prod-specification.component';

@Component({
  selector: 'app-prodallspecs',
  templateUrl: './prodallspecs.component.html',
  styleUrls: ['./prodallspecs.component.css']
})
export class ProdallspecsComponent implements OnInit {
  @Input() prodid = null;

  name: string = "";
  value: string = "";
  id: string = "";

  specfication: any = [];

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
    this.getspecbyId();
  }


  getspecbyId() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productSpecification/getProductSpecificationByProductId/' + this.prodid).then((result) => {
      // alert(JSON.stringify(result));
      this.specfication = result.result;
    })
  }

  addnew() {
    const modalRef = this.modalService.open(AddProdSpecificationComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getspecbyId();
    })
    modalRef.componentInstance.prodid = this.prodid;
  }

  editspec(item) {
    const modalRef = this.modalService.open(AddProdSpecificationComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getspecbyId();
    })
    modalRef.componentInstance.editprod = item;
    modalRef.componentInstance.prodid = this.prodid;
  }

  deletespec(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'productSpecification/deleteProductSpecification/' + id).then((result) => {
      if (result.status) {
        this.getspecbyId();
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
