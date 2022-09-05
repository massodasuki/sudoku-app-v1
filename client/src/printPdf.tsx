import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import React from "react";
const axios = require('axios').default;

// Create styles

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#d11fb6",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    height:20,
    width:20,
    textAlign: "justify",
    borderStyle: "solid",
    borderWidth: 1,
    padding:0

  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10
  }
});

const b = 0;




class BasicDocument extends React.Component <{}, { boardsPuzzle: any [][], boardsAnswer: any [][]}>{
  constructor(props: {}){
   super(props);
   this.state = {
     boardsPuzzle : [ [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b]],

     boardsAnswer : [ [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b],
                 [b, b, b, b, b, b, b, b, b]]

   }
  }
  componentDidMount() {
    axios.get(`http://localhost:3000/api/sudoku/all`)
      .then((res: { data: any; }) => {
        const boardsPuzzle = res.data.sudoku['puzzle'];
        const boardsAnswer = res.data.sudoku['answer'];
        console.log(boardsPuzzle)
        this.setState({boardsPuzzle, boardsAnswer});
      })
  }
 render(){


   var puzzle = this.state.boardsPuzzle.map(function(p, i){
   return (
       <View style={styles.tableRow}>
       {p.map(function(k, i) {
           return (
                 <View style={styles.tableCol}>
                   <Text style={styles.tableCell}>{k}</Text>
                 </View>
               );
           })}
       </View>
       );
   });

  var answer = this.state.boardsAnswer.map(function(p, i){
  return (
      <View style={styles.tableRow}>
      {p.map(function(k, i) {
          return (
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{k}</Text>
                </View>
              );
          })}
      </View>
      );
  });



  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.table}>
          {puzzle}
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.table}>
          {answer}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
}

export default BasicDocument;
