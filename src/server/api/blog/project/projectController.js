const fs = require('fs')

const Project = require('./projectModel')
const newErr = require('../../../util/errorStatus')

function removeAsset(path, next) {
// eslint-disable-next-line consistent-return
  fs.unlink(`./public/blog/img/${path}`, err => {
    if (err) {
      return next(newErr(err, '400'))
    }
  })
}

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
    const background = (req.file && req.file !== 'undefined') ? req.file.filename : ''
    const projectObj = Object.assign(req.body, { background })
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
    return next()
  } catch (err) {
    return next(newErr(err, '400'))
  }
}

exports.read = (req, res) => res.status(200).json(req.project)

exports.update = async (req, res, next) => {
  try {
    let background = ''

    if (req.file && req.file !== 'undefined') {
      await removeAsset(`projects/${req.project.background}`, next)
      background = req.file.filename
    } else {
      background = req.project.background
    }

    const projectToUpdate = Object.assign(req.project, req.body, { background })
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
    if (projectToRemove.background) {
      await removeAsset(`projects/${projectToRemove.background}`, next)
    }
    await projectToRemove.remove()
    const projects = await Project.find({})
    res.status(200).json(projects)
  } catch (err) {
    next(newErr(err, '400'))
  }
}
