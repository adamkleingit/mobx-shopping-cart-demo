import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

@inject('liquorStore')
@observer
class Results extends Component {
  state = {

  };
  componentDidMount() {
    this.props.liquorStore.fetchRequests();
  }

  toggle = (index) => {
    this.setState({
      [index]: !this.state[index]
    });
  }

  renderRequest = ({ name, beer, quantity }, index) => (
    <StyledRow key={`${name}-${beer}`} onClick={ () => this.toggle(index) } crossed={ this.state[index] }>
      <td>{ name }</td><td>{quantity}</td><td>{ beer }</td>
    </StyledRow>
  );
  render() {
    const {requests} = this.props.liquorStore;

    return (
      <div>
        { requests ? (
          <table>
            <thead>
              <tr>
                <th>name</th><th>quantity</th><th>beer</th>
              </tr>
            </thead>
            <tbody>{ requests.map(this.renderRequest) }</tbody>
          </table>
        ) : <div>loading...</div> }
        <div><Link to="/">Edit your beer</Link></div>
        <div><Link to="/beers">Beer List</Link></div>
      </div>
    );
  }
}

const StyledRow = styled.tr`
  text-decoration: ${(({crossed}) => crossed ? 'line-through' : '')};
  color: red;
`;

export default Results;
