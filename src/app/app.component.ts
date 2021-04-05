import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'หน้าหลัก',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'แผนที่',
      url: '/map',
      icon: 'compass',
    },
    {
      title: 'ร้านอาหาร',
      url: '/restaurant',
      icon: 'restaurant',
    },
    {
      title: 'รีวิวร้านอาหาร',
      url: '/review',
      icon: 'book',
    },
    {
      title: 'โปรไฟล์',
      url: '/profile',
      icon: 'person-circle',
    },

  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
