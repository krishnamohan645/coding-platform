const { PracticeProblems } = require("../models");

exports.createPracticeProblems = async (req, res, next) => {
  console.log(req.body, "data in practice problems");
  try {
    const practiceProblems = await PracticeProblems.create(req.body);
    res.status(201).json(practiceProblems);
  } catch (err) {
    next(err);
  }
};

exports.getAllPracticeProblems = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const { rows: practiceProblems, count: total } =
      await PracticeProblems.findAndCountAll({
        offset,
        limit,
        order: [["id", "DESC"]],
      });

    if (!practiceProblems || practiceProblems.length === 0)
      return res.status(404).json({ error: "Not found" });
    console.log(practiceProblems, "practice problems");

    res.status(200).json({
      totalItem: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      pageSize: limit,
      data: practiceProblems,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPracticeProblems = async (req, res, next) => {
  try {
    const id = req.params.id;
    const practiceProblems = await PracticeProblems.findByPk(id);
    if (!practiceProblems) return res.status(404).json({ error: "Not found" });
    return res.json(practiceProblems);
  } catch (err) {
    next(err);
  }
};
