const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel");
const Grievance = require("../Models/grievanceModel");

// Load environment variables
dotenv.config();

const firstNames = [
  "Sourav", "Anirban", "Subham", "Debashis", "Pritam", "Joy", "Arijit", "Abhishek",
  "Indranil", "Tanmoy", "Sandip", "Sayan", "Rupam", "Payel", "Koyel", "Riya",
  "Poulami", "Sneha", "Debolina", "Ananya", "Swagata", "Shreya", "Rimpa",
  "Monalisa", "Ipsita", "Sushmita", "Priyanka", "Sujit", "Pranab", "Amitabha"
];

const lastNames = [
  "Banerjee", "Chatterjee", "Mukherjee", "Ganguly", "Sen", "Ghosh", "Bose", "Das",
  "Chakraborty", "Roy", "Sarkar", "Dutta", "Kundu", "Paul", "Mitra", "Dey", "Pal",
  "Maiti", "Samanta", "Haldar", "Naskar", "Pramanik", "Adhikary", "Bhattacharya"
];

const districts = [
  "Kolkata", "Howrah", "North 24 Parganas", "South 24 Parganas", "Hooghly",
  "Purba Medinipur", "Paschim Medinipur", "Purba Bardhaman", "Paschim Bardhaman",
  "Birbhum", "Nadia", "Murshidabad", "Malda", "Darjeeling", "Jalpaiguri"
];

const locations = [
  "Salt Lake Sector V", "Newtown Action Area I", "Gariahat Crossing",
  "Shyambazar Five Point", "Behala Chowrasta", "Jadavpur 8B", "Tollygunge",
  "Ballygunge Phari", "Howrah Maidan", "Barrackpore Chiria More",
  "Siliguri Hill Cart Road", "Durgapur City Centre", "Asansol Court Road",
  "Kharagpur IIT Campus", "Bardhaman Rajbati Chowk", "Haldia Township",
  "Chinsurah Station Road", "Bolpur Shantiniketan Road"
];

const pincodes = [
  700001, 700091, 700156, 711101, 713216, 721302, 734001, 741235, 742101, 712101
];

const grievanceTemplates = [
  {
    category: "Water Supply",
    issues: [
      { title: "Contaminated Muddy Water Supply", details: "The municipal tap water supplied to our sector has been muddy and emitting a foul odor. It is completely unfit for consumption and poses a severe health hazard." },
      { title: "No Water Supply for 3 Consecutive Days", details: "There has been absolutely no municipal water supply in our locality for the past three days. We are forced to purchase private water tankers at high prices." },
      { title: "Major Drinking Water Pipeline Leakage", details: "A main drinking water pipeline has burst near the local playground. Thousands of gallons of clean water are being wasted and flooding the road." },
      { title: "Low Pressure Water Supply", details: "The pressure of municipal water is extremely low, making it impossible to fill storage tanks. Even ground floor apartments are struggling to get water." }
    ]
  },
  {
    category: "Electricity",
    issues: [
      { title: "Unscheduled Power Outages and Fluctuations", details: "Our neighborhood is experiencing frequent, unannounced power cuts of 3-4 hours daily, coupled with high voltage fluctuations that are damaging our electronic appliances." },
      { title: "Dangling High-Voltage Power Lines", details: "High-voltage overhead power cables are dangling dangerously close to the main street. This poses an immediate life-threatening risk to pedestrians and children." },
      { title: "Blown Out Distribution Transformer", details: "The local distribution transformer burned out yesterday evening. The entire block is currently without electricity. Immediate replacement is requested." },
      { title: "Incorrect Meter Billing and Delays", details: "I have received an abnormally high electricity bill this month which does not align with my actual usage. Also, my request for a new meter replacement has been delayed for over a month." }
    ]
  },
  {
    category: "Roads & Infrastructure",
    issues: [
      { title: "Severe Potholes on Main Sector Road", details: "The main connecting road has developed massive potholes, making it extremely hazardous for motorbikes and cars. Several minor accidents have already occurred." },
      { title: "Damaged Speed Breakers and Missing Road Signs", details: "The local speed breakers have degraded and are invisible due to lack of paint, leading to vehicles hitting them at high speed. There are also no warning signs installed." },
      { title: "Incomplete Road Construction and Open Excavations", details: "Road widening work was started three months ago and left halfway. The excavated soil is piled up on the sides, severely narrowing the motorable road." },
      { title: "Open Trench Left Unattended by Contractor", details: "The contractor left a deep sewer trench open and unattended without any barricading or warning signs. It represents a serious trap for citizens at night." }
    ]
  },
  {
    category: "Sanitation & Waste Management",
    issues: [
      { title: "Irregular Garbage Collection Services", details: "The garbage collection vehicle is highly irregular, visiting once a week instead of daily. Residents are accumulating waste, which attracts stray animals." },
      { title: "Overflowing Garbage Dumpsite on Main Road", details: "The community garbage bin is overflowing onto the main road. No municipal clearance has happened for the past five days, producing an intolerable stench." },
      { title: "Lack of Public Dustbins in Market Areas", details: "There are no public dustbins installed in the main market sector, prompting people to throw plastic waste, wrappers, and litter on the road." },
      { title: "Open Dumping and Burning of Plastic Waste", details: "Local sweepers are dumping garbage in open plots and setting fire to dry leaves and plastic wastes, causing thick smoke and breathing difficulties for residents." }
    ]
  },
  {
    category: "Drainage & Sewerage",
    issues: [
      { title: "Blocked Underground Sewers and Overflow", details: "The underground drainage lines are completely choked, causing black sewage water to overflow onto the streets. It has created a highly unhygienic environment." },
      { title: "Foul Smell and Backflow in Residential Pipes", details: "Due to lack of de-silting in the main sewer lines, waste water is backing up into ground floor bathrooms, accompanied by a continuous foul smell." },
      { title: "Waterlogging in Residential Areas After Brief Rain", details: "Even a brief 15-minute rain leads to knee-deep water logging in our block because the storm drains are blocked with plastic and debris." },
      { title: "Broken and Missing Drainage Manhole Covers", details: "Multiple concrete manhole covers on the street are broken or completely missing. This is a severe threat, especially during monsoon rains when the road is flooded." }
    ]
  },
  {
    category: "Street Lighting",
    issues: [
      { title: "Non-Functional Streetlights in Residential Lane", details: "All streetlights in our lane have been inactive for over two weeks, causing absolute darkness at night and increasing safety concerns." },
      { title: "Broken and Rusted Streetlight Poles", details: "The streetlight poles near the main gate have rusted heavily at the base and are leaning dangerously. They might collapse during high winds." },
      { title: "Dark Zones Near High-Risk Crossings", details: "The major crossing near the bypass has no functional lighting, leading to frequent near-miss accidents in the evening. Urgent installation is required." },
      { title: "Streetlights Kept On During Daytime", details: "The streetlights in ward 12 are left running throughout the day due to manual switch errors, wasting public electricity resources." }
    ]
  },
  {
    category: "Public Transport & Traffic",
    issues: [
      { title: "Non-Functional Traffic Signal at Major Intersection", details: "The main traffic lights at the local intersection have been flashing orange or turned off completely, leading to massive traffic jams and chaos." },
      { title: "Illegal Parking and Footpath Encroachment", details: "Shopkeepers and vehicle owners have occupied the footpaths, forcing pedestrians to walk on the busy main road, risking their lives." },
      { title: "Lack of Proper Bus Shelters", details: "The local bus stop has no shed or benches. Passengers are forced to stand in the scorching sun or heavy rain while waiting for transit." },
      { title: "Reckless Driving of Auto-Rickshaws and Totos", details: "Auto-rickshaws and battery-operated Totos are driving on the wrong side and stopping abruptly in the middle of roads, causing daily accidents." }
    ]
  },
  {
    category: "Public Health & Hygiene",
    issues: [
      { title: "Stray Dog Menace and Aggression", details: "A large number of stray dogs have gathered in our locality. They have chased and bitten several children and elderly residents recently. Urgent control is requested." },
      { title: "Mosquito Breeding in Stagnant Pools", details: "There are huge pools of stagnant water in empty municipal plots. The area has not been sprayed with bleaching powder or mosquito oil, leading to a dengue scare." },
      { title: "Unregulated Meat Shops and Animal Waste Disposal", details: "Local meat shops are throwing offal and blood directly into the open drains, causing a terrible smell and attracting crows and stray animals." }
    ]
  },
  {
    category: "Environment & Pollution",
    issues: [
      { title: "High Noise Levels from Late-Night Loudspeakers", details: "Local festival groups and banquet halls are using high-decibel amplifiers and playing loud music well past 11 PM, violating noise laws and disturbing students." },
      { title: "Discharge of Untreated Commercial Effluents", details: "Local washing units and small factories are dumping chemical-laden colored water directly into nearby natural ponds, killing fish and polluting the ground water." },
      { title: "Illegal Tree Felling in Green Belt", details: "Certain private elements are cutting down mature green trees in the municipal park buffer zone at night. Immediate inspection and action are required." }
    ]
  },
  {
    category: "Public Parks & Recreation",
    issues: [
      { title: "Broken Swings and Slides in Children's Park", details: "The swings, slides, and see-saws in our neighborhood children's park are broken, with sharp metal edges exposed, making it unsafe for kids." },
      { title: "Overgrown Weed and Litter in Community Park", details: "The local park is completely unmaintained. Weeds have grown waist-high, and empty bottles and plastic packets are littered everywhere, turning it into a dump yard." },
      { title: "Lack of Drinking Water and Benches for Seniors", details: "The central park lacks drinking water facilities and seating benches, making it extremely difficult for senior citizens who visit for morning and evening walks." }
    ]
  }
];

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully.");

    // 1. Clean previous non-admin users and grievances
    console.log("Cleaning old non-admin users and all grievances...");
    const deletedGrievances = await Grievance.deleteMany({});
    const deletedUsers = await User.deleteMany({ role: { $ne: "admin" } });
    console.log(`Cleared ${deletedGrievances.deletedCount} grievances and ${deletedUsers.deletedCount} non-admin users.`);

    // 2. Hash password once to speed up user insertion
    console.log("Generating password hash for 'password123'...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // 3. Generate 200 users
    console.log("Generating 200 user accounts...");
    const usersData = [];
    const usedEmails = new Set();

    for (let i = 1; i <= 200; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const fullName = `${fName} ${lName}`;
      
      let email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@example.com`;
      // Ensure absolute uniqueness just in case
      while (usedEmails.has(email)) {
        email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i}_${Math.floor(Math.random() * 1000)}@example.com`;
      }
      usedEmails.add(email);

      usersData.push({
        name: fullName,
        email: email,
        password: hashedPassword,
        role: "user"
      });
    }

    const insertedUsers = await User.insertMany(usersData);
    console.log(`Successfully created ${insertedUsers.length} users.`);

    // 4. Generate 1000 grievances linked to these users
    console.log("Generating 1000 grievances...");
    const grievancesData = [];

    for (let i = 1; i <= 1000; i++) {
      // Pick a random user from the newly created users
      const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
      
      // Select random district, location, pincode
      const district = districts[Math.floor(Math.random() * districts.length)];
      const loc = locations[Math.floor(Math.random() * locations.length)];
      const address = `${loc}, near ward no. ${Math.floor(Math.random() * 50) + 1}`;
      const pincode = pincodes[Math.floor(Math.random() * pincodes.length)];
      
      // Contact number: 10 digits starting with 7, 8 or 9
      const contactNum = `${Math.floor(Math.random() * 3) + 7}${Math.floor(100000000 + Math.random() * 900000000)}`;

      // Pick random grievance template category and issue
      const category = grievanceTemplates[Math.floor(Math.random() * grievanceTemplates.length)];
      const issue = category.issues[Math.floor(Math.random() * category.issues.length)];

      // Random priority (High priority is 25%, Medium is 50%, Low is 25%)
      const priorityRand = Math.random();
      const priority = priorityRand < 0.25 ? "Low" : (priorityRand < 0.75 ? "Medium" : "High");

      // Random status distribution
      const statusRand = Math.random();
      const status = statusRand < 0.3 ? "Created" : (statusRand < 0.6 ? "Pending" : (statusRand < 0.85 ? "Processing" : "Resolved"));

      // Random days offset to distribute dates across the past 30 days
      const daysOffset = Math.floor(Math.random() * 30);
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysOffset);

      grievancesData.push({
        user: randomUser._id,
        district: district,
        address: address,
        pincode: pincode,
        priority: priority,
        contactNum: contactNum,
        complaintTitle: issue.title,
        complaintDetails: `${issue.details} Location: ${address}, District: ${district}.`,
        supportingDocs: null,
        status: status,
        createdAt: createdAt,
        updatedAt: createdAt
      });
    }

    await Grievance.insertMany(grievancesData);
    console.log("Successfully created 1000 grievances.");

    console.log("Seeding completed successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
