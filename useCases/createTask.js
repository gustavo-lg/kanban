import { v4 as uuidv4 } from "uuid";

export default function createTask({
    setor,
    projeto,
    titulo,
    descricao,
    equipe,
    previsto,
    prevista,
    status,
    saldo }) {
    const itens = localStorage.getItem('tasks');
    const datas = JSON.parse(itens) || [];
    datas.push({
        id: uuidv4(),
        setor,
        projeto,
        titulo,
        descricao,
        equipe,
        previsto,
        prevista,
        saldo,
        status
    })
    localStorage.setItem('tasks', JSON.stringify(datas))
}