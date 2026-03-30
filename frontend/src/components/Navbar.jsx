
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-600 from-purple-500 to-indigo-600 text-white shadow-lg">
      
      {/* Logo / Title */}
      <h1 className="text-xl md:text-2xl text-purple-200 font-bold tracking-wide">
        Ashu verma
      </h1>

      {/* Right Side */}
     
     
      {user ? (
        <button
          onClick={signOut}
          className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition duration-300 shadow-md"
        >
          Logout
        </button>
      ) : (
        <span className="text-sm md:text-base font-medium bg-white/20 px-3 py-1 rounded-md">
          Login First
        </span>
      )}
      
    </div>
  );
}