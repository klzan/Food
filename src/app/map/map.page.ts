import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import {LoadingController,AlertController,NavController,} from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  map: any;
  address:string;
  lat: number;
  long: number;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  geocoder: any;
  markers: any[];



  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public zone: NgZone,
    private navCtrl: NavController,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
  }

  //LOAD THE MAP ONINIT.
  ngOnInit() {
    this.loadMap();
  }

  //LOADING THE MAP HAS 2 PARTS.
  loadMap() {

    //FIRST GET THE LOCATION FROM THE DEVICE.
    // tslint:disable-next-line: new-parens
    const directionsService = new google.maps.DirectionsService(); // ประกาศตัวแปรหาเส้นทาง
    // tslint:disable-next-line: new-parens
    const directionsDisplay = new google.maps.DirectionsRenderer(); // ประกาศตัวแปรแสดงเส้นทาง
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;

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


      //LOAD THE MAP WITH THE PREVIOUS VALUES AS PARAMETERS.
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map, this.map.center.lat());
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.lat = this.map.center.lat()
        this.long = this.map.center.lng()
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  //ค้นหาอันใหม่
ionViewDidEnter(){
	//Set latitude and longitude of some place
	this.map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: -34.9011, lng: -56.1645 },
		zoom: 15
	});
}

updateSearchResults(){
  if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
	(predictions, status) => {
    this.autocompleteItems = [];
    this.zone.run(() => {
      predictions.forEach((prediction) => {
        this.autocompleteItems.push(prediction);
      });
    });
  });
}
//จบ

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{
        this.address = "Address Not Available!";
      });
  }



  //ส่งค่าสิ่งที่ค้นหา
  selectSearchResult(item){

    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);


      }
    })
  }

  Location() {
    this.navCtrl.navigateRoot('/location');
  }


}
