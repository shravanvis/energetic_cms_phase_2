import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AddCatalogsComponent } from '../add-catalogs/add-catalogs.component';

@Component({
  selector: 'app-add-global-resources',
  templateUrl: './add-global-resources.component.html',
  styleUrls: ['./add-global-resources.component.css']
})
export class AddGlobalResourcesComponent implements OnInit {
  @Input() cata = null;

  id;
  title: string = "";
  description: string = "";
  image;
  showImageUrl;
  pdf;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.cata != null) {
      this.id = this.cata.id;
      this.title = this.cata.title;
      this.pdf = this.cata.pdf;
      this.showImageUrl = this.apiService.BASE_IMAGE_URL + this.cata.image;
    }
    this.getGlobalReso();
  }

  list_cat: any = [];
  getGlobalReso() {
    this.list_cat = [];
    this.apiService.getAPI(this.apiService.BASE_URL + 'catelogs').then((result) => {
      console.log(result);
      this.list_cat = result.result.filter((m: any) => m.page === 'resources');
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

  selectpdf(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pdf = file
    }
  }

  savecata() {
    if (this.cata != null) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('image', this.image);
      formData.append('id', this.cata.id);
      formData.append('pdf', this.pdf);
      formData.append('page', 'catalog');
      this.apiService.postAPI(this.apiService.BASE_URL + 'catelogs/updateCatelogs', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        } else {
          alert("please fill all the fields");
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addcata();
    }
  }


  validation() {
    if (this.title == '') {
      this.toast.error('Please enter title');
      return false;
    }
    return true;
  }

  addcata() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('title', this.title);
      formData.append('image', this.image);
      formData.append('pdf', this.pdf);
      formData.append('page', 'catalog');

      this.apiService.postAPI(this.apiService.BASE_URL + 'catelogs/addCatelogs', formData).then((result) => {
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

  editres(item){
    const modalRef = this.modalService.open(AddCatalogsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getGlobalReso();
    })
    modalRef.componentInstance.global = 'global';
    modalRef.componentInstance.globalitem = item;
  }

  addnew() {
    const modalRef = this.modalService.open(AddCatalogsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getGlobalReso();
    })
    modalRef.componentInstance.global = 'global';
  }
}
