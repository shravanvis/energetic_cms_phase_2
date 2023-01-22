import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-news',
  templateUrl: './add-update-news.component.html',
  styleUrls: ['./add-update-news.component.css']
})
export class AddUpdateNewsComponent implements OnInit {
  @Input() news = null;

  id;
  title: string = "";
  description: string = "";
  Link: string = "";

  image;
  showImageUrl;
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.news != null) {
      this.id = this.news.id;
      this.title = this.news.title;
      this.description = this.news.description;
      this.showImageUrl = this.apiService.BASE_IMAGE_URL + this.news.image;
    }
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

  savenews() {
    if (this.news != null) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('image', this.image);
      formData.append('id', this.id);
      this.apiService.postAPI(this.apiService.BASE_URL + 'news/updateNews', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addnews();
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
    return true;
  }

  addnews() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('image', this.image);

      this.apiService.postAPI(this.apiService.BASE_URL + 'news/addNews', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
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
