import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ApiService} from '../../service/api.service';

@Component({
    selector: 'app-edit-teacher',
    templateUrl: './edit-teacher.component.html',
    styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

    @Input() chefId;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;

    basic_tab: boolean = true;
    bank_tab: boolean = false;
    location_tab: boolean = false;

    user_name = '';
    user_email = '';
    user_phone = '';
    user_address = '';
    user_landmark = '';
    google_location = '';
    account_holder_name = '';
    account_no = '';
    ifsc = '';
    account_type = '';
    user_fssai = '';
    user_minimum_order_value = '';

    selectedLocation = null;

    chefDetail = null;
    prospect_status = false;
    business_status = false;

    constructor(
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private apiService: ApiService
    ) {

    }

    ngOnInit(): void {
        if (this.chefId != undefined) {
            console.log('chefDetail:-' + this.chefId);
            this.getChefDetail();
        }
    }

    getChefDetail() {
        this.apiService.postAPI(this.apiService.BASE_URL + 'user/getChefFullDetailByChefId', {
            chef_id: this.chefId,
            cus_id: ''
        }).then((result) => {
            console.log('chef detail:-' + JSON.stringify(result, null, 4));
            if (result.status) {
                this.chefDetail = result.result;
                this.setChefProfile();
            }
        }, (error) => {
            alert('something went wrong');
        })
    }

    setChefProfile() {
        this.user_name = this.chefDetail.profile.name;
        this.user_email = this.chefDetail.profile.email;
        this.user_phone = this.chefDetail.profile.phone;
        this.user_minimum_order_value = this.chefDetail.profile.min_order_val;
        if (this.chefDetail.location != null) {
            this.user_address = this.chefDetail.location.address;
            this.user_landmark = this.chefDetail.location.landmark;
            this.google_location = this.chefDetail.location.formatted_address;
            this.selectedLocation = {
                place_id: this.chefDetail.location.place_id,
                formatted_address: this.chefDetail.location.formatted_address,
                location: {
                    lat: this.chefDetail.location.lat,
                    lng: this.chefDetail.location.lng
                }
            }
        }
        console.log('this.chefDetail.prospect_status:-' + this.chefDetail.profile.prospect_status);
        if (this.chefDetail.profile.prospect_status == 0) {
            this.prospect_status = false;
        } else {
            this.prospect_status = true;
        }
        if (this.chefDetail.profile.business_status == 0) {
            this.business_status = false;
        } else {
            this.business_status = true;
        }
        if (this.chefDetail.bank_detail != null) {
            this.account_holder_name = this.chefDetail.bank_detail.account_holder_name;
            this.account_no = this.chefDetail.bank_detail.acc_no;
            this.ifsc = this.chefDetail.bank_detail.ifsc_code;
            this.account_type = this.chefDetail.bank_detail.account_type;
            // this.user_fssai = this.chefDetail.bank_detail.account_holder_name;
        }
    }

    close() {
        this.activeModal.close();
    }

    open_basic() {
        this.basic_tab = true;
        this.bank_tab = false;
        this.location_tab = false;
    }

    open_location() {
        this.basic_tab = false;
        this.bank_tab = false;
        this.location_tab = true;
    }

    open_bank_account() {
        this.basic_tab = false;
        this.bank_tab = true;
        this.location_tab = false;
    }

    public handleAddressChange(address: Address) {
        console.log('address:-' + JSON.stringify(address));

        this.selectedLocation = {
            place_id: address.place_id,
            formatted_address: address.formatted_address,
            location: {
                lat: address.geometry.location.lat(),
                lng: address.geometry.location.lng()
            }
        }
    }

    validatePost() {
        let isValid = true;
        if (this.user_name == '') {
            alert('please enter user name');
            isValid = false;
        }
        if (this.user_email == '') {
            alert('please enter user email');
            isValid = false;
        }
        if (this.user_phone == '') {
            alert('please enter user phone');
            isValid = false;
        }
        if (this.user_landmark == '') {
            alert('please enter user landmark');
            isValid = false;
        }
        if (this.selectedLocation == null) {
            alert('please select google location');
            isValid = false;
        }
        if (this.account_holder_name == '') {
            alert('please enter account holder name');
            isValid = false;
        }
        if (this.account_no == '') {
            alert('please enter account number');
            isValid = false;
        }
        if (this.ifsc == '') {
            alert('please select account type');
            isValid = false;
        }


        return isValid;
    }

    saveChef() {
        if (this.validatePost()) {
            let postData = {
                user_name: this.user_name,
                user_email: this.user_email,
                user_phone: this.user_phone,
                user_minimum_order_value: this.user_minimum_order_value,
                account_holder_name: this.account_holder_name,
                acc_no: this.account_no,
                ifsc_code: this.ifsc,
                account_type: this.account_type,
                user_fssai: this.user_fssai,
                address: this.user_address,
                user_landmark: this.user_landmark,
                formatted_address: this.selectedLocation.formatted_address,
                place_id: this.selectedLocation.place_id,
                lat: this.selectedLocation.location.lat,
                lng: this.selectedLocation.location.lng,
                google_location: this.google_location,
            }

            if (this.prospect_status) {
                postData['prospect_status'] = 1;
            } else {
                postData['prospect_status'] = 0;
            }

            if (this.business_status) {
                postData['business_status'] = 1;
            } else {
                postData['business_status'] = 0;
            }

            if (this.chefId != undefined) {
                postData['user_id'] = this.chefDetail.profile.id;
            }

            this.apiService.postAPI(this.apiService.BASE_URL + 'user/updateChefProfile', postData).then((result) => {
                console.log('chefupdated:-' + JSON.stringify(result));
                this.activeModal.close();
            }, (error) => {
                console.log('error:-' + JSON.stringify(error));
            })
        }


    }

}
