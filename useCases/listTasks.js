export default function listTasks() {
        const itens = localStorage.getItem('tasks');
        return JSON.parse(itens);
}