export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-8 text-center">
        <h1 className="text-4xl font-bold">Animation Test Page</h1>

        {/* Basic Tailwind animations */}
        <div className="space-y-4">
          <button className="px-6 py-3 bg-blue-500 text-white rounded animate-pulse">Basic Pulse (should work)</button>

          <button className="px-6 py-3 bg-green-500 text-white rounded animate-bounce">
            Basic Bounce (should work)
          </button>

          <button className="px-6 py-3 bg-red-500 text-white rounded animate-spin">Basic Spin (should work)</button>
        </div>

        {/* Our custom animations */}
        <div className="space-y-4">
          <button
            className="px-8 py-4 text-white rounded-xl font-medium"
            style={{
              background: "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)",
              animation: "pulse 2s infinite",
            }}
          >
            Inline Gradient + Pulse
          </button>

          <button className="test-animated-button px-8 py-4 rounded-xl font-medium">CSS Class Animation</button>
        </div>
      </div>
    </div>
  )
}
