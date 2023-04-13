import { Component, OnInit } from '@angular/core';
import {Module, ModuleService} from "../../../api/generated";
import {LittilModulesService} from "../../../services/littil-modules/littil-modules.service";

@Component({
  selector: 'littil-modules',
  templateUrl: './modules.component.html'
})
export class ModulesComponent implements OnInit {

  public availableModulesLoading: boolean = true;
  public availableModules: Module[] = [];
  public modulesSaving: string[] = [];

  constructor(
      private littilModulesService: LittilModulesService,

  ) {
    this.littilModulesService.getAll().subscribe((modules: Module[]) => {
      this.availableModules = modules;
      this.availableModulesLoading = false;
    })

  }

  ngOnInit(): void {

  }

  isModuleBeingSaved(module: Module): boolean {
    return this.modulesSaving.includes((module.id as string))
  }

  saveModuleStatus(module: Module): void {
    const moduleId = module.id as string;

    if (!this.modulesSaving.includes(moduleId)) {
      console.log(moduleId)
      this.modulesSaving.push(moduleId)
    }
  }
}
