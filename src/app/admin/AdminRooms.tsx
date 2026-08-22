import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, query, where, onSnapshot, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { BedDouble, Plus, Loader2, CheckCircle2, XCircle, Wrench, Edit3, X } from "lucide-react";

export default function AdminRooms() {
  const { adminData } = useOutletContext<any>();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    name: "",
    type: "Deluxe",
    basePrice: 3000,
    status: "Available",
  });

  useEffect(() => {
    if (!db || !adminData?.branchId) return;

    const q = query(
      collection(db, "rooms"),
      where("branchId", "==", adminData.branchId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      
      data.sort((a, b) => (a.roomNumber || "").localeCompare(b.roomNumber || "", undefined, { numeric: true }));

      setRooms(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching rooms: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminData?.branchId]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleToggleStatus = async (roomId: string, currentStatus: string) => {
    if (!db) return;
    const nextStatusMap: Record<string, string> = {
      "Available": "Occupied",
      "Occupied": "Maintenance",
      "Maintenance": "Available"
    };
    const newStatus = nextStatusMap[currentStatus] || "Available";
    try {
      await updateDoc(doc(db, "rooms", roomId), { status: newStatus });
      showToast(`Room status updated to ${newStatus}`);
    } catch (e) {
      console.error(e);
      showToast("Failed to update status");
    }
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !newRoom.roomNumber || !newRoom.name) return;
    try {
      await addDoc(collection(db, "rooms"), {
        ...newRoom,
        branchId: adminData.branchId,
        basePrice: Number(newRoom.basePrice),
        active: true,
        createdAt: new Date().toISOString()
      });
      setIsAddModalOpen(false);
      setNewRoom({ roomNumber: "", name: "", type: "Deluxe", basePrice: 3000, status: "Available" });
      showToast("New Room added successfully!");
    } catch (e) {
      console.error(e);
      showToast("Error adding room");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 w-fit"><CheckCircle2 size={14}/> Available</span>;
      case "Occupied":
        return <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 w-fit"><BedDouble size={14}/> Occupied</span>;
      case "Maintenance":
        return <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 w-fit"><Wrench size={14}/> Maintenance</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-bold w-fit">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Add Room Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Add Room to {adminData?.branchId}</h3>
            
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div>
                <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Room Number</label>
                <input 
                  required
                  type="text" 
                  value={newRoom.roomNumber}
                  onChange={e => setNewRoom({...newRoom, roomNumber: e.target.value})}
                  placeholder="e.g. 104" 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:border-blue-600" 
                />
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Room Name / Label</label>
                <input 
                  required
                  type="text" 
                  value={newRoom.name}
                  onChange={e => setNewRoom({...newRoom, name: e.target.value})}
                  placeholder="e.g. Deluxe Garden Suite" 
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:border-blue-600" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Type</label>
                  <select 
                    value={newRoom.type}
                    onChange={e => setNewRoom({...newRoom, type: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:border-blue-600"
                  >
                    <option value="Deluxe">Deluxe</option>
                    <option value="Twin">Twin</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Base Price (₹)</label>
                  <input 
                    required
                    type="number" 
                    value={newRoom.basePrice}
                    onChange={e => setNewRoom({...newRoom, basePrice: Number(e.target.value)})}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:border-blue-600" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900">Cancel</button>
                <button type="submit" className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">Add Room</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Room Inventory</h2>
          <p className="text-sm text-slate-500 mt-1">Manage physical room statuses for <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer">
          <Plus size={16} /> Add Room
        </button>
      </div>

      {/* Grid View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative min-h-[300px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-sm z-10">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-4" />
            <p className="font-medium text-sm">Syncing room data...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
            <BedDouble size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="font-semibold text-slate-600">No rooms registered for {adminData?.branchId}</p>
            <p className="text-xs text-slate-400 mt-1">Click "+ Add Room" to create inventory.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((r) => (
              <div key={r.id} className="border border-slate-200 rounded-xl p-5 hover:border-blue-400 transition-all hover:shadow-md bg-slate-50/50 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Room {r.roomNumber || "N/A"}</span>
                    {getStatusBadge(r.status || "Available")}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{r.name || r.type || "Standard Room"}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Type: {r.type || "Deluxe"}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Base Rate</span>
                    <span className="text-base font-bold text-slate-900">₹{r.basePrice ? r.basePrice.toLocaleString("en-IN") : "3,000"} <span className="text-xs font-normal text-slate-400">/ night</span></span>
                  </div>

                  <button 
                    onClick={() => handleToggleStatus(r.id, r.status || "Available")}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 size={12} /> Toggle Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
