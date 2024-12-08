import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  addUser,
  deleteUser,
  editUser,
} from "../../redux/slices/users/userSlice";

const tableHeads = ["ID", "Username", "Email", "Actions"];

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.user);

  const showModal = () => {
    withReactContent(Swal)
      .fire({
        title: "Add New User",
        html: `
          <input type="text" id="swal-username" class="swal2-input" placeholder="Username">
          <input type="email" id="swal-email" class="swal2-input" placeholder="Email">
        `,
        focusConfirm: true,
        showCancelButton: true,
        confirmButtonText: "Add User",
        preConfirm: () => {
          const username = (
            document.getElementById("swal-username") as HTMLInputElement
          ).value;
          const email = (
            document.getElementById("swal-email") as HTMLInputElement
          ).value;

          if (!username || !email) {
            Swal.showValidationMessage("Please enter both username and email");
          }

          return { username, email };
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleAddUser(result.value.username, result.value.email);
        }
      });
  };
  const showEditModal = () => {
    withReactContent(Swal)
      .fire({
        title: "Add New User",
        html: `
          <input type="text" id="swal-username" class="swal2-input" placeholder="Username">
          <input type="email" id="swal-email" class="swal2-input" placeholder="Email">
        `,
        focusConfirm: true,
        showCancelButton: true,
        confirmButtonText: "Add User",
        preConfirm: () => {
          const username = (
            document.getElementById("swal-username") as HTMLInputElement
          ).value;
          const email = (
            document.getElementById("swal-email") as HTMLInputElement
          ).value;

          if (!username || !email) {
            Swal.showValidationMessage("Please enter both username and email");
          }

          return { username, email };
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleAddUser(result.value.username, result.value.email);
        }
      });
  };

  const handleAddUser = (newUsername: string, newEmail: string) => {
    if (newUsername && newEmail) {
      const newUser = {
        id: Date.now(),
        username: newUsername,
        email: newEmail,
      };
      dispatch(addUser(newUser));
    }
  };

  const handleEditUser = (id: number) => {
    Swal.fire({
      title: "Edit User",
      html: `
        <input type="text" id="swal-edit-username" class="swal2-input" placeholder="New Username">
        <input type="email" id="swal-edit-email" class="swal2-input" placeholder="New Email">
      `,
      showCancelButton: true,
      confirmButtonText: "Update User",
      preConfirm: () => {
        const updatedUsername = (
          document.getElementById("swal-edit-username") as HTMLInputElement
        ).value;
        const updatedEmail = (
          document.getElementById("swal-edit-email") as HTMLInputElement
        ).value;

        if (!updatedUsername || !updatedEmail) {
          Swal.showValidationMessage("Please enter both username and email");
        }

        return { updatedUsername, updatedEmail };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          editUser({
            id,
            username: result.value.updatedUsername,
            email: result.value.updatedEmail,
          })
        );
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      <div className="mb-6">
        <button
          onClick={showModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New User
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {tableHeads.map((head) => (
              <th key={head} className="border p-2">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">{user.id}</td>
              <td className="border p-2 text-center">{user.username}</td>
              <td className="border p-2 text-center">{user.email}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteUser(user.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
