export default function Image({ src, caption }) {
  return (
    <div>
      <img src={src} className="object-cover w-full h-fit" alt="" />
      <p>{caption}</p>
    </div>
  )
}
