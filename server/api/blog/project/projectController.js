const Project = require('./projectModel')
const newErr = require('../../../util/errorStatus')

exports.list = async (req, res, next) => {
  try {
    const projects = await Project.find({})
    return res.status(200).json(projects)
  } catch (err) {
    return next(newErr(err, '400'))
  }
}

exports.create = async (req, res, next) => {
  const newProject = new Project(req.body)

  try {
    const project = await newProject.save()
    return res.status(200).json(project)
  } catch (err) {
    return next(newErr(err, '400'))
  }
}

exports.projectById = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id)
    req.project = project
    next()
  } catch (err) {
    return next(newErr(err, '400'))
  }
}

exports.read = (req, res) => res.status(200).json(req.project)