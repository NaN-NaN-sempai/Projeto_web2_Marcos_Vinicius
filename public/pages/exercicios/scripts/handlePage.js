let alunoSearch = document.querySelector("#alunoSearch");

let userList = [];

const setupList = () => {
    if(!Array.isArray(userList)) return alert("Erro durante a requisição de dados ao servidor");

    let filteredArray = userList.filter(aluno => aluno.email.includes(alunoSearch.value));

    let htmlList = document.querySelector(".alunoList");

    htmlList.innerHTML = filteredArray.length? "": "<span>Não Encontrado</span>";
    filteredArray.forEach(user => {

        let span = document.createElement("span");
            span.innerHTML = user.email;
            span.addEventListener("click", () => {
                let selectedUser = JSON.stringify(user);
        
                localStorage.setItem("selectedUser", selectedUser);
                console.log(selectedUser);

                window.location.href = "./usuario.html";
            })

            htmlList.append(span);
    });
}

alunoSearch.addEventListener("input", setupList);



if(localStorage.getItem("user")){
    let user = JSON.parse(localStorage.getItem("user"));

    console.log(user);



    let selection = document.querySelector("#alunosList");

    fetch("/getAlunos")
    .then(r=>r.json())
    .then((r) => {
        userList = r;
        setupList();
    });


}