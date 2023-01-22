import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService  {

  constructor() {
  }

  USER_PROFILE = "USER_PROFILE";
  USER_LOGIN = "USER_LOGIN";

  printObj(obj) {
    console.log('obj:-' + JSON.stringify(obj));
  }

  setItem(key, value) {
    window.localStorage.setItem(key, value);
  }

  setSessionItem(key, value) {
    window.sessionStorage.setItem(key, value);
  }

  properFormatNumber(number: number): string {
    let numString = '';
    if (number < 10) {
      numString = '0' + number;
    } else {
      numString = number + '';
    }
    return numString;
  }

  tConvert(time) {
    var timeString = time;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;

    return timeString;
  }

  getDateTimeByTime(time): any {
    if(time==null||time==undefined||time==''){
      return '-';
    }
    var d = new Date(time);

    let date = this.properFormatNumber(d.getDate());
    let month = this.properFormatNumber(d.getMonth() + 1);
    let year = d.getFullYear();

    let hour = this.properFormatNumber(d.getHours());
    let min = this.properFormatNumber(d.getMinutes());
    let sec = this.properFormatNumber(d.getSeconds());

    // let finalDate = this.getDayName(day) + ' ' + date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min + ':' + sec;
    // let finalDate = date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min + ':' + sec;
    let finalDate = date + ' ' + this.getMonthName(month) + ',' + year + ' at ' + hour + ':' + min;

    // let finalDate = year + '-' + month + '-' + date;
    return finalDate;
  }

  getMonthName(month) {
    switch (month) {
      case '01':
        return 'Jaunurary';
      case '02':
        return 'February';
      case '03':
        return 'March';
      case '04':
        return 'April';
      case '05':
        return 'May';
      case '06':
        return 'June';
      case '07':
        return 'July';
      case '08':
        return 'August';
      case '09':
        return 'September';
      case '10':
        return 'October';
      case '11':
        return 'November';
      case '12':
        return 'December';
    }
    return 'Janurary';
  }

  getUserID() {
    if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
      let profile = JSON.parse(this.getItem(this.USER_PROFILE));
      return profile.id;
    } else {
      return "";
    }
  }

  getUserType() {
    if (this.getItem(this.USER_PROFILE) != null && this.getItem(this.USER_PROFILE) != undefined && this.getItem(this.USER_PROFILE) != '' && this.getItem(this.USER_PROFILE) != 'null') {
      let profile = JSON.parse(this.getItem(this.USER_PROFILE));
      if(profile.hasOwnProperty('type')){
        return "2";
      }else{
        return "1";
      }
    }
    return ''
  }

  clearALLData() {
    window.localStorage.clear();
  }

  printKeyValuePairs(url: string, postdata) {
    console.log('url:-' + url);
    console.log('--------------FORM DATA---------------');
    let data = '';
    postdata.forEach((value, key) => {
      // console.log(key + ':' + value)
      data += key + ':' + value + '\n';
    });
    console.log(data);
    console.log('--------------FORM DATA---------------');
  }

  getItem(key) {
    return window.localStorage.getItem(key);
  }

  printUrlPostData(url: string, postdata) {
    console.log('url:-' + url);
    console.log('postData:-' + JSON.stringify(postdata, null, 4));

  }

  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
    return false
  }

  calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value) {
    return Value * Math.PI / 180;
  }

  isUserLoggedIn(){
    if(this.getItem(this.USER_LOGIN)=='1'){
      return true;
    }else{
      return false;
    }
  }

}
