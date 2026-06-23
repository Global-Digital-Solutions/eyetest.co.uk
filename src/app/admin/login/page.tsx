import { login } from "./actions";
import { Logo } from "@/components/Logo";

const inputClass =
  "w-full px-4 py-2.5 bg-white text-[var(--color-navy)] border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)] transition-colors";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-navy)] via-[#0f2547] to-[#0a1a38] flex items-center justify-center px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo variant="stacked" className="w-40 h-auto" dark />
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 border border-white/20 p-8">
          <div className="text-center mb-6">
            <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to manage your account
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className={inputClass}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-3 py-2.5">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm text-red-700">
                  {decodeURIComponent(error)}
                </p>
              </div>
            )}

            <button
              formAction={login}
              className="w-full bg-[var(--color-primary)] text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-[#0c8f8b] active:scale-[0.98] transition-all shadow-md shadow-[var(--color-primary)]/25"
            >
              Login
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/30 mt-6">
          eyetest.co.uk &middot; Admin Portal
        </p>
      </div>
    </div>
  );
}
