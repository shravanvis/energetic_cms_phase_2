import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  description: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.allterms();
  }

  allterms() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'support/getSupport/1').then((result) => {
      this.description = result.result.description;
    })
  }

  save() {
    const formData = new FormData();
    formData.append('description', this.description);
    formData.append('id', '1');
    this.apiService.postAPI(this.apiService.BASE_URL + 'support/updateSupport', formData).then((result) => {
      if (result.status) {
        alert("Added");
        this.allterms()
      } else {
        alert("Not found");
      }
    }, (error) => {
      alert("something went wrong");
    })
  }
}
