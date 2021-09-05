import { Component, OnInit } from '@angular/core';
import { FootballDataService } from '../service/football-data.service';
import { Standing} from '../model/standing';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  
  standings: Standing[];
  
  constructor(
    private footballService: FootballDataService
  ) {  }

  ngOnInit() {
    this.retrieveAllStandings();
  }

  retrieveAllStandings():void{
    this.footballService.retrieveAllStandings().subscribe(
      
      response => {
        this.standings = response;
        if (!this.isAVInStandings(this.standings)) 
          this.standings = this.footballService.retrieveTestStandings();
      },
      error => {
        this.standings = this.footballService.retrieveTestStandings();
      }
    );
  }

  setRowColor(position): String {
    
    switch(position) {
      
      case '1': {
        return 'first-place';
      }  

      case '2': {
        return 'second-place';
      }  

      case '3': {
        return 'third-place';
      } 

      case '22':
      case '23':
      case '24': {
        return 'relegation-place';
      }
    }
  }

  setLogo(team): String {

    switch(team){

      case 'Aston Villa': {
        return "astonvilla-picture";
      }
      case 'Birmingham City': {
        return 'birmigham-picture';
      }

      case 'Blackburn Rovers': {
        return 'blackburn-picture';
      }

      case 'Bolton Wanderers': {
        return 'bolton-picture';
      }

      case 'Brentford': {
        return 'brentford-picture';
      }

      case 'Bristol City': {
        return 'bristol-picture';
      }

      case 'Derby County': {
        return 'derby-picture';
      }

      case 'Hull City': {
        return 'hull-picture';
      }

      case 'Ipswich Town': {
        return 'ipswich-picture';
      }

      case 'Leeds United': {
        return 'leeds-picture';
      }

      case 'Middlesbrough': {
        return 'middle-picture';
      }

      case 'Millwall': {
        return 'millwall-picture';
      }

      case 'Norwich City': {
        return 'norwich-picture';
      }

      case 'Nottingham Forest': {
        return 'nottingham-picture';
      }

      case 'Preston North End': {
        return 'preston-picture';
      }

      case 'Queens Park Rangers': {
        return 'qpr-picture';
      }

      case 'Reading': {
        return 'reading-picture';
      }

      case 'Rotherham United': {
        return 'rotherham-picture';
      }

      case 'Sheffield United': {
        return 'sheffield-picture';
      }

      case 'Sheffield Wednesday': {
        return 'sheffield-wednesday-picture';
      }

      case 'Stoke City': {
        return 'stoke-picture';
      }

      case 'Swansea City': {
        return 'swansea-picture';
      }

      case 'West Bromwich Albion': {
        return 'wba-picture';
      }

      case 'Wigan Athletic': {
        return 'wigan-picture';
      }
    }
  }

  private isAVInStandings(standings: Standing[]): boolean{
    let avStanding = standings.find(x => x.team_name === 'Aston Villa');

    if (typeof avStanding === 'undefined') {
      return false;
    } else {
      return true;
    }
  }
}
