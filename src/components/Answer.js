import React, { useEffect, useState } from 'react';
import Surveys from './Surveys';
import Link from '@material-ui/core/Link';
import { Route } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AnsweredSurveyCard from './AnsweredSurveyCard'
import SubmittedAnswersConfirmationCard from './SubmittedAnswersConfirmationCard';
import Typography from '@material-ui/core/Typography';
import RadioAnswer from './RadioAnswer';
import CheckboxAnswer from './CheckboxAnswer';

/*
1. Haetaan tietty kysymysteksti
2. Syötetään vastaus
3. Vastaus lähtee
4. Saadaan seuraava kysymys
    Jos ei kysymyksiä jäljellä -> "KIITOS VASTAUKSISTASI"


    saadaan propsina surveyID, haetaan kyselyn kysymys 1

    /surveys/{surveyId}/{questionNumber}
     surveys/{surveyId}/questions
 /surveys/{surveyId}/submitanswers

*/

export default function Answer(props) {
    const [answer, setAnswer] = useState([]);
    const [realanswer, setRealanswer] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [questionsid, setQuestionsid] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(-1);
    const [currentQuestion, setCurrentQuestion] = useState('Please let us know your feedback.');
    const [backToBeginning, setBackToBeginnig] = useState(0);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        getQuestions();
    }, [])

    const getQuestions = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId
        )
            .then(response => response.json())
            .then(data => setQuestions(data.questions)) 
            .then(_ => displayNextQuestion())
            .catch(err => console.error(err))
    }

    const displayNextQuestion = (event) => {

        for (let index = 0; index < questions.length; index++) {
            if (questionNumber === index) {
                setQuestionsid([...questionsid, { id: questions[index].questionId }])
                setCurrentQuestion(questions[index].questionText)
                if (index !== 0) {
                    setRealanswer([...realanswer, { answer }])
                }

            }

        }

        if (questionNumber === questions.length) {
            setRealanswer([...realanswer, { answer }])
        }
        setAnswered(true)
        setQuestionNumber(questionNumber + 1);
    }

    const submitAnswer = () => {
        for (let i = 0; i < questions.length; i++) {

            let wholeanswer = [];

            wholeanswer = {
                "answerText": realanswer[i].answer.answer,
                "question": {
                    "questionId": questionsid[i].id
                }
            }

            fetch('https://kapysurvey-back.herokuapp.com/submitanswer',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                    ,
                    body: JSON.stringify(wholeanswer)

                })
                .catch(err => console.error(err))

        } 
        setBackToBeginnig(1)

    }

    const BacktoBegin = () => {
        setBackToBeginnig(2);
    }

    const begin = () => {
        setQuestionNumber(0)
        displayNextQuestion();
    };

    const clearText = (event) => {
        if (answered === true) {
            event.target.value = "";
            setAnswered(false)
        }
    }
    const inputChanged = (event) => {
        if (answered === false) {
            setAnswer({ ...answer, [event.target.name]: event.target.value });
        } else {
            event.target.value = "";
            setAnswered(false)
        }


    };
    if (backToBeginning === 1) {
        return (
            <div>
                <SubmittedAnswersConfirmationCard BacktoBegin={BacktoBegin} />
            </div>
        )
    }
    if (backToBeginning === 2) {
        return (
            <div>
                <Link to="/Surveys">Survey</Link>{' '}
                <Route path="/Surveys" component={Surveys} />
            </div>
        )
    }
    if (questionNumber === 0) {

        return (
            <div>
                <Typography style={{ marginTop: 60 }} gutterBottom variant="h5" component="h2"> {currentQuestion} </Typography>
                <Button color="primary" onClick={() => begin()}>Begin</Button>
            </div>
        )
    }

    if (questionNumber <= questions.length && questionNumber > 0) {

        return (
            <div>


                <Typography style={{ marginTop: 60, marginBottom: 30 }} gutterBottom variant="h5" component="h2"> {currentQuestion} </Typography>
                <textarea style={{ marginBottom: 30 }} type="text" rows={15} cols={60} name="answer" value={answer.value} onChange={inputChanged} onSelect={clearText} />
                <br></br>
                <Button style={{ marginBottom: 10 }} color="primary" onClick={() => displayNextQuestion()}>Next question</Button>
                <br></br>

                {/* TESTIRADIOBUTTON */}
                {/* Kutsutaan komponenttia, jos
                kyseessä on radiokysymys */}
                <RadioAnswer
                    currentQuestion={currentQuestion}
                    style={{ marginTop: 10 }} />
                {/* TESTIRADIOBUTTON */}

                {/* TESTICHECKBOX */}
                {/* Kutsutaan komponenttia, jos
                kyseessä on monivalintakysymys */}
                <CheckboxAnswer
                    currentQuestion={currentQuestion}
                    style={{ marginTop: 10}} />
                {/* TESTICHECKBOX */}


            </div>
        );

    } else {
        return (
            <div>
                <AnsweredSurveyCard submitAnswer={submitAnswer} />
            </div>
        )
    }

}