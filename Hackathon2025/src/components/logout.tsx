import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { LogOut } from "lucide-react"; // Importing Lucide icon


const SUPABASE_URL="https://oatymndotskzyhjtxycu.supabase.co";
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdHltbmRvdHNrenloanR4eWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MjQwMjcsImV4cCI6MjA1ODIwMDAyN30.nbvEpWG29xt_Azxc26OHiVgZD-j_sOj8WcLq2vGEsGg";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Logout() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await supabase.auth.signOut(); // Invalidate session in Supabase
            localStorage.removeItem("supabase_token"); // Remove token from local storage
            console.log("User logged out");
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
            <LogOut size={20} /> {/* Lucide Logout Icon */}
            Logout
        </button>
    );
}

export default Logout;
