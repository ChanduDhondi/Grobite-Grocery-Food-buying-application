export default function Loading() {
  return (
    <>
      <main className="w-screen h-screen z-40 flex justify-center items-center gap-[.5rem]">
        <span className="w-7 h-7 border-t-4 border-green-500 rounded-full animate-spin" />
        <p className="text-green-600 font-medium">Loading</p>
      </main>
    </>
  );
}
