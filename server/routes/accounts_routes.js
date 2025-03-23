// const express = require('express');
// const router = express.Router();
// const { supabase } = require('../server'); // Import supabase client

// // Fetch all accounts for a specific user
// router.get('/', async (req, res) => {
//   const { user_id } = req.query; // Get user_id from query

//   if (!user_id) {
//     return res.status(400).json({ error: 'User ID is required' });
//   }

//   try {
//     const { data, error } = await supabase
//       .from('accounts')
//       .select('*')
//       .eq('user_id', user_id);

//     if (error) throw error;

//     res.json(data); // Send the accounts back to the frontend
//   } catch (error) {
//     console.error("Error fetching accounts:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Create a new account
// router.post('/', async (req, res) => {
//   const { user_id, name, type, balance } = req.body;

//   if (!user_id || !name || !type || balance === undefined) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const { data, error } = await supabase
//       .from('accounts')
//       .insert([{ user_id, name, type, balance }]);

//     if (error) throw error;

//     res.json(data[0]); // Return the newly created account
//   } catch (error) {
//     console.error("Error creating account:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Delete an account
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const { data, error } = await supabase
//       .from('accounts')
//       .delete()
//       .eq('id', id);

//     if (error) throw error;

//     res.json({ message: 'Account deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting account:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;
