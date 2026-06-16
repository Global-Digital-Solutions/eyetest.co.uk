import { login } from "./actions";

const inputClass =
  "w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Admin</h1>
        <p className="text-sm text-gray-500 mb-6">Eye Test Finder</p>

        <form className="space-y-3">
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            autoComplete="email"
            required
            className={inputClass}
          />
          <input
            name="password"
            type="password"
            placeholder="Passwort"
            autoComplete="current-password"
            required
            className={inputClass}
          />

          {error && (
            <p className="text-sm text-red-600">
              {decodeURIComponent(error)}
            </p>
          )}

          <button
            formAction={login}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
}
