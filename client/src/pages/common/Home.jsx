const Home = () => {
  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Welcome to LearnSphere 🎓</h2>
      <p className="text-gray-600">
        Start exploring courses or continue learning from where you left off.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Explore Courses</h3>
          <p className="text-sm text-gray-600">
            Browse a wide range of available courses and find what suits your interest.
          </p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">My Courses</h3>
          <p className="text-sm text-gray-600">
            View the courses you're enrolled in and track your learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
