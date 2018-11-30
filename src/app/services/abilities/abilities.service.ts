import { Injectable } from '@angular/core';
import {Tools} from '../../utils/tools';
import {Observable} from 'rxjs';
import {Abilities} from '../../models/abilities';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getAbilities(): Observable<Array<Abilities>> {
    return this.http.get<Array<Abilities>>(Tools.SERVER + '/abilities/all')
      .pipe(res => {
        return res;
    });
  }

  public getModifier(value: number): Observable<number> {
    return this.http.get<number>(Tools.SERVER + '/modifierTable/modifierTableId/' + value)
      .pipe(res => {
        return res;
      });
  }

}
