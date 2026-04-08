const db = require("../models");
const { Language, Topic, Roadmap } = require("../models");

exports.getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll();
    if (languages.length === 0) {
      res.status(404).json({ message: "No languages available" });
    }
    return res.status(200).json(languages);
  } catch (error) {
    console.log(error, "Error retreiving languages");
    res.status(500).json({ message: "Error retreiving langauges from db" });
  }
};

exports.getLanguage = async (req, res) => {
  try {
    const languageId = req.params.id;
    if (!languageId) {
      res.status(404).json({ message: "Id not found" });
    }
    const language = await Language.findByPk(languageId, {
      include: [{ model: Topic }],
    });
    if (!language) return res.status(404).json({ error: "Not found" });
    res.json(language);
  } catch (error) {
    console.log(error, "Error retreiving topics by languageId");
    res.status(500).json({ message: "Error retreiving topics by languageId" });
  }
};

exports.createLanguage = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Language details required" });
    }
    const language = await Language.create(req.body);
    res
      .status(201)
      .json({ message: "Language Successfully created", language });
  } catch (error) {
    console.log(error, "Error creating languages");
    res.status(500).json({ message: "Error Creating languages" });
  }
};

exports.updateLanguage = async (req, res) => {
  const language = await Language.findByPk(req.params.id);
  if (!language) return res.status(404).json({ error: "Not found" });
  await language.update(req.body);
  res.json(language);
};

exports.deleteLanguage = async (req, res) => {
  const language = await Language.findByPk(req.params.id);
  if (!language) return res.status(404).json({ error: "Not found" });
  await language.destroy();
  res.status(204).send();
};
exports.getLanguagesForRoadmap = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const languages = await Language.findAll({
      attributes: ["id", "name", "description", "color", "logo", "gradient"],
      include: [
        {
          model: Topic,
          attributes: ["id", "name"],
          include: [
            {
              model: db.Subtopic,
              attributes: ["id", "name", "difficulty"],
            },
            {
              model: Roadmap,
              as: "progress",
              where: { userId: req.user.id },
              required: false,
              attributes: ["completed"],
            },
          ],
        },
      ],
      order: [
        ["id", "ASC"],
        [Topic, "id", "ASC"],
      ],
    });

    res.status(200).json(languages);
  } catch (err) {
    next(err);
  }
};

// controllers/roadmap.controller.js
exports.toggleTopicCompletion = async (req, res, next) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { topicId } = req.body;

    const record = await Roadmap.findOne({
      where: { userId, topicId },
    });

    if (record) {
      record.completed = !record.completed;
      await record.save();
      return res.json(record);
    }

    const newRecord = await Roadmap.create({
      userId,
      topicId,
      completed: true,
    });

    res.json(newRecord);
  } catch (err) {
    next(err);
  }
};
