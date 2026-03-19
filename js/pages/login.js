const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register__btn");
const loginBtn = document.querySelector(".login__btn");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("ConfirmPassword");
const idade = document.getElementById("idade");
const cpf = document.getElementById("cpf");
const form = document.getElementById("form");
const msgError = document.getElementsByClassName("msgError")[0];

let auxSenha = false;

// --- EVENTOS NOS BOTÕES PARA ALTERNAR ENTRE CADASTRO E LOGIN ---
registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});


// EVENTO DE ENVIAR FORMULÁRIO
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (checkNome()) {
    createDisplayMsgError("Nome invalido, não pode ter numeros")
    return
  }

  if (!checkEmail()){
    createDisplayMsgError("Email incorreto, digite novamente")
    return
  }

  if(!auxSenha){
    createDisplayMsgError("Senha inválida!")
    return
  }

  if(!verificarSenhas()){
    createDisplayMsgError("Senhas não coincidem")
    return
  }

  if (checkIdade()){
    createDisplayMsgError("Menor de idade não pode se cadastrar")
    return
  }

  if (!checkCpf()) {
    createDisplayMsgError("CPF invalido")
    return
  }

  console.log("Tudo certo")
})

// --- FUNÇÃO PARA CRIAR A MENSAGEM DE ERRO! ---
const createDisplayMsgError = (mensagem) => {
  msgError.textContent = mensagem;
    setTimeout(() => {
      msgError.textContent = "";
    }, 5000)
}

// --- FUNÇÃO PARA VERIFICAR SENHA&CONFIRMARSENHA ---
password.addEventListener("input", (event) => {
  let msgSenhaError = verificarSenhaForte(password.value)
  
  if(msgSenhaError){
    createDisplayMsgError(msgSenhaError)
    return
  }

  auxSenha = true;
})

function verificarSenhaForte(password) {
  console.log("IMPRIMINDO SENHA: ", password)
  if (!/[A-Z]/.test(password)) {
    return `A senha precisa ter uma letra maiuscula`
  }
  if (!/[^a-zA-Z0-9]/g.test(password)) {
    return `A senha precisa ter um caracter especial`
  }
  if (!/[0-9]/.test(password)) {
    return `A senha precisa ter pelo menos um numero`;

  }
  if (password.length < 10) {
    return `A senha precisa ter pelo menos 10 digitos`;
  }

  return null
}

function verificarSenhas() {
  return password.value === ConfirmPassword.value ? true : false
}

// --- FUNÇÃO PARA VERIFICAR CPF&CRIAÇÃO DE MASCARA PARA O CPF ---
function checkCpf() {
  return cpf.value.replace(/\D/g, "").length === 11 ? true : false
}

cpf.addEventListener("input", (event) => {
  let valorCPF = event.target.value;

  //remove  tudo o que nao é numero
  valorCPF = valorCPF.replace(/\D/g, "");

  //aceita apenas os 14 DIGITOS
  valorCPF = valorCPF.substring(0, 11);

  // aplicando mascara do RG
  valorCPF = valorCPF.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca ponto após o 3º dígito
  valorCPF = valorCPF.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca ponto após o 6º dígito
  valorCPF = valorCPF.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca traço após o 9º dígito

  event.target.value = valorCPF
})


function checkNome(){
  // const regex = /^[a-zA-ZÀ-ÿ\s]+$/;

  return nome.value.replace(/^[a-zA-ZÀ-ÿ\s]+$/, "") ? true : false
  // return regex.test(nome.value)? true : false
}

nome.addEventListener("input", (event) => {

  console.log("Nome digitado: ", event.target.value)
  // RegEx para remover caracteres especiais e número!
  const regex = /^[a-zA-ZÀ-ÿ\s]+$/;

  console.log(regex.test(event.target.value))

  if (!regex.test(event.target.value)) {
    console.log("nome invalido!")
  }
})

//-----------------------------------------

idade.addEventListener("input", (event) =>{
    // verifica se tem numero ou não
    let idade = event.target.value.replace(/\D/g, "");
    console.log(idade)
    if (idade <18 ){
      console.log("Menor de idade por favor chame seu responsavel!")
    }

})

function checkIdade() {
  return idade.value < 18? true : false
}
//-----------------------------------------

email.addEventListener("input", (event) => {
  // validação para formato do e-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  console.log(regexEmail.test(event.target.value))

  if (!regexEmail.test(event.target.value)) {
    console.log("E-mail invalido")
  }
})

function checkEmail() {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email.value)? true : false
}