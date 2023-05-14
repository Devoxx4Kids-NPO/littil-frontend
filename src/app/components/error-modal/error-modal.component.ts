import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { IModalComponent } from '../modal/modal.controller';

@Component({
  selector: 'littil-error-modal',
  templateUrl: 'error-modal.component.html',
  animations: [
    trigger('hideShow', [
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('hidden => visible', [animate('200ms')]),
    ]),
  ],
})
export class ErrorModalComponent
  implements IModalComponent<undefined, IErrorModalInput>
{
  public loading = false;
  public message = '';
  close!: () => void;

  public onOpen(errorData: IErrorModalInput) {}

  public closeModal() {
    this.close();
  }
}

export interface IErrorModalInput {
  errorMessage: string;
  errorStatus: number;
}
