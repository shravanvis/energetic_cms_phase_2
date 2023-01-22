import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.css']
})
export class AddUpdateCategoryComponent implements OnInit {

  name;
  enable = false;
  @Input() cat = null;
  @Input() id;

  cat_name = '';
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {
  }

  close() {
    this.activeModal.close();
  }

  ngOnInit(): void {

    console.log(this.cat)
    if (this.cat != null) {
      this.id = this.cat.id;
      this.cat_name = this.cat.name;
      this.showImageUrl = this.cat.image;
      this.showBannerUrl = this.cat.banner;
    }
    

  }


  image;
  showImageUrl;
  onselectimage(event: any) {
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

  banner;
  showBannerUrl;
  onselectBanner(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.banner = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showBannerUrl = reader.result;
      };
    }
  }

  savecats() {
    if (this.cat != null) {
      let formData = new FormData();
      formData.append('banner', this.banner);
      formData.append('id', this.cat.id);
      formData.append('image', this.image);
      formData.append('name', this.cat_name);
      this.apiService.postAPI(this.apiService.BASE_URL + 'category/updateCategory', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addcats();
    }
  }


  addcats() {
    let formData = new FormData();

    formData.append('image', this.image);
    formData.append('banner', this.banner);
    formData.append('name', this.cat_name);

    this.apiService.postAPI(this.apiService.BASE_URL + 'category/addCategory', formData).then((result) => {
      if (result.status = 'true') {
        this.activeModal.close();
      } else {
        alert("please fill all the fields");
      }
    }, (error) => {
      console.log('error:-' + JSON.stringify(error));
    })
  }


  deletecats() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'category/deleteCategory/' + this.cat.id).then((result) => {
      if (result.status) {
        alert("Deleted");
      } else {
        alert("Not found");
      }

    }, (error) => {
      alert("something went wrong");
    })
  }
}
