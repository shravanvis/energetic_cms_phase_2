import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalCartComponent } from 'app/modals/product-modal-cart/product-modal-cart.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-cart-user',
  templateUrl: './cart-user.component.html',
  styleUrls: ['./cart-user.component.css']
})
export class CartUserComponent implements OnInit {
  data: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'cartEnquiry').then((result) => {
      this.data = result.result;
    })
  }

  openProduct(data) {
    const modalRef = this.modalService.open(ProductModalCartComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.componentInstance.data = data;
  }
}
