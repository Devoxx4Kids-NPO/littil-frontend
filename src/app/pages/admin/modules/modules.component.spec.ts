import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModulesComponent} from './modules.component';
import {MockProvider} from "ng-mocks";
import {LittilTeacherService} from "../../../services/littil-teacher/littil-teacher.service";
import {of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {LittilSchoolService} from "../../../services/littil-school/littil-school.service";
import {LittilModulesService} from "../../../services/littil-modules/littil-modules.service";
import {Module} from "../../../api/generated";
import {PermissionController, Roles} from "../../../services/permission.controller";
import {ProfileContainerComponent} from "../../../components/profile-container/profile-container.component";
import {DebugElement, DebugNode, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";


const availableModules: Module[] = [
  {"id": "31000000-0000-0000-0000-000000000000", "name": "CodeCombat"},
  {"id": "35000000-0000-0000-0000-000000000000", "name": "Hedycode"},
  {"id": "33000000-0000-0000-0000-000000000000", "name": "Lego Mindstorms"},
  {"id": "34000000-0000-0000-0000-000000000000", "name": "Lego WeDo"},
  {"id": "32000000-0000-0000-0000-000000000000", "name": "MBot's"},
  {"id": "30000000-0000-0000-0000-000000000000", "name": "Scratch"}
]

const teacherModules: Module[] = [
  {"id": "31000000-0000-0000-0000-000000000000", "name": "CodeCombat"}
]
const schoolModules: Module[] = [
  {"id": "32000000-0000-0000-0000-000000000000", "name": "MBot's"},
  {"id": "35000000-0000-0000-0000-000000000000", "name": "Hedycode"},
]


describe('Teacher Modules Component', () => {
  let component: ModulesComponent;
  let fixture: ComponentFixture<ModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulesComponent, ProfileContainerComponent],
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
        }),
        MockProvider(LittilSchoolService, {
          getModules: () => of(schoolModules),
        }),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a list of modules', () => {
    const debug: DebugElement = fixture.debugElement
    const list: DebugElement = debug.query(By.css('[data-test="module-list"]'))
    expect(list.children.length).toEqual(availableModules.length);

    availableModules.forEach(module => {
      let input: DebugElement = debug.query(By.css(`[id="${module.id}"]`))
      expect(input).toBeDefined()
    })

  });
});
