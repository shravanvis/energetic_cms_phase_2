import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateNewsComponent } from 'app/modals/add-update-news/add-update-news.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  allnews: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getallnews();
  }

  getallnews() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'news').then((result) => {
      this.allnews = result.result;
    })
  }

  addnews() {
    const modalRef = this.modalService.open(AddUpdateNewsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallnews()
    })
  }

  editnews(news) {
    const modalRef = this.modalService.open(AddUpdateNewsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallnews()
    })
    modalRef.componentInstance.news = news;
  }

  deletenews(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'news/deleteNews/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getallnews()
        } else {
          alert("Not found");
        }
      }, (error) => {
        alert("something went wrong");
      })
    }
  }
}
