import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bannerImage from "./assets/Banner-min.jpg";

function App() {
  const [auctions, setAuctions] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadAuctions = async () => {
      const response = await fetch("/blogs.json");
      const data = await response.json();
      setAuctions(data);
    };

    loadAuctions();
  }, []);

  const visibleAuctions = useMemo(() => auctions.slice(0, 6), [auctions]);

  const favoriteItems = useMemo(() => {
    return visibleAuctions.filter((item) => favoriteIds.has(item.id));
  }, [visibleAuctions, favoriteIds]);

  const totalBidAmount = favoriteItems.reduce(
    (sum, item) => sum + item.currentBidPrice,
    0,
  );

  const addFavorite = (item) => {
    setFavoriteIds((current) => {
      if (current.has(item.id)) return current;
      const next = new Set(current);
      next.add(item.id);
      return next;
    });

    toast.success(`${item.title} added to favorites`);
  };

  const removeFavorite = (id) => {
    const removedItem = visibleAuctions.find((item) => item.id === id);

    setFavoriteIds((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });

    if (removedItem) {
      toast.info(`${removedItem.title} removed from favorites`);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#"
            className="text-lg font-extrabold tracking-tight sm:text-xl"
          >
            Auction<span className="text-amber-500">Gallery</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#auctions" className="hover:text-blue-600">
              Auctions
            </a>
            <a href="#" className="hover:text-blue-600">
              Categories
            </a>
            <a href="#" className="hover:text-blue-600">
              How to works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-100 md:hidden"
              aria-label="Toggle menu"
              title="Menu"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12h16"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 18h16"
                />
              </svg>
            </button>

            <button
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-100"
              aria-label="Notifications"
              title="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 1-5.714 0M18 8a6 6 0 1 0-12 0c0 3.314-1.208 5.21-2.023 6.235a1 1 0 0 0 .783 1.64h14.48a1 1 0 0 0 .783-1.64C19.208 13.21 18 11.314 18 8Z"
                />
              </svg>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500"></span>
            </button>
            <div className="avatar placeholder">
              <div className="h-8 w-8 rounded-full bg-orange-200 text-xs font-bold text-slate-700">
                U
              </div>
            </div>
          </div>
        </div>

        <nav
          className={`mx-auto max-w-6xl overflow-hidden px-4 text-sm font-medium text-slate-600 transition-all duration-200 md:hidden sm:px-6 ${
            isMobileMenuOpen
              ? "max-h-56 pb-3 opacity-100"
              : "max-h-0 pb-0 opacity-0"
          }`}
        >
          <div className="grid gap-2 rounded-xl border border-slate-200 bg-white p-2">
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-slate-100"
            >
              Home
            </a>
            <a
              href="#auctions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-slate-100"
            >
              Auctions
            </a>
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-slate-100"
            >
              Categories
            </a>
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-slate-100"
            >
              How to works
            </a>
          </div>
        </nav>
      </header>

      <section
        className="hero-banner relative overflow-hidden"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent"></div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-xl space-y-4 text-white">
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
              Bid on Unique Items from Around the World
            </h1>
            <p className="text-sm text-slate-100 sm:text-base">
              Discover rare collectibles, luxury goods, and vintage treasures in
              our live auctions.
            </p>
            <button className="btn rounded-full border-0 bg-white px-6 text-slate-900 hover:bg-slate-100">
              Explore Auctions
            </button>
          </div>
        </div>
      </section>

      <main
        id="auctions"
        className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-14"
      >
        <div className="mb-6 sm:mb-8">
          <h2 className="font-display text-2xl font-bold text-slate-700 sm:text-3xl">
            Active Auctions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Discover and bid on extraordinary items
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="divide-y divide-slate-100 md:hidden">
              {visibleAuctions.map((item) => {
                const isFavorite = favoriteIds.has(item.id);

                return (
                  <article key={item.id} className="space-y-3 p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-14 w-14 shrink-0 rounded-md object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-700">
                          {item.title}
                        </p>
                        <p className="line-clamp-2 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg bg-slate-50 p-2">
                        <p className="text-slate-500">Current Bid</p>
                        <p className="font-semibold text-slate-700">
                          {formatCurrency(item.currentBidPrice)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-2">
                        <p className="text-slate-500">Time Left</p>
                        <p className="font-semibold text-slate-700">
                          {item.timeLeft}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => addFavorite(item)}
                      disabled={isFavorite}
                      className={`cursor-pointer bg-transparent p-0 text-2xl leading-none transition-colors duration-200 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:text-red-500 disabled:hover:text-red-500 ${
                        isFavorite
                          ? "text-red-500"
                          : "text-slate-400 hover:text-red-500"
                      }`}
                      aria-label="Add to favorite"
                      title="Add to favorite"
                    >
                      ♥
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="table">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th>Items</th>
                    <th>Current Bid</th>
                    <th>Time Left</th>
                    <th>Bid Now</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleAuctions.map((item) => {
                    const isFavorite = favoriteIds.has(item.id);

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-700">
                                {item.title}
                              </p>
                              <p className="line-clamp-1 text-xs text-slate-500">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm font-semibold text-slate-700">
                          {formatCurrency(item.currentBidPrice)}
                        </td>
                        <td className="text-sm font-medium text-slate-600">
                          {item.timeLeft}
                        </td>
                        <td>
                          <button
                            onClick={() => addFavorite(item)}
                            disabled={isFavorite}
                            className={`cursor-pointer bg-transparent p-0 text-2xl leading-none transition-colors duration-200 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:text-red-500 disabled:hover:text-red-500 ${
                              isFavorite
                                ? "text-red-500"
                                : "text-slate-400 hover:text-red-500"
                            }`}
                            aria-label="Add to favorite"
                            title="Add to favorite"
                          >
                            ♥
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-400 bg-white p-4 shadow-sm sm:p-5">
            <h3 className="mb-4 text-xl font-bold text-slate-700">
              Favorite Items
            </h3>

            {favoriteItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-400 bg-slate-50 px-4 py-8 text-center">
                <p className="font-semibold text-slate-700">No favorites yet</p>
                <p className="mt-2 text-sm text-slate-500">
                  Click the heart icon on any item to add it to your favorites
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {favoriteItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[auto,1fr,auto] items-center gap-3 rounded-xl border border-slate-300 p-2"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-11 w-11 rounded-md object-cover"
                    />
                    <div>
                      <p className="line-clamp-1 text-xs font-semibold text-slate-700">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatCurrency(item.currentBidPrice)}
                      </p>
                      <p className="text-xs text-slate-500">
                        Bids: {item.bidsCount}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="btn btn-ghost btn-xs"
                      aria-label="Remove favorite"
                      title="Remove favorite"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 border-t border-slate-400 pt-4">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <p>Total bids Amount</p>
                <p>{formatCurrency(totalBidAmount)}</p>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-14 rounded-2xl bg-white px-4 py-10 text-center shadow-sm sm:px-8">
          <h4 className="text-2xl font-extrabold tracking-tight text-slate-700">
            Auction<span className="text-amber-500">Gallery</span>
          </h4>
          <p className="mt-2 text-sm text-slate-500">Bid. Win. Own.</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-600">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#auctions" className="hover:text-blue-600">
              Auctions
            </a>
            <a href="#" className="hover:text-blue-600">
              Categories
            </a>
            <a href="#" className="hover:text-blue-600">
              How to works
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            &copy; 2026 AuctionHub. All rights reserved.
          </p>
        </footer>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default App;
