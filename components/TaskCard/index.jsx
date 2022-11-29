import { Card, CardContent, Avatar, TextField, IconButton, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopTimePicker, LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import styles from './TaskCard.module.css';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import deleteTask from '../../useCases/deleteTask'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { differenceInHours, parse, format, parseISO, differenceInMinutes } from 'date-fns'

const DateTimePicker = styled(TextField)({
  '& label.Mui-focused': {
    color: 'transparent',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: 'none'
    }
  },
});

export default function TaskCard({ task, onDelete }) {

  const handleDelete = () => {
    deleteTask(task);
    onDelete();
    
  }

  const data = task?.prevista && format(parseISO(task.prevista), 'dd/MM/yyyy');
  const hora = task?.previsto && format(parseISO(task.previsto), 'HH:mm');

  const dataFormatada = parse(`${data} ${hora}`, 'dd/MM/yyyy HH:mm', new Date())

  const diferencaHoras = differenceInHours(dataFormatada, new Date());
  const diferencaMinutos = Math.round(differenceInMinutes(dataFormatada, new Date()) / 60)
  return <>
    <Card className={styles.card}>
      <div className={styles.delete}>
        <IconButton onClick={() => handleDelete()}>
          <DeleteIcon />
        </IconButton >
      </div>
      <CardContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={9}>
            <div className={styles.setor}>{task?.setor}</div>
          </Grid>
          <Grid xs={3} className={styles.equipe}>
            <small className={styles.label}>
              Código:
              <div>123</div>
            </small>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} className={styles.title}>
            {task?.titulo}
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <small className={styles.label}>
              Projeto:
              <div className={styles.company}>{task?.projeto}</div>
            </small>
          </Grid>
          <Grid xs={6} className={styles.equipe}>
            <small className={styles.label}>
              Prevista:
            </small>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                disabled
                className={styles.date}
                views={['day']}
                value={task.prevista}
                onChange={() => {
                  return
                }}
                renderInput={(params) => <DateTimePicker {...params} helperText={null} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <small className={styles.label}>Descrição:
              <div className={styles.desc}>{task?.descricao}</div>
            </small>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12}>
            <small className={styles.line}>Acompanhamento</small>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <small className={styles.label}>
              Previsto:
            </small>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopTimePicker
                disabled
                className={styles.time}
                value={task.previsto}
                onChange={() => {
                  return
                }}
                renderInput={(params) => <DateTimePicker {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid xs={6} className={styles.status}>
            {diferencaHoras > 1 && diferencaMinutos >= 0 ? <Button variant="contained" color="success">EM DIA</Button> : null}
            {diferencaHoras === 0 && diferencaMinutos > 0 && diferencaMinutos < 59 ? <Button variant="contained" color="warning">ATENÇÃO</Button> : null}
            {diferencaHoras < 0 || diferencaMinutos < 0 ? <Button variant="contained" color="error">EM ATRASO</Button> : null}
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6} sx={{display: 'grid'}}>
            <small className={styles.label}>
              Saldo:
            </small>
            <Button className={styles.diferenca} variant="text" disabled startIcon={<AccessTimeIcon />}>
              <p>{diferencaHoras}h</p>:<p>{diferencaMinutos}m</p>
            </Button>
          </Grid>
          <Grid xs={6} className={styles.equipe}>
            <small className={styles.label}>Equipe:
              <Avatar className={styles.avatar}>{task?.equipe}</Avatar>
            </small>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>
}

