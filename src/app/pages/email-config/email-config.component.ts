import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { UtilService } from 'app/service/util.service';

@Component({
  selector: 'app-email-config',
  templateUrl: './email-config.component.html',
  styleUrls: ['./email-config.component.css']
})
export class EmailConfigComponent implements OnInit {

  
  port: string = '';
  host: string = '';
  password: string = '';
  user: string = '';
  sender_email: string = '';
 constructor(
   private activatedRoute: ActivatedRoute,
   private router: Router,
   private utilService: UtilService,
   public apiService: ApiService,
   private modalService: NgbModal
 ) { }


 ngOnInit(): void {
   this.mail();
 }

 mail() {
   this.apiService.getAPI(this.apiService.BASE_URL + 'mail/getMailConfig/1').then((result) => {
     this.host = result.result.host;
     this.port = result.result.port;
     this.user = result.result.user;
     this.password = result.result.password;
     this.sender_email = result.result.sender_email;
   })
 }

 save() {
   const formData = new FormData();
   formData.append('port', this.port);
   formData.append('host', this.host);
   formData.append('user', this.user);
   formData.append('password', this.password);
   formData.append('sender_email', this.sender_email);
   formData.append('id', '1');
   this.apiService.postAPI(this.apiService.BASE_URL + 'mail/updateMailConfig', formData).then((result) => {
     if (result.status) {
     // alert("Success");
       this.mail()
     } else {
       alert("Not found");
     }
   }, (error) => {
     alert("something went wrong");
   })
 }

}
