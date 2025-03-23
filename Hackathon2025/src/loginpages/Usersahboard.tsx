import { useEffect, useState } from "react";
import axios from "axios";

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
  
    return <h1>Welcome, {user.email}!</h1>;
  }
