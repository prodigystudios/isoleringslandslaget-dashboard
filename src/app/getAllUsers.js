import Image from "next/image";
const UserTable = (props) => {
  const users = props.users;

  const EditUser = (userId) => {
    props.EditUser(userId);
  };
  const RemoveUser = (userId) => {
    props.RemoveUser(userId);
  };
  const CreateAccountForApp = (userId) => {
    props.CreateAccountForApp(userId);
  };
  const ActiveAccount = (userId) => {
    alert("Kontot är redan aktiverat");
  }
  // Generate the table
  const table = (
    <table className="shadow-lg bg-white w-screen mt-20 mr-28">
      <thead>
        <tr>
          <th className="bg-blue-100 border text-left px-4 py-4">Förnamn</th>
          <th className="bg-blue-100 border text-left px-4 py-4">Efternamn</th>
          <th className="bg-blue-100 border text-left px-4 py-4">
            Telefon nummer
          </th>
          <th className="bg-blue-100 border text-left px-4 py-4">Email</th>
          <th className="bg-blue-100 border text-left px-4 py-4">
            Anställning
          </th>
          <th className="bg-blue-100 border px-4 py-4">
            <div className="flex justify-center min-h-8 min-w-8">
              <Image
                src={"/icons/edit-icon.png"}
                width={32}
                height={32}
                alt="edit-icon"
              />
            </div>
          </th>
          <th className="bg-blue-100 border px-4 py-4 text-center">
            <div className="flex justify-center min-h-8 min-w-8">
              <Image
                src={"/icons/remove-icon.png"}
                width={32}
                height={32}
                alt="remove-icon"
              />
            </div>
          </th>
          <th className="bg-blue-100 border text-left px-4 py-4">
            Lägg till konto
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td className="border px-4 py-4">{user.firstName}</td>
            <td className="border px-4 py-4">{user.lastName}</td>
            <td className="border px-4 py-4">{user.phoneNumber}</td>
            <td className="border px-4 py-4">{user.email}</td>
            <td className="border px-4 py-4">{user.position}</td>
            <td className="border px-4 py-4 text-center">
              <button onClick={() => EditUser(user.id)}>
                <Image
                  className="cursor-pointer"
                  src={"/icons/edit-icon.png"}
                  width={32}
                  height={32}
                  alt="Edit icon"
                />
              </button>
            </td>
            <td className="border px-4 py-4 text-center">
              <button onClick={() => RemoveUser(user.id)}>
                <Image
                  className="cursor-pointer"
                  src={"/icons/remove-icon.png"}
                  width={32}
                  height={32}
                  alt="Remove icon"
                />
              </button>
            </td>
            <td className="border px-4 py-4">
              {user.hasAccount ? (
                <button
                  onClick={() => ActiveAccount(user.id)}
                  className="border px-4 py-4 rounded-md bg-lime-400 hover:bg-lime-500"
                >
                  Aktiv
                </button>
              ) : (
                <button
                  onClick={() => CreateAccountForApp(user.id)}
                  className="border px-4 py-4 rounded-md bg-slate-400 hover:bg-lime-500"
                >
                  Aktivera
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <div>{table}</div>;
};

export default UserTable;
