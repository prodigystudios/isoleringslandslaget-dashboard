import React, { useEffect, useState } from "react";
import { GetDB } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import UserTable from "./getAllUsers";

function Users() {
  const [users, setUsers] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    position: "",
  });
  const [fetchedUsers, setFetchedUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, [users]);

  async function fetchUsers() {
    try {
      const db = GetDB();
      const docRef = collection(db, "Contacts");
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

  function SaveUser() {
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
    try {
      const db = GetDB();
      const docRef = addDoc(collection(db, "Contacts"), users);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div className="flex flex-col ml-24 mr-7 h-screen">
      <h1 className="text-3xl font-bold mt-10 ml-3">Lägg till användare</h1>
      <input
        type="text"
        placeholder="Förnamn"
        className="p-2 m-2 border-2 rounded-lg text-black"
        onChange={(e) => setUsers({ ...users, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Efternamn"
        className="p-2 m-2 border-2 rounded-lg text-black"
        onChange={(e) => setUsers({ ...users, lastName: e.target.value })}
      />
      <input
        type="numeric"
        placeholder="Telefonnumer"
        className="p-2 m-2 border-2 rounded-lg text-black"
        onChange={(e) => setUsers({ ...users, phoneNumber: e.target.value })}
      />
      <input
        type="text"
        placeholder="email"
        className="p-2 m-2 border-2 rounded-lg text-black"
        onChange={(e) => setUsers({ ...users, email: e.target.value })}
      />
      <div className="p-2 ml-1">
        <select
          className="text-center h-8 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setUsers({ ...users, position: e.target.value })}
        >
          <option value="installatör">installatör</option>
          <option value="ledning">Ledning</option>
          <option value="säljare">Säljare</option>
        </select>
      </div>
      <button className="self-center p-2 w-1/4 mt-10 bg-slate-500 border-1 rounded-lg hover:bg-green-300" onClick={SaveUser}>
        spara
      </button>

      {/* load user table */}
      <UserTable users={fetchedUsers} />
    </div>
  );
}

export default Users;
