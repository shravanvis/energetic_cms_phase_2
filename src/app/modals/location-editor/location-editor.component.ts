import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../service/api.service';
import {UtilService} from '../../service/util.service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';

declare var google;

@Component({
    selector: 'app-location-editor',
    templateUrl: './location-editor.component.html',
    styleUrls: ['./location-editor.component.css']
})
export class LocationEditorComponent implements OnInit {

    @ViewChild('gmap', {static: false}) gmapElement: ElementRef;
    map: any;
    marker;
    currentLat;
    currentLng;

    profile_location = '';
    selectedLocation = null;

    constructor(
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private apiService: ApiService,
        private utilService: UtilService
    ) {
    }

    ngOnInit(): void {
        this.getLocation();
    }

    ngAfterViewInit() {
        const mapOptions = {
            zoom: 17,
            center: new google.maps.LatLng(28.5272803, 77.0688997)
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);
        this.map.addListener('click', (mapsMouseEvent) => {
            let latlng = mapsMouseEvent.latLng;
            console.log(latlng.lat() + ',' + latlng.lng());
            this.showMarkerOnMap(latlng.lat(), latlng.lng(), true)
        });
        if (
            this.currentLat != null && this.currentLat != undefined
            && this.currentLng != null && this.currentLng != undefined
        ) {
            this.showMarkerOnMap(this.currentLat, this.currentLng, true);
        }
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                    if (position) {
                        console.log('Latitude: ' + position.coords.latitude +
                            'Longitude: ' + position.coords.longitude);
                        // this.searchTeacher();
                        this.currentLat = position.coords.latitude;
                        this.currentLng = position.coords.longitude;
                        if (this.map != null) {
                            this.showMarkerOnMap(this.currentLat, this.currentLng, true);
                        }
                    }
                },
                (error) => {
                    console.log(error);
                });
        }
    }

    showMarkerOnMap(lat, lng, searchAddress) {
        if (this.marker != null) {
            this.marker.setMap(null);
        }
        const myLatLng = {lat: lat, lng: lng}
        let marker = new google.maps.Marker({
            position: myLatLng,
            title: 'current location',
        });

        this.map.setCenter(myLatLng);
        marker.setMap(this.map);
        this.marker = marker;
        if (searchAddress) {
            this.displayLocation(lat, lng);
        }
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

        this.showMarkerOnMap(address.geometry.location.lat(), address.geometry.location.lng(), false)
    }

    displayLocation(latitude, longitude) {
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(latitude, longitude);

        geocoder.geocode(
            {'latLng': latlng},
            (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var add = results[0].formatted_address;
                        console.log(add);

                        let location = {
                            place_id: '',
                            formatted_address: add,
                            location: {
                                lat: latitude,
                                lng: longitude
                            }
                        }
                        this.selectedLocation = location;
                    }
                }
            }
        );
    }

    saveLocation() {
        if (this.selectedLocation == null) {
            alert('please select location');
            return;
        }

        this.activeModal.close({
            location: this.selectedLocation
        })
    }

    closeModal() {
        this.activeModal.close();
    }
}
