import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        ButtonModule
    ],
    providers: [],
    exports: [
        HeaderComponent
    ],
})
export class HeaderModule {}
