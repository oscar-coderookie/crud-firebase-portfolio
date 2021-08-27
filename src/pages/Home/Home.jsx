import logo from "../../img/logo.png";

const Home = () => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column" style={{ height: "94vh" }}>
      <img src={logo} alt="logo-oscar" style={{ width: 400 }} />
      <h4 className="pt-4">Panel de Administración de proyectos Full Stack</h4>
    </div>
  );
};

export default Home;
