import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Game, Player, Team } from '../core/game';
import { GameService } from '../core/game.service';

@Component({
  templateUrl: 'game-new.component.html',
})
export class GameNewComponent implements OnInit {
  heroForm: FormGroup;
  players: Player[];
  isLoaded = false;

  constructor(private formBuilder: FormBuilder, private gameService: GameService) {
    this.createForm();
  }

  ngOnInit() {
    console.log('GameNewComponent');
    this.gameService.getPlayers().subscribe(players => {
      console.log(players);
      this.setPlayers('playersTeamA');
      this.setPlayers('playersTeamB');
      this.players = players;
      this.isLoaded = true;
    });
  }

  createForm() {
    this.heroForm = this.formBuilder.group({
      maxScore: ['', Validators.required ],
      playersTeamA: this.formBuilder.array([]),
      scoreTeamA: ['', Validators.required ],
      playersTeamB: this.formBuilder.array([]),
      scoreTeamB: ['', Validators.required ],
    });
  }

  setPlayers(name: string) {
    const playerFormGroup = this.formBuilder.group(new PlayerInput());
    const playerFormArray = this.formBuilder.array([playerFormGroup]);
    this.heroForm.setControl(name, playerFormArray);
  }

  addPlayerTeamA() {
    this.playersTeamA.push(this.formBuilder.group(new PlayerInput()));
  }

  addPlayerTeamB() {
    this.playersTeamB.push(this.formBuilder.group(new PlayerInput()));
  }

  get playersTeamA(): FormArray {
    return this.heroForm.get('playersTeamA') as FormArray;
  }

  get playersTeamB(): FormArray {
    return this.heroForm.get('playersTeamB') as FormArray;
  }

  onSubmit() {
    console.log('onSubmit()', this.heroForm.value);
  }
}

export class PlayerInput {
  player = '';
}
