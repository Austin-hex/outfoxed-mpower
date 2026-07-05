// Fill these in once you've created a free Cloudinary account.
// See README.md for exact steps.
export const CLOUD_NAME = 'iwushpfr'
export const UPLOAD_PRESET = 'mpower'

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error?.message || 'Image upload failed')
  }

  return data.secure_url
}
