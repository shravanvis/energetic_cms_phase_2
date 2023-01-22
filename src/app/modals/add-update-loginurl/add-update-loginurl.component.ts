
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../service/api.service";

@Component({
    selector: 'app-add-update-loginurl',
    templateUrl: './add-update-loginurl.component.html',
    styleUrls: ['./add-update-loginurl.component.css']
})
export class AddUpdateLoginurlComponent implements OnInit {
    @Input() Loginurl = null;
    @Input() id;

    url: any = '';

    constructor(
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private apiService: ApiService
    ) {
    }



    ngOnInit(): void {
        if (this.Loginurl != null) {
            this.url = this.Loginurl.url;
            this.id = this.Loginurl.id;
            alert(this.Loginurl.url);
        }
    }

    saveLoginurl() {
        if (this.Loginurl != null) {

            let formData = new FormData();

            formData.append('url', this.url);

            formData.append('id', this.Loginurl.id);


            this.apiService.postAPI(this.apiService.BASE_URL + 'loginurlRoute/updateLoginurl', formData).then((result) => {
                if (result.status) {
                    this.activeModal.close();
                } else {
                    alert("Url can’t be empty");
                }
            }, (error) => {
                console.log('error:-' + JSON.stringify(error));
            })

        } else {
            this.addLoginurl();
        }
    }


    addLoginurl() {
        alert(this.url);
        /* let formData = new FormData();
             formData.append('url', this.url);
             this.apiService.postAPI(this.apiService.BASE_URL + 'loginurlRoute/addLoginurl', formData).then((result) => {
                 if (result.status) {
                     this.activeModal.close();
                 } else {
                     alert("Title can’t be empty");
                 }
             }, (error) => {
                 console.log('error:-' + JSON.stringify(error));
             })*/
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


    deleteLoginurl() {
        this.apiService.getAPI(this.apiService.BASE_URL + 'loginurlRoute/deleteLoginurl/' + this.Loginurl.id).then((result) => {
            if (result.status) {
                alert("Deleted");
            } else {
                alert("Not found");
            }

        }, (error) => {
            alert("something went wrong");
        })
    }

    close() {
        this.activeModal.close();
    }

}
