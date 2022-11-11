import axios from 'axios'
const API_URL = 'http://localhost:3001/api/upload'

// API_URL + '/cloudinary-upload', fileToUpload
export const postUpload = async (fileToUpload) => {
  const res = await axios.post(API_URL + '/post', fileToUpload)
  // console.log(res)
  return res.data
}

export const avatarUpload = async (fileToUpload) => {
  const res = await axios.post(API_URL + '/avatar', fileToUpload)
  // console.log(res)
  return res.data
}

// example form

// const handleFileUpload = async (e) => {
//   const uploadData = new FormData()
//   uploadData.append('file', e.target.files[0], 'file')
//   const url = await postUpload(uploadData)
//   console.log(url)
// }
// return (
//   <div>
//     <input type="file" onChange={(e) => handleFileUpload(e)} />
//   </div>
// )
