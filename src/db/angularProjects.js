
import firebase from "../config/firebase";

const ANGULAR_COLLECTION = 'angular';

export const createNewAngularProject = async(angular) => {
    const {id, ...restAngular} = angular;
    
    
   const doc =  await firebase
   .firestore()
   .collection(ANGULAR_COLLECTION)
   .add(restAngular);


   const savedDoc = await doc.get()
   return{
       id: doc.id,
       ...savedDoc.data(),
   };
   
   
};

export const getAngularProjects = async () => {
  const snapshots = await firebase
  .firestore()
  .collection(ANGULAR_COLLECTION)
  .get();

  if (snapshots.empty) {
    return [];
  }

  const results = snapshots.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });


  return results;
};

export const getAngularProjectsById = async (id) => {
  const doc = await firebase
  .firestore()
  .collection(ANGULAR_COLLECTION)
  .doc(id)
  .get();


  if (!doc.exists){
    return null;
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
};

export const updateAngularProjectById = async (id, angular) => { 
  await firebase
  .firestore()
  .collection(ANGULAR_COLLECTION)
  .doc(id)
  .update(angular)
}