import ApolloClient from "apollo-boost";
import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import Issues from "./Issues";
import { Labels } from "./Labels";

import './App.css';
import logo from './logo.svg';

const token = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error('set GITHUB_TOKEN in your .env file');
}
const client = new ApolloClient({
  headers: {
    Authorization: `bearer ${token}`
  },
  uri: "https://api.github.com/graphql",
});

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Labels />
          <Issues />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
