import { Component } from '@angular/core';
import { LittilUserService } from '../../../services/littil-user/littil-user.service';
import { AuthService } from '@auth0/auth0-angular';
import { PermissionController, Roles } from '../../../services/permission.controller';
import { LittilSearchService } from '../../../services/littil-search/littil-search.service';
import { SearchResult } from '../../../api/generated';

@Component({
  selector: 'littil-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  public selectedMarker!: any;
  private role: Roles;
  public mapData: any[] = [];
  private mockLat: number = 52.098191;
  private mockLong: number = 5.111859
  private mockRole: Roles = Roles.GuestTeacher;

  constructor(
    private userService: LittilUserService,
    private authService: AuthService,
    private permission: PermissionController,
    private searchService: LittilSearchService,
  ) {
    this.role = this.permission.getRoles();
  }

  public ngOnInit(): void {
    this.searchService.getSearchResult(this.mockLat, this.mockLong, this.getRequiredRoleForSearchResult(this.mockRole))
      .subscribe((data: any) => {
        this.mapData = this.getMapDataFromSearchResults(data);
      });
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
    if(role == Roles.School) {
      return MapTypes.GUEST_TEACHER;
    }
    return MapTypes.SCHOOL;
    //Todo: How do we handle admin or empty role?
  }

  public ownLocation: any = {
    name: 'Eddy Vos',
    options: {
      position: {
        lat: 52.0989904,
        lng: 5.1135757,
      },
      visible: true,
      icon: {
        size: {width: 25, height: 25},
        url: 'assets/user-location.svg',
      } as google.maps.Icon,
    },
  };
  public center: google.maps.LatLngLiteral = {
    lat: 52.098191,
    lng: 5.111859,
  } as google.maps.LatLngLiteral;
  public zoom: number | MapZoomLevels = MapZoomLevels.LOCATION_FOCUS;
  public mapOptions: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    maxZoom: MapZoomLevels.SELECTION_FOCUS,
    minZoom: MapZoomLevels.WHOLE_NL,
    styles: [
      {
        elementType: 'labels',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
    ],
  };

  public onMarkerClick(marker: IMapData) {
    this.selectedMarker = marker;
  }
}

export enum MapZoomLevels {
  WHOLE_NL = 8,
  LOCATION_FOCUS = 15,
  SELECTION_FOCUS = 17,
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
