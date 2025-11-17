import SocialLinks from '@components/navigation/SocialLinks';
import { Link } from 'react-router';
import logo from "@assets/logo.png"
function Footer() {
  return (
    <div>
      <div className="py-4 bg-white/10 backdrop-blur-md md:bg-transparent md:backdrop-blur-none my-container">
        <div className="mb-6 md:flex md:items-center md:justify-start md:divide-x md:divide-gray-500 ">
          <Link className='hidden md:block' to={`/`}><img className='object-cover h-10 pe-13.5' src={logo} alt="Logo" /></Link>
          <div className=" gap-1.5 flex w-fit mx-auto p-3.5 md:ps-13.5 bg-white rounded-md md:mx-0 md:bg-transparent ">
            <SocialLinks />
          </div>
        </div>
        {/* w-full md:max-w-[350px]   gap-x-5 gap-y-2  md:text-sm md:gap-x-10 mx-auto md:mx-0 */}
        <ul className="flex flex-wrap items-center mx-auto mb-4 text-xs w-fit gap-x-5 md:mx-0 md:text-sm">
          <li>
            <Link
              className="text-white transition-colors duration-300 cursor-pointer hover:text-secondary"
              to={`/terms`}
            >
              Terms of service
            </Link>
          </li>
          <li>
            <Link
              className="text-white transition-colors duration-300 cursor-pointer hover:text-secondary"
              to={`/dmca`}
            >
              DMCA
            </Link>
          </li>
          <li>
            <Link
              className="text-white transition-colors duration-300 cursor-pointer hover:text-secondary"
              to={`/contact`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className="text-white transition-colors duration-300 cursor-pointer hover:text-secondary"
              to={`/app-download`}
            >
              HiAnime App
            </Link>
          </li>
        </ul>
        <p className="mb-2 text-xs text-center text-white/50 md:text-start md:text-sm">
          HiAnime does not store any files on our server, we only linked to the media which is hosted on 3rd party
          services.
        </p>
        <p className="mb-2 text-sm text-center text-white/50 md:text-start md:text-base ">
          © HiAnime.to. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
