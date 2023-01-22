import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { UtilService } from '../../service/util.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email = '';
    password = '';

    constructor(
        private apiService: ApiService,
        private modalService: NgbModal,
        private router: Router,
        private utilService: UtilService
    ) {
    }

    ngOnInit(): void {
        if (this.utilService.isUserLoggedIn()) {
            this.router.navigateByUrl('/admin')
        }
    }

    signin() {
        this.apiService.postAPI(this.apiService.BASE_URL + 'user/login', {
            email: this.email,
            password: this.password
        }).then((result) => {
            console.log(result);
            if (result.status) {

                this.utilService.setItem(this.utilService.USER_LOGIN, '1');
                this.utilService.setItem(this.utilService.USER_PROFILE, JSON.stringify(result.result));
                console.log(result.result.token);
                localStorage.setItem('user_token', result.result.token);
                this.router.navigateByUrl('/category')

            } else {
                alert('invalid password');
            }
        }, (error) => {
            console.log('error:-' + JSON.stringify(error));
        })
    }

}
