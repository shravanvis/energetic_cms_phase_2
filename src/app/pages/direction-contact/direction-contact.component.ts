import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUpdateDirectionContactComponent } from 'app/modals/add-update-direction-contact/add-update-direction-contact.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-direction-contact',
  templateUrl: './direction-contact.component.html',
  styleUrls: ['./direction-contact.component.css']
})
export class DirectionContactComponent implements OnInit {

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
    this.direction();
    this.getcontent();
  }

  direction() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'direction/getDirection/2').then((result) => {
      this.description = result.result.description;
      this.title = result.result.title;
    })
  }

  save() {
    const formData = new FormData();
    formData.append('description', this.description);
    formData.append('title', this.title);
    formData.append('id', '2');
    this.apiService.postAPI(this.apiService.BASE_URL + 'direction/updateDirection', formData).then((result) => {
      if (result.status) {
        // alert("Success");
        this.direction()
      } else {
        alert("Not found");
      }
    }, (error) => {
      alert("something went wrong");
    })
  }

  directions_content: any = [];
  getcontent() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'contactUs').then((result) => {
      if (result.status === true) {
        console.log(result.result);
        this.directions_content = result.result.filter((item: any) => {
          return item.type === 'directions';
        })
        console.log(this.directions_content);
      }
    })
  }

  edit(data) {
    const modalRef = this.modalService.open(AddUpdateDirectionContactComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getcontent()
    })
    modalRef.componentInstance.data = data;
  }

  delete(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'catelogs/deleteCatelogs/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getcontent()
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }
}
