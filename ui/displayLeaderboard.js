// leaderboard.js


 function displayLeaderBoard() {

        if (this.displayingLeaderboard === false) {
            const leaderboardHighest = this.leaderboard
                .slice()
                .sort((a, b) => b.score - a.score);

            for (let i = 0; i < leaderboardHighest.length; i++) {
                let position = "";
                if (i === 0) {
                    position = "👑";
                } else if (i === 1) {
                    position = "🥈";
                } else if (i === 2) {
                    position = "🥉";
                } else {
                    position = `${i + 1}th`;
                }

                const html = `
                    <div>
                        <p id= "leaderboard">${position} ${leaderboardHighest[i].nameID} Score: ${leaderboardHighest[i].score}</p>
                    </div>
                `;

                this.leaderboardContainer.insertAdjacentHTML("beforeend", html);
            }

            this.displayingLeaderboard = true;
        } else {

            this.leaderboardContainer.innerHTML = ""; 
            this.displayingLeaderboard = false;
        }
    }



  export  {displayLeaderBoard}

