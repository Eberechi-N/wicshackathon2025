import { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../components/logout";

interface User {
    id: string;
    email: string;
  }

  export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      axios.get("http://localhost:8080/user").then((res) => {
        setUser(res.data.user);
      }).catch(() => setUser(null));
    }, []);
  
    if (!user) return <p>You must be logged in to view this page.</p>;
  
    return  (  <nav className="flex justify-between p-4 bg-gray-800 text-white">
                <h1>Welcome, {user.email}!</h1>  
                <Logout />
                </nav>
    );
  }
