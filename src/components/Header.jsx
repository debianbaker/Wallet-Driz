import { ToggleButton } from "./ToggleButton";
export const Header = () => {

  return (
    <div className="shadow-md shadow-black dark:shadow-white mb-16 p-5 rounded-lg">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke='red '
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-box size-8"
                >
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                </svg>
                <h1 className="text-gray-900 dark:text-darkWhite text-3xl font-bold">
                    Driz
                </h1>
        </div>
        <ToggleButton />
        </div>
    </div>
  );
};
