// Simple Card component defined locally
function Card({
  children,
  className = "",
  active = false,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`transition-all duration-200 rounded-2xl shadow-md border-0 p-6 cursor-pointer 
        ${
          active
            ? "bg-gradient-to-r from-[#6B21A8] to-[#D63384] text-white"
            : "bg-white hover:bg-[#F3E8FF] text-[#6B21A8]"
        } 
        ${className}`}
    >
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3E8FF] via-white to-[#E0E7FF] py-10 px-4 md:px-12">
      <h1 className="text-4xl font-extrabold text-[#6B21A8] mb-10 text-center drop-shadow-sm tracking-tight">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card active>
          <h3 className="font-semibold text-lg mb-2">Total Events</h3>
          <p className="text-4xl font-extrabold">24</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg mb-2">Total Results</h3>
          <p className="text-4xl font-extrabold">156</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg mb-2">Total Downloads</h3>
          <p className="text-4xl font-extrabold">42</p>
        </Card>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[#6B21A8] mb-4">
            Recent Activity
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow border-0">
            <p className="text-gray-500">No recent activity</p>
          </div>
        </section>
      </div>
    </div>
  );
}
