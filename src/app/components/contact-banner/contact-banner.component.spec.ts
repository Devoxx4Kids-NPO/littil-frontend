import {ContactBannerComponent} from './contact-banner.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator/jest";

describe('ContactBannerComponent', () => {
  let spectator: Spectator<ContactBannerComponent>;

  const createComponent = createComponentFactory({
    component: ContactBannerComponent,
  });
  beforeEach(async () => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(spectator.query('span.prefix')?.textContent?.trim()).toEqual('Wij komen dan graag in');
    expect(spectator.query('span.suffix')?.textContent?.trim()).toEqual('met jou!');
    expect(spectator.query('a')?.textContent?.trim()).toEqual('contact');
  });

  it('should have settable values', () => {
    spectator.setInput('bannerText', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    spectator.setInput('linkWord', 'consectetur');
    spectator.detectChanges()
    expect(spectator.query('span.prefix')?.textContent?.trim()).toEqual('Lorem ipsum dolor sit amet,');
    expect(spectator.query('span.suffix')?.textContent?.trim()).toEqual('adipiscing elit.');
    expect(spectator.query('a')?.textContent?.trim()).toEqual('consectetur');
  });

  it('no matching link word should not yield an error', () => {
    spectator.setInput('bannerText', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    spectator.setInput('linkWord', 'contact');
    spectator.detectChanges()
    expect(spectator.query('span.prefix')?.textContent?.trim()).toEqual('');
    expect(spectator.query('span.suffix')?.textContent?.trim()).toEqual('');
    expect(spectator.query('a')?.textContent?.trim()).toEqual('');
  });

  it('empty input should not yield an error', () => {
    spectator.setInput('bannerText', '');
    spectator.setInput('linkWord', '');
    spectator.detectChanges()
    expect(spectator.query('span.prefix')?.textContent?.trim()).toEqual('');
    expect(spectator.query('span.suffix')?.textContent?.trim()).toEqual('');
    expect(spectator.query('a')?.textContent?.trim()).toEqual('');
  });
});
