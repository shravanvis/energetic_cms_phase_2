import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCatalogsComponent } from 'app/modals/add-catalogs/add-catalogs.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {

  id;
  list_cat = [];

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
    this.list_cat = [];
    this.apiService.getAPI(this.apiService.BASE_URL + 'catelogs').then((result) => {
      console.log(result);
      this.list_cat = result.result.filter((m: any) => m.page === 'catalog');
    })
  }

  addcata() {
    const modalRef = this.modalService.open(AddCatalogsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.cata()
    })
  }

  editcata(cata) {
    const modalRef = this.modalService.open(AddCatalogsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.cata()
    })
    modalRef.componentInstance.cata = cata;
  }

  deletecata(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'catelogs/deleteCatelogs/' + id).then((result) => {
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
}
