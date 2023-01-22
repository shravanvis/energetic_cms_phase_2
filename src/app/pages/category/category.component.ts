import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateCategoryComponent } from 'app/modals/add-update-category/add-update-category.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  id;
  list_cat = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.cat();
  }

  cat() {
    this.list_cat = [];
    this.apiService.getAPI(this.apiService.BASE_URL + 'category').then((result) => {
      console.log(result);
      if (result.status) {
        for (let i = 0; i < result.result.length; i++) {
          let imgs = this.apiService.BASE_IMAGE_URL + result.result[i].image;
          let name = result.result[i].name;
          let banner = this.apiService.BASE_IMAGE_URL + result.result[i].banner;
          this.list_cat.push({
            id: result.result[i].id,
            image: imgs,
            name: name,
            banner: banner,
          });
        }
      }
    })
  }

  addcat() {
    const modalRef = this.modalService.open(AddUpdateCategoryComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.cat()
    })
    modalRef.componentInstance.id = this.id;
  }

  editcat(cat) {
    const modalRef = this.modalService.open(AddUpdateCategoryComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.cat()
    })
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.cat = cat;
  }

  deletecat(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'category/deleteCategory/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.cat()
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }

  AddSubcat(id: number) {
    this.router.navigate(['/sub-category', id])
  }
}
