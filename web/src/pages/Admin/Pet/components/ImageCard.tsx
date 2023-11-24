import { Image, X } from 'phosphor-react'

interface ImageCardProps {
  title: string
  file: File
  handleRemoveImage: (file: File) => void
}

export function ImageCard({ title, file, handleRemoveImage }: ImageCardProps) {
  return (
    <div className="flex justify-between items-center rounded-xl p-3 bg-transparent border border-blue-50">
      <div className="flex gap-3 items-center justify-start">
        <Image className="text-blue-50" size={24} />
        <h1 className="text-sm text-blue-900">{title}</h1>
      </div>
      <button
        onClick={() => handleRemoveImage(file)}
        type="button"
        className="flex justify-center items-center border-2 border-red-700 rounded-lg"
      >
        <X className="text-red-700" size={20} />
      </button>
    </div>
  )
}
