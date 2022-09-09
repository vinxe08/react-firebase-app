type Props = {
  seed: string 
  size: string
}

function Avatar({seed, size}: Props) {
  
  return (
    <div className={`${size === "large" ? 'h-14 w-14' : size === "xl" ? 'h-24 w-24 border border-white' : 'h-10 w-10'} overflow-hidden rounded-full bg-blue-100 shrink-0`}>
      <img 
        className=''
        src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`} alt="Avatar" />
    </div>
  )
}

export default Avatar