import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { createNewAngularProject, getAngularProjects } from "../../db/angularProjects";
export const getNewAngularProject = (title, repository, deploy, thumb) => ({
  title,
  repository,
  deploy,
  thumb,
});

const AngularPage = () => {
  const [angularProjects, setAngularProjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAngularProjects().then((response) => {
      setAngularProjects(response);
    });
  }, []);
  console.log(angularProjects);
  console.log(id);

  async function handleAddAngularProject(title, repository, deploy, thumb) {
    const newAngularProject = getNewAngularProject(title, repository, deploy, thumb);
    const createdAngularProject = await createNewAngularProject(newAngularProject);

    setAngularProjects([...angularProjects, createdAngularProject]);
  }

  return (
    <div
      className="angular-page d-flex align-items-center justify-content-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="container-xl">
        <div className="row">
          <div className="col-10 col-lg-6 mx-auto">
            <h2 className="py-5">Angular - Crear un nuevo trabajo:</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const title = e.target[0].value.trim().toLowerCase();
                const repository = e.target[1].value.trim().toLowerCase();
                const deploy = e.target[2].value.trim().toLowerCase();
                const thumb = e.target[3].files[0]; // Get the file from the input file
                const fileType = thumb.type.split("/")[1];
                const angularDirectory = "angularjs";

                const filename = `${angularDirectory}/${id}.${fileType}`;

                console.log(filename);

                // handleAddAngularProject(title, repository, deploy, thumb);
                // alert("Proyecto de Angular Guardado en la Base de Datos");
                // e.target.reset();
              }}
            >
              <div className="mb-3">
                <label for="title" className="form-label">
                  Título del trabajo
                </label>
                <input type="text" className="form-control" id="title" aria-describedby="title" />
              </div>
              <div className="mb-3">
                <label for="repository" className="form-label">
                  Enlace de rrepositorio
                </label>
                <input type="text" className="form-control" id="repository" />
              </div>
              <div className="mb-3">
                <label for="deploy" className="form-label">
                  Enlace de despliegue web:
                </label>
                <input type="text" className="form-control" id="deploy" />
              </div>
              <div className="mb-3">
                <label for="thumb" className="form-label">
                  Foto de perfil
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="thumb"
                  name="file"
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </form>
          </div>
          <div className="col-10 col-lg-6 mx-auto">
            <h2 className="py-5">Listado:</h2>
            {angularProjects.map((project) => {
              return (
                <div className="angular-projects">
                  <div className="card my-4">
                    <div className="card-body">
                      <h4>{project.title}</h4>
                      <NavLink exact to={`/angular/${project.id}`}>
                        <button className="btn-block btn-primary btn w-100">Editar</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AngularPage;
