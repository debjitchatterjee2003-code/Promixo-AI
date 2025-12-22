import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import Button from './ui/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappLink = "https://wa.me/916290201182?text=Hi%20I%20am%20interested%20in%20Promixo%20AI%20services";
  const instagramLink = "https://www.instagram.com/promixoai/";
  const facebookLink = "https://www.facebook.com/share/1AdYDycpkD/";
  const linkedinLink = "https://www.linkedin.com/company/promixo-ai/posts/?feedView=all";

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20">
          <div className="mb-10 md:mb-0 text-center md:text-left">
             <div className="text-3xl font-display font-bold tracking-tighter text-white mb-4">
              PROMIXO<span className="text-brand-purple">AI</span>
            </div>
            <p className="text-slate-400 max-w-sm font-medium">
              Next-generation AI creative & automation agency. 
              Redefining what's possible in digital growth.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="primary" className="!px-6 !py-3 text-sm font-semibold shadow-2xl shadow-brand-mint/10">
                <FaWhatsapp className="text-xl" />
                <span>Chat on WhatsApp</span>
              </Button>
            </a>

            <div className="flex gap-6">
              <SocialIcon href={facebookLink} icon={FaFacebookF} />
              <SocialIcon href={instagramLink} icon={FaInstagram} />
              <SocialIcon href={linkedinLink} icon={FaLinkedin} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-medium">
          <p>&copy; {currentYear} Promixo AI. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-brand-purple transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{ href: string; icon: React.ElementType }> = ({ href, icon: Icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-purple hover:text-white hover:scale-110 hover:border-brand-purple hover:shadow-2xl transition-all duration-300"
  >
    <Icon className="text-lg" />
  </a>
);

export default Footer;