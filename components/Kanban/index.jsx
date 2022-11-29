import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import TaskCard from '../TaskCard';
import styles from './Kanban.module.css';
import Grid from '@mui/material/Unstable_Grid2';
import listTasks from "../../useCases/listTasks";
import updateTask from '../../useCases/updateTask'
import AddIcon from '@mui/icons-material/Add';
import { Fab, Box, Modal } from '@mui/material';
import AddCardForm from '../AddCardForm';

const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.DragDropContext;
    }),
  { ssr: false },
);
const Droppable = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Droppable;
    }),
  { ssr: false },
);
const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Draggable;
    }),
  { ssr: false },
);


export default function Kanban() {
  
  const [columns, setColumns] = useState({
    [1]: {
      status: "Em Aberto",
      items: []
    },
    [2]: {
      status: "Em Andamento",
      items: []
    },
    [3]: {
      status: "Pendência",
      items: []
    },
    [4]: {
      status: "Finalizado",
      items: []
    },
    [5]: {
      status: "Outros",
      items: []
    }
  });
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);


  function fetchTasks() {
    const itens = listTasks();
    const itensEmAberto = [];
    const itensEmAndamento = [];
    const itensPendencia = [];
    const itensFinalizado = [];
    const itensOutros = [];

    itens?.forEach(item => {
      if (item.status === 'Em Aberto') {
        itensEmAberto.push({ id: item.id, status: item.status, content: <TaskCard onDelete={onDelete} task={item} /> })
      }

      if (item.status === 'Em Andamento') {
        itensEmAndamento.push({ id: item.id, status: item.status, content: <TaskCard onDelete={onDelete} task={item} /> })
      }

      if (item.status === 'Pendência') {
        itensPendencia.push({ id: item.id, status: item.status, content: <TaskCard onDelete={onDelete} task={item} /> })
      }

      if (item.status === 'Finalizado') {
        itensFinalizado.push({ id: item.id, status: item.status, content: <TaskCard onDelete={onDelete} task={item} /> })
      }

      if (item.status === 'Outros') {
        itensOutros.push({ id: item.id, status: item.status, content: <TaskCard onDelete={onDelete} task={item} /> })
      }
    })

    setColumns({
      [1]: {
        status: "Em Aberto",
        items: itensEmAberto
      },
      [2]: {
        status: "Em Andamento",
        items: itensEmAndamento
      },
      [3]: {
        status: "Pendência",
        items: itensPendencia
      },
      [4]: {
        status: "Finalizado",
        items: itensFinalizado
      },
      [5]: {
        status: "Outros",
        items: itensOutros
      }
    })
  }
  
  const updateTaskStatus=(task)=>{
    updateTask(task);
    fetchTasks();
  }

  const onDelete=()=>{
    fetchTasks();
  }

  const onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const {task} = removed.content.props;
      task.status = destColumn.status
      updateTaskStatus(task);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  

  
  return (
    <div className={styles.kanban}>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab className={styles.addCard} size="small" color="secondary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Box>
      <Modal
        BackdropProps={{ style: { backgroundColor: '#00000020' } }}
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <AddCardForm onSuccess={() => fetchTasks()} />
        </Box>
      </Modal>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >

              <div style={{ margin: 8 }}>
                <div className={styles.columnHeader}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={10}>
                      <h3 className={styles.columnName}>{column.status}</h3>
                    </Grid>
                    <Grid xs={2} className={styles.equipe}>
                      <div className={styles.columnItems}>{column.items.length}</div>
                    </Grid>
                  </Grid>
                </div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#a9e0ad"
                            : "#eaedea",
                          padding: 5,
                          width: 290,
                          minHeight: 800
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext >
    </div >
  );
}