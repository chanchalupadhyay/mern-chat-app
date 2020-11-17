import ApiHelper from "./ApiHelper";
import { Redirect, useHistory } from "react-router-dom";


function Logout() {

    const history = useHistory();

    const logOut = async () => {
        let data = await ApiHelper.userLogOut();
        alert("Logout Successfully");
        return history.push("/login");
    }

    logOut();

    return (
        <div></div>
    )

}

export default Logout;