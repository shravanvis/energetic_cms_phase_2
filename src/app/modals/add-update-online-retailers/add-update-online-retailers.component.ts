import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-online-retailers',
  templateUrl: './add-update-online-retailers.component.html',
  styleUrls: ['./add-update-online-retailers.component.css']
})
export class AddUpdateOnlineRetailersComponent implements OnInit {

  @Input() ret = null;

  id;
  title: string = "";
  description: string = "";
  more: string = "";

  image;
  showImageUrl;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.ret != null) {
      this.id = this.ret.id;
      this.title = this.ret.title;
      this.description = this.ret.description;
      this.more = this.ret.more;
      this.showImageUrl = this.apiService.BASE_IMAGE_URL + this.ret.image;
    }
  }


  validation() {
    if (this.title == '') {
      this.toast.error('Please enter title');
      return false;
    }
    if (this.description == '') {
      this.toast.error('Please enter description');
      return false;
    }
    if (this.more == '') {
      this.toast.error('Please enter Link');
      return false;
    }
    return true;
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showImageUrl = reader.result;
      };
    }
  }


  saveret() {
    if (this.ret != null) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('image', this.image);
      formData.append('description', this.description);
      formData.append('more', this.more);
      formData.append('id', this.ret.id);
      this.apiService.postAPI(this.apiService.BASE_URL + 'onlineRetailers/updateOnlineRetailers', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addret();
    }
  }


  addret() {
    if (this.validation()) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('image', this.image);
      formData.append('description', this.description);
      formData.append('more', this.more);
      this.apiService.postAPI(this.apiService.BASE_URL + 'onlineRetailers/addOnlineRetailers', formData).then((result) => {
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
