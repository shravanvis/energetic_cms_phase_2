import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAboutUsComponent } from 'app/modals/add-about-us/add-about-us.component';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  aboutus: any = [];

  showImageUrl;
  image;
  about_id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getallaboutus();
  }

  getallaboutus() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'aboutus/getAllAboutusWithImage').then(res => {
      console.log(res);
      this.aboutus = res.result;
    })
  }

  addabout() {
    const modalRef = this.modalService.open(AddAboutUsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallaboutus()
    })
  }

  addimages(content, id) {
    this.about_id = id
    alert(id)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    })
  }

  editabout(about) {
    const modalRef = this.modalService.open(AddAboutUsComponent, {
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallaboutus();
    })
    modalRef.componentInstance.about = about;
  }

  deleteabout(id: number) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'deleteAboutus/' + id).then((result) => {
      if (result.status) {
        alert("Deleted");
        this.getallaboutus()
      } else {
        alert("Not found");
      }

    }, (error) => {
      alert("something went wrong");
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

  saveImages() {
    let formData = new FormData();
    formData.append('image', this.image);
    formData.append('about_id', this.about_id);
    this.apiService.postAPI(this.apiService.BASE_URL + 'aboutus/addAboutusImages', formData).then((result) => {
      if (result.status) {
        alert("Added");
        this.modalService.dismissAll();
        this.getallaboutus();
      } else {
        alert("Not found");
      }
    })
  }

  deleteimage(id: number) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'aboutus/deleteAboutusImages/' + id).then((result) => {
      if (result.status) {
        alert("Deleted");
        this.getallaboutus();
      } else {
        alert("Not found");
      }
    }, (error) => {
      alert("something went wrong");
    })
  }
}
