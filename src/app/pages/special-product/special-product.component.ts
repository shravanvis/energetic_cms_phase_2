import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-special-product',
  templateUrl: './special-product.component.html',
  styleUrls: ['./special-product.component.css']
})
export class SpecialProductComponent implements OnInit {

 
  name: string = '';
 
  id;


  SpecialProduct: any = [];

  updatebtn: boolean = false;
  addbtn: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getSpecialProduct();
  }

  addSpecialProduct() {

  
    let postdata = {
      name: this.name,
     
    }
    console.log(postdata);
    this.apiService.postAPI(this.apiService.BASE_URL + 'specialProduct/addSpecialProduct/', postdata).then((result) => {
      alert("Special Product Added");
      this.getSpecialProduct();
    })
  }

  getSpecialProduct() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'specialProduct').then((result) => {
      this.SpecialProduct = result.result;
    })
  }

  editSpecialProduct(item) {
    this.updatebtn = true;
    this.addbtn = false;
  
    this.name = item.name;
   
    this.id = item.id;
    // this.updaterep(item);
  }

  updateSpecialProduct() {
   
    let postdata = {
      id: this.id,
      name: this.name
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'specialProduct/updateSpecialProduct', postdata).then((result) => {
      alert("Special Product Updated")
      this.updatebtn = false;
      this.addbtn = true;
      this.name = '';
     
      this.id = '';
      this.getSpecialProduct();
    })
  }

  deleteSpecialProduct(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'specialProduct/deleteSpecialProduct/' + id).then((result) => {
      alert(result.message)
      this.getSpecialProduct();
    })
  }

}
