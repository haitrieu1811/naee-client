type HeadingProps = {
  title: string
  description?: string
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className='space-y-1'>
      <h2 className='font-semibold text-lg capitalize tracking-tight'>{title}</h2>
      {description && <div className='text-sm text-muted-foreground'>{description}</div>}
    </div>
  )
}

export default Heading
