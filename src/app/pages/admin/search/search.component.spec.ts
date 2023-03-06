import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { SearchComponent } from './search.component';

// TODO: add unit tests
describe.skip('SearchComponent', () => {
  let spectator: Spectator<SearchComponent>;

  const createComponent = createRoutingFactory({
    component: SearchComponent,
    declarations: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
