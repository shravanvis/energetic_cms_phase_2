import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-modal-cart',
  templateUrl: './product-modal-cart.component.html',
  styleUrls: ['./product-modal-cart.component.css']
})
export class ProductModalCartComponent implements OnInit {
  @Input() data = null;

  Product: any = [];
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.Product = JSON.parse(this.data);
    console.log(this.Product);
  }


  close() {
    this.activeModal.close();
  }
}
