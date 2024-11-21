import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { Module } from '../../../api/generated';
import { ProfileContainerComponent } from '../../../components/profile-container/profile-container.component';
import { LittilModulesService } from '../../../services/littil-modules/littil-modules.service';
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { LittilTeacherService } from '../../../services/littil-teacher/littil-teacher.service';
import { PermissionController, Roles } from '../../../services/permission.controller';
import { ModulesComponent } from './modules.component';

const availableModules: Module[] = [
  { id: '31000000-0000-0000-0000-000000000000', name: 'CodeCombat' },
  { id: '35000000-0000-0000-0000-000000000000', name: 'Hedycode' },
  { id: '33000000-0000-0000-0000-000000000000', name: 'Lego Mindstorms' },
  { id: '34000000-0000-0000-0000-000000000000', name: 'Lego WeDo' },
  { id: '32000000-0000-0000-0000-000000000000', name: "MBot's" },
  { id: '30000000-0000-0000-0000-000000000000', name: 'Scratch' },
];

const teacherModules: Module[] = [
  { id: '31000000-0000-0000-0000-000000000000', name: 'CodeCombat' },
];
const schoolModules: Module[] = [
  { id: '32000000-0000-0000-0000-000000000000', name: "MBot's" },
  { id: '35000000-0000-0000-0000-000000000000', name: 'Hedycode' },
];

function getModuleDef() {
  return {
    imports: [ModulesComponent, ProfileContainerComponent],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      MockProvider(PermissionController, {
        getRoleType: () => Roles.GuestTeacher,
      }),
      MockProvider(LittilModulesService, {
        getAll: () => of(availableModules),
      }),
      MockProvider(LittilTeacherService, {
        getModules: () => of(teacherModules),
        addModules: () => of(true),
      }),
      MockProvider(LittilSchoolService, {
        getModules: () => of(schoolModules),
      }),
      {
        provide: ActivatedRoute,
        useValue: ActivatedRouteStub,
      },
    ],
  };
}

describe('Teacher Modules Component', () => {
  let component: ModulesComponent;
  let fixture: ComponentFixture<ModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(getModuleDef()).compileComponents();

    fixture = TestBed.createComponent(ModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a list of modules', () => {
    const debug: DebugElement = fixture.debugElement;
    const list: DebugElement = debug.query(By.css('[data-test="module-list"]'));
    expect(list.children.length).toEqual(availableModules.length);

    availableModules.forEach(module => {
      let input: DebugElement = debug.query(By.css(`[id="${module.id}"]`));
      expect(input).toBeDefined();
      expect(input.nativeElement.checked).toBe(!!teacherModules.find(m => m.id === module.id));
    });
  });

  it('can be clicked to add a module', () => {
    const debug: DebugElement = fixture.debugElement;
    const checkbox: DebugElement = debug.query(By.css(`[id="${availableModules[1].id}"]`));

    expect(checkbox).toBeDefined();
    expect(checkbox.nativeElement.checked).toBe(false);

    checkbox.nativeElement.click();
    expect(checkbox.nativeElement.checked).toBe(true);
    expect(
      component.selectedModules.find(moduleId => moduleId === availableModules[1].id)
    ).toBeTruthy();
    expect(component.selectedModules.length).toEqual(component.userModules.length + 1);
  });

  it('can be clicked to remove a module', () => {
    const debug: DebugElement = fixture.debugElement;
    const checkbox: DebugElement = debug.query(By.css(`[id="${availableModules[0].id}"]`));

    expect(checkbox).toBeDefined();
    expect(checkbox.nativeElement.checked).toBeTruthy();

    checkbox.nativeElement.click();
    expect(checkbox.nativeElement.checked).toBeFalsy();
    expect(
      component.selectedModules.find(moduleId => moduleId === availableModules[0].id)
    ).toBeFalsy();
    expect(component.selectedModules.length).toEqual(component.userModules.length - 1);
  });

  it('should call save moduiles function when clicked on save button', async () => {
    const debug: DebugElement = fixture.debugElement;
    const saveBtn: DebugElement = debug.query(By.css(`[data-test="saveButton"]`));

    expect(saveBtn).toBeDefined();
    component.selectedModules.push(component.availableModules[2].id as string);
    expect(component.selectedModules.length).toEqual(component.userModules.length + 1);

    saveBtn.nativeElement.click();
    expect(component.selectedModules.length).toEqual(component.userModules.length);
  });

  it('should cancel updates of selected modules when clicked on cancel button', async () => {
    const debug: DebugElement = fixture.debugElement;
    const cancelBtn: DebugElement = debug.query(By.css(`[data-test="cancelButton"]`));

    expect(cancelBtn).toBeDefined();
    component.selectedModules.push(component.availableModules[2].id as string);
    expect(component.selectedModules.length).toEqual(component.userModules.length + 1);

    cancelBtn.nativeElement.click();
    expect(component.selectedModules.length).toEqual(component.userModules.length);
  });
});
