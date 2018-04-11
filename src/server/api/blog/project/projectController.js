// @flow

import fs from 'fs'
import Project from './projectModel'
import newErr from '../../../util/errorStatus'

function removeAsset(path, next) {
// eslint-disable-next-line consistent-return
  fs.unlink(`./public/blog/img/${path}`, err => {
    if (err) {
      return next(newErr(err, '400'))
    }
  })
}

export const list = async (req: Object, res: Object, next: Function) => {
  try {
    const projects = await Project.find({})
    return res.status(200).json(projects)
  } catch (err) {
    return next(newErr(err, '400'))
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
    return next(newErr(err, '400'))
  }
}

export const projectById = async (req: Object, res: Object, next: Function, id: string) => {
  try {
    const project = await Project.findById(id)
    req.project = project
    return next()
  } catch (err) {
    return next(newErr(err, '400'))
  }
}

export const read = (req: Object, res: Object) => res.status(200).json(req.project)

export const update = async (req: Object, res: Object, next: Function) => {
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

export const remove = async (req: Object, res: Object, next: Function) => {
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
