import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../service/api.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-applications',
  templateUrl: './add-update-applications.component.html',
  styleUrls: ['./add-update-applications.component.css']
})
export class AddUpdateApplicationsComponent implements OnInit {


  name;
  enable = false;
  @Input() Applications = null;
  @Input() id;

  title = '';
  description = '';
  button_name = '';

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
    if (this.Applications != null) {
      this.id = this.Applications.id;
      this.title = this.Applications.title;
      this.button_name = this.Applications.button_name;
      this.description = this.Applications.description;
      this.showImageUrl = this.Applications.image;
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

  saveApplications() {
    if (this.Applications != null) {
      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('button_name', this.button_name);
      formData.append('image', this.image);
      formData.append('id', this.id);
      this.apiService.postAPI(this.apiService.BASE_URL + 'applications/updateApplications', formData).then((result) => {
        if (result.status) {
          this.activeModal.close();
        }
      }, (error) => {
        console.log('error:-' + JSON.stringify(error));
      })
    } else {
      this.addApplications();
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
    if (this.button_name == '') {
      this.toast.error('Please enter button name');
      return false;
    }
    return true;
  }

  addApplications() {
    if (this.validation()) {
      let formData = new FormData();

      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('button_name', this.button_name);
      formData.append('image', this.image);

      this.apiService.postAPI(this.apiService.BASE_URL + 'applications/addApplications', formData).then((result) => {
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


  deleteApplications() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'applications/deleteApplications/' + this.Applications.id).then((result) => {
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
