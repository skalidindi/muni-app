import * as d3 from 'd3';
import { GeoPath, Selection } from 'd3';

export class SFMap {
  muniSvg: any;
  baseSvg: any;
  vehiclesSvg: any;
  routesSvg: any;
  geoPath: any;

  constructor(width: number = 600, height: number = 600, locator: string, boundingFeature: any) {
    const LIGHT_BLUE = '#a7cdf2';

    const projection = d3.geo.mercator()
      .scale(1)
      .translate([0, 0])
      .precision(0);

    this.geoPath = d3.geo.path()
      .projection(projection);

    const bounds = this.geoPath.bounds(boundingFeature);

    const xScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
    const yScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
    const scale = xScale < yScale ? xScale : yScale;

    const translation = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale *
      (bounds[1][1] + bounds[0][1])) / 2];
    projection.scale(scale).translate(translation);

    this.baseSvg = d3.select(locator)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', LIGHT_BLUE)
      .append('g');

    this.muniSvg = this.baseSvg.append('g');
  }

  plotFeatures(features, cssClassName: any, fillColor: string, strokeColor: string) {
    this.muniSvg.selectAll(cssClassName)
      .data(features)
      .enter()
      .append('path')
      .attr('class', cssClassName)
      .attr('d', this.geoPath)
      .attr('data-id', function (d) {
        return d.id;
      })
      .attr('data-name', function (d) {
        return d.properties.name;
      })
      .style('fill', fillColor)
      .style('stroke', strokeColor);
  }

  plotRoute(feature) {
    // ???
  }

  plotVehicle(feature) {
    if (!this.vehiclesSvg) {
      this.vehiclesSvg = this.muniSvg
        .append('g');
    }

    const vehicle = this.vehiclesSvg.selectAll('.muni')
      .filter((d) => {
        return d.properties.id === feature.properties.id;
      });

    if (vehicle.size() === 0) {
      vehicle
        .data([feature])
        .enter()
        .append('path')
        .attr('class', 'muni')
        .attr('d', this.geoPath)
        .style('fill', function (d) {
          return d.properties.routeInfo.color;
        })
        .attr('data-id', function (d) {
          return d.id;
        })
        .attr('data-name', function (d) {
          return d.properties.name;
        });
    } else {
      vehicle
        .data([feature])
        .style('fill', function (d) {
          return d.properties.routeInfo.color;
        })
        .transition('moveVehicle')
        .duration(5000)
        .attr('d', this.geoPath);
    }
  }
}
