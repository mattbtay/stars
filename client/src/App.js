import React from 'react';

class App extends React.Component {

  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/stats');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
          <p>games left: {this.state.response ? this.state.response.games : 'loading...'}</p>
          <p>record: {this.state.response ? this.state.response.record : 'loading...'}</p>
      </div>
    );

}
}

export default App
