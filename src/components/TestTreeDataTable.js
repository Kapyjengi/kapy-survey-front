import React from "react";
import MaterialTable from "material-table";

export default function ShowTestDataTable(props) {

      return (
        <MaterialTable
          title="Remote Data Preview"
          columns={[
            { title: 'ID', field: 'surveyId' },
            { title: 'Question', field: 'questionText' },
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = 'https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId + '/questions'
              console.log(url)
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    surveyId: result[1].questionId,
                    questionText: result[1].questionText
                  })
                  // allaolevat toimii endpointilla .../surveys/' + props.surveyId
                  //console.log(result)   // hakee koko resultin surveyoliona
                  //console.log(result.questions) // hakee kaikki surveyn kysymykset vastauksineen
                  //console.log(result.questions[1].questionId) // hakee surveyn toisen kysymyksen id:n
                  //console.log(result.questions[1].questionText) // hakee surveyn toisen kysymyksen 
                  //console.log(result.questions[1].answers) // hakee surveyn toisen kysymyksen vastaukset
                  //console.log(result.questions[1].answers[1]) // hakee surveyn toisen kysymyksen vastauksista toisen oliona
                  //console.log(result.questions[1].answers[1].answerId) // hakee surveyn toisen kysymyksen toisen vastauksen id:n
                  //console.log(result.questions[1].answers[1].answerText) // hakee surveyn toisen kysymyksen toisen vastauksen
                })
            })
          }
        />
      )
    }
