import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Icon, Layer, marker, Marker, MarkerOptions } from 'leaflet';
import { combineLatest, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { GuestTeacher, School, SearchResult, UserType } from '../../../api/generated';
import { ButtonComponent } from '../../../components/button/button.component';
import { ContactModalComponent } from '../../../components/contact-modal/contact-modal.component';
import { ContentContainerComponent } from '../../../components/content-container/content-container.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormInputSelectComponent } from '../../../components/forms/select-input/form-input-select.component';
import { FormInputTextComponent } from '../../../components/forms/text-input/form-input-text.component';
import { ModalController, ModalSize } from '../../../components/modal/modal.controller';
import { Coordinates, CoordinatesService } from '../../../services/coordinates/coordinates.service';
import { OpenStreetMapService } from '../../../services/coordinates/open-street-map.service';
import { LittilModulesService } from '../../../services/littil-modules/littil-modules.service';
import { LittilSchoolService } from '../../../services/littil-school/littil-school.service';
import { LittilSearchService } from '../../../services/littil-search/littil-search.service';
import { LittilTeacherService } from '../../../services/littil-teacher/littil-teacher.service';
import { PermissionController, Roles } from '../../../services/permission.controller';
import { MAP_OPTIONS } from './map-options';
import { SearchFormComponent, SearchQuery } from './search-form.component';

@Component({
  selector: 'littil-search',
  templateUrl: './search.component.html',
  providers: [{ provide: CoordinatesService, useClass: OpenStreetMapService }],
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
    SearchFormComponent,
  ],
})
export class SearchComponent {
  public selectedMarker: Marker | null = null;
  public selectedSearchResult: SearchResult | undefined;
  private roleType: Roles;
  private roleId: string;
  public mapOptions: L.MapOptions = MAP_OPTIONS;
  public mapLayers: Layer[] = [];
  private searchQuery$ = new Subject<SearchQuery>();
  private searchResults$: Observable<SearchResult[]> = this.searchQuery$.pipe(
    switchMap((query: any) => {
      return this.searchService.getSearchResult(
        query.modules,
        query.lat,
        query.lng,
        query.distance,
        this.getRequiredRoleForSearchResult(this.roleType)
      );
    })
  );

  constructor(
    private permissionController: PermissionController,
    private searchService: LittilSearchService,
    private moduleService: LittilModulesService,
    private formBuilder: FormBuilder,
    private coordinatesService: CoordinatesService,
    private littilTeacherService: LittilTeacherService,
    private littilSchoolService: LittilSchoolService,
    private zone: NgZone,
    private modalController: ModalController
  ) {
    this.roleType = this.permissionController.getRoleType();
    this.roleId = this.permissionController.getRoleId();
  }

  public ngOnInit(): void {
    const user$ = this.fetchUserInfo();
    const pos$ = this.fetchUserCoordinate(user$);
    const userMarker$ = this.makeUserMarker(user$, pos$);
    const resultMarkers$ = this.makeResultMarkers(this.searchResults$);
    const allMarkers$ = combineLatest([userMarker$, resultMarkers$.pipe(startWith([]))]).subscribe(
      ([userMarker, resultMarkers]) => {
        this.mapLayers = userMarker ? [userMarker, ...resultMarkers] : resultMarkers;
      }
    );
  }

  private fetchUserInfo(): Observable<GuestTeacher | School> {
    return this.roleType == Roles.GuestTeacher
      ? this.littilTeacherService.getById(this.roleId)
      : this.littilSchoolService.getById(this.roleId);
  }

  private fetchUserCoordinate(
    user: Observable<GuestTeacher | School>
  ): Observable<Coordinates | null> {
    return user.pipe(
      switchMap((user: GuestTeacher | School) => {
        // TODO: Some users will not give permission to use their address, in that case they need to use the search form for an initial search
        if (user.postalCode) {
          return this.coordinatesService.getCoordinates(user.postalCode);
        } else {
          return of(null);
        }
      })
    );
  }

  private makeUserMarker(
    user: Observable<GuestTeacher | School>,
    position: Observable<Coordinates | null>
  ): Observable<Marker | null> {
    return combineLatest([user, position]).pipe(
      map(([user, position]) => {
        if (position === null) return null;
        const opt: MarkerOptions = {
          title: `${user.firstName}${user.prefix ? ` ${user.prefix}` : ''} ${user.surname}`,
          icon: new Icon({
            iconUrl: 'assets/user-location.svg',
            iconSize: [25, 25],
          }),
        };
        return marker([position.lat, position.lon], opt).on('click', event =>
          this.zone.run(() => this.onMarkerClick(event.target, undefined))
        );
      })
    );
  }

  public onSubmit(query: SearchQuery): void {
    this.searchQuery$.next(query);
  }

  public async openContactModal() {
    return this.modalController.present(ContactModalComponent, this.selectedSearchResult, {
      modalSize: ModalSize.SM,
    });
  }

  private getRequiredRoleForSearchResult(role: Roles): string {
    return role == Roles.School ? MapTypes.GUEST_TEACHER : MapTypes.SCHOOL;
  }

  public getSelectedSearchResultRole(): string {
    return this.selectedSearchResult?.userType === UserType.School
      ? 'school'
      : this.selectedSearchResult?.userType === UserType.GuestTeacher
      ? 'gastdocent'
      : '';
  }

  public onMarkerClick(marker: Marker, searchResult: SearchResult | undefined) {
    this.selectedMarker = marker;
    this.selectedSearchResult = searchResult;
  }

  private makeResultMarkers(results$: Observable<SearchResult[]>): Observable<Marker[]> {
    return results$.pipe(
      map(results => {
        return results.map(result =>
          this.getMarker(result)
        );
      })
    );
  }

  private getMarker(result: SearchResult) {
    const m = marker([result.latitude!, result.longitude!], {
      title: result.name,
      icon: new Icon({
        iconUrl: 'assets/marker.svg',
        iconSize: [25, 25],
      }),
    }).on('click', event => this.zone.run(() => this.onMarkerClick(event.target, result)));
    m.on('add', () => {
      const el = m.getElement();
      if (el) {
        el.setAttribute('data-test', `resultMarker`);
      }
    });
    return m;
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
