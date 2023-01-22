import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-add-update-subsubcategory',
  templateUrl: './add-update-subsubcategory.component.html',
  styleUrls: ['./add-update-subsubcategory.component.css']
})
export class AddUpdateSubsubcategoryComponent implements OnInit {

  name;
  enable = false;
  @Input() subsubcat_data = null;
  @Input() subsubcat_id;

  subsubname = '';
  description = '';

  subcat_id;
  cat_id;

  image1;
  showImage1Url;

  image2;
  showImage2Url;

  image3;
  showImage3Url;

  banner;
  showbannerUrl;
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
    console.log(this.subsubcat_data)
    if (this.subsubcat_data != null) {
      console.log(this.subsubcat_data);
      this.subsubname = this.subsubcat_data.subsubname;
      this.description = this.subsubcat_data.description;
      this.subsubcat_id = this.subsubcat_data.id;
      this.cat_id = this.subsubcat_data.category_id;
      this.subcat_id = this.subsubcat_data.subcat_id;
      this.showImage1Url = this.apiService.BASE_IMAGE_URL + this.subsubcat_data.image;
      this.showImage2Url = this.apiService.BASE_IMAGE_URL + this.subsubcat_data.image2;
      this.showImage3Url = this.apiService.BASE_IMAGE_URL + this.subsubcat_data.image3;
      this.showbannerUrl = this.apiService.BASE_IMAGE_URL + this.subsubcat_data.banner;
    }
    this.subcat_id = localStorage.getItem('sub_id');
    this.cat_id = localStorage.getItem('category_id');
  }

  onselectimage1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image1 = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showImage1Url = reader.result;
      };
    }
  }

  onselectimage2(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image2 = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showImage2Url = reader.result;
      };
    }
  }

  onselectimage3(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image3 = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showImage3Url = reader.result;
      };
    }
  }

  onselectbanner(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.banner = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showbannerUrl = reader.result;
      };
    }
  }

  savesubsubcats() {
    if (this.subsubcat_data != null) {

      let formData = new FormData();
      formData.append('image', this.image1);
      formData.append('image2', this.image2);
      formData.append('image3', this.image3);
      formData.append('banner', this.banner);
      formData.append('id', this.subsubcat_id);
      formData.append('subsubname', this.subsubname);
      formData.append('description', this.description);
      formData.append('category_id', this.cat_id);
      formData.append('subcat_id', this.subcat_id);


      this.apiService.postAPI(this.apiService.BASE_URL + 'subSubCategory/updateSubSubCategory', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
    else {
      this.addsubcats();
    }
  }


  addsubcats() {
    let formData = new FormData();
    formData.append('category_id', this.cat_id);
    formData.append('subcat_id', this.subcat_id);
    formData.append('image', this.image1);
    formData.append('image2', this.image2);
    formData.append('image3', this.image3);
    formData.append('banner', this.banner);
    formData.append('subsubname', this.subsubname);
    formData.append('description', this.description);

    this.apiService.postAPI(this.apiService.BASE_URL + 'subSubCategory/addSubSubCategory', formData).then((result) => {
      if (result.status) {
        this.activeModal.close();
      } else {
        alert("please fill all the fields");
      }
    }
      , (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
  }

}
