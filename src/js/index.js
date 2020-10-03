(function () {
  const albabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "aa",
    "ab",
    "ac",
    "ad",
    "ae",
    "af",
    "ag",
    "ah",
    "ai",
    "aj",
    "ak",
    "al",
    "am",
    "an",
    "ao",
    "ap",
    "aq",
    "ar",
    "as",
    "at",
    "au",
    "av",
    "aw",
    "ax",
    "ay",
    "az",
    "ba",
    "bb",
    "bc",
    "bd",
    "be",
    "bf",
    "bg",
    "bh",
    "bi",
    "bj",
    "bk",
    "bl",
    "bm",
    "bn",
    "bo",
    "bp",
    "bq",
    "br",
    "bs",
    "bt",
    "bu",
    "bv",
    "bw",
    "bx",
    "by",
    "bz",
  ];
  const addForm = document.querySelector(".add");
  const list = document.querySelector(".todos");
  const search = document.querySelector(".search input");

  const generateTemplate = (key, todo) => {
    const html = `<li class="list-group-item d-flex justify-content-between align-items-center" key=${key} ><span>${todo}</span> <button class="btn btn-outline-light delete"> <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="trash" ><path fill-rule="evenodd" class="trash-fill" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg></button></li>`;

    list.innerHTML += html;
  };

  const storage = (list) => {
    const empltyAlbabet = albabet.find((e) => localStorage.getItem(e) === null);
    localStorage.setItem(empltyAlbabet, list);
    generateTemplate(empltyAlbabet, list);
  };

  albabet.forEach((e) => {
    if (localStorage.getItem(e) !== null) {
      let loadList = localStorage.getItem(e);
      generateTemplate(e, loadList);
    }
  });

  const fillterTodos = (term) => {
    
    Array.from(list.children)
      .filter((todo) => !todo.textContent.toLowerCase().includes(term))
      .forEach((todo) => {
        todo.classList.add("d-none");
        todo.classList.remove("d-flex");
      });

    Array.from(list.children)
      .filter((todo) => todo.textContent.toLowerCase().includes(term))
      .forEach((todo) => {
        todo.classList.add("d-flex");
        todo.classList.remove("d-none");
      });
  };

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const list = addForm.add.value.trim();
    list.length ? storage(list) : null;
    addForm.reset();
  });

  // Delete TODOs
  list.addEventListener("click", (e) => {
    let todoList;
    if (e.target.classList.contains("delete")) {
      todoList = e.target.parentElement;
    } else if (e.target.classList.contains("trash")) {
      todoList = e.target.parentElement.parentElement;
    } else if (e.target.classList.contains("trash-fill")) {
      todoList = e.target.parentElement.parentElement.parentElement;
    }
    localStorage.removeItem(todoList.getAttribute("key"));
    todoList.remove();
  });

  // keyevent
  search.addEventListener("keyup", () => {
    const term = search.value.toLowerCase().trim();
    fillterTodos(term);
  });
})();
