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
    backgroundColor: "#ffff",
    color: "black",
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
    borderStyle: "solid",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableRowTop: {
    margin: "auto",
    flexDirection: "row",
    borderTopWidth: 1
  },
  tableRowBottom: {
    margin: "auto",
    flexDirection: "row",
    borderBottomWidth: 1
  },
  tableCol: {
    height: 30,
    width: 30,
    textAlign: "justify",
    borderStyle: "solid",
    borderWidth: 0.1,
    padding: 0
  },
  tableColBottom: {
    height: 30,
    width: 30,
    textAlign: "justify",
    borderStyle: "solid",
    borderWidth: 0.1,
    borderBottomWidth: 1,
    padding: 0
  },
  tableColLeft: {
    height: 30,
    width: 30,
    textAlign: "justify",
    borderStyle: "solid",
    borderWidth: 0.1,
    borderLeftWidth: 1,
    padding: 0
  },
  tableColRight: {
    height: 30,
    width: 30,
    textAlign: "justify",
    borderStyle: "solid",
    borderWidth: 0.1,
    borderRightWidth: 1,
    padding: 0
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 11
  },
  tableBody: {
    borderStyle: "solid",
    borderWidth: 1.4,
  },
  title: {
    textAlign: "center",
    marginTop: 200,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  // table: {
  //   borderCollapse: "collapse",
  //   fontFamily: "Calibri",
  // },
  tbody: {
    border: "solid medium"
  },
  colgroup: {
    border: "solid medium",
  },
  td: {
    border: "solid thin",
    height: 1.4,
    width: 1.4,
    textAlign: "center",
    padding: 0,
  }
});


const b = 0;

class BasicDocument extends React.Component<{}, { responsed: boolean, sudoku: any[], boardsPuzzle: any[][], boardsAnswer: any[][] }>{
  constructor(props: {}) {
    super(props);
    this.state = {
      responsed: false,
      sudoku: [
        [[b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b]],

        [[b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b]],


        [[b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b]],

        [[b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b],
        [b, b, b, b, b, b, b, b, b]]

      ],

      boardsPuzzle: [[b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b]],

      boardsAnswer: [[b, b, b, b, b, b, b, b, b],
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


    let boardsAnswer = [
      [[b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b]],

      [[b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b]],


      [[b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b],
      [b, b, b, b, b, b, b, b, b]]

    ]

    console.log("onmount")
    axios.get(`http://localhost:3000/api/sudoku/book/20`)
      .then((res: { data: any; }) => {
        const data = res.data;
        let boards = []
        for (var i = 0; i < data.sudoku.length; i++) {
          boards.push(data.sudoku[i].puzzle)
        }
        for (var i = 0; i < data.sudoku.length; i++) {
          boards.push(data.sudoku[i].answer)
        }
        const sudoku = boards
        const responsed = true;
        this.setState({ sudoku, responsed });
      })
  }

  render() {

    var count = 0;
    var set = 2;

    let totalPage = this.state.sudoku.length;
    let puzzleIndex = totalPage / 2;

    var sudokuPoW = this.state.sudoku.map(function(j, k) {
      let str = "";
      var set = k + 1;
      if (k < puzzleIndex) {
        str = "Sudoku of the day " + set
      } else {
        str = "Answer " + (set - puzzleIndex)
      }
      return (<Page size="A4" style={styles.page}>
        <Text style={styles.title} >{str}</Text>
        <View style={styles.table}>
          {
            j.map(function(p: any[], i: number) {
              if (i === 0) {
                return (
                  <View style={styles.tableRowTop}>
                    {p.map(function(k, i) {
                      if (i === 0 || i === 3 || i === 6) {
                        return (
                          <View style={styles.tableColLeft}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                      else if (i === 8) {
                        return (
                          <View style={styles.tableColRight}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                      else {
                        return (
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              } else if (i === 2 || i === 5 || i === 8) {
                return (
                  <View style={styles.tableRowBottom}>
                    {p.map(function(k, i) {
                      if (i === 0 || i === 3 || i === 6) {
                        return (
                          <View style={styles.tableColLeft}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                      else if (i === 8) {
                        return (
                          <View style={styles.tableColRight}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                      else {
                        return (
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              } else {
                return (
                  <View style={styles.tableRow}>
                    {p.map(function(k, i) {
                      if (i === 0 || i === 3 || i === 6) {
                        return (
                          <View style={styles.tableColLeft}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                      else if (i === 8) {
                        return (
                          <View style={styles.tableColRight}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                      else {
                        return (
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{k}</Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              }
            })
          }
        </View>
      </Page>)
    })

    return (
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          {sudokuPoW}
        </Document>
      </PDFViewer>
    );
  }
}

export default BasicDocument;