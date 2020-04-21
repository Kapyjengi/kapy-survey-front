import React, { useEffect, useState } from 'react';

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

export default function Answer(props){
    const [answer, setAnswer] = useState('');
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] =useState(0);    
    const [currentQuestion, setCurrentQuestion] = useState('Alkukysymys');

    useEffect(() => {
        // getQuestions();
        testData(); // TEST
        wait(1000);
        displayNextQuestion();
    }, [])

    // TEST
    const testData = () => {
        setQuestions(["Oliko hyvaa", "Miltä tuntuu", "Katsoitko peiliin"]);
       
    }
    // TEST
    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }
 
    const getQuestions = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId + '/questions'
        )
            .then(response => response.json())
            .then(data => setQuestions(data.questions)) // TODO
            .then(_ => displayNextQuestion())
            .catch(err => console.error(err))
    }

    const displayNextQuestion = () => {
        setCurrentQuestion(questions[questionNumber]);
        setQuestionNumber(questionNumber + 1);
    }

    const submitAnswer= () => {
        fetch ('https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId +"/submitanswers" ,
        {
        method: 'POST', 
        headers: {'Content-Type': 'application/json' }
        ,
        body: JSON.stringify(answer)
    })
        .catch(err => console.error(err))
    
    }

    const inputChanged = (event) => {
        setAnswer({...answer,[event.target.name]:event.target.value});
      };
      // {question}
      // <button onClick={submitAnswer}>Send</button>
    
      return (
        <div>
            <h1> {currentQuestion} </h1> 
            <div>
            <textarea type="text" name="answer" value={answer.value} onChange={inputChanged} />
            <button onClick={displayNextQuestion}>Next</button>
          </div>
        </div>
    );
}