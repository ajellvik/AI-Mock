export default function FAQ() {
    return (
<div className="flex items-center justify-between gap-4 bg-red-600 px-4 py-3 text-white rounded-md">
<button
    aria-label="Dismiss"
    className="bg-red-600"
  >
    <svg xmlns="" className="h-5 w-5" viewBox="0 0 0 0" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
  <p className="text-center text-sm font-medium">
    If nothing shows up click update the website, click on 'Dashboard' and create a new interview with the same information.
  </p>
  <button
    aria-label="Dismiss"
    className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
</div>
);
}