document.addEventListener('DOMContentLoaded', function () {

    let nomeUsuario = "";

    // -----------------------
    // ANIMAÇÃO DE TEXTO
    // -----------------------
    window.iniciarMensagem = function() {
        const texto = "Seja bem-vindo, " + nomeUsuario + "!";
        const el = document.getElementById("bemVindo");
        if (!el) return;

        el.textContent = "";
        let i = 0;

        function typeWriter() {
            if (i < texto.length) {
                el.textContent += texto.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        typeWriter();
    };

    // -----------------------
    // LOOP (já existia)
    // -----------------------
    window.executarLoop = function() {
        const caixa = document.getElementById("caixa");
        if (!caixa) return;

        caixa.innerHTML = "";
        let i = 1;

        const intervalo = setInterval(() => {
            if (i === 6) {
                caixa.innerHTML += "Parou no número 5 (break usado!)";
                clearInterval(intervalo);
                return;
            }

            caixa.innerHTML += i + "<br>";
            i++;

            if (i > 10) clearInterval(intervalo);
        }, 700);
    };

    // -----------------------
    // TROCAR TELAS
    // -----------------------
    window.mostrarRegistro = function () {
        document.getElementById("loginTela").style.display = "none";
        document.getElementById("registroTela").style.display = "flex";
    };

    window.mostrarLogin = function () {
        document.getElementById("registroTela").style.display = "none";
        document.getElementById("loginTela").style.display = "flex";
    };

    // -----------------------
    // REGISTRO COM ZOD
    // -----------------------
    window.registrar = function () {
        const nome = document.getElementById("regNome").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const celular = document.getElementById("regCelular").value.trim();
        const senha = document.getElementById("regSenha").value.trim();

        // Schema de validação
        const schema = Zod.object({
            nome: Zod.string()
                .min(3, "O nome deve ter pelo menos 3 caracteres.")
                .max(50, "O nome é muito grande."),
            
            email: Zod.string()
                .email("E-mail inválido."),
            
            celular: Zod.string()
                .regex(/^[0-9]+$/, "O celular deve conter apenas números.")
                .min(10, "O celular deve ter ao menos 10 dígitos."),
            
            senha: Zod.string()
                .min(4, "A senha deve ter pelo menos 4 caracteres.")
                .max(20, "A senha não pode ter mais de 20 caracteres.")
        });

        const dados = { nome, email, celular, senha };

        const resultado = schema.safeParse(dados);

        if (!resultado.success) {
            alert(resultado.error.issues[0].message); 
            return;
        }

        // Salvar os dados
        localStorage.setItem("cadastroUsuario", JSON.stringify(dados));

        alert("Cadastro realizado com sucesso!");
        mostrarLogin();
    };

    // -----------------------
    // LOGIN
    // -----------------------
    window.fazerLogin = function () {
        const nome = document.getElementById("loginNome").value.trim();
        const senha = document.getElementById("loginSenha").value.trim();

        if (!nome || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        const salvo = localStorage.getItem("cadastroUsuario");

        if (!salvo) {
            alert("Nenhum usuário cadastrado!");
            return;
        }

        const dados = JSON.parse(salvo);

        if (nome === dados.nome && senha === dados.senha) {
            nomeUsuario = nome;

            document.getElementById("loginTela").style.display = "none";
            document.getElementById("registroTela").style.display = "none";
            document.getElementById("headerSite").style.display = "block";

            window.iniciarMensagem();
            mostrarInfoCadastro();
        } else {
            alert("Nome ou senha incorretos!");
        }
    };

}); // FIM DOMContentLoaded


// MOSTRAR INFORMAÇÕES CADASTRADAS NO RODAPÉ
function mostrarInfoCadastro() {
    const area = document.getElementById("infoCadastro");
    const salvo = localStorage.getItem("cadastroUsuario");

    if (!salvo) {
        area.innerHTML = "<p>Nenhum cadastro encontrado.</p>";
        return;
    }

    const dados = JSON.parse(salvo);

    area.innerHTML = `
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>Email:</strong> ${dados.email}</p>
        <p><strong>Celular:</strong> ${dados.celular}</p>
    `;
}
