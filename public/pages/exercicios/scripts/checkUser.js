const logoff = () => {
    let confirmar = confirm("Deseja deslogar?")
    if(!confirmar) return;

    localStorage.setItem("user", "");
    window.location.href = "./login.html";
}

let userExists = localStorage.getItem("user");

if(!userExists) window.location.href = "./login.html";
else if(JSON.parse(userExists).tipo == "aluno") window.location.href = "./usuarioWatch.html";