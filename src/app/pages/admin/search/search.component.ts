import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { GuestTeacher, School, SearchResult } from '../../../api/generated';
import {
  Coordinates,
  CoordinatesService,
} from '../../../services/coordinates/coordinates.service';
import { OpenStreetMapService } from '../../../services/coordinates/open-street-map.service';
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { LittilSearchService } from '../../../services/littil-search/littil-search.service';
import { LittilTeacherService } from '../../../services/littil-teacher/littil-teacher.service';
import {
  PermissionController,
  Roles,
} from '../../../services/permission.controller';
import { MapZoomLevels, MAP_OPTIONS } from './map-options';

@Component({
  selector: 'littil-search',
  templateUrl: './search.component.html',
  providers: [{ provide: CoordinatesService, useClass: OpenStreetMapService }],
})
export class SearchComponent {
  public selectedMarker!: any;
  public mapData: any[] = [];
  private roleType: Roles;
  private coordinates!: Coordinates;
  private roleId: string;
  public mapOptions: google.maps.MapOptions = MAP_OPTIONS;
  public ownLocation: any = {};

  searchForm = this.formBuilder.group({
    straal: '',
    locatie: '',
  });

  constructor(
    private permissionController: PermissionController,
    private searchService: LittilSearchService,
    private formBuilder: FormBuilder,
    private coordinatesService: CoordinatesService,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService
  ) {
    this.roleType = this.permissionController.getRoleType();
    this.roleId = this.permissionController.getRoleId();
  }

  public ngOnInit(): void {
    this.fetchSearchResults().subscribe((result) => {
      this.mapData = this.getMapDataFromSearchResults(result);
    });
  }

  // TODO: Fetching the Teacher / School & Coordinates should be moved to a separate class (profile controller?)
  // This class can be injected in this component to access the data.
  private fetchSearchResults(): Observable<SearchResult[]> {
    const userObservable: Observable<GuestTeacher | School> =
      this.roleType == Roles.GuestTeacher
        ? this.littilTeacherService.getById(this.roleId)
        : this.littilSchoolService.getById(this.roleId);

    return userObservable.pipe(
      switchMap((user: GuestTeacher | School) => {
        this.ownLocation.name = user.firstName + ' ' + user.surname;
        return this.coordinatesService.getCoordinates(user.address); // TODO: Some users will not give permission to use their address, in that case they need to use the search form for an initial search
      }),
      tap((coordinates) => {
        this.coordinates = coordinates;
        this.ownLocation = {
          ...this.ownLocation,
          options: {
            position: {
              lat: this.coordinates.lat,
              lng: this.coordinates.lon,
            },
            visible: true,
            icon: {
              size: { width: 25, height: 25 },
              url: 'assets/user-location.svg',
            } as google.maps.Icon,
          },
        };
      }),
      switchMap((coordinates: Coordinates) => {
        return this.searchService.getSearchResult(
          [],
          coordinates.lat,
          coordinates.lon,
           300,
           this.getRequiredRoleForSearchResult(this.roleType)
        );
      })
    );
  }

  public onSubmit(): void {}

  private getMapDataFromSearchResults(searchResults: SearchResult[]): any[] {
    return searchResults.map((data: SearchResult) => {
      return {
        ...data,
        options: {
          position: {
            lat: data.latitude,
            lng: data.longitude,
          },
          visible: true,
          icon: {
            size: { width: 25, height: 25 },
            url: 'assets/marker.svg',
          } as google.maps.Icon,
        },
      };
    });
  }

  private getRequiredRoleForSearchResult(role: Roles): string {
    return role == Roles.School ? MapTypes.GUEST_TEACHER : MapTypes.SCHOOL;
  }

  public center: google.maps.LatLngLiteral = {
    lat: 52.098191,
    lng: 5.111859,
  } as google.maps.LatLngLiteral;

  public zoom: number | MapZoomLevels = MapZoomLevels.WHOLE_NL;

  public onMarkerClick(marker: IMapData) {
    this.selectedMarker = marker;
  }
}

export enum MapTypes {
  SCHOOL = 'SCHOOL',
  GUEST_TEACHER = 'GUEST_TEACHER',
}

export interface IMapData {
  name: string;
  type: MapTypes;
  lat: number;
  lng: number;
  modules: string[];
}
