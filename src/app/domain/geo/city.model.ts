export class City {
  id: string;

  city: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;

  get displayName(): string {
    return this.region != null && this.region.trim().length > 0
      ? this.city + ", " + this.region + ", " + this.country
      : this.city + ", " + this.country;
  }
}
