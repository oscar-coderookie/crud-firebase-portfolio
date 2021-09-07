import { NavLink, withRouter } from "react-router-dom";

const Header = ({ hasUser, onLogout }) => {
  return (
    <div
      className="header w-100 d-flex align-items-center"
      style={{ height: "6vh", backgroundColor: "#F2F2F2", boxShadow: 4 }}
    >
      <div className="container-xl mx-auto d-flex justify-content-center align-items-center">
        <nav
          className="nav mx-auto
          "
        >
          <NavLink className="nav-link" exact to="/" style={{ color: "black" }}>
            <p className="p-0 m-0" style={{ fontWeight: 400 }}>
              Home
            </p>
          </NavLink>
          <NavLink className="nav-link" exact to="/angular" style={{ color: "black" }}>
            <p className="p-0 m-0" style={{ fontWeight: 400 }}>
              Angular
            </p>
          </NavLink>
          <NavLink className="nav-link" exact to="/react" style={{ color: "black" }}>
            <p className="p-0 m-0" style={{ fontWeight: 400 }}>
              React
            </p>
          </NavLink>
          <NavLink className="nav-link" exact to="/nodejs" style={{ color: "black" }}>
            <p className="p-0 m-0" style={{ fontWeight: 400 }}>
              Nodejs
            </p>
          </NavLink>
          <NavLink className="nav-link" exact to="/html" style={{ color: "black" }}>
            <p className="p-0 m-0" style={{ fontWeight: 400 }}>
              Html
            </p>
          </NavLink>
          {hasUser ? (
            <button className="header-block__logout btn btn-default mx-3" onClick={onLogout}>
              <span className="fas fa-sign-out-alt mx-2"></span>
              Logout
            </button>
          ) : null}
        </nav>
      </div>
    </div>
  );
};

export default withRouter(Header);
