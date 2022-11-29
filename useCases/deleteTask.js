export default function deleteTask(task) {
  const itens = localStorage.getItem("tasks");
  
  const parsedData = JSON.parse(itens) || [];

  const index = parsedData.findIndex((item) => item.id === task.id);

  if (index || index === 0) {
    parsedData.splice(index, 1)

    localStorage.setItem("tasks", JSON.stringify(parsedData));
  }
}
