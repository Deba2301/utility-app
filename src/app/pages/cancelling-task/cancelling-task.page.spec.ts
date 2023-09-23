import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancellingTaskPage } from './cancelling-task.page';

describe('CancellingTaskPage', () => {
  let component: CancellingTaskPage;
  let fixture: ComponentFixture<CancellingTaskPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CancellingTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
