"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold">
        Something went wrong.
      </h2>

      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-white px-6 py-3 text-black"
      >
        Try Again
      </button>
    </div>
  );
}