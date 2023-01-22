import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateSubcategoryComponent } from 'app/modals/add-update-subcategory/add-update-subcategory.component';
import { AddUpdateSubsubcategoryComponent } from 'app/modals/add-update-subsubcategory/add-update-subsubcategory.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  list_subcategory = [];
  id;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getAllSubCategory(params.id);
    })
  }

  ngOnInit(): void {
  }

  getAllSubCategory(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subCategory/getSubCategoryBycategory/' + id).then((result) => {
      console.log(result);
      if (result.status) {
        this.list_subcategory = result.result;
      }
    })
  }

  addsubcategory() {
    const modalRef = this.modalService.open(AddUpdateSubcategoryComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getAllSubCategory(this.id)
    })
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.catid = this.id;
  }

  editsubcategory(subcat) {
    const modalRef = this.modalService.open(AddUpdateSubcategoryComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getAllSubCategory(this.id)
    })
    modalRef.componentInstance.catid = this.id;
    modalRef.componentInstance.subcat = subcat;
  }

  deletesubcategory(id: number) {

    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'subCategory/deleteSubCategory/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getAllSubCategory(this.id)
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }

  AddsubSubcat(category_id: any, sub_id: any) {
    localStorage.setItem('category_id', category_id);
    localStorage.setItem('sub_id', sub_id);
    this.router.navigate(['/sub-sub-category', sub_id]);
  }
}
