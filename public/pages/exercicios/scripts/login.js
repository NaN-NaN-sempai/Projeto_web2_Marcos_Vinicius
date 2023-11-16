let form = document.querySelector("#loginForm");

const loginHandler = async (event) => {
    event.preventDefault();
    
    const data = new URLSearchParams(new FormData(form));

    let req = await fetch("/login", {
        method: 'post',
        body: data,
    })
    
    let result = await req.json();

    if(result[0] == "erro") return alert(result[1]);
    
    
    localStorage.setItem("user", JSON.stringify(result[1]));

    window.location.href = "./";
}

form.addEventListener("submit", loginHandler);