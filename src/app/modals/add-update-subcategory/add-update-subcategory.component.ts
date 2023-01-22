import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-add-update-subcategory',
  templateUrl: './add-update-subcategory.component.html',
  styleUrls: ['./add-update-subcategory.component.css']
})
export class AddUpdateSubcategoryComponent implements OnInit {

  name;
  enable = false;
  @Input() subcat = null;
  @Input() subid;
  @Input() catid;

  is_active;

  subname = '';
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    public activatedroute: ActivatedRoute
  ) {
  }

  close() {
    this.activeModal.close();
  }

  ngOnInit(): void {
    if (this.subcat != null) {
      this.subid = this.subcat.id;
      this.subname = this.subcat.subname;
      this.showImageUrl =  this.subcat.image;
      this.showBannerUrl = this.apiService.BASE_IMAGE_URL + this.subcat.banner;
      this.is_active = this.subcat.is_active == '1' ? true : false;
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

  Banner;
  showBannerUrl;
  onselectBanner(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Banner = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showBannerUrl = reader.result;
      };
    }
  }

  savesubcats() {
    if (this.subcat != null) {
      let formData = new FormData();
      formData.append('banner', this.Banner);
      formData.append('image', this.image);
      formData.append('subname', this.subname);
      formData.append('category_id', this.catid);
      formData.append('id', this.subcat.id);
      if (this.is_active == true) {
        formData.append('is_active', '1');
      }
      if (this.is_active == false) {
        formData.append('is_active', '0');
      }
      this.apiService.postAPI(this.apiService.BASE_URL + 'subCategory/updateSubCategory', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addsubcats();
    }
  }


  addsubcats() {
    let formData = new FormData();

    formData.append('image', this.image);
    formData.append('banner', this.Banner);
    formData.append('subname', this.subname);
    formData.append('category_id', this.catid);
    formData.append('is_new', '0');
    if (this.is_active == true) {
      formData.append('is_active', '1');
    }
    else {
      formData.append('is_active', '0');
    }

    this.apiService.postAPI(this.apiService.BASE_URL + 'subCategory/addSubCategory', formData).then((result) => {
      if (result.status = 'true') {
        this.activeModal.close();
      } else {
        alert("please fill all the fields");
      }
    }, (error) => {
      console.log('error:-' + JSON.stringify(error));
    })
  }


  deletesubcats() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subCategory/deleteSubCategory/' + this.subcat.id).then((result) => {
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
