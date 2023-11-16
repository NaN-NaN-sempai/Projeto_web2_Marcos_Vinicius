// Importando o módulo Express
const express = require('express');

const sqliteDB = require("./src/lib/sqlite");

const db = new sqliteDB();


// Adicionando alguns valores ao banco
let userList = [
    {
        tipo: "aluno",
        email: "magnolio@gmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "constant@gmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "hober@gmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "mallow@outlook.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "abner@gmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "augusto@gmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "gabriela@yahoo.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "jeovana@hotmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "leticia@hotmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "gabriela@yahoo.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "juliana@gmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "juliano@gmail.com",
        senha: "senha",
    },
    {
        tipo: "aluno",
        email: "adjavan@gmail.com",
        senha: "senha",
    }
]

userList.forEach(({tipo, email, senha}) => {
    db.register({
        tipo,
        email,
        senha
    });
});

let exerciseList = [
    {
        "tipo": "Posterior da coxa",
        "nome": "Extensão de quadril em pé"
    },
    {
        "tipo": "Posterior da coxa",
        "nome": "Elevação pélvica com pernas estendidas"
    },
    {
        "tipo": "Posterior da coxa",
        "nome": "Mesa flexora [flexão de joelho deitado na máquina]"
    },
    {
        "tipo": "Panturrilha",
        "nome": "Panturrilha burrinho [gêmeos sentado]"
    },
    {
        "tipo": "Panturrilha",
        "nome": "Panturrilha em pé unilateral"
    },
    {
        "tipo": "Panturrilha",
        "nome": "Panturrilha em pé [bilateral]"
    },
    {
        "tipo": "Quadríceps",
        "nome": "Cadeira extensora"
    },
    {
        "tipo": "Quadríceps",
        "nome": "Albumina Growth Supplements"
    },
    {
        "tipo": "Quadríceps",
        "nome": "Agachamento"
    },
    {
        "tipo": "Quadríceps",
        "nome": "Afundo"
    },
    {
        "tipo": "Quadríceps",
        "nome": "Subida no Banco [Step Up]"
    },
    {
        "tipo": "Deltoides",
        "nome": "Desenvolvimento no Smith"
    },
    {
        "tipo": "Deltoides",
        "nome": "Elevação lateral com halteres"
    },
    {
        "tipo": "Deltoides",
        "nome": "Voador inverso [máquina]"
    },
    {
        "tipo": "Tríceps",
        "nome": "Flexão de braço fechado [Apoio mãos fechadas]"
    },
    {
        "tipo": "Tríceps",
        "nome": "Tríceps coice com halteres"
    },
    {
        "tipo": "Tríceps",
        "nome": "Mergulho com mãos apoiadas no banco"
    },
    {
        "tipo": "Bíceps",
        "nome": "Rosca concentrada"
    },
    {
        "tipo": "Bíceps",
        "nome": "Rosca direta no pulley"
    },
    {
        "tipo": "Bíceps",
        "nome": "Barra fixa [pegada supinada]"
    },
    {
        "tipo": "Dorsal",
        "nome": "Remada Curvada [pegada pronada]"
    },
    {
        "tipo": "Dorsal",
        "nome": "Elevação I-Y-T"
    },
    {
        "tipo": "Dorsal",
        "nome": "Barra fixa [pegada pronada]"
    },
    {
        "tipo": "Dorsal",
        "nome": "Remada curvada [pegada pronada]"
    },
    {
        "tipo": "Peitoral",
        "nome": "Supino com barra"
    },
    {
        "tipo": "Peitoral",
        "nome": "Peck Deck"
    },
    {
        "tipo": "Peitoral",
        "nome": "cruzamento de cabos"
    },
    {
        "tipo": "Peitoral",
        "nome": "Supino sentado"
    },
    {
        "tipo": "Peitoral",
        "nome": "crucifixo inclinado"
    }
]

exerciseList.forEach(({tipo, nome}) => {
    db.registerExercise({
        tipo,
        nome
    });
})


// Criando uma instância do aplicativo Express
const app = express();

// Configurando o diretório para arquivos estáticos (como CSS, JavaScript, imagens, etc.)
app.use(express.static('public'));

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));
// Middleware para analisar dados JSON no corpo da requisição
app.use(express.json());

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post("/login", async (req, res) => {
    let user = req.body;

    let login = await db.login(user);

    res.json(login)
})

app.post("/register", async (req, res) => {
    let user = req.body;

    console.log(user);

    //let login = await db.login(user);
    let request = await db.register(user);

    res.json(request)
})

app.post("/registerExercise", async (req, res) => {
    let exercise = req.body;

    console.log(exercise);

    let request = await db.registerExercise(exercise);

    res.json(request)
})

app.get("/getExerciseGroup", async (req, res) => {
    let list = await db.getExerciseGroup();
    res.json(list)
})

app.get("/getExerciseList", async (req, res) => {
    let list = await db.getExerciseList();
    res.json(list)
})



app.post("/userDoneExercise", async (req, res) => {
    let exercise = req.body;
    let request = await db.userDoneExercise(exercise);


    res.json(request)
})


app.get("/getAlunos", async (req, res) => {
    let users = await db.getAlunos();
    res.json(users)
})

app.post("/getAluno", async (req, res) => {
    let user = req.body;

    let request = await db.getAluno(user);
    res.json(request)
})

app.post("/getExercises", async (req, res) => {
    let user = req.body;

    let request = await db.getExercises(user);
    res.json(request)
})

app.post("/getExercise", async (req, res) => {
    let exercise = req.body;

    let request = await db.getExercise(exercise);

    console.log(request);
    res.json(request)
})


// Iniciando o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Express está rodando em http://localhost:${port}`);
});
