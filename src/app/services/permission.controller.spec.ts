import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { PermissionController } from './permission.controller';

// TODO: add unit tests
describe('PermissionController', () => {
  let spectator: SpectatorService<PermissionController>;
  const createController = createServiceFactory({
    service: PermissionController,
  });

  beforeEach(() => {
    spectator = createController();
  });
  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
