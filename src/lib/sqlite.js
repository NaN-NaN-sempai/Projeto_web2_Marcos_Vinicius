// Importa a biblioteca sqlite3
const sqlite3 = require('sqlite3').verbose();

// Cria e exporta uma instância do banco de dados
module.exports = class {
    constructor(){
        this.db = new sqlite3.Database(':memory:');

        this.db.serialize(() => {
            this.db.run(`
            CREATE TABLE IF NOT EXISTS Usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tipo TEXT,
                email TEXT,
                senha TEXT,
                UNIQUE(email, senha)
            );`);

            this.db.run(`
            INSERT OR IGNORE INTO Usuarios 
            (tipo, email, senha)
            VALUES
            (
                "admin",
                "admin",
                "senha"
            );`);

            
            this.db.run(`
            CREATE TABLE IF NOT EXISTS Treinos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                tipo TEXT
            );`);

            
            this.db.run(`
            CREATE TABLE IF NOT EXISTS Rel_Aluno_Treino (
                id_aluno INTEGER,
                id_treino INTEGER,
                data TEXT
            );`);
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM Usuarios', (err, list) => {
                if(err) reject(err);
                else resolve(list);
            });
        });
    }

    userDoneExercise(exercise) {
        return new Promise((resolve, reject) => {
            
            this.db.run(`
            INSERT OR IGNORE INTO Rel_Aluno_Treino 
            (id_aluno, id_treino, data)
            VALUES
            (
                "${exercise.user_id}",
                "${exercise.id}",
                "${exercise.date}"
            );`, (resolution, error) => {
                if (error) {
                    resolve(["erro", 'Erro ao verificar registro: ' + err.message]);

                } else {

                    resolve(["sucesso", `Exercício ${exercise.tipo} adicionado ao histórico do usuário.`]);
                }
            });
        });
    }

    getUser(user) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM Usuarios WHERE id = "${user.id}"`, (err, list) => {
                if(err) reject(err);
                else resolve(list);
            });
        });
    }

    getExercises(user) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM Rel_Aluno_Treino WHERE id_aluno = "${user.id}"`, (err, list) => {
                if(err) reject(err);
                else resolve(list);
            });
        });
    }

    getExercise(exercise) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM Treinos WHERE id = "${exercise.id_treino}"`, (err, row) => {
                if(err) reject(err);
                else resolve(row);
            });
        });
    }

    getAlunos() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM Usuarios WHERE tipo = "aluno"', (err, list) => {
                if(err) reject(err);
                else resolve(list);
            });
        });
    }

    getExerciseGroup () {
        return new Promise((resolve, reject) => {
            this.db.all(`
            SELECT tipo
            FROM Treinos
            GROUP BY tipo`, (err, list) => {
                if(err) reject(err);
                else resolve(list);
            });
        });
    }

    getExerciseList () {
        return new Promise((resolve, reject) => {
            this.db.all(`
            SELECT *
            FROM Treinos`, (err, list) => {
                if(err) reject(err);
                else resolve(list);
            });
        });
    }

    register(user) {        
        return new Promise((resolve, reject) => {                
            // Consulta para verificar se o usuário já existe na tabela
            this.db.get(`SELECT * FROM Usuarios WHERE email = "${user.email}"`, (err, row) => {
                if (err) {
                    resolve(["erro", 'Erro ao verificar registro: ' + err.message]);

                } else if (row) {
                    resolve(["erro", `Usuário "${user.email}" já existe na tabela.`]);

                } else {
                    // Se o usuário não existe, adiciona-o à tabela
                    this.db.run(`
                    INSERT OR IGNORE INTO Usuarios 
                    (tipo, email, senha)
                    VALUES
                    (
                        "${user.tipo}",
                        "${user.email}",
                        "${user.senha}"
                    );`);
                    resolve(["sucesso", `Usuário ${user.email} adicionado à tabela.`]);
                }
            });
        });
    }

    registerExercise(exercise) {      
        return new Promise((resolve, reject) => {                
            // Consulta para verificar se o usuário já existe na tabela
            this.db.get(`SELECT * FROM Treinos WHERE tipo = "${exercise.tipo}"`, (err, row) => {
                if (err) {
                    resolve(["erro", 'Erro ao verificar registro: ' + err.message]);

                } else if (row) {
                    resolve(["erro", `Execício "${exercise.tipo}" já existe na tabela.`]);

                } else {
                    // Se o usuário não existe, adiciona-o à tabela
                    this.db.run(`
                    INSERT OR IGNORE INTO Treinos 
                    (nome, tipo)
                    VALUES
                    (
                        "${exercise.nome}",
                        "${exercise.tipo}"
                    );`);
                    resolve(["sucesso", `Exercício ${exercise.tipo} adicionado à tabela.`]);
                }
            });
        });

    }

    login(user) {        
        return new Promise((resolve, reject) => {                
            // Consulta para verificar se o usuário já existe na tabela
            this.db.get(`SELECT * FROM Usuarios WHERE email = "${user.email}" AND senha = "${user.senha}"`, (err, row) => {
                if (err) {
                    resolve(["erro", 'Erro ao verificar login: ' + err.message]);

                } else if (row) {
                    resolve(["sucesso", row]);

                } else {
                    resolve(["erro", `Usuário "${user.email}" não existe ou senha incorreta`]);
                }
            });
        });
    }

    reset(){
        this.db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
            
            tables.forEach(table => {
                const tableName = table.name;
                this.db.run(`DROP TABLE IF EXISTS ${tableName}`, (dropErr) => {
                    if (dropErr) {
                        if(tableName != "sqlite_sequence")
                            console.error(`Erro ao dropar a tabela ${tableName}:`, dropErr.message);
                    } else {
                        console.log(`Tabela ${tableName} dropada com sucesso.`);
                    }
                });
            });
            
        });
    }
}