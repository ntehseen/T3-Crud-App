import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  //define constants
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [locationToUpdate, setLocationToUpdate] = useState("");
  const [roleToUpdate, setRoleToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  //define functions
  const fetchAllUsers = api.example.getAll.useQuery();
  const fetchOneUser = api.example.getOne.useQuery({ id: userId });

  const createUserMutation = api.example.createUser.useMutation();
  const updateUserMutation = api.example.updateUser.useMutation();
  const deleteUserMutation = api.example.deleteUser.useMutation();

  //define handlers
  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        name: name,
        email: email,
        location: location,
        role: role,
      });
      setName("");
      setEmail("");
      setLocation("");
      setRole("");
      
      await fetchAllUsers.refetch(); // Needed to be await for TypeScript
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
        location: locationToUpdate,
        role: roleToUpdate,
      });
      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      setLocationToUpdate("");
      setRoleToUpdate("");

     await fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({
        id: userIdToDelete,
      });
      setUserIdToDelete("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  // Return JSX with updated UI
  return (
    <div className="container mx-auto p-8">
      <div className="header mb-8">
        <div className="app-icon">
          <img src="t3-logo.png" alt="App Icon" />
        </div>
        <div className="app-info">
          <h1>T3 Crud App</h1>
          <span>Version 0.0.1v</span>
        </div>
      </div>

      <div className="glass-box mb-8">
        <div className="glass-box mb-8">
          <h2 className="mb-4 text-2xl font-bold">Get All Users</h2>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => fetchAllUsers.refetch()}
          >
            Get All Users
          </button>
          <div className="mt-4 overflow-hidden rounded-lg bg-gray-900">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-4 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-green-800 shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-gray-900">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-300"
                          >
                            Id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-300"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-300"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-300"
                          >
                            Location
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-green-300"
                          >
                            Role
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700 bg-gray-800 gap-4 w-full">
                        {fetchAllUsers.data &&
                          fetchAllUsers.data.map((user) => (
                            <tr key={user.id} className="bg-gray-900">
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-300">
                                {user.id}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                {user.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                {user.email}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                {user.location}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                {user.role}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-box mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get A Single User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user id to get"
            value={userId || ""}
            onChange={(e) => setUserId(String(e.target.value))}
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() =>  fetchOneUser.refetch()}
          >
            Get One User
          </button>
        </div>
        {fetchOneUser.data && (
          <div>
            <p>Name: {fetchOneUser.data.name}</p>
            <p>Email: {fetchOneUser.data.email}</p>
          </div>
        )}
      </div>

      <div className="glass-box mb-8">
        <h2 className="mb-4 text-2xl font-bold">Create New User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
                    <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
                    <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={handleCreateUser}
        >
          Create User
        </button>
      </div>

      <div className="glass-box mb-8">
        <h2 className="mb-4 text-2xl font-bold">Update User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Name to update"
            value={nameToUpdate}
            onChange={(e) => setNameToUpdate(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Email to update"
            value={emailToUpdate}
            onChange={(e) => setEmailToUpdate(e.target.value)}
          />
        </div>
        <input
          placeholder="Enter user id to update"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToUpdate}
          onChange={(e) => setUserIdToUpdate(e.target.value)}
        />
                  <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Location to update"
            value={locationToUpdate}
            onChange={(e) => setLocationToUpdate(e.target.value)}
          />
                    <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Role to update"
            value={roleToUpdate}
            onChange={(e) => setRoleToUpdate(e.target.value)}
          />
        <button
          className="mt-2 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
      </div>

      <div className="glass-box mb-8">
        <h2 className="mb-4 text-2xl font-bold">Delete User</h2>
        <input
          placeholder="Enter user id to delete"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToDelete}
          onChange={(e) => setUserIdToDelete(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleDeleteUser}
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
