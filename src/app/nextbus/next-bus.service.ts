import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response } from '@angular/http';
import { SfmapService } from '../sfmap/sfmap.service';

import 'rxjs/Rx';

@Injectable()
export class NextBusService {

  BASE_URL = '//webservices.nextbus.com/service/publicJSONFeed?command=';
  AGENCY = 'a=sf-muni';

  routeCache = {};
  time = 0;

  constructor(private http: Http, private sfMapService: SfmapService) {
  }

  buildCommandUrl(cmd, params): string {
    return this.BASE_URL + cmd + '&' + params.join('&');
  }

  getRouteInfo(routeId: string) {
    if (this.routeCache[routeId]) {
      return this.routeCache[routeId];
    } else {
      return this.http.get(this.buildCommandUrl('routeConfig', [this.AGENCY, 'r=' + routeId]))
        .map((data: any) => data.json())
        .subscribe((data: any) => {
          this.routeCache[routeId] = data.route;
        });
    }
  }

  getRouteList() {
    return this.http.get(this.buildCommandUrl('routeList', [this.AGENCY]))
      .map((data) => data.json().route);
  }

  getMuniUpdates(interval) {
    Observable.interval(interval)
      .startWith(0)
      .switchMap(() => this.http.get(this.buildCommandUrl('vehicleLocations',
        [this.AGENCY, 't=' + this.time])))
      .map((data) => data.json())
      .subscribe((data: any) => {
        this.time = data.lastTime.time;
        data.vehicle.forEach(vehicle => {
          const routeInfo = this.getRouteInfo(vehicle.routeTag);
          const props = {
            dirTag: vehicle.dirTag,
            heading: vehicle.heading,
            id: vehicle.id,
            predictable: vehicle.predictable,
            routeTag: vehicle.routeTag,
            secsSinceReport: vehicle.secsSinceReport,
            speedKmHr: vehicle.speedKmHr,
            routeInfo
          };
          const coords = [vehicle.lon, vehicle.lat];
          const feature = this.buildGeoFeature('Point', coords, props);

          this.sfMapService.plotVehicle(feature);
        });
      });
  }

  private buildGeoFeature(type, coords, props) {
    return {
      'type': 'Feature',
      'geometry': { 'type': type, 'coordinates': coords },
      'properties': props
    };
  }
}
