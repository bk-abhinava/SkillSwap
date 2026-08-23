import { useEffect, useState } from "react";
import {
  getRequests,
  updateRequestStatus,
} from "../services/requestService";

function SwapRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await getRequests();

        setRequests(data.requests);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await updateRequestStatus(requestId, status);

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status,
              }
            : request
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const incomingRequests = requests.filter(
    (request) =>
      request.receiver?._id === currentUser?.id
  );

  const outgoingRequests = requests.filter(
    (request) =>
      request.sender?._id === currentUser?.id
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading requests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold">
          Swap Requests
        </h1>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* INCOMING */}

        <section className="mt-10">

          <h2 className="text-xl font-semibold">
            Incoming Requests
          </h2>

          {incomingRequests.length === 0 ? (
            <p className="text-gray-500 mt-4">
              No incoming requests.
            </p>
          ) : (
            <div className="space-y-4 mt-4">

              {incomingRequests.map((request) => (

                <div
                  key={request._id}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >

                  <h3 className="text-lg font-semibold">
                    {request.sender?.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {request.sender?.email}
                  </p>

                  <p className="text-gray-600 mt-4">
                    {request.sender?.bio ||
                      "No bio available."}
                  </p>

                  <div className="mt-4">

                    <p className="text-sm font-semibold">
                      Can teach
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {request.sender?.skillsHave?.map(
                        (skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                  <div className="mt-4">

                    <p className="text-sm font-semibold">
                      Wants to learn
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {request.sender?.skillsWant?.map(
                        (skill, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                  {request.status === "pending" ? (
                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            request._id,
                            "accepted"
                          )
                        }
                        className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            request._id,
                            "rejected"
                          )
                        }
                        className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700"
                      >
                        Reject
                      </button>

                    </div>
                  ) : (
                    <p className="mt-6 text-sm font-medium">
                      Status: {request.status}
                    </p>
                  )}

                </div>

              ))}

            </div>
          )}

        </section>

        {/* OUTGOING */}

        <section className="mt-12">

          <h2 className="text-xl font-semibold">
            Sent Requests
          </h2>

          {outgoingRequests.length === 0 ? (
            <p className="text-gray-500 mt-4">
              No sent requests.
            </p>
          ) : (
            <div className="space-y-4 mt-4">

              {outgoingRequests.map((request) => (

                <div
                  key={request._id}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >

                  <h3 className="text-lg font-semibold">
                    {request.receiver?.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {request.receiver?.email}
                  </p>

                  <p className="mt-4">
                    Status:
                    <span className="font-semibold ml-2">
                      {request.status}
                    </span>
                  </p>

                </div>

              ))}

            </div>
          )}

        </section>

      </div>

    </div>
  );
}

export default SwapRequests;