import React,{ useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

export default function Answerslist(props){
    const[list, setList] = useState([]);

    useEffect(() => {
        getList();
       
    }, [])

    const getList = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId + '/questions')
            .then(response => response.json())
            .then(data => setList(data))
            .catch(err => console.error(err))
    }

    console.log(list);

    const columns = [
        {
          Header: 'QuestionText',
          accessor: 'questionText'
    
        },
        {
          Header: 'Answer',
          accessor: 'answers[0].answerText'
        }
      ]
    

    return(
        <div>
    <div>
        <ReactTable style={{ marginTop: 50 }} defaultPageSize={10} filterable={true} data={list} columns={columns} />
      </div>
        </div>
    )
}