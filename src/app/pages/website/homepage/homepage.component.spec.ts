import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let spectator: Spectator<HomepageComponent>;

  const createComponent = createRoutingFactory({
    component: HomepageComponent,
    declareComponent: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
