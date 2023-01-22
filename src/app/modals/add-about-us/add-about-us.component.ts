import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-about-us',
  templateUrl: './add-about-us.component.html',
  styleUrls: ['./add-about-us.component.css']
})
export class AddAboutUsComponent implements OnInit {
  @Input() about = null;

  id;
  title: string = "";
  description: string = "";

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.about != null) {
      this.id = this.about.id;
      this.title = this.about.title;
      this.description = this.about.description;
    }
  }


  saveabout() {
    if (this.about != null) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('id', this.about.id);
      this.apiService.postAPI(this.apiService.BASE_URL + 'aboutus/updateAboutus', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addabout();
    }
  }


  validation() {
    if (this.title == '') {
      this.toast.error('Please enter title');
      return false;
    }
    return true;
  }

  addabout() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('title', this.title);
      formData.append('description', this.description);

      this.apiService.postAPI(this.apiService.BASE_URL + 'aboutus/addAboutus', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
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
