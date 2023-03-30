import {AvatarComponent} from './avatar.component';
import {AuthService} from "@auth0/auth0-angular";
import {createComponentFactory, Spectator} from "@ngneat/spectator/jest";

describe('AvatarComponent', () => {
  let spectator: Spectator<AvatarComponent>;
  const createComponent = createComponentFactory({
    component: AvatarComponent,
    providers: [
      {
        provide: AuthService, useValue: {
          isLoading$: false
        }
      }

    ]
  });
  beforeEach(async () => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('should have the right background class', () => {
    it('should set color class [default]', () => {
      expect(spectator.query('div')).toHaveClass('bg-blue-200');
    });
    it('should set color class to a custom value', () => {
      spectator.setInput('avatarBackgroundColor', 'bg-yellow-200');
      expect(spectator.query('div')).not.toHaveClass('bg-blue-200');
      expect(spectator.query('div')).toHaveClass('bg-yellow-200');
    });
  });

  describe('should have the right initials', () => {
    it('should have default initials', () => {
      expect(spectator.query('div')?.textContent).toEqual('IL');
    });
    it('should have initials based on the email address', () => {
      spectator.setInput('avatarText', 'tijs@vanerp.io')
      expect(spectator.query('div')?.textContent).toEqual('TV');
    });
    it('should not break on wrong input', () => {
      spectator.setInput('avatarText', 'tijs')
      expect(spectator.query('div')?.textContent).toEqual('T');
    });
    it('should not break on empty input', () => {
      spectator.setInput('avatarText', '')
      expect(spectator.query('div')?.textContent).toEqual('L');
      spectator.setInput('avatarText', undefined)
      expect(spectator.query('div')?.textContent).toEqual('L');
    });

    it('should handle an image', () => {
      let src: string = 'https://localhost:8080/image.png'
      spectator.setInput('avatarImage', src)
      expect(spectator.query('div')).toBeNull()
      expect(spectator.query('img')).toBeDefined()
      expect(spectator.query('img')?.getAttribute('src')).toEqual(src)
    });

    it('should ignore an empty image and revert to default', () => {
      let src: string = ''
      spectator.setInput('avatarImage', src)
      spectator.setInput('avatarText', '')
      expect(spectator.query('div')).toBeDefined()
      expect(spectator.query('img')).toBeNull()
      expect(spectator.query('div')?.textContent).toEqual('L');
    });
  })
});
