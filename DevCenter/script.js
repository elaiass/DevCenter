document.addEventListener('DOMContentLoaded', function () {
    // Peça o nome UMA vez
    let nome = prompt("Digite seu nome:");
    if (!nome) nome = "Visitante";

    // Texto a ser digitado
    const texto = "Seja bem-vindo, " + nome + "!";
    const el = document.getElementById("bemVindo");

    // Zera o conteúdo antes de começar
    el.textContent = "";
    let i = 0;
    const velocidade = 80; // tempo por caractere

    function typeWriter() {
    if (i < texto.length) {
        el.textContent += texto.charAt(i);
        i++;
        setTimeout(typeWriter, velocidade);
    } else {
        
    }
    }

    // Inicia a digitação
    typeWriter();
});


function executarLoop() {
    let texto = "";

    for (let i = 1; i <= 10; i++) {
        if (i === 5) {
            texto += "Parou no número 5 (break usado!)";
            break; // Para o loop aqui
        }
        texto += i + "<br>";
    }

    document.getElementById("caixa").innerHTML = texto;
}



function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;

    if (!nome || !email || !celular) {
        alert("Preencha todos os campos!");
        return;
    }

    document.getElementById("resultado").innerHTML = `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Celular:</strong> ${celular}</p>
    `;
}
