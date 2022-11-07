import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { WebsiteComponent } from './website.component';

describe('WebsiteComponent', () => {
  let spectator: Spectator<WebsiteComponent>;

  const createComponent = createRoutingFactory({
    component: WebsiteComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
