import {GeoLocation} from "./geo-location.model";

export class NearLocationRequest extends GeoLocation {
  radius: number;
}
