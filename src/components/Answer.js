import React, { useEffect, useState } from 'react';

/*
1. Haetaan tietty kysymysteksti
2. Syötetään vastaus
3. Vastaus lähtee
4. Saadaan seuraava kysymys
    Jos ei kysymyksiä jäljellä -> "KIITOS VASTAUKSISTASI"


    saadaan propsina surveyID, haetaan kyselyn kysymys 1
*/

export default function Answer(props){
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [questionNumber, setQuestionNumber] =useState(0);

    useEffect(() => {
        getQuestion();
    }, [])

    const getQuestion = () => {
        fetch('https://kapysurvey-back.herokuapp.com/' + props.surveyId
        + '/' + questionNumber
        )//lisätään tähän endpoint, kysymys 1, 2, 3 jne...
            .then(response => response.json())
            .then(data => setQuestion(data.questions)) // SYNTAKSI
            .catch(err => console.error(err))
    }

    const submitAnswer= () => {
        fetch ('https://kapysurvey-back.herokuapp.com/surveys/', // MIKÄ URL
        {
        method: 'POST', 
        headers: {'Content-Type': 'application/json' }
        ,
        body: JSON.stringify(answer)
    })
        .then(_ => {
            getQuestion()} // HAETAAN SEURAAVA Kysymys
        )
        .catch(err => console.error(err))
    
    }

    const inputChanged = (event) => {
        setAnswer({...answer,[event.target.name]:event.target.value});
      };
      // {question}
      // 
    return (
        <div>
            <h1> KYSYMYS </h1> 
            <div>
            <textarea type="text" name="answer" value={answer.value} onChange={inputChanged} />
            <button onClick={submitAnswer}>Send</button>
          </div>
        </div>
    );
}