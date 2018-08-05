import gql from "graphql-tag";
import * as React from 'react';
import { Query } from "react-apollo";

interface IEdge {
  node: INode;
}

interface INode {
  title: string;
  id: string;
  url: string;
  author: IActor;
}

interface IActor {
  avatarUrl: string
}

const style = {
  height: "32px",
  width: "32px",
}

export const ExchangeRates: React.SFC = () => (
  <Query
    query={gql`
      {
        repository(owner: "quipper", name: "quipper") {
          issues(last: 50) {
            edges {
              node {
                title
                id
                url
                author {
                  avatarUrl
                }
              }
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) { return <p>Loading...</p>; }
      if (error) { return <p>Error :(</p>; }

      // tslint:disable-next-line:no-console
      console.log(data)
      const onClick = () => refetch()
      return <>
        <button onClick={onClick}>Refetch!</button>
        {data.repository.issues.edges.map((edge: IEdge) => (
          <div key={edge.node.id}>
            <img style={style} src={edge.node.author.avatarUrl} />
            <a href={edge.node.url}>{edge.node.title}</a>
          </div>
        ))}
      </>
    }}
  </Query>
);
