fetch("/getExerciseGroup")
.then(r=>r.json())
.then(list => {
    let suggestions = document.querySelector("#grouptInputSuggestions");

    list.forEach(e => {
        let option = document.createElement("option");
            option.value = e.tipo;

        suggestions.append(option);
    });
})


let form = document.querySelector("#registerForm");

const registerHandler = async (event) => {
    event.preventDefault();
    
    const data = new URLSearchParams(new FormData(form));

    console.log(data);

    let req = await fetch("/registerExercise", {
        method: 'post',
        body: data,
    });

    let response = await req.json();

    if (response[0] == "erro") return alert(response[1]);

    window.location.href = "./";
}

form.addEventListener("submit", registerHandler);