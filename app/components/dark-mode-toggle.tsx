import { useEffect, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function DarkModeToggle() {
  const divRef = useRef<HTMLButtonElement>(null);

  const [darkModeActive, setDarkModeActive] = useLocalStorage("dark", false);

  const toggleDarkMode = () => {
    setDarkModeActive((prevValue: boolean) => !prevValue);
  };

  useEffect(() => {
    if (darkModeActive) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkModeActive]);

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center`}
      title="Dark mode toggle"
      ref={divRef}
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        className="group z-10 mx-auto h-7 w-auto cursor-pointer"
      >
        <circle
          cx="70"
          cy="70"
          r="70"
          fill="currentColor"
          className="text-blue-600 dark:text-yellow-300 "
        ></circle>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M82.5612 138.876C55.6458 126.762 37 100.476 37 70C37 39.5244 55.6458 13.2383 82.5613 1.1239C115.227 7.04239 140 35.6281 140 70C140 104.372 115.227 132.958 82.5612 138.876Z"
          fill="currentColor"
          className="text-yellow-300 group-hover:text-blue-200 dark:text-blue-500 dark:group-hover:text-yellow-500 "
        ></path>
      </svg>
    </button>
  );
}
