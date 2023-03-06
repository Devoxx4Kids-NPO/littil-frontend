import { Spectator } from '@ngneat/spectator';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { MockComponent, MockModule } from 'ng-mocks';
import { CompleteProfileModalComponent } from '../../components/complete-profile-modal/complete-profile-modal.component';
import { ModalControllerModule } from '../../components/modal/modal.controller.module';
import { CompleteProfilePageComponent } from './complete-profile.component';

// TODO: add unit tests
describe('CompleteProfilePageComponent', () => {
  let spectator: Spectator<CompleteProfilePageComponent>;

  const createComponent = createRoutingFactory({
    component: CompleteProfilePageComponent,
    declarations: [MockComponent(CompleteProfileModalComponent)],
    imports: [MockModule(ModalControllerModule)],
  });

  beforeEach(async () => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
