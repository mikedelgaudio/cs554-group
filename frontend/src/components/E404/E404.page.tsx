const E404 = () => {
  return (
    <div className="flex min-h-screen flex-col gap-2 items-center pt-5">
      <h1 className="text-7xl font-bold">Error 404</h1>
      <p>Sorry, that page doesn't exist.</p>
      <a
        href="/"
        className="flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 text-md lg:text-xl font-semibold leading-7 text-white transition-all duration-200 hover:bg-transparent hover:text-slate-900 focus:bg-transparent focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
      >
        Return home
      </a>
    </div>
  );
};

export { E404 };
