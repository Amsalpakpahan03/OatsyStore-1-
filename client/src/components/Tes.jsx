import { useState } from "react";

const Tes = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          {/* Header Section */}
          <div className="bg-indigo-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Setup Berhasil! 🎉
            </h1>
            <p className="text-indigo-100">
              React + Tailwind CSS sudah siap digunakan.
            </p>
          </div>

          {/* Body Section */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">
                Test Status:
              </h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  Tailwind Active
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  React Active
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Halaman ini menggunakan utility class Tailwind untuk styling. Coba
              klik tombol di bawah untuk mengetes interaksi state React.
            </p>

            {/* Interactive Section */}
            <div className="flex flex-col items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 border-dashed">
              <span className="text-4xl font-bold text-indigo-600 font-mono">
                {count}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => setCount(count - 1)}
                  className="px-4 py-2 bg-white text-slate-700 font-semibold rounded-lg shadow-sm border border-slate-300 hover:bg-slate-50 hover:text-indigo-600 transition-all active:scale-95"
                >
                  Kurangi (-)
                </button>
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all active:scale-95 shadow-indigo-500/30"
                >
                  Tambah (+)
                </button>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Oatsy Store Project • Setup Mode
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tes;
