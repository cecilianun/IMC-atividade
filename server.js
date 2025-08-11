import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 3005;

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
});

app.post('/calcular-imc', (req, res) => {
    let { nome, altura, peso } = req.body;
    altura = parseFloat(altura);
    peso = parseFloat(peso);
    let imc = (peso / (altura * altura)).toFixed(2);

    let classificacao = '';

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 25) {
        classificacao = "Peso normal";
    } else if (imc >= 25 && imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc >= 30 && imc < 35) {
        classificacao = "Obesidade (grau I)";
    } else if (imc >= 35 && imc < 40) {
        classificacao = "Obesidade (grau II)";
    } else {
        classificacao = "Obesidade (grau III)";
    }

    fs.readFile(process.cwd() + '/resultado.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro interno do servidor');
            return;
        }

        let htmlContent = data
            .replace('{{nome}}', nome)
            .replace('{{imc}}', imc)
            .replace('{{classificacao}}', classificacao);
            
        res.send(htmlContent);
    });

});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
