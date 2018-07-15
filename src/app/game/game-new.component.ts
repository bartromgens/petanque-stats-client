import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Game, ObjectFactory, Player, Team } from '../core/game';
import { GameService } from '../core/game.service';

@Component({
  templateUrl: 'game-new.component.html',
})
export class GameNewComponent implements OnInit {
  gameForm: FormGroup;
  players: Player[];
  isLoaded = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private gameService: GameService) {
  }

  ngOnInit() {
    console.log('GameNewComponent');
    this.createForm();
    this.gameService.getPlayers().subscribe(players => {
      console.log(players);
      this.setPlayers('playersTeamA');
      this.setPlayers('playersTeamB');
      this.players = players;
      this.isLoaded = true;
    });
  }

  createForm() {
    this.gameForm = this.formBuilder.group({
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
    this.gameForm.setControl(name, playerFormArray);
  }

  addPlayerTeamA() {
    this.playersTeamA.push(this.formBuilder.group(new PlayerInput()));
  }

  addPlayerTeamB() {
    this.playersTeamB.push(this.formBuilder.group(new PlayerInput()));
  }

  get playersTeamA(): FormArray {
    return this.gameForm.get('playersTeamA') as FormArray;
  }

  get playersTeamB(): FormArray {
    return this.gameForm.get('playersTeamB') as FormArray;
  }

  onSubmit() {
    this.submitted = true;

    if (this.gameForm.invalid) {
      return;
    }

    console.log('onSubmit()', this.gameForm.value);
    this.gameService.createGame(this.gameForm.value).subscribe(response => {
      const game: Game = ObjectFactory.createFromResource(Game, response);
      console.log('response', response);
      console.log('response', game);
    });
  }
}

export class PlayerInput {
  id = '';
}
