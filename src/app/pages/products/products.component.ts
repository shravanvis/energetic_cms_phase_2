import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGlobalResourcesComponent } from 'app/modals/add-global-resources/add-global-resources.component';
import { AddProductsComponent } from 'app/modals/add-products/add-products.component';
import { ProdaccessoriesComponent } from 'app/modals/prodaccessories/prodaccessories.component';
import { ProdalldimensionsComponent } from 'app/modals/prodalldimensions/prodalldimensions.component';
import { ProdallresourcesComponent } from 'app/modals/prodallresources/prodallresources.component';
import { ProdallspecsComponent } from 'app/modals/prodallspecs/prodallspecs.component';
import { ProdlevelsComponent } from 'app/modals/prodlevels/prodlevels.component';
import { ProductretailersComponent } from 'app/modals/productretailers/productretailers.component';
import { SpecialProductsComponent } from 'app/modals/special-products/special-products.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  id;
  list_prod = [];

  displayList = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.cata();
  }

  cata() {
    this.list_prod = [];
    this.apiService.getAPI(this.apiService.BASE_URL + 'product').then((result) => {
      console.log(result);
      this.displayList = result.result;
      this.list_prod = result.result;
    })
  }

  addcata() {
    const modalRef = this.modalService.open(AddProductsComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.cata()
    })
  }

  updateprod(prod) {
    const modalRef = this.modalService.open(AddProductsComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.cata();
    })
    modalRef.componentInstance.prod = prod;
  }

  deleteprod(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'product/deleteProduct/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.cata()
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }

  addspec(id) {
    const modalRef = this.modalService.open(ProdallspecsComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
    })
    modalRef.componentInstance.prodid = id;
  }
  addSpecialPro(id) {
    const modalRef = this.modalService.open(SpecialProductsComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
    })
    modalRef.componentInstance.prodid = id;
  }

  addres(id) {
    const modalRef = this.modalService.open(ProdallresourcesComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
    })
    modalRef.componentInstance.prodid = id;
  }

  adddim(id) {
    const modalRef = this.modalService.open(ProdalldimensionsComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
    })
    modalRef.componentInstance.prodid = id;
  }

  addlevels(id) {
    const modalRef = this.modalService.open(ProdlevelsComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
    })
    modalRef.componentInstance.prodid = id;
  }

  addAccessories(id) {
    const modalRef = this.modalService.open(ProdaccessoriesComponent, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
    })
    modalRef.componentInstance.prodid = id;
  }

  addRetailer(id) {
    const modalRef = this.modalService.open(ProductretailersComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
    })
    modalRef.componentInstance.prodid = id;
  }

  // trackByFn(index, item) {
  //   return item.product_name + item.title + item.image + item.is_featured + item.created_at + item.is_active + item.name + item.subsubname + item.subname + item.features + item.application + item.description + item.image2 + item.image3 + item.image4;
  // }

  // trackChatMessage(index: number, chatMessage: any) {
  //   // this.getproductById(chatMessage.id);
  //   alert(chatMessage.id);
  //   return chatMessage.id;
  // }

  // getproductById(id: any){
  //   this.apiService.getAPI(this.apiService.BASE_IMAGE_URL + 'product/getProduct/' + this.id).then((result) => {
  //     console.log(result);
  //     this.list_prod = result.result;
  //   })
  // }

  search = '';
  onSearch() {
    if (this.search == '') {
      this.displayList = this.list_prod;
    } else {
      this.displayList = this.list_prod.filter(res => {
        return (
          res.product_name.toLowerCase().match(this.search.toLowerCase())
        )
      })
    }
  }

  addResour() {
    const modalRef = this.modalService.open(AddGlobalResourcesComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
    })
    // modalRef.componentInstance.prodid = id;
  }
}
