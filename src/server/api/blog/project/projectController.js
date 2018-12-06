// @flow

import Project from './projectModel'
import errorHandler from '../../../middleware/errorHandler'
import cloudinary from 'cloudinary'

function removeAsset(id, res) {
  cloudinary.v2.uploader.destroy(id, (err, result) => errorHandler(err, res))
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
    let background, background_id

    if (req.file && req.file !== 'undefined') {
      background = req.file.secure_url
      background_id = req.file.public_id
    }

    const projectObj = Object.assign(req.body, { background, background_id })
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
    let background, background_id

    if (req.file && req.file !== 'undefined') {
      await removeAsset(req.project.background_id, res)
      background = req.file.secure_url
      background_id = req.file.public_id
    } else {
      background = req.project.background
      background_id = req.project.background_id
    }

    const projectToUpdate = Object.assign(req.project, req.body, { background, background_id })
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

    if (req.project.background) await removeAsset(req.project.background_id, res)

    await projectToRemove.remove()
    const projects = await Project.find({})
    res.status(200).json(projects)
  } catch (err) {
    return errorHandler(err, res)
  }
}
