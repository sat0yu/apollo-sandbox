import gql from "graphql-tag";
import { isNil } from "lodash-es";
import * as React from 'react';
import { ChildDataProps, graphql } from "react-apollo";
import { Graph } from 'react-d3-graph';

interface IActor {
  avatarUrl: string;
  login: string;
}

interface INode {
  title: string;
  id: string;
  url: string;
  author: IActor;
}

interface IEdge {
  cursor?: string;
  node: INode;
}

interface IIssues {
  edges: IEdge[];
}

interface IRepositoty {
  issues: IIssues;
}

interface IResponse {
  repository: IRepositoty;
};

const style = {
  height: "32px",
  width: "32px",
}

const ISSUE_QUERY = gql(`
  {
    repository(owner: "quipper", name: "quipper") {
      issues(last: 50) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          node {
            title
            id
            url
            author {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`);

type Props = ChildDataProps<object, IResponse, object>;
class Issues extends React.Component<Props, object> {
  public constructor(props: Props){
    super(props);
    this.refetch = this.refetch.bind(this);
  }

  get data() {
    const {repository}  = this.props.data
    if(isNil(repository)) { return {links: [], nodes: []} }
    const edges = repository.issues.edges;
    const nodes = edges.reduce((acc, e) => [
      ...acc,
      {id: e.node.title, color: 'blue'},
      {id: e.node.author.login, color: 'red'}
    ], [])
    const links = edges.reduce((acc, e) => [
      ...acc,
      {source: e.node.author.login, target: e.node.title}
    ], []);
    return {links, nodes,}
  };


  public render() {
    if(isNil(this.props.data)){ return null }

    const {loading, error, repository} = this.props.data;
    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error :(</p>; }

    return isNil(repository)
      ? null
      : <>
          <button onClick={this.refetch}>Refetch!</button>
          {repository.issues.edges.map((edge: IEdge) => (
            <div key={edge.node.id}>
              <img style={style} src={edge.node.author.avatarUrl} />
              <a href={edge.node.url}>{edge.node.title}</a>
            </div>
          ))}
          <Graph
            id={"issue-graph"}
            data={this.data}
          />
        </>
  }

  private refetch(){
    this.props.data.refetch();
  }
};

const withIssues = graphql<object, IResponse>(ISSUE_QUERY);
export default withIssues(Issues)
