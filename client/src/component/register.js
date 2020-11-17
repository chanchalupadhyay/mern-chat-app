import React from "react";
import ApiHelper from "./ApiHelper";
import Chatroom from "./chatroom";
import { Redirect, useHistory } from "react-router-dom";
import "./styles/navbar.css";

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const temp = this.state;
    console.log(temp);

    const res = await ApiHelper.userRegistration(temp);
    console.log("register res", res);
    if (res) {
      console.log("Register --- move to chat room");
      // move to chat room
      // let history = useHistory();
      alert(res);
      // history.push("/chatroom");
      this.props.history.push("/login");
      return;
    } else alert("Invaid Input");
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-dark text-white">
                Registeration
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control mt-2"
                      type="text"
                      placeholder="Enter First Name"
                      name="name"
                      value={this.state.first_name}
                      onChange={this.onChange}
                    />
                    <input
                      className="form-control mt-2"
                      type="text"
                      placeholder="Enter Phone Number"
                      name="phone_number"
                      value={this.state.phone_number}
                      onChange={this.onChange}
                    />
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
export default Register;
