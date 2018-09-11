import Image from './imageModel'

export const list = async (req, res) => {
  try{
    const images = await Image.find({})
    return res.status(200).json({ success: true, data: images })
  } catch (err) {
    return res.status(500).json({ success: false, data: err })
  }
}

export const create = async (req, res) => {
  try {
    const newImage = new Image(req.body)
    await newImage.save()
    const images = await Image.find({})
    return res.status(201).json({ success: true, data: images })
  } catch (err) {
    return res.status(500).json({ success: false, data: err })
  }
}

export const read = (req, res) => res.status(200).json(req.image)

export const update = async (req, res) => {
  try {
    const updateImage = Object.assign(req.image, req.body)
    await updateImage.save()
    const images = await Image.find({})
    return res.status(200).json({ success: true, data: images })
  } catch (err) {
    return res.status(500).json({ success: false, data: err })
  }
}

export const yearList = (req, res) => {
  const images = req.image
  return res.status(200).send(images)
}

export const imageById = async (req, res, next, id) => {
  try {

    req.image = await Image.findById(id)
    next()
  } catch (err) {
    return res.status(404).json({ success: false, data: err })
  }
}

export const imageByYear = async (req, res, next, year) => {
  try {
    req.image = await Image.find({'year': year})
    next()
  } catch (err) {
    return res.status(404).json({ success: false, data: err })
  }
}