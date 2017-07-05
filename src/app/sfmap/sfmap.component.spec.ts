import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfmapComponent } from './sfmap.component';

describe('SfmapComponent', () => {
  let component: SfmapComponent;
  let fixture: ComponentFixture<SfmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
