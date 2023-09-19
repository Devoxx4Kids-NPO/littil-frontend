import {Component, EventEmitter, Output, ViewEncapsulation} from "@angular/core";
import {CitiesService, MunicipalitiesJson, Municipality} from "../../../services/coordinates/cities.service";
import {FormArray, FormBuilder, FormControl} from "@angular/forms";
import {Module} from "../../../api/generated";
import {LittilModulesService} from "../../../services/littil-modules/littil-modules.service";

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
  templateUrl: './search-form.component.html', encapsulation: ViewEncapsulation.None,
})
export class SearchFormComponent {
  @Output() search = new EventEmitter<SearchQuery>();

  constructor(
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    private modulesService: LittilModulesService) {
  }

  public modules: Module[] = [];
  public provinces: MunicipalitiesJson.v1['provinces'] = [];
  public searchForm = this.formBuilder.group<SearchForm>({
    modules: this.formBuilder.array<boolean>([]),
    distance: 25,
    location: null,
  });


  ngOnInit() {
    this.citiesService.fetchLocations().subscribe(provinces => this.provinces = provinces);
    this.modulesService.getAll().subscribe(modules=> {
      this.modules = (modules = modules.slice().sort(compareModulesByName));
      this.updateModuleCheckboxes();
    });
  }

  private updateModuleCheckboxes() {
    this.searchForm.controls.modules.clear();
    this.modules.forEach(() => this.searchForm.controls.modules.push(new FormControl(false)));
  }

  onSubmit() {
    const {
      location,
      distance,
    } = this.searchForm.value;
    if (!location || !distance) {
      return;
    }
    this.search.emit({
      lat: location.lat,
      lng: location.lng,
      distance: distance,
      modules: this.selectedModules.map(m => m.name),
    })
  }

  get selectedModules() {
    return this.modules.filter(
      (_, index) => this.searchForm.value.modules?.[index]
    );
  }
}

function compareModulesByName(a: Module, b: Module) {
  return a.name.localeCompare(b.name);
}