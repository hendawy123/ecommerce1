import React from "react";

export default function Loading() {
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="relative min-h-[60vh]">
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-fuchsia-500/20">
        <div className="h-full w-1/3 animate-[loading_1.4s_ease-in-out_infinite] bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 rounded-r-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:hidden">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
          <p className="text-sm font-medium text-gray-600 tracking-wide">
            Loading products<span className="inline-block animate-[dots_1.4s_steps(4,end)_infinite]">...</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skeletons.map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
            >
              <div className="h-56 w-full bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse" />
                <div className="flex items-center justify-between pt-1">
                  <div className="h-6 w-20 bg-gray-200 rounded-md animate-pulse" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, s) => (
                      <div key={s} className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                </div>
                <div className="h-11 w-full bg-gray-200 rounded-xl animate-pulse" />
              </div>

              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(30%); }
          100% { transform: translateX(120%); }
        }
        @keyframes dots {
          0% { content: ""; }
          25% { content: "."; }
          50% { content: ".."; }
          75% { content: "..."; }
          100% { content: ""; }
        }
      `}</style>
    </div>
  );
}
