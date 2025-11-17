import { FaClosedCaptioning } from 'react-icons/fa';
import { FaMicrophone } from 'react-icons/fa';

function Badges({ sub, dub }) {
  return (
    <div className="flex items-center justify-start gap-0.5">
      {sub > 0 && (
        <div
          className={` leading-snug flex justify-start items-center text-xs gap-1 bg-green-300 px-1.5 font-semibold py-0.5 rounded-tl-md rounded-bl-md
            ${dub ? 'rounded-tr-none rounded-br-none' : 'rounded-tr-md rounded-br-md'}`}
        >
          <FaClosedCaptioning className='text-sm leading-snug' /> {sub}
        </div>
      )}
      {dub > 0 && (
        <div className=" leading-snug flex justify-start items-center text-xs gap-1 bg-blue-300 px-1.5 font-semibold  py-0.5 rounded-tr-md rounded-br-md ">
          <FaMicrophone className='text-sm leading-snug' /> {dub}
        </div>
      )}
    </div>
  );
}

export default Badges;
