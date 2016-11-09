import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import ApolloClient from 'apollo-client';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.resetStore = props.client.resetStore.bind(props.client);
  }

  render() {
    const { loading, currentUser } = this.props;

    if (loading) {
      return (
        <p className="navbar-text navbar-right">
          Loading...
        </p>
      );
    } else if (currentUser) {
      return (
        <span>
          <p className="navbar-text navbar-right">
            {currentUser.login}
            &nbsp;
            <a href="/logout">Log out</a>
            <button onClick={this.resetStore}>resetStore</button>
          </p>
          <Link
            type="submit"
            className="btn navbar-btn navbar-right btn-success"
            to="/submit"
          >
            <span
              className="glyphicon glyphicon-plus"
              aria-hidden="true"
            />
            &nbsp;
            Submit
          </Link>
        </span>
      );
    }
    return (
      <p className="navbar-text navbar-right">
        <a href="/login/github">Log in with GitHub</a>
      </p>
    );
  }
}

Profile.propTypes = {
  client: React.PropTypes.instanceOf(ApolloClient),
  loading: React.PropTypes.bool,
  currentUser: React.PropTypes.shape({
    login: React.PropTypes.string.isRequired,
  }),
};

const PROFILE_QUERY = gql`
  query CurrentUserForLayout {
    currentUser {
      login
      avatar_url
    }
  }
`;

export default withApollo(graphql(PROFILE_QUERY, {
  options: { forceFetch: true },
  props: ({ data: { loading, currentUser } }) => ({
    loading, currentUser,
  }),
})(Profile));
