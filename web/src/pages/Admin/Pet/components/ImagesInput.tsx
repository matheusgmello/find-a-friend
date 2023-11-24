import { CloudArrowUp } from 'phosphor-react'
import { ImageCard } from './ImageCard'
import { ChangeEvent, Dispatch, SetStateAction, useContext } from 'react'
import { AlertContext } from '@/context/AlertContext'

interface ImagesInputProps {
  images: File[]
  errorMessage?: string
  setImages: Dispatch<SetStateAction<File[]>>
}

export function ImagesInput({
  images,
  setImages,
  errorMessage,
}: ImagesInputProps) {
  const { alertDispatch } = useContext(AlertContext)
  function handleAddFile(file: File) {
    const isFileIncluded = images.find(
      (image) =>
        image.name === file.name &&
        image.type === file.type &&
        image.lastModified === file.lastModified &&
        image.size === file.size &&
        image.webkitRelativePath === file.webkitRelativePath,
    )

    const fileType = file.type.split('/')[0]

    if (isFileIncluded) {
      alertDispatch({
        action: 'warning',
        title: 'Imagem',
        description: 'Já existe',
      })
    }

    if (fileType !== 'image') {
      alertDispatch({
        action: 'warning',
        title: 'Arquivo',
        description: 'Não é uma imagem',
      })
    }

    if (images.length >= 6) {
      alertDispatch({
        action: 'warning',
        title: 'Imagem',
        description: 'Não é permitido enviar mais de 6 imagens',
      })
    }

    if (fileType === 'image' && !isFileIncluded && images.length < 6) {
      setImages((state) => [...state, file])
    }
  }

  function onRemoveImage(file: File) {
    setImages((state) => state.filter((image) => image !== file))
  }

  return (
    <div className="flex flex-col gap-2 select-none">
      <label
        htmlFor="images"
        className="flex gap-6 items-center font-semibold text-blue-900"
      >
        Fotos
      </label>
      <div className="flex flex-col gap-4">
        <div className="relative hover:opacity-70 transition-all flex rounded-xl flex-col text-blue-900 justify-center items-center w-full h-40 bg-blue-10 border border-blue-50">
          <input
            className="absolute w-full h-full opacity-0 cursor-pointer"
            type="file"
            name="images"
            id="images"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.files.length > 0) {
                handleAddFile(event.target.files[0])
              }
            }}
          />
          <CloudArrowUp size={24} />
          <h1 className="text-lg font-semibold">Arraste e solte o arquivo</h1>
        </div>
        {images.map((image, index) => (
          <ImageCard
            file={image}
            handleRemoveImage={onRemoveImage}
            key={image.name + index}
            title={image.name}
          />
        ))}
        {errorMessage && (
          <p className="font-semibold text-red-400 ">{errorMessage}</p>
        )}
      </div>
    </div>
  )
}
