import React from "react";
import ApiHelper from "./ApiHelper";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  onChange = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const userInputData = this.state;
    const responseFromServer = await ApiHelper.userLogin(userInputData);

    if (responseFromServer.accesstoken) {
      this.props.history.push({
        pathname: "/dashboard",
        state: responseFromServer,
      });
    } else {
      alert(responseFromServer.error);
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-dark text-white">Login</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control mt-2"
                      type="text"
                      placeholder="Enter Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <input
                      className="form-control mt-2"
                      type="text"
                      placeholder="Enter Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <input
                      className="form-control mt-2  mt-2 bg-dark text-white"
                      type="submit"
                      name="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
