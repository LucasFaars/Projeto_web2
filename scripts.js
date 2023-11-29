// // Seleção de elemntos
// const todoForm = document.querySelector("#todo-form");
// const todoInput = document.querySelector("#todo-input");
// const teste = document.querySelector("#teste");
// const descri = document.querySelector("#descricao");
// const todoList = document.querySelector("#todo-list");
// const editForm = document.querySelector("#edit-form");
// const editInput = document.querySelector("#edit-input");
// const cancelEditBtn = document.querySelector("#cancel-edit-btn");
// const searchInput = document.querySelector("#search-input");
// const filterBtn = document.querySelector("#filter-select");

// let oldInputValue;

// // Funções
// const saveTodo = (title, author, description) => {
//   const todo = document.createElement("div");
//   todo.classList.add("todo");

//   const todoTitle = document.createElement("h3");
//   todoTitle.innerText = title + " | " + author;
//   todo.appendChild(todoTitle);

//   const todoDescription = document.createElement("p");
//   todoDescription.classList.add("description");
//   todoDescription.innerText = description;
//   todo.appendChild(todoDescription);

//   const todoCreationTime = document.createElement("p");
//   todoCreationTime.classList.add("creation-time");
//   todoCreationTime.innerText = "Data e Hora de Criação: " + new Date().toLocaleString();
//   todo.appendChild(todoCreationTime);

//   const doneBtn = document.createElement("button");
//   doneBtn.classList.add("finish-todo");
//   doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
//   todo.appendChild(doneBtn);

//   const editBtn = document.createElement("button");
//   editBtn.classList.add("edit-todo");
//   editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
//   todo.appendChild(editBtn);

//   const deleteBtn = document.createElement("button");
//   deleteBtn.classList.add("remove-todo");
//   deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
//   todo.appendChild(deleteBtn);

//   todoList.appendChild(todo);

//   // Limpar quando terminar de digitar
//   todoInput.value = "";
//   teste.value = "";

//   // Criar um objeto com os dados da tarefa
//   const todoData = {
//       title: title,
//       author: author,
//       description: description,
//       creationTime: new Date().toLocaleString(),
//       concluido: false,
//       // ... (outras propriedades)
//   };

//   // Enviar os dados para o servidor
//   $.ajax({
//       type: 'POST',
//       url: 'salvar_tarefa.php',
//       data: JSON.stringify(todoData), // Enviar os dados como JSON
//       contentType: 'application/json', // Definir o tipo de conteúdo como JSON
//       success: function (data) {
//           // Lógica de sucesso, se necessário
//       },
//       error: function (xhr, status, error) {
//           console.error("Erro ao salvar a tarefa:", status, error);
//           console.log("Resposta do servidor:", xhr.responseText);
//           alert('Erro ao salvar a tarefa no servidor. Consulte o console para mais detalhes.');
//       },
//   });
// };



// const toggleForms = () => {
//     editForm.classList.toggle("hide");
//     todoForm.classList.toggle("hide");
//     todoList.classList.toggle("hide");
//   };

//   const updateTodo = (title, description) => {
//     const todos = document.querySelectorAll(".todo");

//     todos.forEach((todo) => {
//         const todoTitle = todo.querySelector("h3");
//         const todoDescription = todo.querySelector(".description");
//         const todoCreationTime = todo.querySelector(".creation-time");

//         if (todoTitle.innerText === oldInputValue) {
//             todoTitle.innerText = title;
//             todoDescription.innerText = description;
//             todoCreationTime.innerText = "Data e Hora de Edição: " + new Date().toLocaleString();
//         }
//     });
// };

// const getSearchedTodos = (search) => {
//     const todos = document.querySelectorAll(".todo");
  
//     todos.forEach((todo) => {
//       const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
  
//       todo.style.display = "flex";
  
//       console.log(todoTitle);
  
//       if (!todoTitle.includes(search)) {
//         todo.style.display = "none";
//     }
//   });
// };
// const filterTodos = (filterValue) => {
//   const todos = document.querySelectorAll(".todo");

//   switch (filterValue) {
//     case "all":
//       todos.forEach((todo) => (todo.style.display = "flex"));

//       break;

//     case "done":
//       todos.forEach((todo) =>
//         todo.classList.contains("done")
//           ? (todo.style.display = "flex")
//           : (todo.style.display = "none")
//       );

//       break;

//     case "todo":
//       todos.forEach((todo) =>
//         !todo.classList.contains("done")
//           ? (todo.style.display = "flex")
//           : (todo.style.display = "none")
//       );

//       break;

//     default:
//       break;
//   }
// };




// // Eventos
// todoForm.addEventListener("submit", (e) => {
//     // esse "e.preventDefault()" faz com q o formulário não seja enviado quando apertar o botão, ACHO que para linkar com o banco de dados precisa apagar
//     e.preventDefault();

//     const inputValue = todoInput.value
//     const authorValue = teste.value;
//     const description = descri.value;
//     saveTodo(inputValue, authorValue)
// });

// //identificar clique nos botões

// document.addEventListener("click", (e) => {

//     const targetEl = e.target
//     const parentEl = targetEl.closest("div");
//     let todoTitle;

//     if(parentEl && parentEl.querySelector("h3")) {
//         todoTitle = parentEl.querySelector("h3").innerText;
//     }

//     if(targetEl.classList.contains("finish-todo")) {
//       parentEl.classList.toggle("done");
//         console.log('deu bom')
//     }

//     if(targetEl.classList.contains("remove-todo")) {
//      parentEl.remove();

//     }
    
//     if(targetEl.classList.contains("edit-todo")) {
//         toggleForms()

//         editInput.value = todoTitle
//         oldInputValue = todoTitle;
//     }
// });

// cancelEditBtn.addEventListener("click", (e) => {
//     e.preventDefault()

//     toggleForms();
// })

// editForm.addEventListener("submit", (e) => {

//     e.preventDefault()
    
//     const editInputValue = editInput.value

//     //valor novo da edição da tarefa

//     if(editInput) {
//        updateTodo(editInputValue)
//     }

//     toggleForms()

// })

// searchInput.addEventListener("keyup", (e) => {
//     const search = e.target.value;
  
//     getSearchedTodos(search);

// }

// );

// filterBtn.addEventListener("change", (e) => {
    
//     const filterValue = e.target.value;
  
//     filterTodos(filterValue);
//   });

// // function mostrarPerfil() {
// //     return new Promise((resolve, reject) => {
// //         const xhr = new XMLHttpRequest();
// //         xhr.open('GET', 'perfil.php', true);
// //         xhr.onload = function () {
// //             if (xhr.status === 200) {
// //                 const perfilInfo = JSON.parse(xhr.responseText);

// //                 if (perfilInfo.error) {
// //                     console.error(perfilInfo.error);
// //                     reject(perfilInfo.error);
// //                 } else {
// //                     resolve(perfilInfo);
// //                 }
// //             } else {
// //                 console.error('Erro ao obter informações do perfil. Status: ' + xhr.status);
// //                 reject('Erro ao obter informações do perfil.');
// //             }
// //         };
// //         xhr.send();
// //     });
// // }

function mostrarPerfil() {
  $.ajax({
    type: 'GET',
    url: 'perfil.php',
    dataType: 'json',
    success: function (data) {
      if (data) {
        document.getElementById("perfil-table").innerHTML = "<tr><td>ID: " + data.id + "</td></tr><tr><td>Email: " + data.email + "</td></tr><tr><td>Empresa: " + data.empresa + "</td></tr>";
        document.getElementById("modal").style.display = "block";
      } 
      else {
        alert("Erro ao obter informações do perfil.");
      }
      },
    error: function () {
      alert("Erro ao conectar ao servidor.");
    }
  });
}

function fechar() {
  document.getElementById("modal").style.display = "none";
}
