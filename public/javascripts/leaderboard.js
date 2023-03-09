const leaderboardBody = document.getElementById('leaderboard-body');

async function loadLeaderboard() {
    const data = await fetchJSON('/api/user/leaderboard');
    if (data) {
        leaderboardBody.innerHTML = `
        <table class="table">
        <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">User</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        ${data
            .map(
                (user, index) => `
        <tr>
            <th scope="row" style="color: ${getRankColor(index + 1)};">${index + 1}</th>
            <td><a href="userInfo.html?user=${user._id}">${user._id}</a></td>
            <td>${user.maxScore}</td>
        </tr>
        `
            )
            .join('')}
      </tbody>
        </table>
        `;
    }
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
