import { Component, OnInit } from '@angular/core';
import { userData } from 'src/assets/mocks/fakeData';

@Component({
  selector: 'app-directores',
  templateUrl: './directores.page.html',
  styleUrls: ['./directores.page.scss'],
  standalone: false
})
export class DirectoresPage implements OnInit {

   directores: any[] = [];

  ngOnInit() {
    this.directores = userData.directors || userData["directors"] || [];
  }

}
