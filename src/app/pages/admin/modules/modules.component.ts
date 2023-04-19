import {Component} from '@angular/core';
import {Module} from "../../../api/generated";
import {LittilModulesService} from "../../../services/littil-modules/littil-modules.service";
import {LittilTeacherService} from "../../../services/littil-teacher/littil-teacher.service";
import {LittilSchoolService} from "../../../services/littil-school/littil-school.service";
import {PermissionController, Roles} from "../../../services/permission.controller";
import {IHasManageableModules} from "../../../services/littil-modules/littil-modules-user.interface";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'littil-modules',
  templateUrl: './modules.component.html'
})
export class ModulesComponent {
  private readonly roleType: Roles;
  private readonly roleId: string;
  public availableModules: Module[] = [];
  public userModules: Module[] = [];
  public modulesSaving: string[] = [];
  private userModuleManager: IHasManageableModules

  constructor(
    private littilModulesService: LittilModulesService,
    private permissionController: PermissionController,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService,
  ) {
    this.roleType = this.permissionController.getRoleType();
    this.roleId = this.permissionController.getRoleId();
    this.userModuleManager = this.roleType == Roles.GuestTeacher ? littilTeacherService : littilSchoolService;

    forkJoin([
      this.littilModulesService.getAll(),
      this.userModuleManager.getModules(this.roleId)
    ]).pipe(
      map(([availableModules, userModules]) => {
        this.availableModules = availableModules;
        this.userModules = userModules;
      })
    ).subscribe()
  }

  isModuleUsedByUser(module: Module): boolean {
    return this.userModules.filter(m => m.id === module.id).length > 0;
  }

  isModuleBeingSaved(module: Module): boolean {
    return this.modulesSaving.includes((module.id as string))
  }

  removeModuleFromSaving(moduleId: string): void {
    this.modulesSaving = this.modulesSaving.filter(m => moduleId !== m);
  }

  saveModuleStatus(module: Module): void {
    const moduleId = module.id as string;

    if (!this.modulesSaving.includes(moduleId)) {
      this.modulesSaving.push(moduleId);
      if (this.isModuleUsedByUser(module)) {
        this.userModuleManager.removeModule(this.roleId, moduleId).subscribe(() => {
          this.removeModuleFromSaving(moduleId);
          this.userModules = this.userModules.filter(m => moduleId !== m.id);
        });
      } else {
        this.userModuleManager.addModule(this.roleId, module).subscribe(() => {
          this.removeModuleFromSaving(moduleId);
          this.userModules.push(module);
        })
      }
    }
  }
}
