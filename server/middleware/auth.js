const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid Bearer token" });
    }

    const token = authHeader.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
        console.error("Supabase Auth Error:", error.message);
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = { id: data.user.id }; // Attach user ID to request
    next(); // Proceed to next middleware
};

module.exports = authenticateUser;
