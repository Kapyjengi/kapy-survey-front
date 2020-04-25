import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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

export default function AnsweredSurveyCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/survey.jpg"
                    title="Survey with tickboxes and smileyfaces"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Your answers have been submitted succesfully.
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                     Your answers are highly apprecciated and used to improve this course.
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button className={classes.button} size="small" color="default" onClick={() => props.BacktoBegin()} >Back to surveylisting</Button>
            </CardActions>
        </Card>
    );
}