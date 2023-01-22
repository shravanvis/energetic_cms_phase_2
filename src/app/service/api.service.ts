import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BASE_URL = "http://localhost:3000/";
  // BASE_IMAGE_URL = 'http://localhost/energeticAdmin/src/api/uploads/';
  // PROFILE_BASE_IMAGE_URL = 'http://localhost/energeticAdmin/src/api/';

  // BASE_URL = "http://43.204.146.78:3000/";
  // BASE_IMAGE_URL = 'http://43.204.146.78/energeticapi/uploads/';
  // PROFILE_BASE_IMAGE_URL = 'http://43.204.146.78/energeticAdmin/src/api/';

  BASE_URL = "https://www.energeticlighting.com:3000/";
  BASE_IMAGE_URL = 'https://www.energeticlighting.com/api/uploads/';
  PROFILE_BASE_IMAGE_URL = 'https://www.energeticlighting.com/energeticAdmin/src/api/';

  constructor(private http: HttpClient) {

  }

  getAPI(url): Promise<any> {

    console.log('url:-' + url);
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(result => {
        // loading.dismiss();
        try {
          // console.log('data:-' + JSON.stringify(result, null, 4));
          var parsedJSON = JSON.parse(JSON.stringify(result));
          resolve(parsedJSON);
        } catch (err) {
          reject(err);
        }
      }, error => {
        // loading.dismiss();
        console.log('API Error', JSON.stringify(error, null, 4));
        error = JSON.parse(JSON.stringify(error));
        reject(error);
      });
    });
  }

  deleteAPI(url): Promise<any> {

    console.log('url:-' + url);
    return new Promise((resolve, reject) => {
      this.http.delete(url).subscribe(result => {
        // loading.dismiss();
        try {
          console.log('data:-' + JSON.stringify(result, null, 4));
          var parsedJSON = JSON.parse(JSON.stringify(result));
          resolve(parsedJSON);
        } catch (err) {
          reject(err);
        }
      }, error => {
        // loading.dismiss();
        console.log('API Error', JSON.stringify(error, null, 4));
        error = JSON.parse(JSON.stringify(error));
        reject(error);
      });
    });
  }


  postAPI(url, postData): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({

        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem('user_token')
      })
    };


    console.log('url:-' + url);
    console.log('postData:-' + JSON.stringify(postData, null, 4));

    return new Promise((resolve, reject) => {
      this.http.post(url, postData).subscribe(result => {
        // loading.dismiss();
        try {
          // console.log('data:-' + JSON.stringify(result, null, 4));
          var parsedJSON = JSON.parse(JSON.stringify(result));
          resolve(parsedJSON);
        } catch (err) {
          reject(err);
        }
      }, error => {
        // loading.dismiss();
        console.log('API Error', JSON.stringify(error, null, 4));
        error = JSON.parse(JSON.stringify(error));
        reject(error);
      });
    });
  }



  putAPI(url, postData): Promise<any> {
    console.log('url:-' + url);
    console.log('postData:-' + JSON.stringify(postData, null, 4));


    return new Promise((resolve, reject) => {
      this.http.put(url, postData).subscribe(result => {
        // loading.dismiss();
        try {
          console.log('data:-' + JSON.stringify(result, null, 4));
          var parsedJSON = JSON.parse(JSON.stringify(result));
          resolve(parsedJSON);
        } catch (err) {
          reject(err);
        }
      }, error => {
        // loading.dismiss();
        console.log('API Error', JSON.stringify(error, null, 4));
        error = JSON.parse(JSON.stringify(error));
        reject(error);
      });
    });
  }

  uploadAttachment(url, postData, httpOptions): Promise<any> {
    console.log('url:-' + url);
    // console.log('postData:-' + JSON.stringify(postData, null, 4));

    return new Promise((resolve, reject) => {
      this.http.put(url, postData, httpOptions).subscribe(result => {
        // loading.dismiss();
        try {
          console.log('data:-' + JSON.stringify(result, null, 4));
          var parsedJSON = JSON.parse(JSON.stringify(result));
          resolve(parsedJSON);
        } catch (err) {
          reject(err);
        }
      }, error => {
        // loading.dismiss();
        console.log('API Error', JSON.stringify(error, null, 4));
        error = JSON.parse(JSON.stringify(error));
        reject(error);
      });
    });
  }

}
