import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { StyledLink } from './CommonComponents';
import styled from 'styled-components';

@inject('liquorStore')
@observer
class Results extends Component {
  state = {

  };
  componentDidMount() {
    this.props.liquorStore.fetchRequests();
  }

  toggle = (id) => {
    this.setState({
      [id]: !this.state[id]
    });
  }

  renderRequest = ({ id, name, beer, quantity }) => (
    <StyledRow key={`${name}-${beer}`} onClick={ () => this.toggle(id) } crossed={ this.state[id] }>
      <td>{ name }</td><td>{quantity}</td><td>{ beer }</td>
    </StyledRow>
  );
  render() {
    const {todays} = this.props.liquorStore;

    return (
      <div>
        { todays ? (
          <table>
            <thead>
              <tr>
                <th>name</th><th>quantity</th><th>beer</th>
              </tr>
            </thead>
            <tbody>{ todays.map(this.renderRequest) }</tbody>
          </table>
        ) : <div>loading...</div> }
        <StyledLink to="/">Edit your beer</StyledLink>
        <StyledLink to="/beers">Beer List</StyledLink>
      </div>
    );
  }
}

const StyledRow = styled.tr`
  text-decoration: ${(({crossed}) => crossed ? 'line-through' : '')};
AAA                                      hjcv ebrvv4S#G@GDF#‰¸®fvh cgfvvnbvvb vbbbbbbbbbbbbbbbbbbbbbbbbbbvvvvgn azFFFFFAAAA`;

export default Results;
