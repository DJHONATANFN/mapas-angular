import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiamhvbmF0YW5mbG9yZXMiLCJhIjoiY2t1NzNxYndiNWhqbTJ4cHFybGkwZHZvZSJ9.vM_nfei1vM2BIZ9CmP1DBg';


import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    ZoomRangePageComponent,
    PropertiesPageComponent,
    MarkersPageComponent,
    FullScreenPageComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
