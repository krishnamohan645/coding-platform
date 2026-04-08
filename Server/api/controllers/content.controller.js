const { Content, PracticeProblems } = require("../models");

exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.findAll();
    res.json(contents);
  } catch (err) {
    console.error("getAllContents error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getContent = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id, {
      include: [{ model: PracticeProblems }],
    });
    if (!content) return res.status(404).json({ error: "Not found" });
    res.json(content);
  } catch (err) {
    console.error("getContent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createContent = async (req, res) => {
  console.log(req.body, "Content from create content");
  try {
    const payload = { ...req.body };

    // Basic validation
    if (!payload.title || !payload.subtopicId) {
      return res
        .status(400)
        .json({ message: "title and subtopicId are required" });
    }

    // Accept examples as an array or a JSON string
    if (payload.examples && typeof payload.examples === "string") {
      try {
        payload.examples = JSON.parse(payload.examples);
      } catch (err) {
        return res
          .status(400)
          .json({
            message: "examples must be a JSON array/object or already parsed",
          });
      }
    }

    // Create record
    const content = await Content.create({
      title: payload.title,
      explanation: payload.explanation || null,
      examples: payload.examples || null,
      interactiveCode: payload.interactiveCode || null,
      subtopicId: payload.subtopicId,
    });

    res.status(201).json(content);
  } catch (error) {
    console.log(error, "Error creating Content");
    res.status(500).json({ message: "Error creating Content" });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) return res.status(404).json({ error: "Not found" });

    const payload = { ...req.body };
    if (payload.examples && typeof payload.examples === "string") {
      try {
        payload.examples = JSON.parse(payload.examples);
      } catch (e) {
        /* ignore */
      }
    }

    await content.update(payload);
    res.json(content);
  } catch (err) {
    console.error("updateContent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) return res.status(404).json({ error: "Not found" });
    await content.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("deleteContent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getContentBySubtopicId = async (req, res) => {
  try {
    const contents = await Content.findAll({
      where: { subtopicId: req.params.id },
    });
    res.status(200).json(contents);
  } catch (error) {
    console.error("getContentBySubtopicId error:", error);
    res.status(500).json({ message: "Failed to fetch content" });
  }
};
