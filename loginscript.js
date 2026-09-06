const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnLogin = document.querySelector('.btnLogin');
const iconClose = document.querySelector('.iconeFechar');


// efeitos / movimentação do formulario
registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnLogin.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

// validação login

function logar(){

    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // if de protótipo, aguardando banco de dados

    if(email == "admin@gmail.com" && senha == "admin"){
        alert('sucesso');
        location.href = "menu.html";
    } else {
        alert('usuario nao encontrado')
    }
}