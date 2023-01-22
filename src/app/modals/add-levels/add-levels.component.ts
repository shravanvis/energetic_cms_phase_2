import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-levels',
  templateUrl: './add-levels.component.html',
  styleUrls: ['./add-levels.component.css']
})
export class AddLevelsComponent implements OnInit {
  @Input() level = null;

  id;
  name: string = "";

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.level != null) {
      this.id = this.level.id;
      this.name = this.level.name;
    }
  }

  save() {
    if (this.level != null) {
      if (this.validation() == true) {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('id', this.id);
        this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateLevels', formData).then((result) => {
          if (result.status) {
            this.activeModal.close();
          }
        }, (error) => {
          console.log('error:-' + JSON.stringify(error));
        })
      }
    } else {
      this.add();
    }
  }

  validation() {
    if (this.name == '') {
      this.toast.error('Please enter name');
      return false;
    }
    return true;
  }

  add() {
    if (this.validation()) {
      let formData = new FormData();
      formData.append('name', this.name);

      this.apiService.postAPI(this.apiService.BASE_URL + 'user/addLevels', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
        else {
          this.toast.error(result.message)
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
  }

  close() {
    this.activeModal.close();
  }
}
