import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadopersonaComponent } from './listadopersona.component';

describe('ListadopersonaComponent', () => {
  let component: ListadopersonaComponent;
  let fixture: ComponentFixture<ListadopersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadopersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadopersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
