import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { updateProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
function Profile() {
  const { updateUser } = useAuth();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skillsHave: "",
    skillsWant: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data.user);

        setFormData({
          name: data.user.name || "",
          bio: data.user.bio || "",
          skillsHave: data.user.skillsHave?.join(", ") || "",
          skillsWant: data.user.skillsWant?.join(", ") || "",
        });

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const profileData = {
      name: formData.name.trim(),
      bio: formData.bio.trim(),

      skillsHave: formData.skillsHave
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),

      skillsWant: formData.skillsWant
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    };

    try {
      const data = await updateProfile(profileData);

      setUser(data.user);

      setFormData({
        name: data.user.name || "",
        bio: data.user.bio || "",
        skillsHave: data.user.skillsHave?.join(", ") || "",
        skillsWant: data.user.skillsWant?.join(", ") || "",
      });
       // Keep localStorage user information updated
     updateUser(data.user);

      setSuccess("Profile updated successfully");

     

    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Unable to load profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-3xl mx-auto px-6 py-12">

        <div className="bg-white border border-gray-200 rounded-2xl p-8">

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Tell other users what you can teach and what you want to learn.
          </p>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8">

            {/* NAME */}

            <div className="mb-6">

              <label className="block text-sm font-medium mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* EMAIL */}

            <div className="mb-6">

              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border border-gray-200 bg-gray-100 text-gray-500 rounded-lg px-4 py-3"
              />

              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed.
              </p>

            </div>

            {/* BIO */}

            <div className="mb-6">

              <label className="block text-sm font-medium mb-2">
                Bio
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell others a little about yourself..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* SKILLS I HAVE */}

            <div className="mb-6">

              <label className="block text-sm font-medium mb-2">
                Skills I can teach
              </label>

              <input
                type="text"
                name="skillsHave"
                value={formData.skillsHave}
                onChange={handleChange}
                placeholder="C++, React, Python"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs text-gray-500 mt-1">
                Separate skills using commas.
              </p>

            </div>

            {/* SKILLS I WANT */}

            <div className="mb-8">

              <label className="block text-sm font-medium mb-2">
                Skills I want to learn
              </label>

              <input
                type="text"
                name="skillsWant"
                value={formData.skillsWant}
                onChange={handleChange}
                placeholder="Node.js, AWS, Machine Learning"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs text-gray-500 mt-1">
                Separate skills using commas.
              </p>

            </div>

            {/* SAVE */}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;