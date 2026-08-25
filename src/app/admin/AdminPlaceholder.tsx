import { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Download, MoreHorizontal, Eye, Filter, Plus } from "lucide-react";

const DUMMY_DATA: Record<string, any> = {
  bookings: {
    title: "Bookings",
    columns: ["Booking ID", "Guest Name", "Dates", "Room", "Status", "Amount"],
    rows: [
      { col1: "LP-101", col2: "Rajesh Kumar", col3: "Aug 20 - Aug 22", col4: "Deluxe King", col5: "Confirmed", col6: "₹4,500" },
      { col1: "LP-102", col2: "Anita Desai", col3: "Aug 21 - Aug 24", col4: "Twin Special", col5: "Checked In", col6: "₹10,500" },
      { col1: "LP-103", col2: "John Smith", col3: "Aug 25 - Aug 28", col4: "Suite", col5: "Pending", col6: "₹19,500" },
      { col1: "LP-104", col2: "Priya Menon", col3: "Aug 20 - Aug 21", col4: "Deluxe King", col5: "Checked Out", col6: "₹4,500" },
    ]
  },
  calendar: {
    title: "Availability Calendar",
    columns: ["Room Number", "Type", "Today", "Tomorrow", "Next 3 Days"],
    rows: [
      { col1: "101", col2: "Deluxe King", col3: "Occupied (Rajesh)", col4: "Occupied", col5: "Available" },
      { col1: "102", col2: "Deluxe King", col3: "Available", col4: "Reserved", col5: "Reserved" },
      { col1: "201", col2: "Twin Special", col3: "Checking Out", col4: "Cleaning", col5: "Available" },
      { col1: "301", col2: "Suite", col3: "Available", col4: "Available", col5: "Occupied (John)" },
    ]
  },
  rooms: {
    title: "Room Inventory",
    columns: ["Room", "Category", "Base Price", "Housekeeping", "Status"],
    rows: [
      { col1: "101", col2: "Deluxe King", col3: "₹3,000", col4: "Clean", col5: "Available" },
      { col1: "102", col2: "Deluxe King", col3: "₹3,000", col4: "Cleaning Needed", col5: "Occupied" },
      { col1: "201", col2: "Twin", col3: "₹3,500", col4: "Clean", col5: "Reserved" },
      { col1: "301", col2: "Suite", col3: "₹6,500", col4: "Inspection", col5: "Available" },
    ]
  },
  guests: {
    title: "Guest Directory",
    columns: ["Guest Name", "Contact", "Total Stays", "Total Spent", "Loyalty"],
    rows: [
      { col1: "Rajesh Kumar", col2: "rajesh@example.com", col3: "4", col4: "₹18,000", col5: "Gold" },
      { col1: "Anita Desai", col2: "+91 9876543210", col3: "1", col4: "₹10,500", col5: "New Guest" },
      { col1: "John Smith", col2: "john@example.com", col3: "12", col4: "₹1,20,500", col5: "Platinum" },
    ]
  },
  notifications: {
    title: "System Notifications",
    columns: ["Type", "Message", "Time", "Status", "Action"],
    rows: [
      { col1: "New Booking", col2: "John Smith reserved the Suite for Aug 25", col3: "10 mins ago", col4: "Unread", col5: "View" },
      { col1: "Housekeeping", col2: "Room 102 reported cleaning needed", col3: "2 hrs ago", col4: "Read", col5: "Assigned" },
    ]
  },
  settings: {
    title: "Admin Settings",
    columns: ["Setting Category", "Description", "Status", "Last Updated"],
    rows: [
      { col1: "General Information", col2: "Hotel name, address, contact details", col3: "Configured", col4: "Jan 1, 2026" },
      { col1: "Booking Rules", col2: "Check-in times, cancellation policies", col3: "Active", col4: "Mar 15, 2026" },
      { col1: "Integrations", col2: "Firebase settings and reservation alerts", col3: "Connected", col4: "Aug 10, 2026" },
    ]
  }
};

export default function AdminPlaceholder() {
  const { adminData } = useOutletContext<any>();
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "bookings";
  const dataMap = DUMMY_DATA[path] || DUMMY_DATA.bookings;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleAction = (actionName: string) => {
    if (actionName === "print") {
      window.print();
      return;
    }
    setToastMsg(`Action "${actionName}" triggered successfully!`);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Dynamic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Add New {dataMap.title.split(" ")[0]}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Reference Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm" placeholder="Enter details..." />
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Status</label>
                <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm">
                  <option>Active / Confirmed</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900">Cancel</button>
              <button onClick={() => { setIsModalOpen(false); handleAction("Record Created") }} className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Record</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{dataMap.title}</h2>
          <p className="text-sm text-slate-500 mt-1">Viewing data exclusively restricted to <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleAction("Filter Toggled")} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer">
            <Filter size={16} /> Filter
          </button>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer">
            <Plus size={16} /> New Record
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {dataMap.columns.map((col: string, i: number) => (
                  <th key={i} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataMap.rows.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => handleAction("Row Selected")}>
                  <td className="px-6 py-4 font-medium text-slate-900">{row.col1}</td>
                  <td className="px-6 py-4 text-slate-600">{row.col2}</td>
                  <td className="px-6 py-4 text-slate-600">{row.col3}</td>
                  <td className="px-6 py-4 text-slate-600">{row.col4}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      row.col5.includes('Confirmed') || row.col5.includes('Clean') || row.col5.includes('Success') || row.col5.includes('Paid') ? 'bg-emerald-100 text-emerald-700' :
                      row.col5.includes('Pending') || row.col5.includes('Reserved') || row.col5.includes('Unpaid') ? 'bg-amber-100 text-amber-700' :
                      row.col5.includes('Occupied') || row.col5.includes('Checked In') ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {row.col5}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-semibold flex items-center justify-between">
                    {row.col6 === "ready" ? (
                      <button onClick={(e) => { e.stopPropagation(); handleAction("print"); }} className="text-blue-600 hover:text-white hover:bg-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs transition-colors shadow-sm">
                        <Download size={14} /> Download PDF
                      </button>
                    ) : row.col6 === "View" || row.col6 === "Archive" || row.col6 === "Assigned" ? (
                      <button onClick={(e) => { e.stopPropagation(); handleAction(row.col6); }} className="text-slate-600 hover:text-blue-600 underline text-xs font-medium">{row.col6}</button>
                    ) : (
                      <span>{row.col6}</span>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); handleAction("View Options"); }} className="text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Aesthetic Empty State Cover (Subtle visual indication that it's a structural mock) */}
        <div className="absolute inset-0 pointer-events-none border-4 border-dashed border-blue-500/10 rounded-xl"></div>
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center text-xs text-slate-500">
          <span>{dataMap.rows.length} total local records</span>
          <span>(Interactive Preview Mode)</span>
        </div>
      </div>
    </div>
  );
}
