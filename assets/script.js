const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");

const API_URL =
  "https://api.github.com/search/repositories?q={QUERY}&sort=stars&per_page=10";

searchInput.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "enter") {
    const query = searchInput.value.trim();
    if (query) {
      searchRepositories(query);
    }
  }
});

async function searchRepositories(query) {
  showLoading();

  const url = API_URL.replace("{QUERY}", encodeURIComponent(query));

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    const repositories = data.items || [];

    if (repositories.length === 0) {
      showEmptyState();
    } else {
      showResults(repositories);
    }
  } catch (error) {
    showError();
  }
}

function showLoading() {
  resultsContainer.innerHTML = '<p class="loading">Buscando repositórios...</p>';
}

function showEmptyState() {
  resultsContainer.innerHTML =
    '<p class="empty-state">Nenhum repositório encontrado para essa busca.</p>';
}

function showError() {
  resultsContainer.innerHTML =
    '<p class="error-state">Não foi possível realizar a busca. Tente novamente em instantes.</p>';
}

function showResults(repositories) {
  const list = document.createElement("ul");
  list.className = "repo-list";

  repositories.forEach((repo) => {
    list.appendChild(createRepoItem(repo));
  });

  resultsContainer.innerHTML = "";
  resultsContainer.appendChild(list);
}

function createRepoItem(repo) {
  const item = document.createElement("li");
  item.className = "repo-item";

  const header = document.createElement("div");
  header.className = "repo-header";

  const avatar = document.createElement("img");
  avatar.className = "repo-avatar";
  avatar.src = repo.owner.avatar_url;
  avatar.alt = `Foto de ${repo.owner.login}`;
  header.appendChild(avatar);

  const author = document.createElement("span");
  author.className = "repo-author";
  author.textContent = repo.owner.login;
  header.appendChild(author);

  item.appendChild(header);

  const name = document.createElement("p");
  name.className = "repo-name";
  const nameLink = document.createElement("a");
  nameLink.href = repo.html_url;
  nameLink.target = "_blank";
  nameLink.rel = "noopener noreferrer";
  nameLink.textContent = repo.name;
  name.appendChild(nameLink);
  item.appendChild(name);

  if (repo.description) {
    const description = document.createElement("p");
    description.className = "repo-description";
    description.textContent = repo.description;
    item.appendChild(description);
  }

  const meta = document.createElement("div");
  meta.className = "repo-meta";

  if (repo.language) {
    const language = document.createElement("span");
    language.className = "repo-language";
    language.textContent = repo.language;
    meta.appendChild(language);
  }

  const stars = document.createElement("span");
  stars.className = "repo-stars";
  stars.textContent = `★ ${repo.stargazers_count}`;
  meta.appendChild(stars);

  const link = document.createElement("span");
  link.className = "repo-link";
  const linkAnchor = document.createElement("a");
  linkAnchor.href = repo.html_url;
  linkAnchor.target = "_blank";
  linkAnchor.rel = "noopener noreferrer";
  linkAnchor.textContent = "Ver no GitHub →";
  link.appendChild(linkAnchor);
  meta.appendChild(link);

  item.appendChild(meta);

  return item;
}
