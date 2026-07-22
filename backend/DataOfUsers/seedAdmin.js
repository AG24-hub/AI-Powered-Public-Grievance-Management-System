const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel"); 

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const seedAdmins = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const admins = [
            {
                name: "Admin1",
                email: "admin1@gmail.com",
                password: await bcrypt.hash("admin123", 10),
                role: "admin"
            },
            {
                name: "Admin2",
                email: "admin2@gmail.com",
                password: await bcrypt.hash("admin123", 10),
                role: "admin"
            },
            {
                name: "Admin3",
                email: "admin3@gmail.com",
                password: await bcrypt.hash("admin123", 10),
                role: "admin"
            }
        ];

        // remove old admins (optional)
        await User.deleteMany({ role: "admin" });

        // insert new admins
        await User.insertMany(admins);

        console.log("✅ Admins created successfully");
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmins();