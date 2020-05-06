import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import Check from '@material-ui/icons/Check';


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

export default function RadioButtonsGroup(props) {

    const classes = useStyles();

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Typography> {props.currentQuestion} </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="checkboxQuestion" name="checkboxQuestion1" value={value} onChange={handleChange}>
                                <FormControlLabel value="1"
                                    control={<Radio color="primary" icon={<SentimentVeryDissatisfied />} checkedIcon={<Check />} name="checkedH" />}
                                    label="1"
                                />
                                <FormControlLabel value="2"
                                    control={<Radio color="primary" icon={<SentimentDissatisfied />} checkedIcon={<Check />} name="checkedH" />}
                                    label="2"
                                />
                                <FormControlLabel value="3"
                                    control={<Radio color="primary" icon={<SentimentSatisfied />} checkedIcon={<Check />} name="checkedH" />}
                                    label="3"
                                />
                                <FormControlLabel value="4"
                                    control={<Radio color="primary" icon={<SentimentSatisfiedAlt />} checkedIcon={<Check />} name="checkedH" />}
                                    label="4"
                                />
                                <FormControlLabel value="5"
                                    control={<Radio icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                                    label="5"
                                />
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}