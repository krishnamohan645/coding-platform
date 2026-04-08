const { Subtopic, Content } = require("../models");

exports.getAllSubtopics = async (req, res) => {
  const subtopics = await Subtopic.findAll();
  res.json(subtopics);
};

exports.getSubtopic = async (req, res) => {
  try {
    const subtopicId = req.params.id;
    if (!subtopicId) {
      res.status(400).json({ message: "Id not found" });
    }
    const subtopic = await Subtopic.findByPk(subtopicId, {
      include: [
        {
          model: Content,
        },
      ],
    });
    if (!subtopic) return res.status(404).json({ error: "Not found" });
    res.json(subtopic);
  } catch (error) {
    console.log(error, "Error Retreiving content from sub topics id");
    res
      .status(500)
      .json({ message: "Error Retreiving content from sub topics id" });
  }
};

exports.createSubtopic = async (req, res) => {
  console.log(req.body, "data in sub topic");
  try {
    const subtopic = await Subtopic.create(req.body);
    res.status(201).json(subtopic);
  } catch (error) {
    console.log(error, "Error creating sub topics");
    res.status(500).json({ message: "Error creating sub topics" });
  }
};

exports.updateSubtopic = async (req, res) => {
  const subtopic = await Subtopic.findByPk(req.params.id);
  if (!subtopic) return res.status(404).json({ error: "Not found" });
  await subtopic.update(req.body);
  res.json(subtopic);
};

exports.deleteSubtopic = async (req, res) => {
  const subtopic = await Subtopic.findByPk(req.params.id);
  if (!subtopic) return res.status(404).json({ error: "Not found" });
  await subtopic.destroy();
  res.status(204).send();
};
