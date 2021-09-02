import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from "../../config/firebase";

const db = firebase.firestore();

export const addOrEditLink = async (linkObject) => {
  await db.collection("angular").doc().set(linkObject);
};

const AngularDetail = () => {

  const INITIAL_STATE = {
    title: "",
    repository: "",
    deploy: "",
    timestamp: ""
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [angularProjects, setAngularProjects] = useState([]);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    getAngularProjects();
  }, []);

  const getAngularProjectById = async (id) => {
    try {
      const doc = await firebase.firestore().collection("angular").doc(id).get();
      setValues({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentId === "") {
      setValues({ ...INITIAL_STATE });
    } else {
      getAngularProjectById(currentId);
    }
  }, [currentId]);

  const addOrEdit = async (item) => {
    try {
      if (currentId === "") {
        await firebase.firestore().collection("angular").doc().set(item);
        toast("Proyecto Agregado correctamente", {
          type: "success",
          autoClose: 2000,
        });
      } else {
        await firebase.firestore().collection("angular").doc(currentId).update(item);
        toast("Proyecto actualizado correctamente", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
        setValues(INITIAL_STATE);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // function for get all projects in array:
  const getAngularProjects = async () => {
    try {
      firebase
        .firestore()
        .collection("angular")
        .onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id, timestamp: firebase.firestore.Timestamp.fromDate(new Date("December 16, 2008")) });
          });
          setAngularProjects(docs);
        });
    } catch (error) {
      console.error(error);
    }
  };
  // function to delete project:
  const deleteAngularProject = async (id) => {
    try {
      if (window.confirm("estás seguro de eliminar el proyecto?")) {
        await firebase.firestore().collection("angular").doc(id).delete();
        toast("Proyecto eliminado de la base de datos..", {
          type: "warning",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // function for listen inputs: '',
  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // function for send data to firebase:
  const handleSubmit = (e) => {
    e.preventDefault();

    addOrEdit(values);
    setValues({ ...INITIAL_STATE });
  };

  return (
    <div style={{ height: "100vh" }} className="angular-page d-flex align-items-start justify-content-center pt-5">
      <div className="container-xl">
      <h1>Proyectos de Angular</h1>
        <div className="row">
          <div className="col-11 col-md-6 mx-auto">
            <div className="card p-0">
              <div className="card-body">
                <div className="card-header bg-transparent py-2">
                  <h4 className="py-2">Formulario creación/edición</h4>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-group py-2 ">
                    <input
                      type="text"
                      name="title"
                      className="form-control mt-3"
                      placeholder="nombre del proyecto"
                      onChange={handleInputchange}
                      value={values.title}
                      required={true}
                    />
                  </div>
                  <div className="form-group py-2">
                    <input
                      type="text"
                      name="repository"
                      className="form-control"
                      placeholder="url repositorio"
                      onChange={handleInputchange}
                      value={values.repository}
                      required={true}
                    />
                  </div>
                  <div className="form-group py-2">
                    <input
                      type="text"
                      name="deploy"
                      className="form-control"
                      placeholder="url despliegue web"
                      onChange={handleInputchange}
                      value={values.deploy}
                      required={true}
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary w-100 my-2">
                    {currentId === "" ? "Guardar Nuevo Proyecto" : "Actualizar Proyecto"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-11 col-md-6 mx-auto">
            <h2 className="py-3">Listado:</h2>
            {angularProjects.map((project) => {
              return (
                <div className="card my-2" key={project.id}>
                  <div className="card-body">
                    <p className="p-0 m-0">{project.title}</p>
                  </div>
                  <div className="card-footer">
                    <span
                      className="fas fa-edit"
                      style={{ fontSize: 20, padding: 6, marginRight: 10, cursor: "pointer" }}
                      onClick={() => setCurrentId(project.id)}
                    >
                      Editar
                    </span>
                    <span
                      style={{ fontSize: 20, padding: 6, marginRight: 10, cursor: "pointer" }}
                      className="far fa-trash-alt"
                      onClick={() => deleteAngularProject(project.id)}
                    >
                      Eliminar
                    </span>
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

export default AngularDetail;
