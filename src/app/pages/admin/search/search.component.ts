import {Component, NgZone} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {combineLatest, map, Observable, switchMap, from, of, EMPTY, Subject, take, tap, startWith} from 'rxjs';
import {GuestTeacher, Module, ModuleService, School, SearchResult} from '../../../api/generated';
import {Coordinates, CoordinatesService} from '../../../services/coordinates/coordinates.service';
import {OpenStreetMapService} from '../../../services/coordinates/open-street-map.service';
import {LittilSchoolService} from '../../../services/littil-school/littil-school.service';
import {LittilSearchService} from '../../../services/littil-search/littil-search.service';
import {LittilTeacherService} from '../../../services/littil-teacher/littil-teacher.service';
import {PermissionController, Roles,} from '../../../services/permission.controller';
import {MAP_OPTIONS} from './map-options';
import {Icon, Layer, marker, Marker, MarkerOptions} from "leaflet";
import {CitiesService, MunicipalitiesJson} from "../../../services/coordinates/cities.service";
import {SearchQuery} from "./search-form.component";
import {LittilModulesService} from "../../../services/littil-modules/littil-modules.service";

@Component({
  selector: 'littil-search',
  templateUrl: './search.component.html',
  providers: [{provide: CoordinatesService, useClass: OpenStreetMapService}],
})
export class SearchComponent {
  public selectedMarker: Marker | null = null;
  private roleType: Roles;
  private roleId: string;
  public mapOptions: L.MapOptions = MAP_OPTIONS;
  public mapLayers: Layer[] = [];
  private searchQuery$ = new Subject<SearchQuery>();
  private searchResults$: Observable<SearchResult[]> = this.searchQuery$.pipe(
    switchMap(query => {
      return this.searchService.getSearchResult(
        query.modules,
        query.lat,
        query.lng,
        query.distance,
        this.getRequiredRoleForSearchResult(this.roleType)
      );
    }),
  );

  constructor(
    private permissionController: PermissionController,
    private searchService: LittilSearchService,
    private moduleService: LittilModulesService,
    private formBuilder: FormBuilder,
    private coordinatesService: CoordinatesService,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService,
    private zone: NgZone
  ) {
    this.roleType = this.permissionController.getRoleType();
    this.roleId = this.permissionController.getRoleId();
  }

  public ngOnInit(): void {
    const user$ = this.fetchUserInfo();
    const pos$ = this.fetchUserCoordinate(user$);
    const userMarker$ = this.makeUserMarker(user$, pos$);
    const resultMarkers$ = this.makeResultMarkers(this.searchResults$);
    const allMarkers$ = combineLatest([userMarker$, resultMarkers$.pipe(startWith([]))]).subscribe(([userMarker, resultMarkers]) => {
      this.mapLayers = userMarker ? [userMarker, ...resultMarkers] : resultMarkers;
    });
  }

  private fetchUserInfo(): Observable<GuestTeacher | School> {
    const userObservable: Observable<GuestTeacher | School> = this.roleType == Roles.GuestTeacher
      ? this.littilTeacherService.getById(this.roleId)
      : this.littilSchoolService.getById(this.roleId);

    return userObservable
  }

  private fetchUserCoordinate(user: Observable<GuestTeacher | School>): Observable<Coordinates | null> {
    return user.pipe(
      switchMap((user: GuestTeacher | School) => {
        // TODO: Some users will not give permission to use their address, in that case they need to use the search form for an initial search
        if (user.address) {
          return this.coordinatesService.getCoordinates(user.address)
        } else {
          return of(null);
        }
      }));
  }

  private makeUserMarker(user: Observable<GuestTeacher | School>, position: Observable<Coordinates | null>): Observable<Marker | null> {
    return combineLatest([user, position])
      .pipe(map(([user, position]) => {
        if (position === null) return null;
        const opt: MarkerOptions = {
          title: `${user.firstName} ${user.surname}`,
          icon: new Icon({
            iconUrl: 'assets/user-location.svg',
            iconSize: [25, 25],
          }),
        };
        return marker([position.lat, position.lon], opt).on('click', event => this.zone.run(() => this.onMarkerClick(event.target)))
      }));
  }

  public onSubmit(query: SearchQuery): void {
    this.searchQuery$.next(query);
  }

  private getRequiredRoleForSearchResult(role: Roles): string {
    return role == Roles.School ? MapTypes.GUEST_TEACHER : MapTypes.SCHOOL;
  }

  public onMarkerClick(marker: Marker) {
    this.selectedMarker = marker;
  }

  private makeResultMarkers(results$: Observable<SearchResult[]>): Observable<Marker[]> {
    return results$.pipe(map((results) => {
      return results.map(result =>
        marker([result.latitude!, result.longitude!],
          {
            title: result.name,
            icon: new Icon({
              iconUrl: 'assets/marker.svg',
              iconSize: [25, 25],
            }),
          }).on('click', event => this.zone.run(() => this.onMarkerClick(event.target)))
      )
    }));
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
