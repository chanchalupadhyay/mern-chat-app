// import io from "socket.io-client";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

class Dashboard extends React.Component {
  state = {
    userData: "",
  };

  componentDidMount() {
    const user = this.props.location.state.email;
    console.log(user);

    this.setState({ userData: user });
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card mt-4">
                <div className="card-header bg-dark text-white">
                  Default room
                </div>
                <div className="card-body text-center">
                  <div className="card mt-2">
                    <Link
                      to={`/chatroom?email=${this.state.userData}`}
                      state={this.props.location.state}
                      //   onClick={e => (!name || !room) ? e.preventDefault() : null}
                    >
                      <div className="join">Room</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
