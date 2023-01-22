import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-agents',
  templateUrl: './add-agents.component.html',
  styleUrls: ['./add-agents.component.css']
})
export class AddAgentsComponent implements OnInit {
  @Input() agent = null;

  id;
  name: string = "";
  email: string = "";
  phone: string = "";
  type: string = "";
  password: string = "";
  company: string = "";
  status: string = "";

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.agent != null) {
      this.id = this.agent.id;
      this.name = this.agent.name;
      this.email = this.agent.email;
      this.phone = this.agent.phone;
      this.type = this.agent.type;
      this.password = this.agent.password;
      this.company = this.agent.company;
      if (this.agent.status == 1) {
        this.status = '1';
      }
      if (this.agent.status == 2) {
        this.status = '2';
      }
    }
  }

  save() {
    if (this.agent != null) {
      if (this.validation() == true) {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('phone', this.phone);
        formData.append('company', this.company);
        formData.append('id', this.id);
        formData.append('status', this.status);
        this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateUser', formData).then((result) => {
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
      formData.append('type', 'agent');
      formData.append('password', this.password);
      formData.append('company', this.company);
      formData.append('status', this.status);

      this.apiService.postAPI(this.apiService.BASE_URL + 'user/register', formData).then((result) => {
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
