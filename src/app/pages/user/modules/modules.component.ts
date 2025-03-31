import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Module } from '../../../api/generated';
import { ButtonComponent } from '../../../components/button/button.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ProfileContainerComponent } from '../../../components/profile-container/profile-container.component';
import { IHasManageableModules } from '../../../services/littil-modules/littil-modules-user.interface';
import { LittilModulesService } from '../../../services/littil-modules/littil-modules.service';
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { LittilTeacherService } from '../../../services/littil-teacher/littil-teacher.service';
import { PermissionController, Roles } from '../../../services/permission.controller';

@Component({
  selector: 'littil-modules',
  templateUrl: './modules.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ProfileContainerComponent,
    ReactiveFormsModule,
    FooterComponent,
    ButtonComponent,
  ],
})
export class ModulesComponent {
  private readonly roleType: Roles;
  private readonly roleId: string;
  public availableModules: Module[] = [];
  public userModules: Module[] = [];
  public selectedModules: string[] = [];
  private userModuleManager: IHasManageableModules;

  constructor(
    private littilModulesService: LittilModulesService,
    private permissionController: PermissionController,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService
  ) {
    this.roleType = this.permissionController.getRoleType();
    this.roleId = this.permissionController.getRoleId();
    this.userModuleManager =
      this.roleType == Roles.GuestTeacher ? littilTeacherService : littilSchoolService;
    forkJoin([this.littilModulesService.getAll(), this.userModuleManager.getModules(this.roleId)])
      .pipe(
        map(([availableModules, userModules]) => {
          this.availableModules = availableModules;
          this.userModules = userModules;
          this.selectedModules = userModules.map(m => m.id as string);
        })
      )
      .subscribe();
  }

  isSelectedModule(module: Module): boolean {
    return this.selectedModules.filter(id => id === module.id).length > 0;
  }

  updateSelectedModules(module: Module): void {
    const moduleId = module.id as string;

    if (!this.selectedModules.includes(moduleId)) {
      this.selectedModules.push(moduleId);
    } else {
      this.removeModuleFromSelectedModules(moduleId);
    }
  }

  removeModuleFromSelectedModules(moduleId: string): void {
    this.selectedModules = this.selectedModules.filter(m => moduleId !== m);
  }

  onClickSaveModules(): void {
    this.userModuleManager.addModules(this.roleId, this.selectedModules).subscribe(() => {
      this.userModules = this.availableModules.filter(m =>
        this.selectedModules.includes(m.id as string)
      );
    });
  }

  onClickCancelChanges(): void {
    this.selectedModules = this.userModules.map(m => m.id as string);
  }
}
