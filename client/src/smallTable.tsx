import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';


const b = 0;
class SmallExample extends React.Component <{}, { boardsPuzzle: any [][], boardsAnswer: any [][]}>{
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
  return(
    <Table striped bordered hover size="sm">
      {this.state.boardsPuzzle.map((row, index) => {
        return (
          <tr>
            {row.map((item, iIndex) => {
              return <td> {item} </td>;
            })}
          </tr>
        );
      })}
      <br></br>
      {this.state.boardsAnswer.map((row, index) => {
        return (
          <tr>
            {row.map((item, iIndex) => {
              return <td> {item} </td>;
            })}
          </tr>
        );
      })}
    </Table>
  );
 }
}

export default SmallExample;
