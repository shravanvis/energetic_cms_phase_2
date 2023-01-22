import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-banners-cms',
  templateUrl: './banners-cms.component.html',
  styleUrls: ['./banners-cms.component.css']
})
export class BannersCmsComponent implements OnInit {

  allData: any;
  pageName;
  id;
  title;
  description;
  image;
  show_ImageUrl;

  show_Input = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'banner').then((res) => {
      this.allData = res.result;
    })
  }

  onchange() {
    this.getbanner(this.pageName)

    console.log(this.pageName)
    if(this.pageName == 'product_page'){
      this.show_Input = false;
    }
  }



  Save() {
    let formData = new FormData();
    formData.append('image', this.image);
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('id', this.id);
    formData.append('page', this.pageName);
    this.apiService.postAPI(this.apiService.BASE_URL + 'banner/updateBanner', formData).then((res) => {
      this.getdata();
      alert('Successfully Updated');
      this.title = '';
      this.description = '';
      this.show_ImageUrl = '';
    })
  }

  getbanner(Name) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'banner/getBannerByPage/' + Name).then((res) => {
      this.show_ImageUrl = this.apiService.BASE_IMAGE_URL + res.result[0].image;
      this.id = res.result[0].id;
      this.title = res.result[0].title;
      this.description = res.result[0].description;
    })
  }


  selectbanner(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.show_ImageUrl = reader.result;
      };
    }
  }
}
