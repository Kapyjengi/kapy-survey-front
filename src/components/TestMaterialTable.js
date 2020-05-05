import React from "react";
import MaterialTable from "material-table";

 export default function TestMaterialTable(props) {

    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Question", field: "questionText" },
            { title: "Question id", field: "questionId" }
          ]}
          data={query=>
            new Promise((resolve, reject) => {
              let url = 'https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId + '/questions'
              console.log(url)
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    questionText: result.questionText,
                    questionId: result.questionId
                    
                  })
                  console.log(result[1].questionText)
                })
                .catch(err=>console.error(err))
            })
          }
          
        />
      </div>
    );
  
}