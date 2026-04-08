const { Topic, Subtopic, Language } = require("../models");

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll();
    if (topics.length === 0) {
      res.status(404).json({ message: "No topics available" });
    }
    return res.status(200).json(topics);
  } catch (error) {
    console.log(error, "Error retreiving topics");
    res.status(500).json({ message: "Error retreiving topics from database" });
  }
};

exports.getTopic = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "Id not found" });
    }
    const topic = await Topic.findByPk(id, {
      include: [
        {
          model: Subtopic,
          attributes: ["id", "name", "definition", "difficulty"],
        },
        {
          model: Language,
        },
      ],
    });
    if (!topic) return res.status(404).json({ error: "Not found" });
    res.json(topic);
  } catch (error) {
    console.log(error, "Error retreiving sub topics by topic id");
    res
      .status(500)
      .json({ message: "Error retreiving sub topics by topic id" });
  }
};

exports.createTopic = async (req, res) => {
  console.log(req.body, "data in topic post");
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Topic details required" });
    }
    if (!req.body.name || req.body.name.trim() === "") {
      return res.status(400).json({ message: "Topic name is required" });
    }

    const topic = await Topic.create(req.body);
    return res
      .status(201)
      .json({ message: "Topic successfully created", topic });
  } catch (error) {
    console.log(error.stack || error, "Error creating topic");
    res.status(500).json({ message: "Error creating topic" });
  }
};

exports.updateTopic = async (req, res) => {
  const topic = await Topic.findByPk(req.params.id);
  if (!topic) return res.status(404).json({ error: "Not found" });
  await topic.update(req.body);
  res.json(topic);
};

exports.deleteTopic = async (req, res) => {
  const topic = await Topic.findByPk(req.params.id);
  if (!topic) return res.status(404).json({ error: "Not found" });
  await topic.destroy();
  res.status(204).send();
};
