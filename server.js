const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


app.get('/api/stats', (req, res) => {

    const playoffsUrl = 'https://www.hockey-reference.com/friv/playoff_prob.cgi'
    const teamUrl = 'https://www.hockey-reference.com/teams/DAL/2019.html';


    request(teamUrl, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            // games played
            var gamesPlayed = parseInt($("#team_stats td[data-stat='games']").html());
            var gamesLeft = (82 - gamesPlayed).toString();

            //wins
            const wins = parseInt($("#team_stats td[data-stat='wins']").html());
            //wins
            const losses = parseInt($("#team_stats td[data-stat='losses']").html());
            //wins
            const lossesOt = parseInt($("#team_stats td[data-stat='losses_ot']").html());
            const record = `${wins}-${losses}-${lossesOt}`;

            var json = {
                games: gamesLeft,
                record:record,
                chances: 'chances'

            }

            res.send(json);

        } else {
            console.log(error);
        }
    })

});


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(port, () => console.log(`Listening on port ${port}`));