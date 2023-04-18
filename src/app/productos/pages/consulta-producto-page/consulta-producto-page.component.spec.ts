import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaProductoPageComponent } from './consulta-producto-page.component';

describe('ConsultaProductoPageComponent', () => {
  let component: ConsultaProductoPageComponent;
  let fixture: ComponentFixture<ConsultaProductoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaProductoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaProductoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
