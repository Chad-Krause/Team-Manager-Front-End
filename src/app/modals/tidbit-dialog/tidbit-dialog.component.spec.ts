import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TidbitDialogComponent } from './tidbit-dialog.component';

describe('TidbitDialogComponent', () => {
  let component: TidbitDialogComponent;
  let fixture: ComponentFixture<TidbitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TidbitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TidbitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
