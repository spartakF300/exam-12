import React, {Component} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {loginUser} from "../../store/actions/actionsUsers";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  submitFormHandler = event => {
    event.preventDefault();

    this.props.loginUser({...this.state});
  };

  render() {
    return (
      <>
        <Grid container justify="center">
          <Grid item xs={12} md={10} lg={4}>
            <Box pt={2} pb={2}>
              <Typography variant="h4">Login</Typography>
            </Box>

            <form onSubmit={this.submitFormHandler}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <FacebookLogin/>
                </Grid>
                <Grid item xs>
                  <Divider/>
                </Grid>

                {this.props.error && (
                  <Grid item xs>
                    <Alert severity="error">{this.props.error.error}</Alert>
                  </Grid>
                )}

                <Grid item xs>
                  <FormElement
                    propertyName="username"
                    title="Username"
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    type="text"
                    autoComplete="current-username"
                    placeholder="Enter username you registered with"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                    propertyName="password"
                    title="Password"
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter password"
                  />
                </Grid>

                <Grid item xs>
                  <Button type="submit" color="primary" variant="contained">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.users.loginLoading,
  error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);