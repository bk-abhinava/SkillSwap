import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { sendSwapRequest } from "../services/requestService";

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestStatus, setRequestStatus] = useState({});

const handleRequestSwap = async (receiverId) => {
  try {
    setRequestStatus({
      ...requestStatus,
      [receiverId]: "sending",
    });

    await sendSwapRequest(receiverId);

    setRequestStatus({
      ...requestStatus,
      [receiverId]: "sent",
    });

  } catch (error) {
    setRequestStatus({
      ...requestStatus,
      [receiverId]: error.message,
    });
  }
};

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();

        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading users...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold">
          Browse Users
        </h1>

        <p className="text-gray-500 mt-2">
          Find people to learn from and share your skills with.
        </p>

        {users.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 mt-8 text-center">
            <p className="text-gray-500">
              No other users found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

            {users.map((user) => (

              <div
                key={user._id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >

                <h2 className="text-xl font-semibold">
                  {user.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {user.email}
                </p>

                <p className="text-gray-600 mt-4">
                  {user.bio || "No bio added yet."}
                </p>

                <div className="mt-5">

                  <h3 className="text-sm font-semibold">
                    Can teach
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2">

                    {user.skillsHave?.length > 0 ? (
                      user.skillsHave.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">
                        No skills listed
                      </span>
                    )}

                  </div>

                </div>

                <div className="mt-5">

                  <h3 className="text-sm font-semibold">
                    Wants to learn
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2">

                    {user.skillsWant?.length > 0 ? (
                      user.skillsWant.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">
                        No skills listed
                      </span>
                    )}

                  </div>

                </div>

               <button
  onClick={() => handleRequestSwap(user._id)}
  disabled={requestStatus[user._id] === "sending"}
  className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
>
  {requestStatus[user._id] === "sending"
    ? "Sending..."
    : requestStatus[user._id] === "sent"
    ? "Request Sent"
    : requestStatus[user._id] &&
      requestStatus[user._id] !== "sending"
    ? requestStatus[user._id]
    : "Request Swap"}
</button>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default BrowseUsers;