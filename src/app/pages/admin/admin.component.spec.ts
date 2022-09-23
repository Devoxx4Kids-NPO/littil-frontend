import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let spectator: Spectator<AdminComponent>;

  const createComponent = createRoutingFactory({
    component: AdminComponent,
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
