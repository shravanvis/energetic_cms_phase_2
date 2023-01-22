import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent implements OnInit {
  @Input() cust = null;

  id;
  name: string = "";
  email: string = "";
  phone: string = "";
  type: string = "";
  password: string = "";
  company: string = "";
  status: string = "";
  level: string = "";

  allLevels = [];

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.geteallLevels();
    if (this.cust != null) {
      this.id = this.cust.id;
      this.name = this.cust.name;
      this.email = this.cust.email;
      this.phone = this.cust.phone;
      this.type = this.cust.type;
      this.password = this.cust.password;
      this.company = this.cust.company;
      if (this.cust.status == 1) {
        this.status = '1';
      }
      if (this.cust.status == 2) {
        this.status = '2';
      }
      this.level = this.cust.level_id
    }
  }

  getCustomersById() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'user/getCustomersById/' + this.id).then((result) => {
    })


  }

  updateUserLevel() {
    let user_level_id;
    let level_id;
    this.apiService.getAPI(this.apiService.BASE_URL + 'user/getCustomersById/' + this.id).then((result) => {
      if (result.status) {
        user_level_id = result.result.user_level_id
        level_id = result.result.level_id
      }
      let updateUserLevel = {
        'id': user_level_id,
        'user_id': this.id,
        'level_id': this.level
      }
      this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateUserLevels', updateUserLevel).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
      })
    })

  }

  geteallLevels() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'user/getAllLevels').then((result) => {
      this.allLevels = result.result;
      console.log(this.allLevels);
    })
  }
  save() {
    if (this.cust != null) {
      if (this.validation() == true) {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('phone', this.phone);
        formData.append('company', this.company);
        formData.append('id', this.id);
        formData.append('status', this.status);

        this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateUser', formData).then((result) => {
          if (this.type == 'customer') {
            if (result.status) {
              this.updateUserLevel();
            }
            else {
              this.activeModal.close();
            }
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
    if (this.email == '') {
      this.toast.error('Please enter email');
      return false;
    }
    if (this.company == '') {
      this.toast.error('Please enter company name');
      return false;
    }
    return true;
  }

  add() {
    if (this.validation()) {
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('phone', this.phone);
      formData.append('type', 'customer');
      formData.append('password', this.password);
      formData.append('company', this.company);
      formData.append('status', this.status);
      formData.append('level', this.level);

      this.apiService.postAPI(this.apiService.BASE_URL + 'user/register', formData).then((result) => {
        if (result.status) {
          if (result.result.user.result.id) {
            let leveldata = {
              'user_id': result.result.user.result.id,
              'level_id': this.level
            }
            this.apiService.postAPI(this.apiService.BASE_URL + 'user/addUserLevels', leveldata).then((result) => {
              this.activeModal.close();
            })
          }
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
