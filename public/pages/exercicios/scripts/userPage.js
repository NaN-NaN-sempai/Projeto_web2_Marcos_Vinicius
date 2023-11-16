let selectedUser = JSON.parse(localStorage.getItem("selectedUser"));

document.querySelector(".mainTitle").innerHTML = selectedUser.email;

fetch("/getExercises", {
    method: "post",
    headers: {
        'Content-Type': 'application/json' // Indica que estamos enviando JSON no corpo da requisição
    },
    body: localStorage.getItem("selectedUser")
})
.then(r=>r.json())
.then(list => {
    if(!list.length) document.querySelector(".alunoList").innerHTML = "<span>Nem um registro.</span>";
    else document.querySelector("#exerciseHistory").innerHTML = "";

    list.reverse().forEach(relacionamento => {
        fetch("/getExercise", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(relacionamento)
        })
        .then(r=>r.json())
        .then(exercise => {
            let span = document.createElement("span");

            let date = new Date(relacionamento.data);

            console.log(relacionamento.data);

            let dia = date.getDate() + 1;
            let mes = date.getMonth() + 1;
            let ano = date.getFullYear().toString().slice(2);

            span.innerHTML = `[${dia}/${mes}/${ano}] (${exercise.tipo}) <br> ${exercise.nome}`;
            
            document.querySelector("#exerciseHistory"). append(span);
        })
    });
})