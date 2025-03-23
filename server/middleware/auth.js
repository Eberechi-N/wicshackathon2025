const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const { data, error } = await supabase.auth.getUser({ access_token: token });

    if (error || !data?.user) {
        console.error("Supabase Auth Error:", error.message);
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = { id: data.user.id }; // Attach user ID to request
    next(); // Proceed to next middleware
};

module.exports = authenticateUser;
