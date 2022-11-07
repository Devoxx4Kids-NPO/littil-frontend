import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
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
