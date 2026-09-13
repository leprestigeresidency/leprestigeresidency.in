import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { CheckCircle2, IndianRupee, Loader2, Save } from "lucide-react";
import { ROOMS_BY_LOCATION, RoomData } from "@/data/roomsData";

export default function AdminRoomPrices() {
  const { adminData } = useOutletContext<any>();
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const branchId = (adminData?.branchId || "Pondy").toString();
  const isPondy = branchId.toLowerCase().includes("pond") || branchId.toLowerCase().includes("pudu");
  
  // Pondicherry => Deluxe, Twin
  // Tindivanam => Superior, Premium
  const targetRoomTypes = isPondy ? ["Deluxe", "Twin"] : ["Superior", "Premium"];
  const locationKey = isPondy ? "pondicherry" : "tindivanam";
  const defaultRooms: RoomData[] = ROOMS_BY_LOCATION[locationKey] || [];
  const roomTypesToDisplay = defaultRooms.filter(r => targetRoomTypes.includes(r.type));

  useEffect(() => {
    if (!db) return;
    
    // Fetch prices from `room_prices` collection
    const unsub = onSnapshot(collection(db, "room_prices"), (snapshot) => {
      const pMap: Record<string, number> = {};
      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        if (d.price !== undefined) {
          pMap[docSnap.id] = d.price;
        }
      });
      setPrices(pMap);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handlePriceChange = (roomId: string, val: string) => {
    setPrices(prev => ({
      ...prev,
      [roomId]: Number(val)
    }));
  };

  const savePrice = async (roomId: string, price: number) => {
    if (!db) return;
    if (price === undefined || price === null || isNaN(price) || price < 0) {
      showToast("Invalid price. Must be a valid positive number.");
      return;
    }
    setSavingId(roomId);
    try {
      await setDoc(doc(db, "room_prices", roomId), {
        price,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      showToast("Price updated successfully!");
    } catch (e) {
      console.error(e);
      showToast("Failed to update price.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6 relative max-w-4xl mx-auto">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">Room Prices</h2>
        <p className="text-sm text-slate-500 mt-1">Manage global room prices for <strong className="text-blue-600">{branchId}</strong> branch.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-4" />
            <p className="font-medium text-sm">Loading prices...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {roomTypesToDisplay.map(room => {
              const docId = `${locationKey}_${room.type.toLowerCase()}`;
              const currentVal = prices[docId] !== undefined ? prices[docId] : room.pricePerNight;

              return (
                <div key={docId} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-slate-200 rounded-xl p-5 hover:border-blue-400 transition-all hover:shadow-md bg-slate-50/50">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-bold text-slate-900">{room.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Type: {room.type}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee size={16} className="text-slate-400" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={currentVal}
                        onChange={(e) => handlePriceChange(docId, e.target.value)}
                        className="w-32 pl-9 pr-4 py-2 border-2 border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                    <button
                      onClick={() => savePrice(docId, currentVal)}
                      disabled={savingId === docId}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs tracking-wider uppercase font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {savingId === docId ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      Save
                    </button>
                  </div>
                </div>
              );
            })}
            
            {roomTypesToDisplay.length === 0 && (
              <p className="text-slate-500 text-center py-6">No room types found for this branch.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
