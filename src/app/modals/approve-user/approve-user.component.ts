import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.css']
})
export class ApproveUserComponent implements OnInit {
  @Input() item = null;

  id;
  name: string = "";
  email: string = "";
  type: string = "";
  company: string = "";
  status: string = "";
  level: string = "";
  phone: string = "";

  image;
  showImageUrl;

  allLevels = [];

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.item);
    this.geteallLevels();
    this.id = this.item.id;
    this.name = this.item.name;
    this.email = this.item.email;
    this.type = this.item.type;
    this.company = this.item.company;
    this.status = this.item.status;
    this.phone = this.item.phone;
  }

  geteallLevels() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'user/getAllLevels').then((result) => {
      this.allLevels = result.result;
      console.log(this.allLevels);
    })
  }

  approve() {
    if (this.validation() == true) {
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('company', this.company);
      formData.append('id', this.id);
      formData.append('status', '1');

      this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateUser', formData).then((result) => {
        if (this.type == 'customer') {
          if (result.status) {
            let leveldata = {
              'user_id': this.id,
              'level_id': this.level
            }
            this.apiService.postAPI(this.apiService.BASE_URL + 'user/addUserLevels', leveldata).then((result) => {
              this.activeModal.close();
            })
          }
        }
        else {
          this.activeModal.close();
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
  }

  disapprove() {
    let formData = new FormData();
    formData.append('id', this.id);
    formData.append('status', '2');
    this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateUser', formData).then((result) => {
      if (result.status) {
        this.activeModal.close();
      }
    }, (error) => {
      console.log('error:-' + JSON.stringify(error));
    })
  }

  validation() {
    if (this.name == '') {
      this.toast.error('Please enter name');
      return false;
    }
    if (this.email == '') {
      this.toast.error('Please enter email');
      return false;
    }
    if (this.company == '') {
      this.toast.error('Please enter company name');
      return false;
    }
    if (this.type == 'customer') {
      if (this.level == '') {
        this.toast.error('Please enter level');
        return false;
      }
    }
    return true;
  }

  // addnews() {
  //   if (this.validation()) {
  //     let formData = new FormData();

  //     formData.append('title', this.title);
  //     formData.append('description', this.description);
  //     formData.append('image', this.image);

  //     this.apiService.postAPI(this.apiService.BASE_URL + 'news/addNews', formData).then((result) => {
  //       if (result.status) {
  //         this.activeModal.close();
  //       }
  //     }, (error) => {
  //       console.log('error:-' + JSON.stringify(error));
  //     })
  //   }
  // }

  close() {
    this.activeModal.close();
  }

}
