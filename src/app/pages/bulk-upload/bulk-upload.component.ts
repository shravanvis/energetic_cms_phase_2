import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {


  datacat: any = [];
  datasubcat: any = [];
  datasubsubcat: any = [];
  datapro: any = [];
  dataApplication: any = [];
  disable: boolean = false;
  showImage1Url;
  image1;
  image2;
  image3;
  image4;
  image5;

  allLevels = [];

  constructor(
    private apiService: ApiService, private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getcat();
    this.getsubcat();
    this.getsubsubcat();
    this.getpro();
    this.getApplication();
    this.getallLevels();
  }

  category_id;
  sub_cat_id;
  subsub_cat_id;
  allcat = [];
  allsubcat = [];
  allsubsubcat = [];
  allapplication = [];
  specialProduct = [];

  oncatchange() {
    this.subcat(this.category_id)
  }

  subcat(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subCategory/getSubCategoryBycategory/' + id).then((result) => {
      this.allsubcat = result.result;
    })
  }

  subsubcat(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subSubCategory/getSubSubCategoryBySubid/' + id).then((result) => {
      this.allsubsubcat = result.result;
    })
  }

  onsubcatchange() {
    this.subsubcat(this.sub_cat_id)
  }

  onselectimage1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image1 = file
    }
  }
  onselectimage2(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image2 = file
    }
  }
  onselectimage3(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image3 = file
    }
  }

  onselectimage4(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image4 = file
    }
  }

  onselectimage5(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image5 = file
    }
  }

  getcat() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'category').then((result) => {
      this.datacat = result.result;
    })
  }
  getsubcat() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subCategory').then((result) => {
      this.datasubcat = result.result;
    })
  }
  getsubsubcat() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subSubCategory').then((result) => {
      this.datasubsubcat = result.result;
    })
  }
  getpro() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'product').then((result) => {
      this.datapro = result.result;
    })
  }

  getApplication() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'applications').then((result) => {
      this.dataApplication = result.result;
    })
  }

  getallLevels() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'user/getAllLevels').then((result) => {
      this.allLevels = result.result;
      console.log(this.allLevels);
    })
  }

  save1() {
    let formData = new FormData();
    formData.append('file', this.image1);

    this.apiService.postAPI(this.apiService.BASE_URL + 'product/importProduct', formData).then(res => {
      this.toast.success('saved successfully');
    })
  }
  save2() {
    let formData = new FormData();
    formData.append('file', this.image2);

    this.apiService.postAPI(this.apiService.BASE_URL + 'product/importProductspecification', formData).then(res => {
      this.toast.success('saved successfully');
    })
  }
  save3() {
    let formData = new FormData();
    formData.append('file', this.image3);

    this.apiService.postAPI(this.apiService.BASE_URL + 'product/importProductdimension', formData).then(res => {
      this.toast.success('saved successfully');
    })
  }

  save4() {
    let formData = new FormData();
    formData.append('file', this.image4);

    this.apiService.postAPI(this.apiService.BASE_URL + 'product/importProductLevel', formData).then(res => {
      this.toast.success('saved successfully');
    })
  }

  save5() {
    let formData = new FormData();
    formData.append('file', this.image5);

    this.apiService.postAPI(this.apiService.BASE_URL + 'product/importProductRetailer', formData).then(res => {
      this.toast.success('saved successfully');
    })
  }


}
