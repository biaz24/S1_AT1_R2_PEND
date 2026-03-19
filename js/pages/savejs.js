const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register__btn");
const loginBtn = document.querySelector(".login__btn");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("password");
const ConfirmPassword = document.getElementById("ConfirmPassword");
const idade = document.getElementById("idade");
const cpf = document.getElementById("cpf");
const form = document.getElementById("form");
const msgError = document.getElementsByClassName("msgError")[0];


// enviar o formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!checkNome(nome.value)) {
    createDisplayMsgError("Nome invalido, não pode ter numeros")
    return
  }

  let senhaErrorSenha = checkPassword(password.value)
  if (!checkPassword(password.value)) {
    createDisplayMsgError(senhaErrorSenha)
    return

  }

  if (!checkEmail()) {
    createDisplayMsgError("Email invalido")
    return
  }

  if (!checkIdade()) {
    createDisplayMsgError("precisa ser maior de idade")
    return
  }

  if (!checkCpf()) {
    createDisplayMsgError("CPF invalido")
    return
  }
})

//função de verificar senha
function verificarSenhas() {
  return password.value === ConfirmPassword.value ? true : false
}

ConfirmPassword.addEventListener("input", (event) => {
  if (event.target.value !== password.value) {
    console.log("Senhas estão diferentes")
  } else {
    console.log("Senhas estão iguais")
  }
})

password.addEventListener("input", (event) => {
  // console.log(senhaRegex.test(event.target.value))
  // console.log(/[A-Z]/.test(event.target.value))
  // if(!checkPassword(senhaRegex.value)){
  //   createDisplayMsgError(senhaMsgError)
  // }
  // if (!senhaRegex.test(event.target.value)) {
  //       return "a senha esta errada"
  //   }

  if (!/[A-Z]/.test(password.value)) {
    console.log(`A senha precisa ter uma letra maiuscula`)
  }
  if (!/[^a-zA-Z0-9]/g.test(password.value)) {
    console.log(`A senha precisa ter um caracter especial`)
  }
  if (!/[0-9]/.test(password.value)) {
    console.log(`A senha precisa ter pelo menos um numero`);

  }
  if (password.value.length < 10) {
    console.log(`A senha precisa ter pelo menos 10 digitos`);

  }
})

//ver
function checkPassword(password) {
  if (!/[A-Z]/.test(password.value)) {
    return false
    // console.log( `A senha precisa ter uma letra maiuscula`)
  }
  if (!/[^a-zA-Z0-9]/g.test(password.value)) {
    return false
    // return `A senha precisa ter um caracter especial`
  }
  if (!/[0-9]/.test(password.value)) {
    return false
    // return`A senha precisa ter pelo menos um numero`
  }
  if (password.value.length < 10) {
    return false
    // return`A senha precisa ter pelo menos 10 digitos`
  }
  return true
}


registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});


//apagar depois
nome.addEventListener("input", (event) => {

  console.log("Nome digitado: ", event.target.value)
  // RegEx para remover caracteres especiais e número!
  const regex = /^[a-zA-ZÀ-ÿ\s]+$/;

  console.log(regex.test(event.target.value))

  if (event.target.value.length < 3) {
    console.log("O nome precisa ser maior que 3 caracteress")
  }
  if (!regex.test(event.target.value)) {
    console.log("nome invalido!")
  }
})

function checkNome(nome) {
  console.log("Nome digitado: ", nome.value)
  // RegEx para remover caracteres especiais e número!
  const regex = /^[a-zA-ZÀ-ÿ\s]+$/;

  console.log(regex.test(nome.value))

  if (nome.value.length < 3) {
    console.log("O nome precisa ser maior que 3 caracteress")
  }
  if (!regex.test(nome.value)) {
    console.log("nome invalido!")
  }

  return regex.test(nome.value) && nome.value.length < 3
}


// confirmPas.addEventListener("input", (event) => {
//   const confirmPas = password
//   if (senhaRegex === confirmPas.test(event.target.value)){
//     console.log
//   } else {
//     console.log("Senhaaaaaa invalido")
//   }
// })

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

  console.log(regexEmail.test(email.value))

  if (!regexEmail.test(email.value)) {
    console.log("E-mail invalido")
  }
}


// idade.addEventListener("input", (event) =>{
//     // verifica se tem numero ou não
//     let idade = event.target.value.replace(/\D/g, "");
//     console.log(idade)
//     if (idade <18 ){
//       console.log("Menor de idade por favor chame seu responsavel!")
//     }

// })
function checkIdade() {
  // verifica se tem numero ou não
  let idade = idade.value.replace(/\D/g, "");
  console.log(idade)
  if (idade < 18) {
    console.log("Menor de idade por favor chame seu responsavel!")
  }
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

function checkCpf() {
  return cpf.value.replace(/\D/g, "") === 11 ? true : false
}
// msgError.textContent = mensagem;


const createDisplayMsgError = (mensagem) => {
    msgError.textContent = mensagem;
    setTimeout(() => {
        msgError.textContent = "";
    }, 5000)
}