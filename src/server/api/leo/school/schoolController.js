import School from './schoolModel'
import config from '../../../config'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const OAuth2 = google.auth.OAuth2

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
    await setMail(newSchool)
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

const setMail = school => {

  const oauth2Client = new OAuth2(
    "1067546246706-mf3u14dfbl9lhrpqpl61nrq41lkrlico.apps.googleusercontent.com", // ClientID
    "3Stb9mRd1vtrI0CcVarPAfGq", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  )

  oauth2Client.setCredentials({
    refresh_token: "1/6rUgSY_YdEQXXLeuRawG_U-H1gwOdGZMpxIgfUh2djA"
  });
    
  const accessToken = oauth2Client.refreshAccessToken()
    .then(res => res.credentials.access_token)
    .catch(err => console.log('accessTokenError: ',err))

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
          type: "OAuth2",
          user: "leoleoconcurso@gmail.com", 
          clientId: "1067546246706-mf3u14dfbl9lhrpqpl61nrq41lkrlico.apps.googleusercontent.com",
          clientSecret: "3Stb9mRd1vtrI0CcVarPAfGq",
          refreshToken: "1/6rUgSY_YdEQXXLeuRawG_U-H1gwOdGZMpxIgfUh2djA",
          accessToken: accessToken
    }
  });
  
  const mailOptions = {
    from: 'leoleoconcurso@gmail.com', // sender address
    to: `txiverke@gmail.com, ${school.email}`, // list of receivers
    subject: 'Nueva escuela registrada!!', // Subject line
    generateTextFromHTML: true,
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
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });

}