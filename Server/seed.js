const db = require("./api/models/index");
const defineAssociations = require("./api/init_Models/associations");

const seedDatabase = async () => {
  try {
    console.log("🚀 Starting fresh database seed...");
    defineAssociations(db);

    // 1. RE-SYNC DATABASE (WIPE ALL DATA AND RESET IDS)
    console.log("Wiping database and resetting IDs...");
    await db.sequelize.sync({ force: true });

    // 2. SEED LANGUAGES
    console.log("Seeding Languages...");
    const languagesData = [
      {
        name: "JavaScript",
        description: "The versatile language of the web. Master ES6+, async programming, and modern frameworks.",
        logo: "ri-javascript-line",
        difficulty: "Beginner to Advanced",
        estimatedTime: "3-4 months",
        gradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
        color: "border-yellow-400 hover:border-yellow-500",
        judge0_id: 63
      },
      {
        name: "Python",
        description: "Perfect for beginners and data science. Learn clean syntax and powerful libraries.",
        logo: "ri-code-s-slash-line",
        difficulty: "Beginner Friendly",
        estimatedTime: "2-3 months",
        gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
        color: "border-blue-400 hover:border-blue-500",
        judge0_id: 71
      },
      {
        name: "Java",
        description: "Enterprise-grade object-oriented programming. Build scalable applications.",
        logo: "ri-cup-line",
        difficulty: "Intermediate",
        estimatedTime: "4-5 months",
        gradient: "bg-gradient-to-r from-red-400 to-red-600",
        color: "border-red-400 hover:border-red-500",
        judge0_id: 62
      },
      {
        name: "C++",
        description: "High-performance system programming. Master memory management and algorithms.",
        logo: "ri-terminal-box-line",
        difficulty: "Advanced",
        estimatedTime: "5-6 months",
        gradient: "bg-gradient-to-r from-purple-400 to-purple-600",
        color: "border-purple-400 hover:border-purple-500",
        judge0_id: 54
      }
    ];

    const createdLangs = await db.Language.bulkCreate(languagesData, { returning: true });
    
    // 3. SEED TOPICS & SUBTOPICS
    console.log("Seeding Topics & Subtopics...");
    const baseTopics = [
      "Introduction & Syntax",
      "Data Structures",
      "Control Flow",
      "Object Oriented Programming",
      "Algorithms",
      "Advanced Patterns"
    ];

    for (const lang of createdLangs) {
      const topicRecords = await db.Topic.bulkCreate(
        baseTopics.map(t => ({
          name: `${lang.name} ${t}`,
          description: `Master ${t} in ${lang.name}`,
          languageId: lang.id
        })),
        { returning: true }
      );

      for (const topic of topicRecords) {
        // Create 5 subtopics per topic
        const subtopicRecords = await db.Subtopic.bulkCreate(
          [1, 2, 3, 4, 5].map(i => ({
            name: `${topic.name} Module ${i}`,
            difficulty: ["Easy", "Medium", "Hard"][i % 3],
            definition: `Core concepts of ${topic.name} part ${i}`,
            topicId: topic.id
          })),
          { returning: true }
        );

        // Create Content for each subtopic
        const contentData = subtopicRecords.map(sub => ({
          title: `Deep Dive: ${sub.name}`,
          explanation: `Comprehensive guide to ${sub.name}. This module covers the theoretical foundations and implementation details.`,
          examples: [
            { title: "Basic Usage", code: `// Example for ${sub.name}\nconsole.log("Hello ${lang.name}!");` },
            { title: "Advanced Pattern", code: `function solve() {\n  return "${sub.name}";\n}` }
          ],
          interactiveCode: `// Try modifying this code\nlet input = "${sub.name}";\nconsole.log(input);`,
          subtopicId: sub.id
        }));
        
        const createdContents = await db.Content.bulkCreate(contentData, { returning: true });

        // Create 2 Practice Problems per content
        const practiceData = [];
        createdContents.forEach(content => {
          practiceData.push({
            title: `${content.title} Challenge A`,
            description: { text: `Solve this puzzle related to ${content.title}` },
            difficulty: "easy",
            examples: [{ input: "1", output: "1" }],
            contentId: content.id
          });
          practiceData.push({
            title: `${content.title} Challenge B`,
            description: { text: `More advanced exercise for ${content.title}` },
            difficulty: "medium",
            examples: [{ input: "A", output: "B" }],
            contentId: content.id
          });
        });
        await db.PracticeProblems.bulkCreate(practiceData);
      }
    }

    // 4. SEED GLOBAL PROBLEMS (100+ mixed problems)
    console.log("Seeding 100+ Global Problems...");
    const globalProblems = [];
    const companies = ["Google", "Amazon", "Microsoft", "Apple", "Facebook", "Netflix"];
    const tags = ["Array", "String", "Hash Table", "DP", "Graph", "Greedy", "Binary Search"];

    for (let i = 1; i <= 100; i++) {
        const difficulty = ["Easy", "Medium", "Hard"][i % 3];
        globalProblems.push({
          title: `Algorithm Challenge #${i}`,
          description: { text: `Detailed problem description for challenge #${i}. Given a specific input, return the optimized output.` },
          category: ["Array", "String", "DP", "Graph"][i % 4],
          difficulty: difficulty,
          acceptance: parseFloat((Math.random() * 40 + 30).toFixed(1)),
          frequency: ["High", "Medium", "Low"][i % 3],
          companies: [companies[i % companies.length], companies[(i + 1) % companies.length]],
          tags: [tags[i % tags.length], tags[(i + 2) % tags.length]],
          constraints: { text: "1 <= n <= 10^5\n-10^9 <= val <= 10^9" },
          examples: [{ input: "nums = [1,2,3]", output: "6" }],
          template: { javascript: "// solution here\n", python: "# solution here\n" },
          testCases: [{ input: "1", expected: "1" }]
        });
    }

    await db.Problems.bulkCreate(globalProblems);

    // 5. SEED TEST USER (To prevent initial 'User not found' errors)
    console.log("Seeding Test User...");
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash("password123", 10);
    await db.Users.create({
      name: "Test Developer",
      email: "test@example.com",
      password: hashedPassword,
    });

    console.log("✅ Database seeded with dynamic ID mappings and Test User successfully! ✨");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();