import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../service/api.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-oem-locations',
  templateUrl: './add-update-oem-locations.component.html',
  styleUrls: ['./add-update-oem-locations.component.css']
})
export class AddUpdateOemLocationsComponent implements OnInit {


 name;
  enable = false;
  @Input() OemLocations = null;
  @Input() id;

  headquater = '';
  phone = '';
  location = '';
  fax='';

  image;
  showImageUrl;
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  close() {
    this.activeModal.close();
  }

  ngOnInit(): void {
    if (this.OemLocations != null) {
      this.id = this.OemLocations.id;
      this.headquater = this.OemLocations.headquater;
      this.location = this.OemLocations.location;
      this.phone = this.OemLocations.phone;
      this.fax = this.OemLocations.fax;
      this.showImageUrl = this.OemLocations.image;
    }

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
        name: "headquaterText",
        class: "headquaterText",
        tag: "h1",
      },
    ]
  };

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

  saveOemLocations() {
    if (this.OemLocations != null) {
      let formData = new FormData();
      formData.append('headquater', this.headquater);
      formData.append('phone', this.phone);
      formData.append('location', this.location);
      formData.append('fax', this.fax);
      formData.append('image', this.image);
      formData.append('id', this.id);
      this.apiService.postAPI(this.apiService.BASE_URL + 'oem/updateOemLocation', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addOemLocations();
    }
  }

  validation() {
    if (this.headquater == '') {
      this.toast.error('Please enter headquater');
      return false;
    }
    if (this.phone == '') {
      this.toast.error('Please enter phone');
      return false;
    }
    if (this.location == '') {
      this.toast.error('Please enter button name');
      return false;
    }
    return true;
  }

  addOemLocations() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('headquater', this.headquater);
      formData.append('phone', this.phone);
      formData.append('location', this.location);
      formData.append('fax', this.fax);
      formData.append('image', this.image);

      this.apiService.postAPI(this.apiService.BASE_URL + 'oem/addOemLocation', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    }
  }

  /*printKeyValuePairs(url: string, postdata) {
    console.log('url:-' + url);
    console.log('--------------FORM DATA---------------');
    let data = '';
    postdata.forEach((value, key) => {
      // console.log(key + ':' + value)
      data += key + ':' + value + '\n';
    });
    console.log(data);
    console.log('--------------FORM DATA---------------');
  }*/


  deleteOemLocations() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'oem/deleteOemLocation/' + this.OemLocations.id).then((result) => {
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
