import {GeoClientConfig} from "../client/model/geo-client-config.model";

import {environment} from "../../environments/environment";

export const GEO_CLIENT_CONFIG: GeoClientConfig = {
  apiKey: environment.service.apiKey,
  serviceUri: environment.service.uri
};
