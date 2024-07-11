"use client";

import { FC, useEffect } from 'react';
import { FaDiscord, FaGithub, FaTelegram, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2 },
      }));
    }
  }, [controls, inView]);

  const icons = [
    { href: 'https://discord.gg/pugdag', icon: FaDiscord },
    { href: 'https://github.com/Pugdag', icon: FaGithub },
    { href: 'https://x.com/pug_dag', icon: AiOutlineTwitter },
    { href: 'https://t.me/pug_dag', icon: FaTelegram },
    { href: 'https://www.instagram.com/pug_dagg', icon: FaInstagram },
    { href: 'https://www.facebook.com/pugdag', icon: FaFacebook },
    { href: 'https://www.tiktok.com/@pugdag', icon: FaTiktok },
  ];

  const iconVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.2 },
  };

  return (
    <footer className="py-4 flex flex-col items-center">
      <hr className="w-full lg:w-[800px] sm:max-w-[800px] border-gray-300 mb-4 sm:mb-6" />
      <div ref={ref} className="flex space-x-4 sm:space-x-6 mb-4 sm:mb-6 text-[#273c75]">
        {icons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial="initial"
              animate={controls}
              whileHover="hover"
              custom={index}
              variants={iconVariants}
            >
              <IconComponent className="w-8 h-8 sm:w-12 sm:h-12" color="#273c75" />
            </motion.a>
          );
        })}
      </div>
      <p className="text-slate-500 text-sm sm:text-xl">&copy; 2024 PugDAG - All rights reserved.</p>
    </footer>
  );
};

export default Footer;
