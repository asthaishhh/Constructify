import React, { useMemo, useState } from "react";

// TraderOrdersDashboard.jsx
// Single-file React component (Tailwind CSS assumed) that demonstrates
// a clean dashboard for two order types: "Requested by me" and "Requested by customers".

export default function TraderOrdersDashboard() {
  const [activeTab, setActiveTab] = useState("mine"); // 'mine' or 'customers'
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Sample mock data. Replace with API fetch in production.
  const orders = useMemo(
    () => [
      {
        id: "ORD-1001",
        type: "mine",
        client: "N/A",
        pair: "BTC/USDT",
        side: "Buy",
        quantity: 0.5,
        price: 54000,
        status: "open",
        createdAt: "2025-10-15",
      },
      {
        id: "ORD-1002",
        type: "customers",
        client: "Alpha Traders",
        pair: "ETH/USDT",
        side: "Sell",
        quantity: 10,
        price: 3400,
        status: "completed",
        createdAt: "2025-10-18",
      },
      {
        id: "ORD-1003",
        type: "customers",
        client: "Beta Capital",
        pair: "SOL/USDT",
        side: "Buy",
        quantity: 200,
        price: 140,
        status: "cancelled",
        createdAt: "2025-10-10",
      },
      {
        id: "ORD-1004",
        type: "mine",
        client: "N/A",
        pair: "BTC/USDT",
        side: "Sell",
        quantity: 0.1,
        price: 54500,
        status: "executed",
        createdAt: "2025-10-19",
      },
    ],
    []
  );

  // Helper: filter and search
  const filtered = orders
    .filter((o) => o.type === activeTab)
    .filter((o) => (statusFilter === "all" ? true : o.status === statusFilter))
    .filter((o) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        (o.client || "").toLowerCase().includes(q) ||
        o.pair.toLowerCase().includes(q)
      );
    })
    .filter((o) => {
      if (!dateFrom && !dateTo) return true;
      const d = new Date(o.createdAt);
      if (dateFrom && d < new Date(dateFrom)) return false;
      if (dateTo && d > new Date(dateTo)) return false;
      return true;
    });

  // Simple export to CSV
  const exportCSV = () => {
    const header = [
      "id",
      "type",
      "client",
      "pair",
      "side",
      "quantity",
      "price",
      "status",
      "createdAt",
    ];
    const rows = filtered.map((o) => header.map((h) => JSON.stringify(o[h] ?? "")).join(","));
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${activeTab}_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Row actions (demo)
  const onView = (id) => alert(`View ${id}`);
  const onCancel = (id) => {
    // In production: call API then refresh
    alert(`Request cancel for ${id} (demo)`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders Dashboard</h1>
        <div className="space-x-2 flex items-center">
          <button
            onClick={() => setActiveTab("mine")}
            className={`px-3 py-1 rounded-md ${activeTab === "mine" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            Requested by me
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-3 py-1 rounded-md ${activeTab === "customers" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          >
            Requested by customers
          </button>
        </div>
      </header>

      <section className="bg-white shadow-sm rounded-md p-4 mb-6">
        <div className="flex gap-3 items-center mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order id, client, pair..."
            className="border rounded p-2 flex-1"
          />

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded p-2">
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="executed">Executed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm">From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded p-2" />
            <label className="text-sm">To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded p-2" />
          </div>

          <button onClick={exportCSV} className="px-3 py-2 bg-green-600 text-white rounded">Export CSV</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2 px-3">Order ID</th>
                <th className="py-2 px-3">Client</th>
                <th className="py-2 px-3">Pair</th>
                <th className="py-2 px-3">Side</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Created</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}

              {filtered.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="py-3 px-3 font-medium">{o.id}</td>
                  <td className="py-3 px-3">{o.client || "—"}</td>
                  <td className="py-3 px-3">{o.pair}</td>
                  <td className="py-3 px-3">{o.side}</td>
                  <td className="py-3 px-3">{o.quantity}</td>
                  <td className="py-3 px-3">{o.price}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusClass(o.status)}`}>{o.status}</span>
                  </td>
                  <td className="py-3 px-3">{o.createdAt}</td>
                  <td className="py-3 px-3 space-x-2">
                    <button onClick={() => onView(o.id)} className="px-2 py-1 border rounded text-sm">View</button>
                    {o.status === "open" && <button onClick={() => onCancel(o.id)} className="px-2 py-1 border rounded text-sm">Cancel</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-sm rounded-md">
          <h3 className="text-sm text-gray-600">Orders count</h3>
          <p className="text-2xl font-semibold mt-2">{filtered.length}</p>
        </div>
        <div className="p-4 bg-white shadow-sm rounded-md">
          <h3 className="text-sm text-gray-600">Total notional</h3>
          <p className="text-2xl font-semibold mt-2">{filtered.reduce((s, o) => s + o.quantity * o.price, 0)}</p>
        </div>
        <div className="p-4 bg-white shadow-sm rounded-md">
          <h3 className="text-sm text-gray-600">Open orders</h3>
          <p className="text-2xl font-semibold mt-2">{filtered.filter((o) => o.status === "open").length}</p>
        </div>
      </section>
    </div>
  );
}

// small helper to map status to tailwind-style classes
function getStatusClass(status) {
  switch (status) {
    case "open":
      return "bg-yellow-100 text-yellow-800";
    case "executed":
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
