import {StrHint} from "../../utils/string.util";
import {Injectable} from "@angular/core";
import {Module, ModuleService} from "../../api/generated";
import {Observable, map} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private dataUrl = '/assets/cities.json';

  constructor(private http: HttpClient) {
  }

  fetchLocations(): Observable<Province[]> {
    return this.http.get<MunicipalitiesJson.all>(this.dataUrl).pipe(map(MunicipalitiesJson.parse));
  }
}

export interface Province {
  id: StrHint<"wd:Q770">;
  label: StrHint<"Friesland">;
  municipalities: Municipality[];
}

export interface Municipality {
  name: StrHint<"Gouda">;
  alt: StrHint<"gemeente Gouda, Gemeente Gouda, Golda, Gouda (gemeente), Pijpenburg">;
  lat: number;
  lng: number;
  pop: number;
}

/**
 * The raw types for cities.json content.
 * These are separate from types used within the application (Province, Municipality).
 * So it will be possible to create backwards-compatible parsing in case the format changes.
 */
export namespace MunicipalitiesJson {
  /**
   * The union of all possible json formats that cities.json may contain.
   */
  export type all = v1 /* & v2 */;

  /**
   * Parses data from cities.json into application usable data.
   * It may be that cities.json contains old data (e.g. from browser cache) and so needs to be backwards compatible.
   */
  export function parse(data: MunicipalitiesJson.all) : Province[] {
    return data.provinces;
  }

  export type v1 = {
    version: 1,
    provinces: {
      id: StrHint<"wd:Q770">;
      label: StrHint<"Friesland">;
      municipalities: {
        name: StrHint<"Gouda">,
        alt: StrHint<"gemeente Gouda, Gemeente Gouda, Golda, Gouda (gemeente), Pijpenburg">,
        lat: number,
        lng: number,
        pop: number,
      }[];
    }[];
  };
}
