import { Injectable } from '@angular/core';
import { Standing} from '../model/standing';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {

  //private standingURL = '';
  private standingURL = 'https://apifootball.com/api/?APIkey=9312f9173fad7330dc780c926a665525c9023c3c4433416130766a602be7c83e&action=get_standings&league_id=63';

  constructor(private http: HttpClient) { }

  retrieveAllStandings(): Observable<Standing[]> {
    
    return this.http.get<Standing[]>(this.standingURL);
  }

  retrieveTestStandings(): Standing[] {
    return [
      {
      "team_name": "Norwich City",
      "overall_league_position": "1",
      "overall_league_payed": "30",
      "overall_league_W": "16",
      "overall_league_D": "9",
      "overall_league_L": "5",
      "overall_league_GF": "57",
      "overall_league_GA": "39",
      "overall_league_PTS": "57"
      },
      {
      "team_name": "Leeds United",
      "overall_league_position": "2",
      "overall_league_payed": "30",
      "overall_league_W": "17",
      "overall_league_D": "6",
      "overall_league_L": "7",
      "overall_league_GF": "50",
      "overall_league_GA": "34",
      "overall_league_PTS": "57"
      },
      {
      "team_name": "Sheffield United",
      "overall_league_position": "3",
      "overall_league_payed": "31",
      "overall_league_W": "16",
      "overall_league_D": "7",
      "overall_league_L": "8",
      "overall_league_GF": "53",
      "overall_league_GA": "34",
      "overall_league_PTS": "55"
      },
      {
      "team_name": "West Bromwich Albion",
      "overall_league_position": "4",
      "overall_league_payed": "29",
      "overall_league_W": "14",
      "overall_league_D": "8",
      "overall_league_L": "7",
      "overall_league_GF": "59",
      "overall_league_GA": "38",
      "overall_league_PTS": "50"
      },
      {
      "team_name": "Middlesbrough",
      "overall_league_position": "5",
      "overall_league_payed": "29",
      "overall_league_W": "13",
      "overall_league_D": "11",
      "overall_league_L": "5",
      "overall_league_GF": "34",
      "overall_league_GA": "22",
      "overall_league_PTS": "50"
      },
      {
      "team_name": "Bristol City",
      "overall_league_position": "6",
      "overall_league_payed": "29",
      "overall_league_W": "13",
      "overall_league_D": "8",
      "overall_league_L": "8",
      "overall_league_GF": "37",
      "overall_league_GA": "29",
      "overall_league_PTS": "47"
      },
      {
      "team_name": "Derby County",
      "overall_league_position": "7",
      "overall_league_payed": "29",
      "overall_league_W": "13",
      "overall_league_D": "8",
      "overall_league_L": "8",
      "overall_league_GF": "40",
      "overall_league_GA": "35",
      "overall_league_PTS": "47"
      },
      {
      "team_name": "Aston Villa",
      "overall_league_position": "8",
      "overall_league_payed": "31",
      "overall_league_W": "10",
      "overall_league_D": "14",
      "overall_league_L": "7",
      "overall_league_GF": "56",
      "overall_league_GA": "49",
      "overall_league_PTS": "44"
      },
      {
      "team_name": "Birmingham City",
      "overall_league_position": "9",
      "overall_league_payed": "30",
      "overall_league_W": "10",
      "overall_league_D": "13",
      "overall_league_L": "7",
      "overall_league_GF": "45",
      "overall_league_GA": "36",
      "overall_league_PTS": "43"
      },
      {
      "team_name": "Hull City",
      "overall_league_position": "10",
      "overall_league_payed": "30",
      "overall_league_W": "12",
      "overall_league_D": "7",
      "overall_league_L": "11",
      "overall_league_GF": "43",
      "overall_league_GA": "38",
      "overall_league_PTS": "43"
      },
      {
      "team_name": "Blackburn Rovers",
      "overall_league_position": "11",
      "overall_league_payed": "30",
      "overall_league_W": "11",
      "overall_league_D": "10",
      "overall_league_L": "9",
      "overall_league_GF": "42",
      "overall_league_GA": "46",
      "overall_league_PTS": "43"
      },
      {
      "team_name": "Nottingham Forest",
      "overall_league_position": "12",
      "overall_league_payed": "30",
      "overall_league_W": "10",
      "overall_league_D": "12",
      "overall_league_L": "8",
      "overall_league_GF": "42",
      "overall_league_GA": "35",
      "overall_league_PTS": "42"
      },
      {
      "team_name": "Swansea City",
      "overall_league_position": "13",
      "overall_league_payed": "30",
      "overall_league_W": "11",
      "overall_league_D": "8",
      "overall_league_L": "11",
      "overall_league_GF": "40",
      "overall_league_GA": "37",
      "overall_league_PTS": "41"
      },
      {
      "team_name": "Queens Park Rangers",
      "overall_league_position": "14",
      "overall_league_payed": "29",
      "overall_league_W": "11",
      "overall_league_D": "6",
      "overall_league_L": "12",
      "overall_league_GF": "35",
      "overall_league_GA": "41",
      "overall_league_PTS": "39"
      },
      {
      "team_name": "Stoke City",
      "overall_league_position": "15",
      "overall_league_payed": "30",
      "overall_league_W": "9",
      "overall_league_D": "11",
      "overall_league_L": "10",
      "overall_league_GF": "33",
      "overall_league_GA": "39",
      "overall_league_PTS": "38"
      },
      {
      "team_name": "Sheffield Wednesday",
      "overall_league_position": "16",
      "overall_league_payed": "29",
      "overall_league_W": "10",
      "overall_league_D": "8",
      "overall_league_L": "11",
      "overall_league_GF": "34",
      "overall_league_GA": "45",
      "overall_league_PTS": "38"
      },
      {
      "team_name": "Brentford",
      "overall_league_position": "17",
      "overall_league_payed": "29",
      "overall_league_W": "9",
      "overall_league_D": "10",
      "overall_league_L": "10",
      "overall_league_GF": "48",
      "overall_league_GA": "41",
      "overall_league_PTS": "37"
      },
      {
      "team_name": "Preston North End",
      "overall_league_position": "18",
      "overall_league_payed": "30",
      "overall_league_W": "9",
      "overall_league_D": "10",
      "overall_league_L": "11",
      "overall_league_GF": "45",
      "overall_league_GA": "45",
      "overall_league_PTS": "37"
      },
      {
      "team_name": "Wigan Athletic",
      "overall_league_position": "19",
      "overall_league_payed": "30",
      "overall_league_W": "9",
      "overall_league_D": "5",
      "overall_league_L": "16",
      "overall_league_GF": "31",
      "overall_league_GA": "45",
      "overall_league_PTS": "32"
      },
      {
      "team_name": "Millwall",
      "overall_league_position": "20",
      "overall_league_payed": "29",
      "overall_league_W": "7",
      "overall_league_D": "9",
      "overall_league_L": "13",
      "overall_league_GF": "34",
      "overall_league_GA": "44",
      "overall_league_PTS": "30"
      },
      {
      "team_name": "Rotherham United",
      "overall_league_position": "21",
      "overall_league_payed": "30",
      "overall_league_W": "5",
      "overall_league_D": "11",
      "overall_league_L": "14",
      "overall_league_GF": "28",
      "overall_league_GA": "48",
      "overall_league_PTS": "26"
      },
      {
      "team_name": "Reading",
      "overall_league_position": "22",
      "overall_league_payed": "30",
      "overall_league_W": "5",
      "overall_league_D": "10",
      "overall_league_L": "15",
      "overall_league_GF": "32",
      "overall_league_GA": "44",
      "overall_league_PTS": "25"
      },
      {
      "team_name": "Bolton Wanderers",
      "overall_league_position": "23",
      "overall_league_payed": "30",
      "overall_league_W": "5",
      "overall_league_D": "8",
      "overall_league_L": "17",
      "overall_league_GF": "19",
      "overall_league_GA": "45",
      "overall_league_PTS": "23"
      },
      {
      "team_name": "Ipswich Town",
      "overall_league_position": "24",
      "overall_league_payed": "30",
      "overall_league_W": "3",
      "overall_league_D": "9",
      "overall_league_L": "18",
      "overall_league_GF": "23",
      "overall_league_GA": "51",
      "overall_league_PTS": "18"
      }
      ]
  }

}
