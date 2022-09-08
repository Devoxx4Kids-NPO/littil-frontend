import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { ButtonModule } from './button/button.module';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    HeaderModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    ButtonComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}
