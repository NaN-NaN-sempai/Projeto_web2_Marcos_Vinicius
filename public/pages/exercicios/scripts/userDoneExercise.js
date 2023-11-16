document.querySelector("#date").valueAsDate = new Date();

let selectedUser = JSON.parse(localStorage.getItem("selectedUser"));

document.querySelector(".mainTitle").innerHTML = selectedUser.email;




fetch("/getExerciseList")
.then(r=>r.json())
.then(list => {
    let exerciceType = document.querySelector("#exerciceType");

    list
    .sort((a, b) => a.tipo.localeCompare(b.tipo))
    .forEach(e => {
        let option = document.createElement("option");
            option.value = e.id;
            option.innerHTML = `(${e.tipo}) - ${e.nome}`;

        exerciceType.append(option);
    });
})



let form = document.querySelector("#form");

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    document.querySelector("#user_id").value = selectedUser.id;
    
    const data = new URLSearchParams(new FormData(form));

    let req = await fetch("/userDoneExercise", {
        method: 'post',
        body: data,
    });

    let response = req.json();

    if(response[0] == "erro") return alert(response[1]);

    window.location.href = "./usuario.html";
    
})