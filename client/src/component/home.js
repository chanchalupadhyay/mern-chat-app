import React from "react";
import ApiHelper from "./ApiHelper";

class Home extends React.Component {
  componentDidMount() {
    const self = async () => {
      const user = await ApiHelper.checkRefreshToken();
      console.log(user);
      if (!user.accesstoken) return this.props.history.push("/login");
      return this.props.history.push({
        pathname: "/dashboard",
        state: user,
      });
    };
    self();
  }

  render() {
    return <h2>Loading</h2>;
  }
}

export default Home;
