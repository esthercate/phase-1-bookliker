document.addEventListener("DOMContentLoaded", listBooks);

function listBooks() {
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((elem) => {
        // console.log(elem)
        let booklist = document.getElementById("list");
        let li = document.createElement("li");
        li.innerText = elem.title;
        booklist.appendChild(li);
        li.addEventListener("click", () => {
          document.getElementById("show-panel").innerHTML = "";
          let profileBook = document.getElementById("show-panel");
          let myImg = document.createElement("p");
          myImg.innerHTML = `<img src = '${elem.img_url}'> `;
          let h3Name = document.createElement("h2");
          let h3Auth = document.createElement("h3");
          let desc = document.createElement("p");
          let ul = document.createElement("ul");

          let btn = document.createElement("p");
          btn.innerHTML = `<button>likes</button>`;
          h3Name.innerText = elem.title;
          h3Auth.innerText = elem.author;
          desc.innerText = elem.description;
          profileBook.appendChild(myImg);
          profileBook.appendChild(h3Name);
          profileBook.appendChild(h3Auth);
          profileBook.appendChild(desc);
          profileBook.appendChild(ul);
          profileBook.appendChild(btn);
          elem.users.forEach((user) => {
            let userList = document.createElement("li");
            userList.innerText = user.username;
            ul.appendChild(userList);
          });
          btn.addEventListener("click", () => {
            fetch("http://localhost:3000/users")
              .then((respone) => respone.json())
              .then((myRes) => {
                console.log(myRes.length);
                let randNo = Math.floor(Math.random() * myRes.length);
                let randomUser = myRes[randNo];
                console.log("path" + elem.id);
                // ul.appendChild(randomUser)
                fetch(`http://localhost:3000/books/${elem.id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    users: [...elem.users, randomUser],
                  }),
                }).catch((error) => console.log(error));
                // ul.append
              });
          });
        });
      });
    });
}