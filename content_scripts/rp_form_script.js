chrome.runtime.onMessage.addListener(preenche);

function preenche() {
    var elem = document.getElementsByTagName("input");
    var text = document.getElementsByTagName("textarea");
    
    for (var i = 0; i < elem.length; ++i) {
      if(elem[i].disabled || elem[i].readOnly){
      
      } else {
            if (elem[i].type == "text") {
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
            if (elem[i].type == "number" || elem[i].name.indexOf("numero") > -1 || elem[i].name.indexOf("number") > -1 || elem[i].name.indexOf("num") > -1) {
                campo = makeidNumber(5)
                elem[i].value = campo
            }
            if (elem[i].type == "date") {
                campo = makeData('-')
                elem[i].value = campo
            }
            if (elem[i].type == "email" || elem[i].name.indexOf("email") > -1) {
                campo1 = makeid(8)
                campo3 = makeDominio()
                elem[i].value = campo1 + '@' + campo3
            } 
        }
    }

    for (var i = 0; i < text.length; ++i) {
        if(text[i].disabled || text[i].readOnly){
      
        } else {
            campo = MakeTexto(500)
            text[i].value = campo
        }
    }

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

function makeData(tipo) {
    var d = dataAleatoria(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (tipo == '/') {
        data = [day, month, year].join('/');
    }
    if (tipo == '-') {
        data = [year, month, day].join('-');
    }
    return data;
}

function MakeTexto(chars) {
    var words = ["só um teste", "teste", "não considerar", "Só", "desconsiderar", "só testando", "para", "do suporte", "suporte", "isso", "era", "para", "testar"],
        pontuacao = [".", ","],
        text = "",
        phrase,
        punc,
        count = 0,
        nextCapital = true;
    while (count < chars) {
        phrase = words[Math.floor(Math.random() * words.length)]
        text += nextCapital ? phrase[0].toUpperCase() + phrase.slice(1) : phrase;
        nextCapital = false;
        if (Math.random() > .8) {
            punc = pontuacao[Math.floor(Math.random() * pontuacao.length)];
            if (punc === ".") nextCapital = true;
            text += punc;
        }
        text += " ";
        count = text.match(/\S+/g).length;
    }
    return text;
}

function dataAleatoria() {
    var dataIni = new Date(1900, 0, 1);
    var dataAtual = new Date();
    return new Date(dataIni.getTime() + Math.random() * (dataAtual.getTime() - dataIni.getTime()));
}
