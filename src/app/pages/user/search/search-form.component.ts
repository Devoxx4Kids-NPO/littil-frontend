import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Module } from '../../../api/generated';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormInputSelectComponent } from '../../../components/forms/select-input/form-input-select.component';
import { FormInputTextComponent } from '../../../components/forms/text-input/form-input-text.component';
import {
  CitiesService,
  MunicipalitiesJson,
  Municipality,
} from '../../../services/coordinates/cities.service';
import { LittilModulesService } from '../../../services/littil-modules/littil-modules.service';
import { PermissionController, Roles } from '../../../services/permission.controller';

export interface SearchQuery {
  modules: string[];
  lat: number;
  lng: number;
  distance: number;
}

interface SearchForm {
  modules: FormArray<FormControl<boolean | null>>;
  distance: number;
  location: null | Municipality;
}

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    ContentContainerComponent,
    ButtonComponent,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputSelectComponent,
    FormInputTextComponent,
    FooterComponent,
  ],
})
export class SearchFormComponent {
  public readonly currentRoleIsSchool;
  @Output() search = new EventEmitter<SearchQuery>();

  constructor(
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    private modulesService: LittilModulesService,
    private permissionController: PermissionController
  ) {
    this.currentRoleIsSchool = this.permissionController.getRoleType() === Roles.School;
  }

  public modules: Module[] = [];
  public provinces: MunicipalitiesJson.v1['provinces'] = [];
  public searchForm = this.formBuilder.group<SearchForm>({
    modules: this.formBuilder.array<boolean>([]),
    distance: 25,
    location: null,
  });

  ngOnInit() {
    this.citiesService.fetchLocations().subscribe(provinces => {
      this.provinces = provinces;
      // TODO can we use this example ? Hardcoded to Ede for now
      // const defaultLocation = provinces.find (province=>province.label === "Gelderland")
      //   .municipalities.find(municipality=> municipality.name === "Ede");
      this.searchForm.controls.location.patchValue(this.provinces[6].municipalities[15]);
    });
    this.modulesService.getAll().subscribe(modules => {
      this.modules = modules = modules.slice().sort(compareModulesByName);
      this.updateModuleCheckboxes();
    });
  }

  private updateModuleCheckboxes() {
    this.searchForm.controls.modules.clear();
    this.modules.forEach(() => this.searchForm.controls.modules.push(new FormControl(false)));
  }

  onSubmit() {
    const { location, distance } = this.searchForm.value;
    if (!location || !distance) {
      return;
    }
    this.search.emit({
      lat: location.lat,
      lng: location.lng,
      distance: distance,
      modules: this.selectedModules.map(m => m.name),
    });
  }

  get selectedModules() {
    return this.modules.filter((_, index) => this.searchForm.value.modules?.[index]);
  }
}

function compareModulesByName(a: Module, b: Module) {
  return a.name.localeCompare(b.name);
}
