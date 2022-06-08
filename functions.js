export function sum(a, b) {
    return a + b;
}

// Season ID

let season_ids = []

export function extract_season_ids(competitions_data) {

    console.log(competitions_data);
    
    for (const competition_object of competitions_data) {
        if (competition_object['competition_name'] === 'Champions League') {
            season_ids.push(competition_object['season_id'])
        }
    }

    season_ids.pop() // removes 76 season id, which contains no data
    
    const random_index = Math.floor(Math.random() * season_ids.length);
    
    let random_season_id = season_ids[random_index];
    random_season_id = 37; // liverpool vs AC Milan 3-3

    return random_season_id;
}
export function extract_tactical_setups(event_object) {
    
    const [home_team_tactical_data, away_team_tactical_data] = [event_object[0], event_object[1]];
    const [home_team_formation, away_team_formation] = [home_team_tactical_data['tactics']['formation'], away_team_tactical_data['tactics']['formation']];
    const [home_team_lineup_object, away_team_lineup_object] = [home_team_tactical_data['tactics']['lineup'], away_team_tactical_data['tactics']['lineup']];

    function generate_lineups(lineup_object) {

        const extracted_lineup = []

        for (const data of lineup_object) {

            const player_name = data['player']['name'];
            const player_number = data['jersey_number'].toString();

            const player_position = data['position']['name'];
            const player_position_split = player_position.split(" ");
            let player_position_initials = '';
    
            for (const word of player_position_split) {
                if (word === "Goalkeeper") {
                    player_position_initials += 'GK';
                } else {
                    player_position_initials += word[0];
                }
            }
    
            extracted_lineup.push([player_number, player_name, player_position_initials])

        }

        return extracted_lineup;

    }

    const home_team_lineup_extracted = generate_lineups(home_team_lineup_object);
    const away_team_lineup_extracted = generate_lineups(away_team_lineup_object);     

    return [home_team_formation, away_team_formation, home_team_lineup_extracted, away_team_lineup_extracted];
     
}
export function extract_goal_events(event_object, home_team) {

    const home_goal_events = [];
    const away_goal_events = [];

    for (const event of event_object) {

        if (event['type']['name'] == 'Shot' && event['shot']['outcome']['name'] === 'Goal' && event['period'] !== 5) {
            
            const timestamp = event['minute'].toString() + ':' + event['second'].toString();
            const goalscorer = event['player']['name'];

            const goal_event = goalscorer + ' - ' + timestamp;

            if (event['possession_team']['name'] === home_team) { // determine if goalscorer is from home or away team
                home_goal_events.push(goal_event);
            } else {
                away_goal_events.push(goal_event);
            }

            

        }

    }

    return [home_goal_events, away_goal_events];

}



