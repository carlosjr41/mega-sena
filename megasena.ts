import { writeFileSync } from 'fs';
import readXlsxFile from 'read-excel-file/node';
import { Aposta } from './aposta';

const prompt = require('prompt-sync')();


const jogoSorteado: number[] = converteDezenasEmInteiros(prompt("Quais os jogos sorteados? usar padrão (XX - XX - XX - XX - XX - XX) "));
const bolao: string = prompt("qual o bolão? ");


const schemaIfes = {
  'Número': {
    prop: 'dezenas',
    type: String
  }
}

const schemaEtaure = {
  'Mega-Sena': {
    prop: 'dezenas',
    type: String
  }
}

const schema = bolao.toLowerCase() === "ifes" ? schemaIfes : schemaEtaure;
const fileName = bolao.toLowerCase() === "ifes" ? "bolaoIfes.xlsx" : "bolaoEtaure.xlsx";

readXlsxFile(fileName, { schema }).then(({ rows }) => {
  const apostas: Aposta[] = rows.map((row: any) => {
    return { ...row, acertos: 0 }
  })

  getApostas(apostas, jogoSorteado);
})

function getApostas(apostas: Aposta[], dezenasSorteadas: number[] = []) {

  apostas.forEach(aposta => {
    const dezenas = converteDezenasEmInteiros(aposta.dezenas);
    aposta.acertos = contaAcertos(dezenas, dezenasSorteadas);
  })

  const apostasExibidas = apostas
    .sort((a, b) => b.acertos - a.acertos);


  writeFileSync(`resultado${bolao}.json`, JSON.stringify(apostasExibidas, null, 2));
}


function converteDezenasEmInteiros(aposta: String): number[] {
  return aposta.split('-').map(dezena => parseInt(dezena)).sort();
}

function contaAcertos(apostaChecada: number[], jogoSorteado: number[]): number {
  return apostaChecada
    .reduce((acertos, jogo) => acertos += jogoSorteado.includes(jogo) ? 1 : 0, 0);
}


