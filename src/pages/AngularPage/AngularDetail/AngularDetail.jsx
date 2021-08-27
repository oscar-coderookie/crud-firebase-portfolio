import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import { getAngularProjectsById, updateAngularProjectById } from "../../../db/angularProjects";

export const addOrEditLink = async (linkObject) => {
  await db.collection("angular").doc().set(linkObject);
};

const AngularDetail = () => {
  const [angularDetail, setAngularDetail] = useState({});
  const [currentId, setCurrentId] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
    console.log(e);
  };

  const { id } = useParams();

  useEffect(() => {
    getAngularProjectsById(id).then((detail) => {
      setAngularDetail(detail);
    });
  }, [id]);

//   handleInputChange = (e) => {
//     e.preventDefault();
//   };

  return (
    <div className="angular-detail container-xl">
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <button type="submit" className="btn btn-block btn-secondary">
            Guardar
        </button>
      </form>
    </div>
  );
};

export default AngularDetail;
