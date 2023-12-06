import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListElementComponent } from './recipe-list-element.component';

describe('RecipeListElementComponent', () => {
  let component: RecipeListElementComponent;
  let fixture: ComponentFixture<RecipeListElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListElementComponent]
    });
    fixture = TestBed.createComponent(RecipeListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
