import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'littil-avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {

  @Input() avatarText: string | undefined = 'info@littil.org';
  @Input() avatarBackgroundColor: string = 'bg-blue-200';

  constructor() { }

  ngOnInit(): void {
  }
  get avatarInitials(): string {
    //TODO: replace with actual name once the user data is being fetched by the auth service
    const nameComponents: string[] | undefined = this.avatarText?.split("@")
    let name: string = ''
    if (!Array.isArray(nameComponents) || (nameComponents.length == 1 && nameComponents[0] === '')) {
      return 'L'
    }

    for (let s of nameComponents) {
      name = `${name}${s.split('')[0]}`
    }

    return name.toUpperCase()

  }
}
