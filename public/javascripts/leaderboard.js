const leaderboardBody = document.getElementById('leaderboard-body');

async function loadLeaderboard() {
    const data = await fetchJSON('/api/user/leaderboard');
    if (data) {
        leaderboardBody.innerHTML = `
        <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        ${data
            .map(
                (user, index) => `
        <tr>
            <th scope="row">${index + 1}</th>
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
