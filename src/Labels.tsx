import gql from "graphql-tag";
import * as React from 'react';
import { Query } from "react-apollo";

interface IEdge {
  node: INode;
}

interface INode {
  name: string;
  id: string;
  url: string;
}

export const Labels: React.SFC = () => (
  <Query
    query={gql`
      {
        repository(owner: "quipper", name: "quipper") {
          labels(last: 50) {
            totalCount
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
            }
            edges {
              node {
                name
                id
                url
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

      const onClick = () => refetch()
      return <>
        <button onClick={onClick}>Refetch!</button>
        {data.repository.labels.edges.map((edge: IEdge) => (
          <div key={edge.node.id}>
            <a href={edge.node.url}>{edge.node.name}</a>
          </div>
        ))}
      </>
    }}
  </Query>
);
