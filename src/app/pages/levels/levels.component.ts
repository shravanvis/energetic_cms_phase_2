import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLevelsComponent } from 'app/modals/add-levels/add-levels.component';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {
  AllLevels = [];

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getall();
  }

  add() {
    const modalRef = this.modalService.open(AddLevelsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getall()
    })
  }

  edit(level) {
    const modalRef = this.modalService.open(AddLevelsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getall()
    })
    modalRef.componentInstance.level = level;
  }

  delete(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'user/deleteLevels/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getall()
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }

  getall() {
    this.AllLevels = [];
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllLevels").then((result) => {
      if (result.status) {
        this.AllLevels = result.result
      } else {
        this.toast.error(result.message)
      }
    }, (error) => {
      console.log(error);
      this.toast.error("something went wrong")
    })
  }
}
