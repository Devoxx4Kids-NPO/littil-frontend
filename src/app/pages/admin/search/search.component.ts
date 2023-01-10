import { Component } from '@angular/core';
import { LittilUserService } from '../../../services/littil-user/littil-user.service';
import { AuthService } from '@auth0/auth0-angular';
import { PermissionController, Roles } from '../../../services/permission.controller';
import { LittilSearchService } from '../../../services/littil-search/littil-search.service';
import { GuestTeacher, SearchResult } from '../../../api/generated';
import { FormBuilder } from '@angular/forms';
import { Coordinates, CoordinatesService } from '../../../services/coordinates/coordinates.service';
import { OpenStreetMapService } from '../../../services/coordinates/open-street-map.service';
import { LittilTeacherService } from '../../../services/littil-teacher/littil-teacher.service';
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { Observable, switchMap, tap } from 'rxjs';
import { MAP_OPTIONS, MapZoomLevels } from './map-options';

@Component({
  selector: 'littil-search',
  templateUrl: './search.component.html',
  providers: [
    { provide: CoordinatesService, useClass: OpenStreetMapService }
  ]
})
export class SearchComponent {
  public selectedMarker!: any;
  public mapData: any[] = [];
  private roleType: Roles = Roles.GuestTeacher; //Todo: this can also be a school
  private coordinates: Coordinates = new Coordinates(0, 0); //Todo: change to avoid bugs
  private roleId: string;
  public mapOptions: google.maps.MapOptions = MAP_OPTIONS;

  public ownLocation: any = {
    name: 'Eddy Vos',
  };

  searchForm = this.formBuilder.group({
    straal: '',
    locatie: ''
  });

  constructor(
    private userService: LittilUserService,
    private authService: AuthService,
    private permission: PermissionController,
    private searchService: LittilSearchService,
    private formBuilder: FormBuilder,
    private coordinatesService: CoordinatesService,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService,
  ) {
    this.roleType = this.permission.getRoleType()
    this.roleId = this.permission.getRoleId();
  }

  public ngOnInit(): void {
    this.permission.getRoleId();
    this.fetchSearchResults().subscribe((result) => {
        this.mapData = this.getMapDataFromSearchResults(result);
      }
    );
  }

  private fetchSearchResults(): Observable<SearchResult[]> {
    return this.littilTeacherService.getById(this.roleId).pipe(
      switchMap((teacher: GuestTeacher) => {
        this.ownLocation.name = teacher.firstName + ' ' + teacher.surname; //Todo: add prefix
        return this.coordinatesService.getCoordinates(teacher.address)
      }),
      tap(coordinates => {
        this.coordinates = coordinates;
        this.ownLocation = {
          ...this.ownLocation,
          options: {
            position: {
              lat: coordinates.lat,
              lng: coordinates.lon,
            },
            visible: true,
            icon: {
              size: {width: 25, height: 25},
              url: 'assets/marker.svg',
            } as google.maps.Icon,
          },
        };
      }),
      switchMap((coordinates: Coordinates) => {
        return this.searchService.getSearchResult(coordinates.lat, coordinates.lon, this.getRequiredRoleForSearchResult(this.roleType));
      })
    );
  }

  public onSubmit(): void {
  }

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
            size: {width: 25, height: 25},
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
  modules: string[]
}
