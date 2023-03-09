let myIdentity = undefined;

async function loadIdentity() {
    let identityEle = document.getElementById('identity-div');
    try {
        const identityInfo = await fetchJSON(`api/user/get-identity`);
        if (identityInfo.status == 'loggedin') {
            myIdentity = identityInfo.userInfo.username;
            identityEle.innerHTML = `
            <a class="identity" href="/userInfo.html?user=${encodeURIComponent(
                identityInfo.userInfo.username
            )}">${escapeHTML(identityInfo.userInfo.name)}</a>`;
        } else {
            myIdentity = undefined;
            identityEle.innerHTML = `
            <a id="login" href="login">Log in</a>`;
        }
    } catch (error) {
        myIdentity = undefined;
        identityEle.innerHTML = `
        <a id="identity" onclick="loadIdentity()>Retry</a>`;
    }
}
