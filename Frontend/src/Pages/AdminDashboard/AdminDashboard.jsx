const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#FCEFE3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3E2C25] text-white p-5">
        <h1 className="text-3xl font-bold mb-8">Admin</h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 cursor-pointer">
              <span>📌</span> <span>Seller</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer">
              <span>🎓</span> <span>Tutor online</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer">
              <span>🔔</span> <span>Active subscription</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer">
              <span>💰</span> <span>Earning/Spending</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Hello, John 👋</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border rounded-lg"
            />
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total Sales</span>
                <span>↗</span>
              </div>
              <p className="text-xl font-bold">$560K</p>
            </div>
          ))}
        </div>

        {/* Table Controls */}
        <div className="flex justify-between items-center mb-4">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Filters</button>
          <button className="px-4 py-2 bg-[#3E2C25] text-white rounded-md">
            + Add User
          </button>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Learners</th>
                <th className="p-3">Language</th>
                <th className="p-3">Occupation</th>
                <th className="p-3">Objective</th>
                <th className="p-3">Subscription</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 flex items-center space-x-3">
                    <input type="checkbox" />
                    <img
                      src="https://randomuser.me/api/portraits/men/2.jpg"
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">John Doe 🇮🇳</p>
                      <p className="text-sm text-gray-500">
                        john.doe@gmail.com
                      </p>
                    </div>
                  </td>
                  <td className="p-3">English</td>
                  <td className="p-3">Freelance</td>
                  <td className="p-3">Fluent</td>
                  <td className="p-3">
                    {index === 0 ? "Free Trial" : "Monthly"}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button className="text-red-500">🗑</button>
                    <button className="text-blue-500">✏</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Previous</button>
          <p>Page 1 of 10</p>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Next</button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
