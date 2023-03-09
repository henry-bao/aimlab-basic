let user = undefined;

async function loadIdentity() {
    const identityEle = document.querySelector('#identity-div');
    try {
        const identityInfo = await fetchJSON(`api/user/get-identity`);
        if (identityInfo.status == 'loggedin') {
            document.getElementById("log-out").style.display = "inline"
            user = identityInfo;
            identityEle.innerHTML = `
            <a id="identity" href="/userInfo.html?user=${encodeURIComponent(
                identityInfo.userInfo.username
            )}">${escapeHTML(identityInfo.userInfo.name)}</a>`;
        } else {
            document.getElementById("log-out").style.display = "none"
            user = undefined;
            identityEle.innerHTML = `
            <a id="login" href="login">Log in</a>`;
        }
    } catch (error) {
        user = undefined;
        identityEle.innerHTML = `
        <a id="identity" onclick="loadIdentity()>Retry</a>`;
    }
}
