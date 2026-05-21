import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtsEjsDropdowntreeComponent } from './nts-ejs-dropdowntree.component';

describe('NtsEjsDropdowntreeComponent', () => {
  let component: NtsEjsDropdowntreeComponent;
  let fixture: ComponentFixture<NtsEjsDropdowntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NtsEjsDropdowntreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NtsEjsDropdowntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
