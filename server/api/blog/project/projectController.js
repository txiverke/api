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
  try {
    const projectObj = Object.assign({}, req.body, {
      background: req.file.filename,
      creator: JSON.parse(req.body.creator),
    })

    const newProject = new Project(projectObj)
    await newProject.save()
    const projects = await Project.find({})
    return res.status(200).json(projects)
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

exports.update = async (req, res, next) => {
  try {
    const background = (req.file && req.file !== 'undefined')
      ? req.file.filename
      : req.post.background

    const projectToUpdate = Object.assing(req.project, req.body, {  background })
    await projectToUpdate.save()

    const projects = await Project.find({})
    return res.status(200).json(projects)
  } catch (err) {
    return next(newErr(err, '400'))
  }
}

exports.remove = async (req, res, next) => {
  try {
    const projectToRemove = req.project
    await removeAsset(`projects/${projectToRemove.background}`, next)
    const projects = await Project.find({})
    res.status(200).json(projects)
  } catch (err) {
    next(newErr(err, '400'))
  }
}

function removeAsset(path, next) {
  fs.unlink(`./public/blog/img/${path}`, err => {
    if (err) return next(newErr(err, '400'))
  }) 
}