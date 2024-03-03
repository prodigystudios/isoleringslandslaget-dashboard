import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH } from "./firebase";
import UserTable from "./getAllUsers";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const ScrollToTop = () => {
  const isBrowers = () => typeof window !== "undefined";

  if (!isBrowers()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function Users() {
  const auth = FIREBASE_AUTH;
  const [users, setUsers] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    position: "",
    hasAccount: false,
  });
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [userEditMode, setUserEditMode] = useState(false);
  const [userChanged, setUserChanged] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, [userChanged]);

  async function fetchUsers() {
    try {
      const docRef = collection(FIRESTORE_DB, "Contacts");
      const q = query(docRef, orderBy("position", "asc"));
      const docSnapshot = await getDocs(q);
      const tempUsers = [];
      docSnapshot.forEach((user) => {
        tempUsers.push({
          id: user.id,
          ...user.data(),
        });
      });
      setFetchedUsers(tempUsers);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  async function SaveUser() {
    if (
      users.firstName === "" ||
      users.lastName === "" ||
      users.phoneNumber === "" ||
      users.email === "" ||
      users.position === ""
    ) {
      alert("Alla fält måste vara ifyllda");
      return;
    }
    if (userEditMode) {
      try {
        console.log(users.id);
        const userRef = doc(FIRESTORE_DB, "Contacts", users.id);
        await setDoc(userRef, users);
        setUserEditMode(false);
        alert("Användare uppdaterad");
        setUserChanged(userChanged + 1);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      return;
    }
    try {
      console.log("we are calling this aswell");
      const docRef = await addDoc(collection(FIRESTORE_DB, "Contacts"), users);
      alert("Användare tillagd");
      setUserChanged(userChanged + 1);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function EditUser(userId) {
    ScrollToTop();
    try {
      const userEdit = fetchedUsers.find((user) => user.id === userId);
      if (userEdit != undefined) {
        setUserEditMode(true);
      }
      setUsers(userEdit);
    } catch (e) {
      console.error("Error editing document: ", e);
    }
  }
  async function RemoveUser(userId) {
    try {
      await deleteDoc(doc(FIRESTORE_DB, "Contacts", userId));
      alert("Användare borttagen");
      setUserChanged(userChanged + 1);
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }
  const CreateAccountForApp = async (userId) => {
    //add some form up edit function for database to update the hasAccount field
    const userToCreate = fetchedUsers.find((user) => user.id === userId);
    try {
       await createUserWithEmailAndPassword(auth, userToCreate.email, "Isol2024").then(
        (userCredential) => {
          alert("Användare skapad");
          const user = userCredential.user;
           updateProfile(
            user,
            {
              displayName: userToCreate.firstName + " " + userToCreate.lastName,
              phoneNumber: userToCreate.phoneNumber,
            }
          );
        }
      )
      const userRef = doc(FIRESTORE_DB, "Contacts",userToCreate.id);
      await updateDoc(userRef, { hasAccount: true });
      setUserChanged(userChanged + 1);

    } catch (e) {
      console.error("Error creating user: ", e);
    }
  };
  return (
    <div id="top-section" className="flex flex-col ml-24 mr-7 h-screen">
      <h1 className="text-3xl font-bold mt-10 ml-3">Lägg till användare</h1>
      <input
        value={users.firstName}
        type="text"
        placeholder="Förnamn"
        className="p-2 m-2 border-2 rounded-lg text-black"
        onChange={(e) => setUsers({ ...users, firstName: e.target.value })}
      />
      <input
        type="text"
        value={users.lastName}
        placeholder="Efternamn"
        className="p-2 m-2 border-2 rounded-lg text-black"
        onChange={(e) => setUsers({ ...users, lastName: e.target.value })}
      />
      <input
        value={users.phoneNumber}
        type="numeric"
        placeholder="Telefonnumer"
        className="p-2 m-2 border-2 rounded-lg text-black"
        onChange={(e) => setUsers({ ...users, phoneNumber: e.target.value })}
      />
      <input
        value={users.email}
        type="text"
        placeholder="email"
        className="p-2 m-2 border-2 rounded-lg text-black"
        onChange={(e) => setUsers({ ...users, email: e.target.value })}
      />
      <div className="p-2 ml-1">
        <select
          value={users.position}
          className="text-center h-8 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setUsers({ ...users, position: e.target.value })}
        >
          <option value="installatör">Installatör</option>
          <option value="ledning">Ledning</option>
          <option value="säljare">Säljare</option>
        </select>
      </div>
      {userEditMode ? (
        <button
          className="self-center p-2 w-1/4 mt-10 bg-slate-500 border-1 rounded-lg hover:bg-green-300"
          onClick={SaveUser}
        >
          Uppdatera kontakt
        </button>
      ) : (
        <button
          className="self-center p-2 w-1/4 mt-10 bg-slate-500 border-1 rounded-lg hover:bg-green-300"
          onClick={SaveUser}
        >
          Skapa kontakt
        </button>
      )}
      <UserTable
        users={fetchedUsers}
        RemoveUser={RemoveUser}
        EditUser={EditUser}
        CreateAccountForApp={CreateAccountForApp}
      />
    </div>
  );
}

export default Users;
