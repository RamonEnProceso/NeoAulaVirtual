import profileData from '../assets/profile/profiledata.json'
import defaultAvatar from '../assets/profile/default.svg'

// Todas las fotos disponibles en assets/profile/photos/, resueltas a su URL.
const photos = import.meta.glob('../assets/profile/photos/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

// profileData.photo viene relativo al JSON (ej. "./photos/perfil.jpg").
function resolvePhoto(photoPath: string): string {
  const filename = photoPath.split('/').pop()
  const entry = Object.entries(photos).find(([path]) =>
    filename ? path.endsWith(`/${filename}`) : false,
  )
  return entry?.[1] ?? defaultAvatar
}

export const currentProfile = {
  ...profileData,
  photo: resolvePhoto(profileData.photo),
}
