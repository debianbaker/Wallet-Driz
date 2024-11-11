import { ToggleButton } from "./ToggleButton";
import { useNavigation } from "./NavigationContext.jsx";

export const Start = () => {
  const { navigate } = useNavigation();
  return (
    <div className="bg-white dark:bg-black flex justify-center min-h-screen items-center">
      <div className="border-2 border-gray-300 dark:border-darkWhite rounded-lg ">
        <div className="text-center mb-20 p-20">
          <h1 className="text-gray-900 dark:text-white text-5xl font-bold mb-4">
            Welcome to Driz
          </h1>
          <h2 className="text-gray-400 dark:text-gray-500 text-md font-medium">
            Let's get started.
          </h2>
        </div>
        <div className="flex flex-col gap-4 items-center pb-20">
          <button
            className="bg-gray-900 text-white dark:bg-darkWhite dark:text-gray-900 text-md font-medium rounded-md w-[70%] p-3 hover:bg-gray-800 active:bg-gray-700 hover:dark:bg-gray-200 active:dark:bg-gray-300"
            onClick={() => navigate("/create/seed")}
          >
            Create a new wallet
          </button>

          <button
            className="bg-lightRed text-white dark:bg-darkRed dark:text-darkWhite text-md font-medium rounded-md  w-[70%] p-3 hover:bg-red-800 active:bg-darkRed hover:dark:bg-red-800 active:dark:bg-red-700"
            onClick={() => navigate("/import")}
          >
            Import Wallet
          </button>
        </div>
        <div className="mx-2 mb-2">
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};
