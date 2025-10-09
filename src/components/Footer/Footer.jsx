import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPinterest, FaTiktok } from "react-icons/fa";
import logo from "../../assets/logo.png"
export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 text-sm border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start mb-4">
              <img
                src={logo}
                alt="About You"
                className="h-40 w-40 relative -top-14 left-0"
              />
            </div>
            <div className="flex justify-center md:justify-start space-x-4 text-xl text-gray-700 relative -top-24">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                <FaPinterest />
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wide text-md text-black ">
              Customer Care
            </h3>
            <ul className="space-y-2 text-black font-medium text-sm">
              <li><a href="#">Help & Contact</a></li>
              <li><a href="#">Partner program</a></li>
              <li><a href="#">ABOUT YOU Marketplace</a></li>
              <li><a href="#">Creator Collaborations</a></li>
              <li><a href="#">Delivery area</a></li>
              <li><a href="#">Impact Reduction</a></li>
              <li><a href="#">Outlet</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wide">
              Secure Shopping
            </h3>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <img
                src="/ssl-icon.png"
                alt="SSL Secure"
                className="h-6"
              />
              <p>Your data is secure with us</p>
            </div>
          </div>
        </div>
        <div className="mt-10 text-gray-600 text-xs space-y-1 text-center md:text-left">
          <p>*Free delivery for orders above €29.90, else shipping & service fees of €4.90 apply.</p>
          <p>**Lowest total price of the last 30 days before the price reduction.</p>
          <p>**Free of charge from all network providers. Charges may apply when calling from abroad.</p>
          <p>****All prices incl. VAT.</p>
        </div>
      </div>
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col  gap-4 justify-between items-center text-gray-600 text-xs space-y-2 md:space-y-0">
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-black">
            <a href="#" className="hover:underline">About us</a>
            <a href="#" className="hover:underline">Press</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Investor Relations</a>
            <a href="#" className="hover:underline">Data privacy</a>
            <a href="#" className="hover:underline">Preference Center (Consent management)</a>
            <a href="#" className="hover:underline">Terms of service</a>
            <a href="#" className="hover:underline">Legal information</a>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
          <p className="mt-2 md:mt-0">© 2025 ABOUT YOU SE & Co. KG</p>
        </div>
      </div>
    </footer>
  );
}