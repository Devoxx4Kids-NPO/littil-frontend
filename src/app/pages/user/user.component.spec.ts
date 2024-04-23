import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let spectator: Spectator<UserComponent>;

  const createComponent = createRoutingFactory({
    component: UserComponent,
    declarations: [],
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
