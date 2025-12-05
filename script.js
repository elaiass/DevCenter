document.addEventListener('DOMContentLoaded', function () {

    // variavel que guarda o nome do usuário
    let nomeUsuario = ""; // receberá o nome do login

    // expos as funcoes no window para que onclick no HTML funcione
    window.iniciarMensagem = function() {
        const texto = "Seja bem-vindo, " + nomeUsuario + "!";
        const el = document.getElementById("bemVindo");
        if (!el) return; // segurança

        el.textContent = "";
        let i = 0;
        const velocidade = 80;

        function typeWriter() {
            if (i < texto.length) {
                el.textContent += texto.charAt(i);
                i++;
                setTimeout(typeWriter, velocidade);
            }
        }
        typeWriter();
    }

    window.executarLoop = function() {
        const caixa = document.getElementById("caixa");
        if (!caixa) return;
        caixa.innerHTML = ""; // Limpa antes de começar

        let i = 1;

        const intervalo = setInterval(() => {

            // Quando chegar no 5 → parar e mostrar a mensagem
            if (i === 6) {
                caixa.innerHTML += "Parou no número 5 (break usado!)";
                clearInterval(intervalo);
                return;
            }

            // Mostra o número atual
            caixa.innerHTML += i + "<br>";

            i++;

            // Se quiser que pare no 10 caso o break não fosse ativado
            if (i > 10) {
                clearInterval(intervalo);
            }

        }, 700); // Tempo entre cada número (700ms)
    }

    window.cadastrar = function() {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const celular = document.getElementById("celular").value;

        // Certifique-se que Zod está carregado antes deste script
        if (typeof Zod === "undefined") {
            alert("Zod não carregado. Verifique a tag <script> da CDN no HTML.");
            return;
        }

        // Schema Zod
        const schema = Zod.object({
            nome: Zod.string()
                .min(3, "O nome deve ter no mínimo 3 caracteres.")
                .max(50, "O nome é muito longo."),
            email: Zod.string()
                .email("E-mail inválido."),
            celular: Zod.string()
                .min(10, "O celular deve ter pelo menos 10 dígitos.")
                .regex(/^[0-9]+$/, "O celular deve conter apenas números.")
        });

        const dados = { nome, email, celular };
        const resultado = schema.safeParse(dados);

        if (!resultado.success) {
            alert(resultado.error.issues[0].message);
            return;
        }

        document.getElementById("resultado").innerHTML = `
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Celular:</strong> ${celular}</p>
        `;
    }

    window.fazerLogin = function() {
        const nome = document.getElementById("loginNome").value;
        const senha = document.getElementById("loginSenha").value;

        if (!nome || !senha) {
            alert("Preencha nome e senha!");
            return;
        }

        // Senha fixa só para teste
        if (senha !== "123") {
            alert("Senha incorreta!");
            return;
        }

        nomeUsuario = nome;

        // Esconde a tela de login (se existir)
        const loginTela = document.getElementById("loginTela");
        if (loginTela) loginTela.style.display = "none";

        // Mostra o site (headerSite)
        const headerSite = document.getElementById("headerSite");
        if (headerSite) headerSite.style.display = "block";

        // Inicia a mensagem de boas-vindas
        window.iniciarMensagem();
    }

}); // fecha o DOMContentLoaded corretamente
