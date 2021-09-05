import { Component, OnInit } from '@angular/core';
import { FootballDataService } from '../service/football-data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  position: String;

  constructor(private footballDataService: FootballDataService) { }

  ngOnInit() {
    this.getLeaguePosition();
  }

  getLeaguePosition(): void {

    this.footballDataService.retrieveAllStandings().subscribe ( 
      
    response => {
      let standings = response;
      let avStanding = standings.find(x => x.team_name === 'Aston Villa');
      if (typeof avStanding === 'undefined') {
        this.getTestLeaguePosition();
      } else {
        this.position = avStanding.overall_league_position;
      }
      
    },
    error => {
     this.getTestLeaguePosition()
    });
  }

  private getTestLeaguePosition(): void {
    let standings = this.footballDataService.retrieveTestStandings();
    this.position = standings.find(x => x.team_name === 'Aston Villa').overall_league_position;
  }
}
