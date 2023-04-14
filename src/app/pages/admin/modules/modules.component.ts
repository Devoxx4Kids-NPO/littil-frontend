import { Component, OnInit } from '@angular/core';
import {GuestTeacher, Module, ModuleService, School} from "../../../api/generated";
import {LittilModulesService} from "../../../services/littil-modules/littil-modules.service";
import {LittilTeacherService} from "../../../services/littil-teacher/littil-teacher.service";
import {LittilSchoolService} from "../../../services/littil-school/littil-school.service";
import {PermissionController, Roles} from "../../../services/permission.controller";
import {Observable} from "rxjs";

@Component({
  selector: 'littil-modules',
  templateUrl: './modules.component.html'
})
export class ModulesComponent implements OnInit {
  private readonly roleType: Roles;
  private readonly roleId: string;
  private userModuleObservable: Observable<Module[]>;
  public availableModules: Module[] = [];
  public userModules: Module[] = [];
  public availableModulesLoading: boolean = true;
  public userModulesLoading: boolean = true;
  public modulesSaving: string[] = [];

  constructor(
      private littilModulesService: LittilModulesService,
      private permissionController: PermissionController,
      private littilTeacherService: LittilTeacherService,
      private littilSchoolService: LittilSchoolService,
  ) {
    this.roleType = this.permissionController.getRoleType();
    this.roleId = this.permissionController.getRoleId();

    this.userModuleObservable =
      this.roleType == Roles.GuestTeacher
        ? this.littilTeacherService.getModules(this.roleId)
        : this.littilSchoolService.getModules(this.roleId);

    this.littilModulesService.getAll().subscribe((modules: Module[]) => {
      this.availableModules = modules;
      this.availableModulesLoading = false;
    });

    this.userModuleObservable.subscribe((modules: Module[]) => {
      this.userModules = modules;
      this.userModulesLoading = false;
    });

  }

  ngOnInit(): void {

  }

  isModuleUsedByUser(module: Module): boolean {
    return this.userModules.filter(m => m.id === module.id).length > 0;
  }

  isModuleBeingSaved(module: Module): boolean {
    return this.modulesSaving.includes((module.id as string))
  }

  saveModuleStatus(module: Module): void {
    const moduleId = module.id as string;
    if (!this.modulesSaving.includes(moduleId)) {
      this.modulesSaving.push(moduleId);
      this.userModules.push(module);
    }
  }
}
