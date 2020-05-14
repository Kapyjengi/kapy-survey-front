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

    let answer=[];
    for (const iterator of list) {
      for (let i = 0; i < iterator.answers.length; i++) { 
        answer.push({id:iterator.questionId, questionText: iterator.questionText,answer:iterator.answers[i].answerText,qid:iterator.questionId})
        
      }
    }
    
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
            style={{ marginTop: 50 }}>Use search bar to sort answers by question.
            </Typography>
            <MaterialTable
                style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                title={props.surveyName + " - " + props.surveyDescription}
                data={answer}
                  columns={[
                    { title: 'Question', field: 'questionText' },
                    { title: 'Answer', field: 'answer' }
                  ]}
                  icons={tableIcons}
                  options={{
                    pageSize: 20,
                    pageSizeOptions: [10, 20, 50, 100, 200],
                    //Jos haluat filtteröinnin jokaiselle kolumnille niin anna filterin arvoksi true
                    filtering: false
                  }}
                />
                </div>
              )
            }
          
