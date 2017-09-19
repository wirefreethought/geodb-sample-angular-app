import {CitySummary} from "./city-summary.model";
import {GeoLocation} from "./geo-location.model";

export class CityDetails extends CitySummary {
  deleted: boolean;
  elevationMeters: number;
  location: GeoLocation;
  population: number;
}
