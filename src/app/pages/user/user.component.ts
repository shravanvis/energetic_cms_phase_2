import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {UtilService} from '../../service/util.service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LocationEditorComponent} from '../../modals/location-editor/location-editor.component';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
id;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;

    constructor(
        private apiService: ApiService,
        private utilService: UtilService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        
            this.list();
      
    }

 
list_user = [];
    
    list() {
    this.list_user = [];
        this.apiService.getAPI(this.apiService.BASE_URL + 'user/list').then((result) => {
        console.log(result.result.result);
            if (result.statusCode) {

            for(let i = 0; i < result.result.result.length; i++){
               
                let firstName = result.result.result[i].firstName
                let userType = result.result.result[i].userType
                let phone = result.result.result[i].phone
                let email = result.result.result[i].email
                let id = result.result.result[i].id
              this.list_user.push({
                firstName: firstName,
                phone: phone,
                userType: userType,
                email : email,
                id : id
              });
              }
            }
    })
    }

    

    

  deleteContact(id){
       this.apiService.deleteAPI(this.apiService.BASE_URL + 'contact/' + id).then((result) => {
                if (result.statusCode) {
                    alert("Deleted");
                    this.list()
                } else {
                    alert("Not found");
                }

            }, (error) => {
                alert("something went wrong");
            })
}


}
