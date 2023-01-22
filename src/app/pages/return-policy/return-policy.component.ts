import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-return-policy',
  templateUrl: './return-policy.component.html',
  styleUrls: ['./return-policy.component.css']
})
export class ReturnPolicyComponent implements OnInit {

  id;
  list_pdf = [];

  pdf;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.allpdf();
  }

  allpdf() {
    this.list_pdf = [];
    this.apiService.getAPI(this.apiService.BASE_URL + 'returnPolicy').then((result) => {
      console.log(result);
      this.list_pdf = result.result;
    })
  }

  selectpdf(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pdf = file
    }
  }

  addpdf() {
    const formData = new FormData();
    formData.append('image', this.pdf);
    this.apiService.postAPI(this.apiService.BASE_URL + 'returnPolicy/addReturnPolicy', formData).then((result) => {
      if (result.status) {
        alert("Added");
        this.allpdf()
      } else {
        alert("Not found");
      }
    }, (error) => {
      alert("something went wrong");
    })
  }

  deletepdf(id: number) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'returnPolicy/deleteReturnPolicy/' + id).then((result) => {
      if (result.status) {
        alert("Deleted");
        this.allpdf()
      } else {
        alert("Not found");
      }

    }, (error) => {
      alert("something went wrong");
    })
  }
}
