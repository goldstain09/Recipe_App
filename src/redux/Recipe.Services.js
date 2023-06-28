import { db } from "../Firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, } from "firebase/firestore";
import ModalCallback  from "../components/ModalCallback";


export const getAllRecipesFirestore = async () => {
    const docRef = await getDocs(collection(db, 'Recipes'));

    let data = [];
    docRef.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() })
    })
    return data;
}


export const addRecipeFirestore = async (data) => {
    const docRef = await addDoc(collection(db, 'Recipes'), data);
    let idd = docRef.id;
    ModalCallback(idd);

}

export const deleteRecipeFirestore = async(key) => {
    const docRef = await deleteDoc(doc(db,'Recipes',key));
    console.log(docRef.id+'deleteddddd');
}