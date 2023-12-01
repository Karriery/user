import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcallComponent } from './bookcall.component';

describe('BookcallComponent', () => {
  let component: BookcallComponent;
  let fixture: ComponentFixture<BookcallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookcallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookcallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
