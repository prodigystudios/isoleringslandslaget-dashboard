import React from 'react';
const UserTable = (props) => {
    const users = props.users;
      

    // Generate the table
    const table = (
        <table className='shadow-lg bg-white w-screen mt-20'>
            <thead>
                <tr>
                    <th className='bg-blue-100 border text-left px-8 py-4'>Förnamn</th>
                    <th className='bg-blue-100 border text-left px-8 py-4'>Efternamn</th>
                    <th className='bg-blue-100 border text-left px-8 py-4'>Telefon nummer</th>
                    <th className='bg-blue-100 border text-left px-8 py-4'>Email</th>
                    <th className='bg-blue-100 border text-left px-8 py-4'>Anställning</th>
                </tr>
            </thead>
            <tbody className='table-auto'>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td className='border px-8 py-4'>{user.firstName}</td>
                        <td className='border px-8 py-4'>{user.lastName}</td>
                        <td className='border px-8 py-4'>{user.phoneNumber}</td>
                        <td className='border px-8 py-4'>{user.email}</td>
                        <td className='border px-8 py-4'>{user.position}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return <div>{table}</div>;
};

export default UserTable;
