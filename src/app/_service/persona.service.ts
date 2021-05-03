import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Persona } from '../_model/persona';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonaService extends GenericService<Persona> {

  personaCambio = new Subject<Persona[]>();
  mensajeCambio = new Subject<string>();



  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/personas`
    );
  }
}
