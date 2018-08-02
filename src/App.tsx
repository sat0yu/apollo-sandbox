import ApolloClient from "apollo-boost";
import * as React from 'react';
import { ApolloProvider } from "react-apollo";
import { ExchangeRates } from "./Query";

import './App.css';
import logo from './logo.svg';

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h2>My first Apollo app 🚀</h2>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        <ExchangeRates />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
