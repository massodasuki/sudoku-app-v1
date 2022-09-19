// src/components/Topics.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const b = 0;
let boards = [
  [[b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b]],
]

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


function Topics() {
  const [sudoku, setSudoku] = useState(boards)
  const location = useLocation();

  useEffect(() => {
    setSudoku(location.state.data)
  });


  var count = 0;
  var set = 2;
  let totalPage = sudoku.length;
  let puzzleIndex = totalPage / 2;
  let sudokuPoW = sudoku.map(function(j, k) {
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

  // let test2 = boards.map((j) => {
  //   return (
  //     j.map((l) => {
  //       return (
  //         l.map((o) => {
  //           return (
  //             <View style={styles.tableCol}>
  //               <Text style={styles.tableCell}>{o}</Text>
  //             </View>
  //           );
  //         })
  //       )
  //     })
  //   )
  // })

  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        {sudokuPoW}
      </Document>
    </PDFViewer>
  )
}





export default Topics;
