require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron"); // 🛑 Cron Job Import Karo
const BloodRequest = require("./models/BloodRequest"); // 🛑 BloodRequest Model Import Karo

const donorRoutes = require("./routes/donorRoutes");
const authRoutes = require("./routes/authRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const compatibilityRoutes = require("./routes/compatibilityRoutes");
const recipientRoutes = require("./routes/recipientRoutes");
const donorProfileRoutes = require("./routes/donorProfileRoutes");
const app = express();




// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);
app.use("/api/compatibility", compatibilityRoutes);
app.use("/api/recipient", recipientRoutes);
app.use("/api/donor-profile", donorProfileRoutes);




app.use((req, res, next) => {
  console.log("🟢 Incoming Request:", req.method, req.url);
  console.log("🔍 Request Headers:", req.headers);
  next();
});

// 🛑 Automatic Expiry Job - Har din raat 12 baje chalega
cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();
    const result = await BloodRequest.updateMany(
      { expiryDate: { $lt: currentDate }, status: "active" },
      { status: "expired" }
    );
    console.log(`✅ Expired blood requests updated: ${result.modifiedCount}`);
  } catch (error) {
    console.error("❌ Error updating expired requests:", error);
  }
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


  mongoose.set('strictPopulate', false);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
