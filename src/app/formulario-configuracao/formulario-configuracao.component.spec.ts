import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConfiguracaoComponent } from './formulario-configuracao.component';

describe('FormularioConfiguracaoComponent', () => {
  let component: FormularioConfiguracaoComponent;
  let fixture: ComponentFixture<FormularioConfiguracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioConfiguracaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
