import {Component, NgZone} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {combineLatest, map, Observable, switchMap} from 'rxjs';
import {GuestTeacher, School, SearchResult} from '../../../api/generated';
import {Coordinates, CoordinatesService,} from '../../../services/coordinates/coordinates.service';
import {OpenStreetMapService} from '../../../services/coordinates/open-street-map.service';
import {LittilSchoolService} from '../../../services/littil-school/littil-school.service';
import {LittilSearchService} from '../../../services/littil-search/littil-search.service';
import {LittilTeacherService} from '../../../services/littil-teacher/littil-teacher.service';
import {PermissionController, Roles,} from '../../../services/permission.controller';
import {MAP_OPTIONS} from './map-options';
import {Icon, Layer, marker, Marker, MarkerOptions} from "leaflet";

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

    const results$ = this.fetchSearchResults(pos$);
    const resultMarkers$ = this.makeResultMarkers(results$);

    const allMarkers$ = combineLatest([userMarker$, resultMarkers$]).subscribe(([userMarker, resultMarkers]) => {
      this.mapLayers = [userMarker, ...resultMarkers];
    });
  }

  private fetchUserInfo(): Observable<GuestTeacher | School> {
    const userObservable: Observable<GuestTeacher | School> = this.roleType == Roles.GuestTeacher
      ? this.littilTeacherService.getById(this.roleId)
      : this.littilSchoolService.getById(this.roleId);

    return userObservable
  }

  private fetchUserCoordinate(user: Observable<GuestTeacher | School>): Observable<Coordinates> {
    return user.pipe(
      switchMap((user: GuestTeacher | School) => {
        // TODO: Some users will not give permission to use their address, in that case they need to use the search form for an initial search
        return this.coordinatesService.getCoordinates(user.address)
      }));
  }

  private makeUserMarker(user: Observable<GuestTeacher | School>, position: Observable<Coordinates>): Observable<Marker> {
    return combineLatest([user, position])
      .pipe(map(([user, position]) => {
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

  // TODO: Fetching the Teacher / School & Coordinates should be moved to a separate class (profile controller?)
  // This class can be injected in this component to access the data.
  private fetchSearchResults(pos$: Observable<Coordinates>): Observable<SearchResult[]> {
    return pos$.pipe(
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

  public onSubmit(): void {
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
          }).on('click', event =>this.zone.run(() => this.onMarkerClick(event.target)))
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
