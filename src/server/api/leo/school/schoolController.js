import School from './schoolModel'
import config from '../../../config'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'


export const list = async (req, res) => {
  try {
    const schools = await School.find({})
    return res.status(200).json({ success: true, data: schools })
  } catch (err) {
    return res.status(500).json({ success: false, data: err })
  }
}

export const create = async (req, res) => {
  try {
    const newSchool = await new School(req.body)
    await newSchool.save()
    await sendMail(newSchool)
    const schools = await School.find({})
    return res.status(201).json({ success: true, data: schools })
  } catch (err) {
    return res.status(500).json({ success: false, data: err })
  }
}

export const update = async (req, res) => {
  try {
    const updateSchool = Object.assign(req.school, req.body)
    await updateSchool.save()
    const schools = await School.find({})
    return res.status(200).json({ success: true, data: schools })
  } catch (err) {
    return res.status(500).json({ success: false, data: err })
  }
}

export const remove = async (req, res) => {
  try {
    const schoolToRemove = req.school 
    await schoolToRemove.remove()
    const schools = await School.find({})
    return res.status(200).json({ success: true, data: schools })
  } catch (err) {
    return res.status(500).json({ success: false, data: err })
  }
}

export const schoolById = async (req, res, next, id) => {
  try {
    req.school = await School.findById(id)
    next()
  } catch (err) {
    return res.status(404).json({ success: false, data: err })
  }
}

const sendMail = school => {

  let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.mail.user,
      pass: config.mail.pass
    }
   }))

  let mailOptions = {
      from: '"Leo, leo... ¿Qué lees?" <leoeloconcurso@gmail.com>', // sender address
      to: 'txiverke@gmail.com', // list of receivers
      subject: 'Nueva escuela registrada!!', // Subject line
      text: 'Nueva escuela registrada', // plain text body
      html: `
        <h1>${school.name} se ha registrado en el concurso leo, leo... ¿qué lees?</h1>
        <br />
        <h2><small>Persona de contacto: </small>${school.name}</h2>
        <h2><small>Persona de contacto: </small>${school.contact}</h2>
        <h2><small>Teléfono: </small>${school.phone}</h2>
        <h2><small>Email: </small>${school.email}</h2>  
        <br /><br />  
        <p>&copy; Leo, leo... ¿Qué lees?</p>
      `
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
}