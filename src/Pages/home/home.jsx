import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="flex justify-center items-center ">
        <Link
          className="bg-black text-white p-2 rounded-lg mt-4 hover:cursor-pointer "
          to={"/products"}
        >
          Navigate to Products{" "}
        </Link>
      </div>
    </>
  );
}

export default HomePage;
