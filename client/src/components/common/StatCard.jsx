const StatCard = ({ title, value, description, gradient }) => {
  return (
    <div className={`p-4 rounded-lg shadow text-white bg-gradient-to-r ${gradient}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );
};

export default StatCard;
