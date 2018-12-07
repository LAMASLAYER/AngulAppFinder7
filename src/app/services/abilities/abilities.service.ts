import { Injectable } from '@angular/core';
import {Tools} from '../../utils/tools';
import {Observable} from 'rxjs';
import {Abilities} from '../../models/abilities';
import {HttpClient} from '@angular/common/http';
import {CharAbilities} from '../../models/charAbilities';


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

  private getAbilityId(charId: number, abilityId: number): Observable<number> {
    return this.http.get<number>(Tools.SERVER + '/charAbilities/charId/' + charId + '/abilityId/' + abilityId)
      .pipe(res => {
        return res;
      });
  }

  public updateAbilities(charAbilities: CharAbilities): void {
    this.getAbilityId(charAbilities.charId, charAbilities.abilityId).subscribe(
      res => {
        this.updateRow(res['charAbilityId'], charAbilities).subscribe();
      }
    );
  }

  public updateRow(charAbilityId: number, charAbilities: CharAbilities): any {
    charAbilities.charAbilityId = charAbilityId;
    return this.http.post(Tools.SERVER + '/charAbilities/post', charAbilities);
  }

}
