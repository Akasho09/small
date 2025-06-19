export function Separator({ orientation = 'horizontal', className = '' }) {
  return <div className={`${orientation==='vertical'? 'w-px h-6':'h-px w-full'} bg-gray-300 ${className}`}/>
}
