function AuthLayout({ title, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* LEFT – FORM */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-slate-900">
            {title}
          </h2>

          <div className="mt-8 space-y-6">
            {children}
          </div>

          <div className="mt-6 text-sm text-indigo-600 cursor-pointer">
            {footer}
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-slate-100">
          <img
            src="https://cdn.dribbble.com/users/1787323/screenshots/11396498/media/5c6dc65b9f5e94cf236503d17b47779e.png"
            alt="Study illustration"
            className="w-4/5"
          />
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;
