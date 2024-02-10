import DarkModeToggle from "./dark-mode-toggle";

export default function HeaderBar() {
  return (
    <div className="h-[70px] w-full bg-sky-500 px-6 py-2 flex items-center justify-between">
      <div className="flex flex-row items-center gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
        <p className="text-xl font-figtree font-semibold">
          Club de Planeadores Rosario
        </p>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <DarkModeToggle />
      </div>
    </div>
  );
}
