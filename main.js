const box = document.querySelector('.box');
const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.inputs');
const siteUrl = "http://localhost:3000/posts";

const render = (data) => {
  box.innerHTML = data?.map(
    (el) => `
      <div>
        <h1>${el.title}</h1>
        <button id="${el?.id}" onclick="deleteItem(${el?.id})">delete</button>
        <button class="update-item" id="${el?.id}" onclick="updateItem(${el?.id})">update</button>
      </div>
    `
  ).join("");
};

const getData = () => {
  fetch(siteUrl)
    .then((res) => res.json())
    .then((data) => render(data))
    .catch((error) => {
      console.log(error);
    });
};

const deleteItem = (id) => {
  fetch(`${siteUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .finally(() => {
      getData();
    });
};

const updateItem = (id) => {
  let title = prompt("edit");
  if (title !== null && title.trim() !== "") {
    fetch(`${siteUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .finally(() => {
        getData();
      });
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {};

  for (let i of inputs) {
    obj[i.name] = i.value;
    i.value = "";
  }

  fetch(siteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      getData();
    });
});

getData();
