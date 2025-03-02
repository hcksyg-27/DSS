

























//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         db.run(
//             "INSERT INTO users (username, email, password, role, credits, totalScans) VALUES (?, ?, ?, ?, ?, ?)",
//             [username, email, hashedPassword, "user", 20, 0],
//             function (err) {
//                 if (err) return callback(err, null);
//                 console.log("User registered, ID:", this.lastID);
//                 callback(null, this.lastID);
//             }
//         );
//     } catch (error) {
//         callback(error, null);
//     }
// };



//function to get user by email


//create users table if not exists
// db.serialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT NOT NULL UNIQUE,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL,
//         role TEXT NOT NULL DEFAULT 'user',
//         credits INTEGER DEFAULT 20,
//         totalScans INTEGER DEFAULT 0
//     )`, (err) => {
//         if (err) {
//             console.error("Error creating users table:", err);
//         } else {
//             console.log("Users table created or already exists.");
//         }
//     });
// });

//function to create a new user
// const createUser = (username, email, password, callback) => {
//     try {
//         const sql = "INSERT INTO users(username, email, password, role, credits, totalScans) VALUES( ?, ?, ?, ?, ?, ?)";
//         db.run(sql, [username, email, password, 'user', 20, 0], function (err) {
//             if (err) {
//                 return callback(err, null);
//             }
//             callback(null, this.lastID); 
//         });
//     } catch (error) {
//         callback(error, null);
//     }
// };

// const createUser = async (username, email, password, callback) => {
