import React, { useEffect, useState } from 'react';
import Surveys from './Surveys';
import Link from '@material-ui/core/Link';
import { Route } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AnsweredSurveyCard from './AnsweredSurveyCard'

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
    const [currentQuestion, setCurrentQuestion] = useState('Start');
    const [backToBeginning, setBackToBeginnig] = useState(0);
    const [answered, setAnswered] = useState(false);


    useEffect(() => {
        getQuestions();
        //  testData(); // TEST
        //wait(1000);

        //  displayNextQuestion();
    }, [])

    // TEST
    const testData = () => {
        setQuestions(["Oliko hyvaa", "Miltä tuntuu", "Katsoitko peiliin"]);

    }
    // TEST
    function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    const getQuestions = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId
        )
            .then(response => response.json())
            .then(data => setQuestions(data.questions)) // TODO
            .then(_ => displayNextQuestion())
            .catch(err => console.error(err))
    }



    const displayNextQuestion = (event) => {

        //console.log(questionNumber)
        for (let index = 0; index < questions.length; index++) {
            //console.log("i:" + questionNumber + "  index:" + index)
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
            //console.log(wholeanswer)
            //console.log(JSON.stringify(wholeanswer))


            fetch('https://kapysurvey-back.herokuapp.com/submitanswer',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                    ,
                    body: JSON.stringify(wholeanswer)

                })
                .catch(err => console.error(err))

        } // for
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
        if (answered == true) {
            event.target.value = "";
            setAnswered(false)
        }
    }
    const inputChanged = (event) => {
        if (answered == false) {
            setAnswer({ ...answer, [event.target.name]: event.target.value });
        } else {
            event.target.value = "";
            setAnswered(false)
        }

    };
    // {question}
    // <button onClick={submitAnswer}>Send</button>
    if (backToBeginning === 1) {
        return (
            <div>
                <h4>täytettä</h4>
                <h1>FEEDBACK IS SENDED TO TEACHER</h1>
                <Button onClick={() => BacktoBegin()}>Back to the surveylist</Button>
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
                <h4>täytettä</h4>
                <h1> {currentQuestion} </h1>

                <Button color="primary" onClick={() => begin()}>Begin</Button>
            </div>
        )
    }

    if (questionNumber <= questions.length && questionNumber > 0) {

        return (
            <div>
                <h4>täytettä</h4>
                <h1> {currentQuestion} </h1>
                <textarea type="text" rows={15} cols={60} name="answer" value={answer.value} onChange={inputChanged} onSelect={clearText} />
                <br></br>
                <Button color="primary" onClick={() => displayNextQuestion()}>Next question</Button>
            </div>
        );

    } else {
        return (
            <div>
                {/*
                Tämän alla olevan saa poistaa, kunhan allaoleva AnsweredSurveyCard komponentti toimii kunnolla.
                SubmitAnswers painike AnsweredQeustionCard-komponentissa ei vielä kutsu tämän komponentin
                samannimistä metodia, joka lähettää käyttäjän vastaukset palvelimelle.

                Card-komponentti pitää sisällään kuvan, tekstin, selityksen vastauksista ja submit-painikkeen.

                */}
                <h4>täytettä</h4>
                <p> Thank you for taking the time to complete {props.surveyName} course survey. </p>
                <p> Your answers are used to improve this course. All of the collected data is handled and analyzed anonymously.</p>
                <Button color="secondary" onClick={() => submitAnswer()}>Click here to submit answers and finish this survey</Button>

                {/* Kutsutaan card-komponenttia. */}
                <AnsweredSurveyCard />

            </div>
        )
    }

}