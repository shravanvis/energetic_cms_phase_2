import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../service/api.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-oem-section1',
  templateUrl: './add-update-oem-section1.component.html',
  styleUrls: ['./add-update-oem-section1.component.css']
})
export class AddUpdateOemSection1Component implements OnInit {

 name;
  enable = false;
  @Input() OemSec1 = null;
  @Input() id;

  title = '';
  description = '';
  maindesc = '';

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
    if (this.OemSec1 != null) {
      this.id = this.OemSec1.id;
      this.title = this.OemSec1.title;
      this.maindesc = this.OemSec1.maindesc;
      this.description = this.OemSec1.description;
      this.showImageUrl = this.OemSec1.image;
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
        name: "titleText",
        class: "titleText",
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

  saveOemSec1() {
    if (this.OemSec1 != null) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('maindesc', this.maindesc);
      formData.append('image', this.image);
      formData.append('id', this.id);
      this.apiService.postAPI(this.apiService.BASE_URL + 'oem/updateOemSec1', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addOemSec1();
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
    if (this.maindesc == '') {
      this.toast.error('Please enter button name');
      return false;
    }
    return true;
  }

  addOemSec1() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('maindesc', this.maindesc);
      formData.append('image', this.image);

      this.apiService.postAPI(this.apiService.BASE_URL + 'oem/addOemSec1', formData).then((result) => {
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


  deleteOemSec1() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'oem/deleteOemSec1/' + this.OemSec1.id).then((result) => {
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
