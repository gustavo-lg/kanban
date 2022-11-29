import {
    TextareaAutosize,
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker, LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import styles from './AddCardForm.module.css'
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import createTask from '../../useCases/createTask';
import { useRef } from 'react';

export default function AddCardForm({ onSuccess }) {

    const [status, setStatus] = React.useState('Em Aberto');
    const [setor, setSetor] = React.useState('');
    const [projeto, setProjeto] = React.useState('');
    const [titulo, setTitulo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [equipe, setEquipe] = React.useState('');

    const [prevista, setPrevista] = React.useState(new Date());
    const [previsto, setPrevisto] = React.useState(new Date());


    const form = useRef(null);

    const handleChangeSetor = (e) => {
        setSetor(e.target.value);
    };

    const handleChangeProjeto = (e) => {
        setProjeto(e.target.value);
    };

    const handleChangeTitulo = (e) => {
        setTitulo(e.target.value);
    };

    const handleChangeDescricao = (e) => {
        setDescricao(e.target.value);
    };

    const handleChangeEquipe = (e) => {
        setEquipe(e.target.value);
    };

    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask({
            setor,
            projeto,
            titulo,
            descricao,
            equipe,
            previsto,
            prevista,
            status
        })

        onSuccess();
    }

    return <>
        <Typography className={styles.formTitle} id="modal-modal-title" variant="h5" component="h2">
            Crie uma nova task inserindo os dados abaixo
        </Typography>
        <form
            ref={form}
            onSubmit={(e) => handleSubmit(e)}
        >
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <FormControl className={styles.formControl} fullWidth>
                        <InputLabel id="demo-select-small">Status*</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={handleChangeStatus}
                        >
                            <MenuItem value={'Em Aberto'}>Em Aberto</MenuItem>
                            <MenuItem value={'Em Andamento'}>Em Andamento</MenuItem>
                            <MenuItem value={'Pendencia'}>Pendência</MenuItem>
                            <MenuItem value={'Finalizado'}>Finalizado</MenuItem>
                            <MenuItem value={'Outros'}>Outros</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={6}>
                    <FormControl className={styles.formControl} fullWidth>
                        <InputLabel id="demo-select-small">Setor*</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={setor}
                            label="Setor"
                            onChange={handleChangeSetor}
                        >
                            <MenuItem value={'Sites'}>Sites</MenuItem>
                            <MenuItem value={'CRM'}>CRM</MenuItem>
                            <MenuItem value={'UI/UX'}>UI/UX</MenuItem>
                            <MenuItem value={'DevOps'}>DevOps</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={6}>
                    <FormControl className={styles.formControl} fullWidth>
                        <InputLabel id="demo-select-small">Projeto*</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projeto}
                            label="Projeto"
                            onChange={handleChangeProjeto}
                        >
                            <MenuItem value={'Site Builder'}>Site Builder</MenuItem>
                            <MenuItem value={'Facebook Mkt'}>Facebook Mkt</MenuItem>
                            <MenuItem value={'API v2'}>API v2</MenuItem>
                            <MenuItem value={'AWS Migrate'}>AWS Migrate</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <FormControl className={styles.formControl} fullWidth>
                <TextField id="outlined-basic"
                    name="titulo"
                    required
                    label="Titulo"
                    variant="outlined"
                    onChange={handleChangeTitulo}
                    value={titulo} />
            </FormControl>
            <FormControl className={styles.formControl} fullWidth>
                <TextareaAutosize
                    required
                    className={styles.descricao}
                    name="descricao"
                    aria-label="empty textarea"
                    placeholder="Descrição"
                    onChange={handleChangeDescricao}
                    value={descricao} />
            </FormControl>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <FormControl className={styles.formControl} fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                required
                                views={['day', 'month', 'year']}
                                label="Prevista"
                                className={styles.date}
                                value={prevista}
                                onChange={(e) => {
                                    setPrevista(e);
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid xs={6}>
                    <FormControl className={styles.formControl} fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                required
                                label="Previsto"
                                className={styles.time}
                                value={previsto}
                                onChange={(e) => {
                                    setPrevisto(e);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
            </Grid>
            <FormControl className={styles.formControl} fullWidth>
                <InputLabel id="demo-select-small">Equipe</InputLabel>
                <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={equipe}
                    label="Equipe"
                    onChange={handleChangeEquipe}
                >
                    <MenuItem value={'GG'}>Gustavo Gonçalves</MenuItem>
                    <MenuItem value={'KM'}>Kentaro Miura</MenuItem>
                    <MenuItem value={'RS'}>Ricardo Silva</MenuItem>
                    <MenuItem value={'AS'}>Anderson Souza</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={styles.formControl} fullWidth>
                <Button
                    type="submit"
                    className={styles.formBtn}
                    variant="contained"
                >
                    Cadastrar <AddCircleIcon sx={{ margin: 1 }} />
                </Button>
            </FormControl>
        </form>
    </>
}