// @flow

import fs from 'fs'
import Project from './projectModel'
import errorHandler from '../../../middleware/errorHandler'

function removeAsset(path, res) {
// eslint-disable-next-line consistent-return
  fs.unlink(`./public/blog/img/${path}`, err => {
    if (err) {
      return errorHandler(err, res)
    }
  })
}

export const list = async (req: Object, res: Object, next: Function) => {
  try {
    const projects = await Project.find({})
    return res.status(200).json(projects)
  } catch (err) {
    return errorHandler(err, res)
  }
}


export const create = async (req: Object, res: Object, next: Function) => {
  try {
    const background = (req.file && req.file !== 'undefined') ? req.file.filename : ''
    const projectObj = Object.assign(req.body, { background })
    const newProject = new Project(projectObj)
    await newProject.save()
    const projects = await Project.find({})
    return res.status(200).json(projects)
  } catch (err) {
    return errorHandler(Object.assign(err, { status: '500' }), res)
  }
}

export const projectById = async (req: Object, res: Object, next: Function, id: string) => {
  try {
    const project = await Project.findById(id)
    req.project = project
    return next()
  } catch (err) {
    return errorHandler(Object.assign(err, { status: '404' }), res)
  }
}

export const read = (req: Object, res: Object) => res.status(200).json(req.project)

export const update = async (req: Object, res: Object) => {
  try {
    let background = ''

    if (req.file && req.file !== 'undefined') {
      await removeAsset(`projects/${req.project.background}`, res)
      background = req.file.filename
    } else {
      background = req.project.background
    }

    const projectToUpdate = Object.assign(req.project, req.body, { background })
    await projectToUpdate.save()

    const projects = await Project.find({})
    return res.status(200).json(projects)
  } catch (err) {
    return errorHandler(Object.assign(err, { status: '400' }), res)
  }
}

export const remove = async (req: Object, res: Object) => {
  try {
    const projectToRemove = req.project
    if (projectToRemove.background) {
      await removeAsset(`projects/${projectToRemove.background}`, res)
    }
    await projectToRemove.remove()
    const projects = await Project.find({})
    res.status(200).json(projects)
  } catch (err) {
    return errorHandler(err, res)
  }
}
