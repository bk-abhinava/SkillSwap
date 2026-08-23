import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const skillsHave = user?.skillsHave || [];
  const skillsWant = user?.skillsWant || [];

  return (
    <div className="min-h-screen bg-gray-50">

   

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* WELCOME SECTION */}

        <section>
          <p className="text-blue-600 font-medium">
            Welcome back
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Hi, {user?.name} 👋
          </h1>

          <p className="text-gray-600 mt-3">
            Learn something new. Share what you know.
          </p>
        </section>


        {/* QUICK ACTIONS */}

        <section className="grid md:grid-cols-3 gap-6 mt-10">

          <button
            onClick={() => navigate("/browse")}
            className="bg-blue-600 text-white rounded-xl p-6 text-left hover:bg-blue-700 transition"
          >
            <h2 className="text-xl font-semibold">
              Find People
            </h2>

            <p className="mt-2 text-blue-100">
              Browse users and find someone who can teach you.
            </p>

            <span className="inline-block mt-5 font-semibold">
              Browse Users →
            </span>
          </button>


          <button
            onClick={() => navigate("/requests")}
            className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">
              Swap Requests
            </h2>

            <p className="text-gray-500 mt-2">
              Check your incoming and sent skill exchange requests.
            </p>

            <span className="inline-block mt-5 text-blue-600 font-semibold">
              View Requests →
            </span>
          </button>


          <button
            onClick={() => navigate("/profile")}
            className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">
              Edit Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Update your skills and tell others what you want to learn.
            </p>

            <span className="inline-block mt-5 text-blue-600 font-semibold">
              Update Profile →
            </span>
          </button>

        </section>


        {/* PROFILE SUMMARY */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold">
            Your Skills
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-5">

            {/* SKILLS I CAN TEACH */}

            <div className="bg-white border border-gray-200 rounded-xl p-6">

              <h3 className="text-lg font-semibold">
                Skills I can teach
              </h3>

              {skillsHave.length > 0 ? (

                <div className="flex flex-wrap gap-2 mt-4">

                  {skillsHave.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              ) : (

                <div className="mt-4">

                  <p className="text-gray-500">
                    You haven't added any teaching skills yet.
                  </p>

                  <button
                    onClick={() => navigate("/profile")}
                    className="text-blue-600 font-medium mt-3"
                  >
                    Add skills →
                  </button>

                </div>

              )}

            </div>


            {/* SKILLS I WANT */}

            <div className="bg-white border border-gray-200 rounded-xl p-6">

              <h3 className="text-lg font-semibold">
                Skills I want to learn
              </h3>

              {skillsWant.length > 0 ? (

                <div className="flex flex-wrap gap-2 mt-4">

                  {skillsWant.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              ) : (

                <div className="mt-4">

                  <p className="text-gray-500">
                    You haven't added any learning goals yet.
                  </p>

                  <button
                    onClick={() => navigate("/profile")}
                    className="text-blue-600 font-medium mt-3"
                  >
                    Add learning goals →
                  </button>

                </div>

              )}

            </div>

          </div>

        </section>


        {/* GET STARTED */}

        <section className="mt-10 bg-white border border-gray-200 rounded-xl p-8">

          <h2 className="text-2xl font-bold">
            Ready to swap skills?
          </h2>

          <p className="text-gray-600 mt-2">
            Find someone who has the skill you want to learn and
            send them a swap request.
          </p>

          <button
            onClick={() => navigate("/browse")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Users
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;