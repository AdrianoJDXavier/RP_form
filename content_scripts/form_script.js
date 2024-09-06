chrome.runtime.onMessage.addListener(preenche);

function preenche() {
    var elem = document.getElementsByTagName("input");
    var text = document.getElementsByTagName("textarea");
    var radios = document.querySelectorAll("input[type='radio']");
    var checkboxes = document.querySelectorAll("input[type='checkbox']");

    function simularClique(campo) {
        campo.focus();
        var event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        campo.dispatchEvent(event);
    }

    for (var i = 0; i < elem.length; ++i) {
        if (elem[i].disabled || elem[i].readOnly) {
            continue;
        }
        if (elem[i].type == "text") {
            //simularClique(elem[i]);
            if (elem[i].className.indexOf("rp_mask-moeda") > -1) {
                parte1 = makeidNumber(2)
                parte2 = makeidNumber(2)
                campo = parte1 + ',' + parte2
            } else if (elem[i].className.indexOf("rp_mask-cnpj") > -1 || elem[i].name.indexOf("cnpj") > -1) {
                parte1 = makeidNumber(2)
                parte2 = makeidNumber(3)
                parte3 = makeidNumber(3)
                parte4 = makeidNumber(4)
                parte5 = makeidNumber(2)
                campo = parte1 + '.' + parte2 + '.' + parte3 + '/' + parte4 + '-' + parte5
            } else if (elem[i].className.indexOf("rp_mask-cpf") > -1 || elem[i].name.indexOf("cpf") > -1) {
                parte1 = makeidNumber(3)
                parte2 = makeidNumber(3)
                parte3 = makeidNumber(3)
                parte4 = makeidNumber(2)
                campo = parte1 + '.' + parte2 + '.' + parte3 + '-' + parte4
            } else if (elem[i].className.indexOf("rp_mask-telefone") > -1 || elem[i].name.indexOf("telefone") > -1 || elem[i].name.indexOf("tel") > -1 || elem[i].name.indexOf("fone") > -1) {
                parte1 = makeidNumber(2)
                parte2 = makeidNumber(4)
                parte3 = makeidNumber(4)
                campo = '(' + parte1 + ')' + parte2 + '-' + parte3
            } else if (elem[i].className.indexOf("rp_mask-celular") > -1 || elem[i].name.indexOf("celular") > -1 || elem[i].name.indexOf("mobil") > -1) {
                parte1 = makeidNumber(2)
                parte2 = makeidNumber(5)
                parte3 = makeidNumber(4)
                campo = '(' + parte1 + ')' + parte2 + '-' + parte3
            } else if (elem[i].className.indexOf("rp_mask-cep") > -1 || elem[i].name.indexOf("cep") > -1 || elem[i].name.indexOf("plz") > -1) {
                parte1 = makeidNumber(5)
                parte2 = makeidNumber(3)
                campo = parte1 + '-' + parte2
            } else if (elem[i].className.indexOf("rp_mask-data") > -1 || elem[i].name.indexOf("data") > -1) {
                campo = makeData('/')
            } else {
                campo = MakeTexto(2)
            }
            elem[i].value = campo
        }
        else if (elem[i].type == "number" || elem[i].name.indexOf("numero") > -1 || elem[i].name.indexOf("number") > -1 || elem[i].name.indexOf("num") > -1) {
            //simularClique(elem[i]);
            campo = makeidNumber(2)
            elem[i].value = campo
        }
        else if (elem[i].type == "date") {
            //simularClique(elem[i]);
            campo = makeData('-')
            elem[i].value = campo
        }
        else if (elem[i].type == "email" || elem[i].name.indexOf("email") > -1) {
            //simularClique(elem[i]);
            campo1 = makeid(8)
            campo3 = makeDominio()
            elem[i].value = campo1 + '@' + campo3
        }
        //simularClique(elem[i]);
    }

    for (var i = 0; i < text.length; ++i) {
        if (text[i].disabled || text[i].readOnly) {
            continue;
        }
        //simularClique(elem[i]);
        campo = MakeTexto(500)
        text[i].value = campo
    }

    // Preencher campos radio
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].disabled || radios[i].readOnly) {
            continue;
        }
        var radioName = radios[i].name;
        var radioGroup = document.querySelectorAll("input[name='" + radioName + "']");
        var randomRadio = Math.floor(Math.random() * radioGroup.length);
        radioGroup[randomRadio].checked = true;
        simularClique(radioGroup[randomRadio]);
    }

    // Preencher campos checkbox
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].disabled || checkboxes[i].readOnly) {
            continue;
        }
        checkboxes[i].checked = Math.random() > 0.5;
        simularClique(checkboxes[i]);
    }

    // Preencher campos CKEditor
    const script = document.createElement('script');
    var texto_ckeditor = MakeTexto(500);
    script.textContent = `
    (function() {
        if (typeof CKEDITOR !== 'undefined') {
            console.log('CKEditor está carregado no contexto da página');
            for (var instance in CKEDITOR.instances) {
                console
                CKEDITOR.instances[instance].setData("`+ texto_ckeditor + `");
            }
        } else {
            console.log('CKEditor não está carregado no contexto da página');
        }
    })();
        var selects = document.getElementsByTagName("select");

        for (var i = 0; i < selects.length; ++i) {
            var select = selects[i];

            // Ignorar selects desativados ou somente leitura
            if (select.disabled || select.readOnly) {
                continue;
            }

            try {
                // Gere um índice aleatório
                var randomIndex = Math.floor(Math.random() * select.options.length);

                // Defina a opção selecionada aleatoriamente
                select.selectedIndex = randomIndex;

                // Se o select tiver a classe 'selectpicker', atualize-o
                if (select.classList.contains('selectpicker')) {
                    if (typeof j === 'function' && j.fn && j.fn.jquery) {
                        // j é jQuery, use j
                        j(select).selectpicker('refresh');
                    } else if (typeof $ === 'function' && $.fn && $.fn.jquery) {
                        // $ é jQuery, use $
                        $(select).selectpicker('refresh');
                    }
                }
            } catch (error) {
                console.error('Erro ao processar o select:', error);
            }
        }`;
    // Injete o script no head ou body da página
    (document.head || document.documentElement).appendChild(script);
    // Remova o script após a execução
    script.remove();

    chrome.runtime.onMessage.removeListener(preenche);
}

function makeDominio() {
    var result = '';
    var count = 0;
    var dominio = ["gmail.com", "hotmail.com", "gmail.com.br", "outlook.com", "yahoo.com.br", "hotmail.com.br", "outlook.com.br"];
    var charactersLength = dominio.length;
    return dominio[Math.floor(Math.random() * dominio.length)];
}

function makeid(length) {
    var result = '';
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function makeidNumber(length) {
    var result = '';
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function dataAleatoria() {
    // Data atual
    var hoje = new Date();

    // Calcula o timestamp para 5 anos atrás
    var cincoAnosAtras = new Date(hoje.getFullYear() - 5, hoje.getMonth(), hoje.getDate()).getTime();

    // Gera um timestamp aleatório entre 5 anos atrás e a data atual
    var timestampAleatorio = Math.random() * (hoje.getTime() - cincoAnosAtras) + cincoAnosAtras;

    // Converte o timestamp aleatório em uma data
    return new Date(timestampAleatorio);
}

function makeData(tipo) {
    var d = dataAleatoria(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var data;
    if (tipo == '/') {
        data = [day, month, year].join('/');
    } else if (tipo == '-') {
        data = [year, month, day].join('-');
    }

    return data;
}

function MakeTexto(chars) {
    var subjects = ["O sistema", "A equipe", "O suporte", "O cliente", "A funcionalidade", "O servidor"],
        verbs = ["resolveu", "testou", "suportou", "desconsiderou", "implementou", "executou"],
        objects = ["o problema", "um teste", "o serviço", "a solução", "a tarefa", "o procedimento"],
        connectors = ["e", "mas", "porque", "enquanto", "portanto", "porém"],
        pontuacao = [".", ",", ";"],
        text = "",
        phrase,
        punc,
        count = 0,
        nextCapital = true;

    while (count < chars) {
        // Monta uma frase com sujeito, verbo e objeto
        var subject = subjects[Math.floor(Math.random() * subjects.length)];
        var verb = verbs[Math.floor(Math.random() * verbs.length)];
        var object = objects[Math.floor(Math.random() * objects.length)];

        // Começa uma frase com sujeito + verbo + objeto
        phrase = subject + " " + verb + " " + object;
        text += nextCapital ? phrase[0].toUpperCase() + phrase.slice(1) : phrase;

        // Decide se adiciona um conector para prolongar a frase
        if (Math.random() > 0.5) {
            var connector = connectors[Math.floor(Math.random() * connectors.length)];
            text += " " + connector + " ";
        } else {
            // Ou adiciona pontuação no final da frase
            punc = pontuacao[Math.floor(Math.random() * pontuacao.length)];
            if (punc === ".") nextCapital = true;
            text += punc;
        }
        text += " ";

        // Atualiza a contagem de palavras
        count = text.match(/\S+/g).length;
    }

    return text.trim();  // Remove espaços extras no final
}

function dataAleatoria() {
    var dataIni = new Date(1900, 0, 1);
    var dataAtual = new Date();
    return new Date(dataIni.getTime() + Math.random() * (dataAtual.getTime() - dataIni.getTime()));
}
