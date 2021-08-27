import { NavLink, withRouter } from "react-router-dom";

const Header = () => {

  return (
    <div className="header w-100 d-flex align-items-center" style={{height: "6vh", backgroundColor: "#F2F2F2"}}>
      
        <div className="container-xl mx-auto d-flex justify-content-center align-items-center">
          <nav className="nav mx-auto
          ">
            <NavLink className="nav-link" exact to="/" style={{color:'black'}} >
                <p className="p-0 m-0">Home</p>
            </NavLink>
            <NavLink className="nav-link" exact to="/angular" style={{color:'black'}} >
                <p className="p-0 m-0">Angular</p>
            </NavLink>
            <NavLink className="nav-link" exact to="/react" style={{color:'black'}} >
                <p className="p-0 m-0">React</p>
            </NavLink>
            <NavLink className="nav-link" exact to="/nodejs" style={{color:'black'}} >
                <p className="p-0 m-0">Nodejs</p>
            </NavLink>
            
          </nav>
        </div>
      
    </div>
  );
};

export default withRouter(Header);
