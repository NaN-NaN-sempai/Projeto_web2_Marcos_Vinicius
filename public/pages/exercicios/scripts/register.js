let form = document.querySelector("#registerForm");


if(JSON.parse(localStorage.getItem("user")).tipo == "professor")
    document.querySelector("#tipoUsuario").className = "hidden";

const registerHandler = async (event) => {
    event.preventDefault();
    
    const data = new URLSearchParams(new FormData(form));

    console.log(data);

    let req = await fetch("/register", {
        method: 'post',
        body: data,
    });

    let response = await req.json();

    if (response[0] == "erro") return alert(response[1]);

    window.location.href = "./";
}

form.addEventListener("submit", registerHandler);