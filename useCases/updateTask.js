export default function updateTask(task) {
    const itens = localStorage.getItem("tasks");
  
    const parsedData = JSON.parse(itens) || [];
  
    const index = parsedData.findIndex((item) => item.id === task.id);
  
    if (index || index === 0) {
      parsedData[index] = task;
  
      localStorage.setItem("tasks", JSON.stringify(parsedData));
    }
  }
  