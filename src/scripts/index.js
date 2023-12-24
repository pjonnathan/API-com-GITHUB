document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        getUserProfile(userName)
    }
})


async function user(userName) {
    const url = await fetch(`https://api.github.com/users/${userName}`)
    return await url.json()
}

async function repos(userName) {
    const url = await fetch(`https://api.github.com/users/${userName}/repos`)
    return await url.json()
}


function getUserProfile(userName){

    user(userName).then(userData => {
        let userInfo = `
        <div class="info">
            <img src="${userData.avatar_url}" alt="Foto de perfil"/>
            <div class="data">
                <h1>${userData.name ?? 'Não cadastrou o name'}</h1>
                <p>${userData.bio ?? 'Não possu bio cadastrada'}</p>
            </div>
        </div>`

        document.querySelector('.profile-data').innerHTML = userInfo


        getUserRepos(userName)

    })
}

function getUserRepos(userName) {
    repos(userName).then(reposData => {
        let reposItems = "";

        reposData.forEach(repo => {
            reposItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        })

        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
        <h2>Repositori</h2>
        <ul>${reposItems}</ul>
        </div>` 
    })
}