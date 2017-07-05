import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { SFMap } from './sf-map';

@Injectable()
export class SfmapService {
  static SF_ARTERIES: any;
  static SF_FREEWAYS: any;
  static SF_NEIGHBORHOODS: any;
  static SF_STREETS: any;

  public sfMap: SFMap;

  constructor() { }

  private loadJsonAsPromise(url) {
    return new Promise(function (resolve, reject) {
      d3.json(url, function (error, request) {
        if (error) {
          reject(error);
        } else {
          resolve(request);
        }
      });
    });
  }

  loadFeatures() {
    const arteriesPromise = this.loadJsonAsPromise('./assets/json/arteries.json');
    const freewaysPromise = this.loadJsonAsPromise('./assets/json/freeways.json');
    const neighborhoodsPromise = this.loadJsonAsPromise('./assets/json/neighborhoods.json');
    const streetsPromise = this.loadJsonAsPromise('./assets/json/streets.json');

    return Promise.all([arteriesPromise, freewaysPromise, neighborhoodsPromise, streetsPromise])
      .then((values: Array<any>) => {
        SfmapService.SF_ARTERIES = values[0];
        SfmapService.SF_FREEWAYS = values[1];
        SfmapService.SF_NEIGHBORHOODS = values[2];
        SfmapService.SF_STREETS = values[3];
        return;
      });
  }

  drawMap(width, height, locator) {
    // Remove svg element if already exists
    d3.select('svg').remove();

    // Set SF Map object and plot features
    this.sfMap = new SFMap(width, height, locator, SfmapService.SF_NEIGHBORHOODS);
    this.sfMap.plotFeatures(SfmapService.SF_NEIGHBORHOODS.features, '.neighborhood', '#D3D3D3', 'white');
    this.sfMap.plotFeatures(SfmapService.SF_ARTERIES.features, '.artery', 'yellow', 'transparent');
    this.sfMap.plotFeatures(SfmapService.SF_FREEWAYS.features, '.freeway', 'orange', 'transparent');
    this.sfMap.plotFeatures(SfmapService.SF_STREETS.features, '.streets', 'transparent', 'grey');
  }

  plotVehicle(feature) {
    this.sfMap.plotVehicle(feature);
  }

  plotRoute(feature) {
    this.sfMap.plotRoute(feature);
  }

}
