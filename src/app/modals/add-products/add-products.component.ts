import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  @Input() prod = null;

  allcat = [];
  allsubcat = [];
  allsubsubcat = [];
  allapplication = [];
  specialProduct = [];

  product_name: string = "";
  category_id: string = "";
  sub_cat_id: string = "";
  subsub_cat_id: string = "";
  features: string = "";
  is_new: string = "";
  application: string = "";
  title: string = "";
  is_featured: string = "";
  is_active: string = "";
  description: string = "";
  application_id: string = "";
  active: boolean = false;
  new_pro: boolean = false;
  featured: boolean = false;
  listings_id: string = "";

  id;

  image;
  showImageUrl;

  image2;
  showImage2Url;

  image3;
  showImage3Url;

  image4;
  showImage4Url;

  datasheet;
  datasheetURL;

  banner;
  showBannerUrl;

  updateview: boolean = false;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  alllistings = [
    { id: 1, name: 'CLEARANCE & SALE PRODUCTS' },
    { id: 2, name: 'DLC5 & DLC5.1 PRODUCTS' },
    { id: 3, name: 'NEW Q3 2021 PRODUCTS' },
    { id: 4, name: 'WATTAGE & CCT SELECTABLE SOLUTIONS' },
    { id: 5, name: 'TITLE 24 Qualified' },
    { id: 6, name: 'TITLE 24 JA8' },
  ]
  selectedApp: Array<number> = [];
  ngOnInit(): void {
    if (this.prod != null) {
      this.updateview = true;
      console.log(this.prod)
      this.id = this.prod.id;
      this.product_name = this.prod.product_name;
      this.category_id = this.prod.category_id;
      this.oncatchange();
      this.sub_cat_id = this.prod.sub_cat_id;
      this.onsubcatchange();
      this.subsub_cat_id = this.prod.subsub_cat_id;
      this.features = this.prod.features;
      this.is_new = this.prod.is_new;
      this.title = this.prod.title;
      this.is_featured = this.prod.is_featured;
      //this.listings_id = this.prod.special_product_id;
      this.is_active = this.prod.is_active;
      this.description = this.prod.description;
      // this.application_id = this.prod.application_id;
      this.showImageUrl = this.apiService.BASE_IMAGE_URL + this.prod.image;
      this.active = this.prod.is_active == '1' ? true : false;
      this.new_pro = this.prod.is_new == '1' ? true : false;
      this.featured = this.prod.is_featured == '1' ? true : false;
      this.showImage2Url = this.apiService.BASE_IMAGE_URL + this.prod.image2;
      this.showImage3Url = this.apiService.BASE_IMAGE_URL + this.prod.image3;
      this.showImage4Url = this.apiService.BASE_IMAGE_URL + this.prod.image4;
      this.datasheet = this.prod.datasheet;
      this.application = this.prod.application;
      this.datasheetURL = this.apiService.BASE_IMAGE_URL + this.prod.datasheet;
      this.showBannerUrl = this.apiService.BASE_IMAGE_URL + this.prod.banner;

      let application_id = JSON.parse('[' + this.prod.application_id.replace(/,\s*,/, ',0,') + ']')
      this.selectedApp = application_id
      console.log(this.selectedApp)
    }
    this.hidedatasheet = true;
    this.cat();
    this.specialPro();
    // this.subcat();
    // this.subsubcat();
    this.applications();

    // this.selectedApp = [1, 2, 6, 11, 14];
  }

  onSelect(item) {
    let data = [];
    (data.push(item)).toString();
    this.appl_id_array = data;
  }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };


  cat() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'category').then((result) => {
      this.allcat = result.result;
    })
  }

  oncatchange() {
    this.subcat(this.category_id)
  }
  subcat(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subCategory/getSubCategoryBycategory/' + id).then((result) => {
      this.allsubcat = result.result;
    })
  }

  onsubcatchange() {
    this.subsubcat(this.sub_cat_id)
  }

  subsubcat(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subSubCategory/getSubSubCategoryBySubid/' + id).then((result) => {
      this.allsubsubcat = result.result;
    })
  }

  applications() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'applications').then((result) => {
      let data = result.result;
      for (let i = 0; i < data.length; i++) {
        this.allapplication.push({
          id: data[i].id,
          display: data[i].title
        })
      }
    })
  }

  specialPro() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'specialProduct').then((result) => {
      this.specialProduct = result.result;
    })
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

  removeImage() {
    this.image = '';
  }


  selectImage2(event: any) {
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
  @ViewChild('Image2', { static: false })
  myFileInput: ElementRef;
  removeImage2() {
    this.myFileInput.nativeElement.value = null;
    this.image2 = null;
  }
  selectImage3(event: any) {
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
  selectImage4(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image4 = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.showImage4Url = reader.result;
      };
    }
  }

  selectDataSheet(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.datasheet = file

      this.hidedatasheet = true;

      if (this.prod) {
        this.hidedatasheet = true;

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.datasheetURL = reader.result;
        };
      }
    }
  }

  removeDataSheet() {
    this.datasheetURL = '';
  }

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

  saveprod() {
    if (this.prod != null) {
      let formData = new FormData();
      formData.append('id', this.prod.id);
      formData.append('product_name', this.product_name);
      formData.append('image', this.image);
      formData.append('image2', this.image2);
      formData.append('image3', this.image3);
      formData.append('image4', this.image4);
      formData.append('banner', this.banner);
      formData.append('datasheet', this.datasheet);
      formData.append('category_id', this.category_id);
      formData.append('sub_cat_id', this.sub_cat_id);
      formData.append('subsub_cat_id', this.subsub_cat_id);
      formData.append('features', this.features);
      formData.append('description', this.description);
      formData.append('application', this.application);
      formData.append('title', this.title);
      //formData.append('application_id', this.application_id);
      //formData.append('special_product_id', this.listings_id);

      formData.append('special_product_id', '0');

      if (this.application_id == null) {
        formData.append('application_id', '0');
      }
      else {
        formData.append('application_id', this.appl_id_array);
      }

      if (this.new_pro == true) {
        formData.append('is_new', '1');
        this.apiService.postAPI(this.apiService.BASE_URL + 'subCategory/updateSubCategory', {
          id: this.sub_cat_id,
          is_new: '1'
        }).then((res) => {
          console.log('subcategory updated');
        })
      }
      if (this.new_pro == false) {
        formData.append('is_new', '0');
        this.apiService.postAPI(this.apiService.BASE_URL + 'subCategory/updateSubCategory', {
          id: this.sub_cat_id,
          is_new: '0'
        }).then((res) => {
          console.log('subcategory updated');
        })
      }
      if (this.active == true) {
        formData.append('is_active', '1');
      }
      if (this.active == false) {
        formData.append('is_active', '0');
      }
      if (this.featured == true) {
        formData.append('is_featured', '1');
      }
      if (this.featured == false) {
        formData.append('is_featured', '0');
      }

      // console.log(this.appl_id_array)
      this.apiService.postAPI(this.apiService.BASE_URL + 'product/updateProduct', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
          this.toast.success('Product updated successfully');
        } else {
          alert("please fill all the fields");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addprod();
    }
  }

  appl_id_array: any = [];
  public onMouseDown(event: MouseEvent, item) {
    event.preventDefault();
    event.target['selected'] = !event.target['selected'];
    if (event.target['selected']) {
      this.appl_id_array.push(item.id);
    } else {
      let index: number = -1;
      index = this.appl_id_array.indexOf(item.id);
      if (index > -1) {
        this.appl_id_array.splice(index);
      }
    }
  }

  validation() {
    if (this.title == '') {
      this.toast.error('Please enter title');
      return false;
    }
    if (this.category_id == '') {
      this.toast.error('Please enter category_id');
      return false;
    }
    if (this.sub_cat_id == '') {
      this.toast.error('Please enter sub_cat_id');
      return false;
    }
    // if (this.subsub_cat_id == '') {
    //   this.toast.error('Please enter subsub_cat_id');
    //   return false;
    // }
    if (this.features == '') {
      this.toast.error('Please enter features');
      return false;
    }
    if (this.description == '') {
      this.toast.error('Please enter description');
      return false;
    }
    if (this.application == '') {
      this.toast.error('Please enter application');
      return false;
    }
    // if (this.application_id == '' || this.application_id.length == 0) {
    //   this.toast.error('Please enter application_id');
    //   return false;
    // }
    if (this.image == '') {
      this.toast.error('Please enter image');
      return false;
    }
    if (this.image2 == '') {
      this.toast.error('Please enter image2');
      return false;
    }
    if (this.image3 == '') {
      this.toast.error('Please enter image3');
      return false;
    }
    if (this.image4 == '') {
      this.toast.error('Please enter image4');
      return false;
    }
    return true;
  }

  addprod() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('product_name', this.product_name);
      formData.append('image', this.image);
      formData.append('image2', this.image2);
      formData.append('image3', this.image3);
      formData.append('image4', this.image4);
      formData.append('banner', this.banner);
      formData.append('datasheet', this.datasheet);
      formData.append('category_id', this.category_id);
      formData.append('sub_cat_id', this.sub_cat_id);
      if (this.subsub_cat_id != null && this.subsub_cat_id != '' && this.subsub_cat_id != undefined) {
        formData.append('subsub_cat_id', this.subsub_cat_id);
      }
      else {
        formData.append('subsub_cat_id', '0');
      }
      // formData.append('subsub_cat_id', this.subsub_cat_id);
      formData.append('features', this.features);
      formData.append('description', this.description);
      formData.append('application', this.application);
      formData.append('title', this.title);
      //formData.append('application_id', this.application_id);
      // formData.append('special_product_id', this.listings_id);

      formData.append('special_product_id', '0');

      if (this.application_id == null) {
        formData.append('application_id', '0');
      }
      else {
        formData.append('application_id', this.appl_id_array);
      }

      if (this.active == true) {
        formData.append('is_active', '1');
      }
      else {
        formData.append('is_active', '0');
      }
      if (this.new_pro == true) {
        formData.append('is_new', '1');
        this.apiService.postAPI(this.apiService.BASE_URL + 'subCategory/updateSubCategory', {
          id: this.sub_cat_id,
          is_new: '1'
        }).then((res) => {
          console.log('subcategory updated');
        })
      }
      if (this.new_pro == false) {
        formData.append('is_new', '0');
        this.apiService.postAPI(this.apiService.BASE_URL + 'subCategory/updateSubCategory', {
          id: this.sub_cat_id,
          is_new: '0'
        }).then((res) => {
          console.log('subcategory updated');
        })
      }
      if (this.featured == true) {
        formData.append('is_featured', '1');
      }
      else {
        formData.append('is_featured', '0');
      }

      this.apiService.postAPI(this.apiService.BASE_URL + 'product/addProduct', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
          this.toast.success('Product added successfully');
        } else {
          alert("something went wrong");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
  }

  hidedatasheet: boolean = false;
  deldatasheet() {
    this.hidedatasheet = false;
    let formdata = {
      id: this.prod.id,
      datasheet: 'deleted'
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'product/removeProductImagesAndFiles', formdata).then((res) => {
      this.toast.show('Datasheet Deleted')
    })
  }

  delimage2() {
    this.showImage2Url = '';
    let formdata = {
      id: this.prod.id,
      image2: 'deleted'
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'product/removeProductImagesAndFiles', formdata).then((res) => {
      this.toast.show('image Deleted')
    })
  }

  delimage3() {
    this.showImage3Url = false;
    let formdata = {
      id: this.prod.id,
      image3: 'deleted'
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'product/removeProductImagesAndFiles', formdata).then((res) => {
      this.toast.show('image Deleted')
    })
  }

  delimage4() {
    this.showImage4Url = false;
    let formdata = {
      id: this.prod.id,
      image4: 'deleted'
    }
    this.apiService.postAPI(this.apiService.BASE_URL + 'product/removeProductImagesAndFiles', formdata).then((res) => {
      this.toast.show('image Deleted')
    })
  }


  close() {
    this.activeModal.close();
  }
}
