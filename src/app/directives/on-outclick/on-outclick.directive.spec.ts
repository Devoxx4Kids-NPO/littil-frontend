import {OnOutClickDirective} from './on-outclick.directive';
import {Component, DebugElement, ElementRef} from "@angular/core";
import {By} from "@angular/platform-browser";
import {ComponentFixture, TestBed} from "@angular/core/testing";

@Component({
  template: `
    <div>
        <span class="outside">"click me</span>
        <span class="inside" (outsideClick)="clickOutside()"></span>
    </div>`
})
class OutClickTestComponent {
  public clickOutside(): void {
    console.log('hi')
  }
}
class MockElementRef {
}

describe('OnOutClickDirective', () => {
  let fixture: ComponentFixture<OutClickTestComponent>;
  let component: OutClickTestComponent;
  let inputEl: DebugElement;
  let directive: OnOutClickDirective;
  let spy: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        OutClickTestComponent,
        OnOutClickDirective
      ],
      providers: [
        OnOutClickDirective,
        { provide: ElementRef, useClass: MockElementRef }
      ]
    });
    fixture = TestBed.createComponent(OutClickTestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('.inside'));
  });

  it('should call the onClick method when the element outside is clicked', () => {

  });
});
