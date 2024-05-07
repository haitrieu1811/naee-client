import { useMutation } from '@tanstack/react-query'

import filesApis from '@/apis/files.apis'

const useUploadImage = () => {
  const uploadImageMutation = useMutation({
    mutationKey: ['upload-image'],
    mutationFn: filesApis.uploadImage
  })

  return {
    uploadImageMutation
  }
}

export default useUploadImage
