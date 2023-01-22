import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-oem-section2',
  templateUrl: './oem-section2.component.html',
  styleUrls: ['./oem-section2.component.css']
})
export class OemSection2Component implements OnInit {

   description: string = '';
   title: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
    this.alloemsection2();
  }

  alloemsection2() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'oem/getOemSec2/1').then((result) => {
      this.description = result.result.description;
      this.title = result.result.title;
    })
  }

  save() {
    const formData = new FormData();
    formData.append('description', this.description);
    formData.append('title', this.title);
    formData.append('id', '1');
    this.apiService.postAPI(this.apiService.BASE_URL + 'oem/updateOemSec2', formData).then((result) => {
      if (result.status) {
      // alert("Success");
        this.alloemsection2()
      } else {
        alert("Not found");
      }
    }, (error) => {
      alert("something went wrong");
    })
  }
}
