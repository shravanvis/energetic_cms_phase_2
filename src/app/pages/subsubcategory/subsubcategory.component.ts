import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateSubcategoryComponent } from 'app/modals/add-update-subcategory/add-update-subcategory.component';
import { AddUpdateSubsubcategoryComponent } from 'app/modals/add-update-subsubcategory/add-update-subsubcategory.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-subsubcategory',
  templateUrl: './subsubcategory.component.html',
  styleUrls: ['./subsubcategory.component.css']
})
export class SubsubcategoryComponent implements OnInit {

  list_subsubcategory: any = [];
  subcat_id;
  cat_id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) {
    this.activatedRoute.params.subscribe(params => { })
  }

  ngOnInit() {
    this.subcat_id = localStorage.getItem('sub_id');
    this.cat_id = localStorage.getItem('category_id');
    this.getAllsubSubCatbySubID(this.subcat_id);
  }

  addsubsubcategory() {
    const modalRef = this.modalService.open(AddUpdateSubsubcategoryComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getAllsubSubCatbySubID(this.subcat_id)
    })
    modalRef.componentInstance.subcat_id = this.subcat_id;
    modalRef.componentInstance.cat_id = this.cat_id;
  };


  editsubsubcategory(subsubcat_data) {
    const modalRef = this.modalService.open(AddUpdateSubsubcategoryComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getAllsubSubCatbySubID(this.subcat_id)
    })
    modalRef.componentInstance.subsubcat_data = subsubcat_data;
    modalRef.componentInstance.subcat_id = this.subcat_id;
    modalRef.componentInstance.cat_id = this.cat_id;
  }

  getAllsubSubCatbySubID(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subSubCategory/getSubSubCategoryBySubid/' + id).then((result) => {
      console.log(result);
      if (result.status) {
        this.list_subsubcategory = result.result;
      }
    })
  }

  deletesubcategory(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'subSubCategory/deleteSubSubCategory/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getAllsubSubCatbySubID(this.subcat_id)
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }
}
