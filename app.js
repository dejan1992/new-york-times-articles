const buttonSearch = document.querySelector(".btn");
const inputWord = document.querySelector("#search-input");
const articlesSection = document.querySelector("#articles");
const searchWord = document.querySelector("#search-word");
const option = document.querySelector("#option-input");
const footer = document.querySelector("footer");
buttonSearch.addEventListener('click', searchArticles);
buttonSearch.addEventListener('click', loaderOn)

//Show loader
function loaderOn() {
  if (inputWord.value !== '') {
    document.getElementById('loading').style.display = 'block';
  }
}

function searchArticles() {
  articlesSection.innerHTML = '';
  if (inputWord.value === '') {
    searchWord.innerText = "You Must Input Word"
    searchWord.style.color = "red";;
    setTimeout(() => {
      searchWord.innerText = "Search By Word";
      searchWord.style.color = "#333";
    }, 1500)
  } else {
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${inputWord.value}&sort=${option.value}&api-key=Y6qdYfB5lQiV1yTUFICThTkMjKXOsa3H`)
      .then(res => res.json())
      .then(data => {
        window.articles = data.response.docs;
        for (let i = 0; i < articles.length; i++) {
          //Button - open articles URL
          let btnURL = document.createElement('a');
          btnURL.innerText = "Read More...";
          btnURL.className = "btn-secundary";
          btnURL.href = articles[i].web_url;
          btnURL.target = "_blank";
          window.articlesOpen = articles[i].web_url;

          //Create articles container
          articlesSection.className = "articles";

          //Create article container
          const divArt = document.createElement('div');
          divArt.classList.add("article");

          //Append elements to Article
          divArt.appendChild(createElement('p', articlesOpen.slice(32, 34) + "/" + articlesOpen.slice(29, 31) + "/" + articlesOpen.slice(24, 28), 'date'));
          divArt.appendChild(createElement('h1', articles[i].headline.main));
          divArt.appendChild(createElement('p', articles[i].lead_paragraph));
          divArt.appendChild(btnURL);

          //Append articles to GRID
          articlesSection.appendChild(divArt);

          //Append articles to body
          document.body.append(articlesSection);
        }
      })
      .then(
        function loaderOff() {
          document.getElementById('loading').style.display = 'none';
        }
      )
      .catch(err => console.error(err));
  }
}

// function for creating elements
function createElement(elementType, elementInnerHTML, elementClass = null) {
  let element = document.createElement(elementType)
  element.classList.add(elementClass);
  element.innerHTML = elementInnerHTML;
  return (element)
}
















