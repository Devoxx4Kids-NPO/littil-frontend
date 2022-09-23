import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let spectator: Spectator<HomepageComponent>;

  const createComponent = createRoutingFactory({
    component: HomepageComponent,
    declarations: [MockComponent(ContentContainerComponent)],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
