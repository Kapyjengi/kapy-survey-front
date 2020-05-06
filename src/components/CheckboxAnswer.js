import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 445,
        marginTop: 60,
        margin: 'auto',
    },
    media: {
        height: 200,
    },
    button: {
        margin: 'auto',
    }
});

export default function CheckboxLabels(props) {

    const classes = useStyles();
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedF: false,
        checkedG: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Typography> {props.currentQuestion} </Typography>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        color="primary" />}
                                label="Eka"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="checkedB"
                                        color="primary" />}
                                label="Toka"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedC}
                                        onChange={handleChange}
                                        name="checkedC"
                                        color="primary" />}
                                label="Kolmas"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedD}
                                        onChange={handleChange}
                                        name="checkedD"
                                        color="primary" />}
                                label="Neljäs"
                            />

                        </FormGroup>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}