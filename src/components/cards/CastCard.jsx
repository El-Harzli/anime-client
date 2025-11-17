function CastCard({data}) {
  return (
    <article className='w-full rounded-md bg-white/15 backdrop-blur-md flex items-center justify-between py-3 px-2 gap-x-3'>
        <div className='max-w-40 flex'>
            <div className='flex justify-start items-center gap-x-2'>
                <img className='size-10 rounded-full object-cover ' src={data.characterImg} alt={data.characterName} />
                <div className='text-xs flex flex-col gap-y-1'>
                    <p className='text-start text-white'>{data.characterName}</p>
                    <p className='text-start text-white/50'>{data.characterRole}</p>
                </div>
            </div>
        </div>
        <div className='max-w-40 flex'>
            <div className='flex justify-end items-center gap-x-2'>
                <div className='text-xs flex flex-col gap-y-1'>
                    <p className='text-end text-white'>{data.voiceActorName}</p>
                    <p className='text-end text-white/50'>{data.voiceActorNationality}</p>
                </div>
                <img className='size-10 rounded-full object-cover ' src={data.voiceActorImg} alt={data.voiceActorName} />
            </div>
        </div>
    </article>
  )
}

export default CastCard