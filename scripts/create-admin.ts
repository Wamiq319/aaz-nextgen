import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// User Schema (same as in User.ts)
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createAdminUser(): Promise<void> {
  try {
    // Connect to MongoDB - use MONGO_URI to match your existing setup
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error("❌ MONGO_URI environment variable is not set!");
      console.log("📝 Please add MONGO_URI to your .env.local file");
      console.log(
        "   Example: MONGO_URI=mongodb://localhost:27017/your-database-name"
      );
      return;
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || "admin@aaz.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@2024!";

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      // Update existing admin user with new password
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log("✅ Admin user updated successfully!");
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
      console.log("\n⚠️  Admin credentials updated from environment variables");
    } else {
      // Create new admin user
      const adminUser = new User({
        email: adminEmail,
        password: adminPassword,
      });

      await adminUser.save();
      console.log("✅ Admin user created successfully!");
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
      console.log("\n⚠️  IMPORTANT: Change this password after first login!");
    }

    console.log("\n📝 Environment Variables Used:");
    console.log(`   MONGO_URI: ${mongoUri ? "***SET***" : "***NOT SET***"}`);
    console.log(`   ADMIN_EMAIL: ${adminEmail}`);
    console.log(
      `   ADMIN_PASSWORD: ${adminPassword ? "***SET***" : "***NOT SET***"}`
    );
  } catch (error) {
    console.error("❌ Error managing admin user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

createAdminUser();
