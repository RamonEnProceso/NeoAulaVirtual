import profileData from '../assets/profile/profiledata.json'
import defaultAvatar from '../assets/profile/default.svg'
import type { Profile } from './types/profile.ts'

// profileData.photo es una URL pública servida desde /public (ej. "/photos/perfil.jpg").
export const currentProfile : Profile = {
  ...profileData,
  foto: profileData.foto || defaultAvatar,
}
