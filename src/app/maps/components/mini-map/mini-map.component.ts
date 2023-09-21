import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lnglat?: [number, number];
  @ViewChild('divmap') divmap?: ElementRef;
  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divmap?.nativeElement) throw 'Map Div not found';
    if (!this.lnglat) throw 'LngLat  cant be null ';

    this.map = new Map({
      container: this.divmap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lnglat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    const market = new Marker({
      color: 'red',
      draggable: false
    }).setLngLat(this.lnglat).addTo(this.map);

  }


}
