import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

class Coordinates {
  constructor(
    public lat: number,
    public lon: number,
  ) {}
}

@Injectable({
  providedIn: 'root',
})
abstract class CoordinatesService {
  abstract getCoordinates(location: string): Observable<Coordinates>;
}

export { Coordinates, CoordinatesService };

export type LatLng = {lat: number; lng: number};
