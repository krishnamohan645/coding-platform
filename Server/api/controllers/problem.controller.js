const Problems = require("../models/problem.model");
const UserActivity = require("../models/userActivity.model");

exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problems.findAll({
      include: [
        {
          model: UserActivity,
          where: {
            user_id: req.user.id,
            problem_type: "problem",
          },
          required: false,
          attributes: ["status", "attempts_count", "last_submitted_at"],
        },
      ],
    });
    if (!problems || problems.length === 0)
      return res.status(404).json({ error: "Not found" });
    return res.json(problems);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getProblems = async (req, res) => {
  try {
    const id = req.params.id;
    const problem = await Problems.findByPk(id);
    if (!problem) return res.status(404).json({ error: "Not found" });
    return res.json(problem);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createProblem = async (req, res) => {
  try {
    const problem = await Problems.create(req.body);
    return res.status(201).json({ message: "Created successfully", problem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Problems.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Not Found" });
    const updatedProblem = await Problems.findByPk(id);
    return res
      .status(200)
      .json({ message: "Updated successfully", problem: updatedProblem });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.DeleteProblem = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Problems.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Not Found" });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
