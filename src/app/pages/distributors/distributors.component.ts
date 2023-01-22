import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.css']
})
export class DistributorsComponent implements OnInit {

  data: any = [];
  description;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getdata();
    this.alldescription();
  }

  getdata() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'distributer').then((result) => {
      this.data = result.result;
    })
  }

  alldescription() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'warranty/getWarranty/2').then((result) => {
      this.description = result.result.description;
    })
  }

  save() {
    const formData = new FormData();
    formData.append('description', this.description);
    formData.append('id', '2');
    this.apiService.postAPI(this.apiService.BASE_URL + 'warranty/updateWarranty', formData).then((result) => {
      if (result.status) {
        alert("Added");
      } else {
        alert("Not found");
      }
    }, (error) => {
      alert("something went wrong");
    })
  }
}
