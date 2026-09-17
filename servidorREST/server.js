import express from 'express'
import { connection }  from './database/conexao.js'
import cors from 'cors'
import dotenv from 'dotenv'

//conexão servidor via .env
dotenv.config()

const app = express()
const PORT = process.env.PORT

console.log("PORT:", PORT)

app.use(cors())
app.use (express.json())

//criar usuário
app.post('/funcionarios', async (req, res) => {

    try {
        const {nome, email, senha} = req.body;

        //verificação se email já possui cadastro
        const [funcionarios] = await connection.query(
            "SELECT * FROM funcionario WHERE email = ?",
            [email]
        )

        if (funcionarios.length > 0) {
            return res.status(409).json({
                erro: "Usuário já cadastrado"
            });
        }

        //criação do funcionário
        const [result] = await connection.query(
            "INSERT INTO funcionario (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senha]
        );

        res.status(201).json({id: result.insertId, nome, email, senha})
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
})

//mostrar usuários
app.get('/funcionarios', async (req, res) => {
    try {
        const [result] = await connection.query(
            "SELECT * FROM funcionario"
        );

        res.status(200).json(result)
    } catch (e) {
        console.error(e)
        res.status(500).json({
            erro: "Falha ao buscar funcionários"
        })
    }
})

//atualizar usuários
app.put("/funcionarios/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {nome, email, senha} = req.body;

        const [result] = await connection.query(
            "UPDATE funcionario SET nome = COALESCE(?, nome), email = COALESCE(?, email), senha = COALESCE(?, senha) WHERE id_funcionario = ?",
            [nome || null, email || null, senha || null, id]
        )

        if(!result.affectedRows) //se resultado NÃO afetou linhas do BD
            return res.status(404).json({erro: "Funcionário não encontrado"})

        res.json({ mensagem: "Atualizado com sucesso"})
    } catch(e) {
        res.status(500).json({ erro: e.message })
    }
})

//deletar usuários
app.delete("/funcionarios/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const [result] = await connection.query("DELETE FROM funcionario WHERE id_funcionario = ?", 
            [id],)

        if (!result.affectedRows)
            return res.status(404).json({ erro: "Funcionário não encontrado"})

        res.json({ mensagem: "Deletado com sucesso"})
    } catch (e) {
        res.status(500).json({erro: e.message})
    }
})

//verificação de login
app.post("/login", async (req, res) => {
    try {
        const {email, senha} = req.body;

        const [funcionarios] = await connection.query(
            "SELECT * FROM funcionario WHERE email = ? AND senha = ?",
            [email, senha]
        )

        if (funcionarios.length === 0) {
            return res.status(401).json({erro: "Email ou senha incorretos"})
        }

        res.status(200).json({
            mensagem: "Login realizado com sucesso", funcionario: funcionarios[0]
        })
    } catch (e) {
        console.error(e);

        res.status(500).json({erro: "Erro ao realizar login"})
    }
})

//rodar localmente o server e mostrar no console qual porta está sendo utilizada. >PARA RODAR O SERVIDOR LOCALMENTE UTILIZE NO TERMINAL "node --watch server.js"
app.listen(PORT, () => {
    console.log(`Servidor MySQL rodando em http://localhost:${PORT}`);
})



