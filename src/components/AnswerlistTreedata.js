 import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import { ChevronLeft, ChevronRight, Clear, FirstPage, LastPage, Search, ArrowDownward, FilterList } from "@material-ui/icons";

export default function ShowAnswerlistTreeData(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        getQuestionList();

    }, [])

    const getQuestionList = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' +props.surveyId + '/questions')
            .then(response => response.json())
            .then(data => setList(data))
            .catch(err => console.error(err))
    }
    console.log(list)

    let vas=[];
    for (const iterator of list) {
      //console.log(iterator.answers)
      for (let i = 0; i < iterator.answers.length; i++) { 
        vas.push({id:iterator.questionId, questionText: iterator.questionText,answer:iterator.answers[i].answerText,qid:iterator.questionId})
        
      }
    }
    //console.log(vas)
    
    const tableIcons = { 
      FirstPage: FirstPage,
      LastPage: LastPage,
      NextPage: ChevronRight,
      PreviousPage: ChevronLeft,
      ResetSearch: Clear,
      Search: Search,
      SortArrow: ArrowDownward,
      Filter: FilterList
    };

    return (
        <div>
            <Typography 
            gutterBottom variant='h6' component='h6'
            style={{ marginTop: 50 }}>Käytä hakukenttää haluamasi kysymyksen vastausten hakuun.
            </Typography>
            <MaterialTable
                style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                title={props.surveyName + " - " + props.surveyDescription}
                data={vas}
                  columns={[
                    /* { title: 'questionId', field: 'questionId' }, */
                    { title: 'Question', field: 'questionText' },
                    /* { title: 'answerId', field: 'answers[0].answerId' }, */
                    { title: 'Answer', field: 'answer' },
                  ]}
                  //parentChildData={(row, rows) => rows.find(a => a.questionId === row.answerId)}
                  parentChildData={(row, rows) => rows.find(a => a.questionId === row.id)}
                  icons={tableIcons}
                  options={{
                    pageSize: 20,
                    pageSizeOptions: [10, 20, 50, 100, 200]
                    //filtering: true
                  }}
                />
                </div>
              )
            }
          
