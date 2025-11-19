export default function BookEvent() {
  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold">Free Event Booking</h1>
      <form className="mt-6 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
        />
        <button
          type="submit"
          className="w-full p-3 rounded-xl bg-[#A020F0]/80 hover:bg-[#A020F0] transition text-white font-semibold"
        >
          Book Event
        </button>
      </form>
    </div>
  )
}
