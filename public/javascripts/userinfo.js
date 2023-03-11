async function loadUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');
    const userInfoNav = document.querySelector('#user-info-nav');
    const gameNum = document.querySelector('#game-num');

    const identityInfo = await fetchJSON(`api/user/get-identity`);

    if (username === identityInfo.userInfo?.username) {
        const logOutTag = document.createElement('a');
        logOutTag.innerHTML = `<a id="logout" href="logout">Log out</a>`;
        userInfoNav.appendChild(logOutTag);
    }

    const userIdentityEle = document.createElement('div');
    try {
        const req = await (await fetch(`api/user/load-user-info?username=${encodeURIComponent(username)}`)).json();
        if (req.status !== 'error') {
            userIdentityEle.innerHTML = `<a id="user-identity">${req.user} (${req.username})</a>`;
        } else {
            userIdentityEle.innerHTML = `<a id="user-identity">User not found</a>`;
        }
        userInfoNav.appendChild(userIdentityEle);

        const history = await (await fetch(`api/user/get-history?username=${encodeURIComponent(username)}`)).json();
        const historyDiv = document.querySelector('#history');
        if (!history.length) {
            historyDiv.innerHTML = `No history found`;
            gameNum.textContent = `0 games`;
        } else {
            historyDiv.classList.add('table-responsive');
            gameNum.textContent = `${history.length} games`;
            historyDiv.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Score</th>
                        <th scope="col">Accuracy</th>
                        <th scope="col">Game Time</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${history
                        .map(
                            (game) => `
                            <tr>
                                <td>${game.hit}</td>
                                <td>${game.accuracy}%</td>
                                <td>${game.seconds}s</td>
                                <td>${new Date(game.game_date).toDateString()}</td>
                            </tr>`
                        )
                        .join('')}
                </tbody>
            </table>
            `;
        }
    } catch (error) {
        console.error(error);
        userIdentityEle.innerHTML = `<a id="user-identity">User not found</a>`;
    }

    const backToMain = document.createElement('a');
    backToMain.innerHTML = `<a id="back" href="/">Back</a>`;
    userInfoNav.appendChild(backToMain);
}
