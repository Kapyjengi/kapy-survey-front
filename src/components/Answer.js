import React from 'react'

export default function Answer(){
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        getQuestions();
    }, [])

    const getQuestions = () => {
        fetch('https://kapysurvey-back.herokuapp.com//' + props.surveyId)//lisätään tähän endpoint
            .then(response => response.json())
            .then(data => setQuestions(data.questions))
            .catch(err => console.error(err))
    }

    const answerField = () =>{
        setAnswer
    }

    return (
        <div>
            <h1></h1>
            <h1> paskanenkysely </h1>
            <ReactTable
                defaultPageSize={10}
                filterable={true}
                data={questions}
                columns={columns}
            />
        </div>
    );
}