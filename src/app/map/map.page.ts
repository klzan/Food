import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import {
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';

import { FeedBack } from '../models/feedback';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterContentInit {
  map;

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  Map: any;
  address: string;

  lat: number;
  lng: number;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {}
  ngAfterContentInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // tslint:disable-next-line: new-parens
    const directionsService = new google.maps.DirectionsService(); // ประกาศตัวแปรหาเส้นทาง
    // tslint:disable-next-line: new-parens
    const directionsDisplay = new google.maps.DirectionsRenderer(); // ประกาศตัวแปรแสดงเส้นทาง
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;

        let latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
        new google.maps.Marker({
          position: latLng,
          // position: {lat: 13.8187081, lng: 100.5775842},
          map: this.map,
          title: 'nat',
        });

        directionsDisplay.setMap(this.map); // ให้ตัวแปรหาเส้นทางใช้กับ this.map
        directionsService.route(
          {
            origin: latLng, // ตำแหน่งต้นทาง ตอนนี้ใช้ตำแหน่งของเรา
            destination: { lat: 13.7898401, lng: 100.5730751 }, // ตำแหน่งปลายทาง อันนี้จ๊อบเขียนละติจูด ลองจิจูตขึ้นมาเอง
            travelMode: 'DRIVING', // เส้นทางแบบรถยนต์ มีหลายโหมดลองไปดูเอา แต่ไทยไม่มีแบบจักรยาน
            // tslint:disable-next-line: only-arrow-functions
          },
          function (response: any, status: string) {
            // ฟังก์ชันที่ทำหลังจากที่ตรวจเส้นทางเสร็จว่าเส้นทางจากตำแหน่งต้นไปตำแหน่งปลายมีเส้นทางไหมในโหมดรถยนต์
            if (status === 'OK') {
              directionsDisplay.setDirections(response);

              const route = response.routes[0];
              // const summaryPanel = document.getElementById('directions-panel1');
              // summaryPanel.innerHTML = '';
              // // For each route, display summary information.
              // for (let i = 0; i < route.legs.length; i++) {
              //   const routeSegment = i + 1;
              //   summaryPanel.innerHTML +=
              //     summaryPanel.innerHTML += '<b>จุดเกิดเหตุ:    </b>' + route.legs[i].start_address + '<br>';
              //   summaryPanel.innerHTML += '<b>ระยะทาง:    </b>' + route.legs[i].distance.text + ' ถึงในอีก ' + route.legs[i].duration.text;
              // }
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          }
        );

        this.map.addListener('click', (mapsMouseEvent) => {
          let lat_click = mapsMouseEvent.latLng.toJSON().lat;
          let lng_click = mapsMouseEvent.latLng.toJSON().lng;
          this.addMarker(mapsMouseEvent.latLng, lat_click, lng_click);
          console.log('lat', mapsMouseEvent.latLng.lat());
          console.log('lng', mapsMouseEvent.latLng.lng());
          // this.savelatlng(mapsMouseEvent);
          // this.savelatlng();
        });
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  addMarker(location, lat, lng) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });
  }
}
