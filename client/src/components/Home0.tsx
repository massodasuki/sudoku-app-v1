import React from "react";
import { Navigate, useNavigate } from "react-router-dom"
const axios = require('axios').default;


class Home0 extends React.Component<{}, { value: any, isRespond: boolean }>{



  constructor(props: {}) {
    super(props);
    this.state = {
      value: '',
      isRespond: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // const navigate = useNavigate();
  }




  handleChange(event: { target: { value: any; }; }) {
    this.setState({ value: event.target.value });
  }



  handleSubmit(event: { preventDefault: () => void; }) {
    axios.get(`http://localhost:3000/api/sudoku/book/20`)
      .then((res: { data: any; }) => {
        alert('A name was submitted: ' + JSON.stringify(res.data));
        const data = res.data;
        let boards = []
        for (var i = 0; i < data.sudoku.length; i++) {
          boards.push(data.sudoku[i].puzzle)
        }
        for (var i = 0; i < data.sudoku.length; i++) {
          boards.push(data.sudoku[i].answer)
        }
        const sudoku = boards

        this.setState({ isRespond: true });


        // const responsed = true;
        // this.setState({sudoku, responsed});
        // confirmRegistration(sudoku)

      })
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Home0;
