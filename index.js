const ApiUrl = 'https://api.github.com/users/'

const form = document.getElementById("userForm")
const search = document.getElementById('search')
const main = document.getElementById("main")


form.addEventListener("submit", (e) => {

    e.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)
        search.value = ""
    }
})

async function getUser(user) {

    try {
        let res = await fetch(ApiUrl + user)
        let data = await res.json()

        createCard(data)
        getRepos(user)

    } catch {
        createErrorCard(' Error : This User Name is Not Available')
    }

}

async function getRepos(user) {


    try {
        let res = await fetch(ApiUrl + user + '/repos?sort=created')
        let data = await res.json()

        getReposCard(data)

    } catch {
        createErrorCard(' Error : This User Name is Not Available')
    }

}

function createCard(user) {
    const card = `
    <div class="card">
    <div>
        <img class="avatar" src=${user.avatar_url} alt = ${user.name}>
    </div>
    <div class="profile">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repository</strong></li>
        </ul>
        <div id="repos">

        </div>
    </div>

</div>`

    main.innerHTML = card
}

function createErrorCard(msg) {

    const errorCard = `
    <div clas ='card'>  <h1> ${msg} </h1>  </div> `

    main.innerHTML = errorCard
}

function getReposCard(repos) {
    const repo = document.getElementById("repos")
    repos.
        slice(0, 10)
        .forEach(curr => {
            const repoLink = document.createElement("a")
            repoLink.classList.add("repo")
            repoLink.href = curr.html_url
            repoLink.target = "_blank"
            repoLink.innerText = curr.name
            repo.appendChild(repoLink)

        })
}

