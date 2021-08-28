import { NavLink } from "react-router-dom";

const MobileHeader = () => {
  return (
    <div className="header d-flex align-items-center justify-content-center" style={{height: '10vh', padding: 10}}>
      <div className="container-xl">
      
        <div className="row">
        <div className="col-3 col-lg-2 mx-auto">
            <NavLink exact to="/">
              <span style={{fontSize:30, color: 'gray'}} className="fas fa-home"></span>
            </NavLink>
          </div>
          <div className="col-3 col-lg-2 mx-auto">
            <NavLink exact to="/react">
              <span style={{fontSize:30, color: 'gray'}} className="fab fa-react"></span>
            </NavLink>
          </div>
          <div className="col-3 col-lg-2 mx-auto">
            <NavLink exact to="/angular">
              <span style={{fontSize:30,color: 'gray'}} className="fab fa-angular"></span>
            </NavLink>
          </div>
          <div className="col-3 col-lg-2 mx-auto">
            <NavLink exact to="/nodejs">
              <span style={{fontSize:30, color: 'gray'}} className="fab fa-node"></span>
            </NavLink>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
