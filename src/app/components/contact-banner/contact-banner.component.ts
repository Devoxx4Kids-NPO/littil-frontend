import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'littil-contact-banner',
  templateUrl: './contact-banner.component.html',
})
export class ContactBannerComponent {
  @Input() bannerText: string = 'Wij komen dan graag in contact met jou!'
  @Input() linkWord: string = 'contact'

  get prefixText(): string {
    return this.getBannerTextPart('prefixText')
  }
  get suffixText(): string {
    return this.getBannerTextPart('suffixText')
  }
  get linkText(): string {
    return this.getBannerTextPart('linkText')
  }

  public getBannerTextPart(part: 'prefixText'|'suffixText'|'linkText'): string {
    if (this.bannerText.includes(this.linkWord)) {
      let components = this.bannerText.split(this.linkWord)
      const parsedText = {
        'prefixText': components[0],
        'suffixText': components[1],
        'linkText': this.linkWord
      }
      return parsedText[part]
    }
    return ''
  }

  constructor(private router: Router) {
  }

  navToContact(): void {
    this.router.navigateByUrl('contact');
  }
}
