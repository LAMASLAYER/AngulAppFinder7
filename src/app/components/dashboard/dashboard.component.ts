import { Component, OnInit } from '@angular/core';
import {AbilitiesService} from '../../services/abilities/abilities.service';
import {Abilities} from '../../models/abilities';
import {Character} from '../../models/character';
import {CharactersService} from '../../services/characters/characters.service';
import {Tools} from '../../utils/tools';
import {CharAbilities} from '../../models/charAbilities';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private abilitiesService: AbilitiesService;
  public abilities: Array<Abilities>;
  public character: Character;
  private charactersService: CharactersService;
  private _editMode: boolean;
  private updatedAbilities: boolean;
  private updatedAbilitiesList: Array<CharAbilities>;
  private charAbilityIds: Array<number>;

  constructor(abilitiesService: AbilitiesService, charactersService: CharactersService) {
    this.abilitiesService = abilitiesService;
    this.charactersService = charactersService;
  }

  ngOnInit() {
    this._editMode = false;
    this.charAbilityIds = [];
    this.updatedAbilitiesList = new Array<CharAbilities>();
    this.getAbilities();
    this.getCharacter();
  }

  public getAbilities(): void {
    this.abilitiesService.getAbilities().subscribe(
      res => {
        this.abilities = res;
      }
    );
  }

  get editMode(): boolean {
    return this._editMode;
  }

  set editMode(value: boolean) {
    this._editMode = value;
  }

  public getCharacter(): void {
    this.charactersService.getCharacter(1).subscribe(
      res => {
        this.character = res;
        console.log(this.character);
      },
      error => {
        console.log(error);
    });
  }

  public updateModPlus(index: number, value: number, abilityId: number): void {
    this.abilitiesService.getModifier(value).subscribe(
      res => {
        this.updatedAbilities = true;
        if (!this.charAbilityIds.includes(abilityId)) {
          const tempAbility = new CharAbilities();
          tempAbility.charId = Tools.CHARACTER;
          tempAbility.abilityId = abilityId;
          tempAbility.abilityValue = value + 1;
          this.updatedAbilitiesList.push(tempAbility);
          this.charAbilityIds.push(abilityId);
        } else {
          for (let i = 0; i < this.updatedAbilitiesList.length; i++) {
            if (this.updatedAbilitiesList[i].abilityId === abilityId) {
              this.updatedAbilitiesList[i].abilityValue += 1;
            }
          }
        }
        this.character.abilities[index].value += 1;
        return this.character.abilities[index].modifier = this.character.abilities[index].value + res;
      },
      error => {
        console.log(error);
      });
  }

  public updateModMinus(index: number, value: number, abilityId: number): void {
    this.abilitiesService.getModifier(value).subscribe(
      res => {
        this.updatedAbilities = true;
        if (!this.charAbilityIds.includes(abilityId)) {
          const tempAbility = new CharAbilities();
          tempAbility.charId = Tools.CHARACTER;
          tempAbility.abilityId = abilityId;
          tempAbility.abilityValue = value -1;
          this.updatedAbilitiesList.push(tempAbility);
          this.charAbilityIds.push(abilityId);
        } else {
          for (let i = 0; i < this.updatedAbilitiesList.length; i++) {
            if (this.updatedAbilitiesList[i].abilityId === abilityId) {
              this.updatedAbilitiesList[i].abilityValue -= 1;
            }
          }
        }
        this.character.abilities[index].value -= 1;
        return this.character.abilities[index].modifier = this.character.abilities[index].value + res;
      },
      error => {
        console.log(error);
      });
  }

  public saveChar(): void {
    if (this.updatedAbilities === true) {
      this.saveAbilitiesModule(this.updatedAbilitiesList);
    }
    this.updatedAbilitiesList = [];
  }

  private saveAbilitiesModule(charAbilities: Array<CharAbilities>): void {
    for (let i = 0; i < charAbilities.length; i++) {
      this.abilitiesService.updateAbilities(charAbilities[i]);
    }
  }
}
