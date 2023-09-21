import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarketAndColor {
  color: string,
  market: Marker
}

interface PlainMarket {
  color: string,
  lnglat: number[]
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 13;
  public map?: Map;
  public currentlngLat: LngLat = new LngLat(-80.63456003405729, -5.202662804892668);
  public markets: MarketAndColor[] = [];

  ngAfterViewInit(): void {

    if (!this.divMap) return;

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentlngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();
    /*
    const marketHtml= document.createElement('div');
    marketHtml.innerHTML='Jhonatan Flores';

    const markert= new Marker({
      color: 'red',
      element: marketHtml
    }).setLngLat(this.currentlngLat).addTo(this.map);
    */
  }

  createMarket() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lnglat = this.map.getCenter();
    this.addMarket(lnglat, color);
  }

  addMarket(lnglat: LngLat, color: string) {
    if (!this.map) return;

    const market = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lnglat).addTo(this.map);

    this.markets.push({
      color: color,
      market: market
    });
    this.saveToLocalStorage();
    market.on('dragend', ()=> this.saveToLocalStorage());
  }

  deleteMarket(index: number) {
    this.markets[index].market.remove();
    this.markets.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyTo(market: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: market.getLngLat()
    });
  }

  saveToLocalStorage() {
    const plainMarkets = this.markets.map(({ color, market }) => {
      return {
        color,
        lnglat: market.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkets', JSON.stringify(plainMarkets));
  }

  readFromLocalStorage() {
    const plainMarketsString = localStorage.getItem('plainMarkets') ?? '[]';
    const plainMarkets: PlainMarket[] = JSON.parse(plainMarketsString);

    plainMarkets.forEach(({ color, lnglat }) => {
      const [lng, lat] = lnglat;
      const coords = new LngLat(lng, lat);
      this.addMarket(coords, color);
    })
  }
}
