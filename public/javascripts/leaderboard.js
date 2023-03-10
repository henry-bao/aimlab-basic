const leaderboardBody = document.getElementById('leaderboard-body');
const leaderboardTypeElement = document.getElementById('leaderboard-type');
const otherLeaderboardTypeElement = document.getElementById('other-leaderboard-type');

let leaderboardType = 'accuracy';
let otherLeaderboardType = 'games';
async function loadLeaderboard() {
    leaderboardBody.innerHTML = 'Loading...';
    leaderboardTypeElement.textContent = leaderboardType;
    otherLeaderboardTypeElement.textContent = otherLeaderboardType;
    try {
        const data = await fetchJSON(`/api/user/leaderboard?type=${leaderboardType}`);
        if (data) {
            leaderboardBody.innerHTML = `
            <table class="table">
            <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">User</th>
              <th scope="col">${capitalize(leaderboardType)}</th>
            </tr>
          </thead>
          <tbody>
            ${data
                .map(
                    (user, index) => `
            <tr>
                <th scope="row" style="color: ${getRankColor(index + 1)};">${index + 1}</th>
                <td><a href="userInfo.html?user=${user._id}">${user._id}</a></td>
                <td>${user.data}</td>
            </tr>
            `
                )
                .join('')}
          </tbody>
            </table>
            `;
        } else {
            leaderboardBody.innerHTML = "Couldn't load leaderboard";
        }
    } catch (error) {
        leaderboardBody.innerHTML = "Couldn't load leaderboard";
    }
}

function switchLeaderboardType() {
    const temp = leaderboardType;
    leaderboardType = otherLeaderboardType;
    otherLeaderboardType = temp;
    loadLeaderboard();
}

function getRankColor(rank) {
    switch (rank) {
        case 1:
            return '#C9B037';
        case 2:
            return '#B4B4B4';
        case 3:
            return '#AD8A56';
        default:
            return 'black';
    }
}
