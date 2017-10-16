import { Component, OnInit } from "@angular/core";
import {FormControl, NgForm} from "@angular/forms";
import {GeoDbService} from "wft-geodb-angular-client";

@Component({
  selector: "app-set-api-key",
  templateUrl: "./set-api-key.component.html",
  styleUrls: ["./set-api-key.component.css"]
})
export class SetApiKeyComponent implements OnInit {

  apiKeyControl: FormControl;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {
    this.apiKeyControl = new FormControl();
  }

  get apiKey() {
    return this.geoDbService.apiKey;
  }

  onSetKey(form: NgForm) {
    this.geoDbService.setApiKey(form.value.apiKey);
  }
}
