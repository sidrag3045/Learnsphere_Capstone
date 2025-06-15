import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <p className="text-gray-600">Loading profile...</p>;
  }

  return (
    <div className="text-gray-800 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Full Name</label>
          <p className="text-lg font-medium">{user.fullName}</p> {/* ✅ fixed */}
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Email</label>
          <p className="text-lg font-medium">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Role</label>
          <p className="text-lg font-medium capitalize">{user.role}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Joined On</label>
          <p className="text-lg font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
