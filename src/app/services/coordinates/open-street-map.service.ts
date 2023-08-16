import { HttpClient } from '@angular/common/http';
import { Coordinates, CoordinatesService } from './coordinates.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OpenStreetMapService implements CoordinatesService {

  private baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  getCoordinates(location: string | undefined): Observable<Coordinates> {
    const url = `${this.baseUrl}?q=${location}&format=json`;
    return this.http.get<OSMResult[]>(url).pipe(
      map(data => data.map(item => new Coordinates(parseFloat(item.lat), parseFloat(item.lon)))),
      map(coordinates => coordinates[0]),
      first()
    );
  }

}

export interface OSMResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
}
