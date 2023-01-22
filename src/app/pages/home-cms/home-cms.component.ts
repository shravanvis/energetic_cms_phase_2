import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
    selector: 'app-home-cms',
    templateUrl: './home-cms.component.html',
    styleUrls: ['./home-cms.component.css']
})
export class HomeCMSComponent implements OnInit {

    showvideoUrl;
    video;
    disable: boolean = false;

    videoId;

    BANNERS: [];

    title1;
    description1;
    showImage1Url;
    image1;

    title2;
    description2;
    showImage2Url;
    image2;

    title3;
    description3;
    showImage3Url;
    image3;

    constructor(
        private apiService: ApiService, private toast: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.getVideo();
        this.getbanner();
    }

    getVideo() {
        this.apiService.getAPI(this.apiService.BASE_URL + 'video').then(res => {
            this.showvideoUrl = this.apiService.BASE_IMAGE_URL + res.result[0].image;
            this.videoId = res.result[0].id;
        })
    }

    deletevideo() {
        this.apiService.getAPI(this.apiService.BASE_URL + 'video/deleteVideo/' + this.videoId).then(res => {
            this.toast.success('Video Deleted Successfully');
            this.getVideo();
        })
    }

    selectvideo(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.video = file

            // let reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = () => {
            //     this.showvideoUrl = reader.result;
            // };
        }
    }

    validation() {
        if (this.video == null) {
            this.toast.error('Please Select Video');
            return false;
        }
        return true;
    }

    savevideo() {
        if (this.validation()) {
            this.disable = true;
            let formData = new FormData();
            formData.append('image', this.video);
            this.apiService.postAPI(this.apiService.BASE_URL + 'video/addVideo', formData).then(res => {
                this.toast.success('Video Added Successfully');
                this.getVideo();
                this.disable = false;
                console.log(res);
            })
        }
    }


    onselectimage1(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.image1 = file

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.showImage1Url = reader.result;
            };
        }
    }

    onselectimage2(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.image2 = file

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.showImage2Url = reader.result;
            };
        }
    }

    onselectimage3(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.image3 = file

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.showImage3Url = reader.result;
            };
        }
    }

    getbanner() {
        this.apiService.getAPI(this.apiService.BASE_URL + 'banner/getBannerByPage/home_page').then((res) => {
            this.showImage1Url = this.apiService.BASE_IMAGE_URL + res.result[0].image;
            this.title1 = res.result[0].title;
            this.description1 = res.result[0].description;
            this.showImage2Url = this.apiService.BASE_IMAGE_URL + res.result[1].image;
            this.title2 = res.result[1].title;
            this.description2 = res.result[1].description;
            this.showImage3Url = this.apiService.BASE_IMAGE_URL + res.result[2].image;
            this.title3 = res.result[2].title;
            this.description3 = res.result[2].description;
        })
    }
    save1() {
        let formData = new FormData();
        formData.append('image', this.image1);
        formData.append('title', this.title1);
        formData.append('description', this.description1);
        formData.append('id', '1');
        formData.append('page', 'home_page');
        this.apiService.postAPI(this.apiService.BASE_URL + 'banner/updateBanner', formData).then(res => {
            this.toast.success('saved successfully');
        })
    }

    save2() {
        let formData = new FormData();
        formData.append('image', this.image2);
        formData.append('title', this.title2);
        formData.append('description', this.description2);
        formData.append('id', '18');
        formData.append('page', 'home_page');
        this.apiService.postAPI(this.apiService.BASE_URL + 'banner/updateBanner', formData).then(res => {
            this.toast.success('saved successfully');
        })
    }

    save3() {
        let formData = new FormData();
        formData.append('image', this.image3);
        formData.append('title', this.title3);
        formData.append('description', this.description3);
        formData.append('id', '19');
        formData.append('page', 'home_page');
        this.apiService.postAPI(this.apiService.BASE_URL + 'banner/updateBanner', formData).then(res => {
            this.toast.success('saved successfully');
        })
    }
}
