const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnLogin = document.querySelector('.btnLogin');
const iconClose = document.querySelector('.iconeFechar');


// efeitos / movimentação do formulario
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnLogin.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});


// registrar usuário
async function registrar() {

    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const erroCadastro = document.getElementById('erroCadastro');

    erroCadastro.textContent = "";


    try {

        const resposta = await fetch('http://localhost:3000/funcionarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        })

        const dados = await resposta.json();

        if (resposta.ok) {

            alert("usuário cadastrado!")
            location.href = "menu.html"

        } else if (resposta.status === 409) {
            erroCadastro.textContent = "Este email já possui cadastro. Utilize outro email"

        } else {

            erroCadastro.textContent = dados.erro;
        }
    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com servidor.")
    }
}


// validação login
async function logar() {

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })

        const dados = await resposta.json();

        if (resposta.ok) {

            alert('Login realizado!');
            location.href = "menu.html"

        } else {
            alert(dados.erro)
        }
    } catch (erro) {
        console.error(erro);
        alert('Não foi possível conectar com servidor.')
    }
}
