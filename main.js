// functions
const listUsers = usersArr => {
  const main = document.querySelector('#main')
  let usersList = '<div id="users-list">'
      
  usersArr.forEach(user => {
    usersList += '<hr />'

    usersList += `<div class="user" id="user_${user.id}">
      <img src="${user.avatar_url}" style="height: 50px;" />

      <a href="/user">
        <h2>${user.login}</h2>
      </a>
    </div>`
  })

  usersList += '</div>'

  main.innerHTML = usersList
}

const search = () => {
  const searchField = document.querySelector('#search-field')
  const searchBtn = document.querySelector('#search-btn')

  const search = () => {
    const searchStr = searchField.value

    fetch(`https://api.github.com/search/users?q=${searchStr}`)
      .then(response => response.json())
      .then(response => listUsers(response.items))
  }

  searchBtn.addEventListener('click', () => search())
  searchField.addEventListener('keyup', e => {
    if (e.keyCode === 13) search()
  })
}

const sortRepos = (repos, order) => {
  return repos.sort((a, b) => {
    if (!order) {
      return b.stargazers_count - a.stargazers_count
    } else {
      return a.stargazers_count - b.stargazers_count
    }
  })
}

const displayUserRepos = reposUrl => {
  const reposList = document.querySelector('#repos-list')
  let reposHTML = ''

  fetch(reposUrl)
    .then(response => response.json())
    .then(repos => {
      const sortedRepos = sortRepos(repos)

      reposHTML += `<div id="reposList">
      <h2>Repositórios</h2>
      
      <button id="sort-repos" class="btn btn-default">
        <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
        <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
      </button>`

      sortedRepos.forEach(repo => {
        reposHTML += `<a href="/repo">
          <p>${repo.name + ' '}
            <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
            ${' ' + repo.stargazers_count}
          </p>
        </a>`
      })

      reposHTML += '</div>'

      reposList.innerHTML = reposHTML
    })
}

const displayUserInfo = username => {
  const main = document.querySelector('#main')
  let userHTML = ''

  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(user => {
      userHTML += `
        <div id="user">
          <img src="${user.avatar_url || ''}" />
          
          <a href="${user.url || ''}">
            <h1>${user.login}</h1>
          </a>

          <a href="${user.blog || ''}">
            <h2>${user.name || ''}</h2>
          </a>

          <p>${user.location || ''}</p>

          <p>${user.email || ''}</p>

          <div class="follows">
            <p>${user.followers} seguidores</p>
            <p>${user.following} seguindo</p>
          </div>

          <div id="repos-list"></div>
        </div>
      `

      main.innerHTML = userHTML

      displayUserRepos(user.repos_url)
    })
}

// busca pelo campo de pesquisa
window.onload = function() {
  const route = window.location.pathname
  if (route === '/') {
    search()
  } else {
    displayUserInfo('mojombo')
    // const sortBtn = document.querySelector('#sort-repos')

    // sortBtn.addEventListener('click', () => {
      
    // })
  }
}