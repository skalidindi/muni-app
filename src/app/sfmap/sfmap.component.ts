import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { SfmapService } from './sfmap.service';
import { NextBusService } from '../nextbus/next-bus.service';

@Component({
  selector: 'sk-sfmap',
  templateUrl: './sfmap.component.html',
  styleUrls: ['./sfmap.component.scss']
})
export class SfmapComponent implements OnInit {
  routes$: Observable<any>;
  updateSubject = new Subject();
  watchedRoutes: Array<any> = [];
  selectedRoute: null;

  constructor(private sfMapService: SfmapService, private nextBusService: NextBusService) {
  }

  ngOnInit() {
    this.sfMapService.loadFeatures().then(() => {
      this.sfMapService.drawMap(700, 700, '#map');
      this.nextBusService.getMuniUpdates(15000);
    });

    this.routes$ = this.nextBusService.getRouteList();
    this.routes$ = this.routes$.merge(this.updateSubject)
      .startWith([])
      .scan((acc, val) => {
        if (val.op && val.op === 'delete') {
          const index = acc.findIndex((elt) => elt === val.route);
          acc.splice(index, 1);
          return acc;
        } else if (val.op && val.op === 'add') {
          return [val.route].concat(acc);
        } else {
          return acc.concat(val);
        }
      });
  }

  onRouteSelect(route) {
    this.updateSubject.next({ op: 'delete', route });
    this.watchedRoutes.push(route)
  }

  onRemoveWatchedRoute(route) {
    this.updateSubject.next({ op: 'add', route });
    this.watchedRoutes = this.watchedRoutes.filter(r => {
      return route !== r;
    });
  }
}
