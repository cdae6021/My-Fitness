import { NavLink } from "react-router-dom"

function NavBar({ user, setUser }) {
    {
        if (user == "") {
            return (
                <div className="navBar">
                </div>
            )
        } else {
            return (
                <div className="navBar">
                    <div>
                        您好,{user}
                    </div >
                    <NavLink className="navBarItem" to="/" onClick={() => setUser('')}>
                        登出
                    </NavLink >
                </div>
            )
        }
    }

}

export default NavBar