"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, MenuItem } from './components/ui/navbar-menu';
import { FaDiscord, FaGithub, FaTelegram, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import TextRevealByWord from './components/magicui/text-reveal';
import Roadmap from "./components/ui/roadmap";
import Footer from "./components/ui/footer";
import BlockchainButtons from "./components/ui/BlockchainButtons";
import WordPullUp from "./components/magicui/word-pull-up";
import BlurIn from "./components/magicui/blur-in";
import Projects from "./components/ui/Projects";
//import ChartPug from "./components/ui/Chart";

const Home = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [bones, setBones] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Génère des données pour 'bones'
    const newBones = Array.from({ length: 20 }, (_, i) => i);
    setBones(newBones);

    const timeout = setTimeout(() => {
      setBones([]);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <div className="🤚">
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="🌴"></div>		
          <div className="👍"></div>
        </div>
      </div>
    );
  }

  const communitySubItems = [
    { name: 'Discord', href: 'https://discord.gg/pugdag', icon: FaDiscord },
    { name: 'Twitter', href: 'https://x.com/pug_dag', icon: AiOutlineTwitter },
    { name: 'Github', href: 'https://github.com/Pugdag', icon: FaGithub },
    { name: 'Telegram', href: 'https://t.me/pug_dag', icon: FaTelegram },
    { name: 'Instagram', href: 'https://www.instagram.com/pug_dagg', icon: FaInstagram },
    { name: 'Facebook', href: 'https://www.facebook.com/pugdag', icon: FaFacebook },
    { name: 'Tiktok', href: 'https://www.tiktok.com/@pugdag', icon: FaTiktok }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center pt-24 from-white to-gold relative overflow-hidden">
      <div className="fixed top-4 left-20 hidden lg:block z-50">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={170}
          height={170}
          className="rounded-full"
        />
      </div>
      <Menu setActive={setActiveItem}>
        <MenuItem item="Explorer" href="https://explorer.pugdag.com/" />
        <MenuItem item="Web Wallet" href="https://wallet.pugdag.com/" />
        <MenuItem item="Whitepaper" href="/whitepaper.pdf" />
        <MenuItem item="About" href="#about" />
        <MenuItem item="Features" href="#features" />
        <MenuItem item="Roadmap" href="#roadmap" />
        <MenuItem
          setActive={setActiveItem}
          active={activeItem}
          item="Community"
          subItems={communitySubItems}
        />
      </Menu>
      {/* Titre "PugDAG" visible uniquement sur mobile */}
      <div className="block lg:hidden text-center mt-8 font-poetsen max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#273c75] mt-12">PugDAG</h1>
        <p className="text-xl font-semibold text-[#273c75] mt-4">
          PUG is the latest MEMECOIN sensation, born on its own layer1 blockchain.
        </p>
      </div>
      {/*
      <div className="flex justify-center items-center w-full h-auto mt-8 lg:mt-40 px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-screen-lg h-96 relative">
          <Image
            src="/PUGBAN.png"
            alt="Pug Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg mt-10"
          />
        </div>
      </div>
      */}
      
      <div className="hidden lg:block text-center mt-8 font-poetsen max-w-6xl mx-auto px-4">
        <BlurIn word="PugDAG" className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#273c75] mt-12" />
        <WordPullUp words="PUG is the latest MEMECOIN sensation, born on its own layer1 blockchain." className="text-xl font-semibold text-[#273c75] mt-12" />
      </div>
      <div className="flex flex-col items-center mt-8 lg:mt-12 px-4 md:px-8 lg:px-16">
        <BlockchainButtons />
      </div>
      
      <h2 className='font-poetsen text-[#273c75] text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl' id="about">About PugDAG</h2>
      <div className="w-full max-w-6xl mx-auto text-[#273c75]">
        <TextRevealByWord>
          <div>Welcome to PugDAG, where PUGs reign supreme and fun is the name of the game! We are a fearless and adventurous pack of pugs, straight out of cyberspace, here to revolutionize the crypto world with our MEME COIN, the PUG.</div>
          <div>Our mission? To conquer the blockchain universe with a hefty dose of humor and a sprinkle of madness. We don't take ourselves too seriously (except when it comes to treats). Whether you're a crypto expert ou un curieux novice, our aim is to make you smile at every transaction.</div>
          <div>So, join us on this wacky adventure and hop aboard the PugDAG for an epic journey filled with laughter, hilarious memes, and, of course, adorable pugs. Remember, at PugDAG, every PUG counts and every PUG has the power to change the world... or at least make someone laugh!</div>
        </TextRevealByWord>
      </div>
      <h2 className='text-4xl sm:text-6xl md:text-8xl font-semibold mt-20 font-poetsen text-[#273c75]' id="features">Key Features</h2>
      <Projects />

      <h2 className='text-4xl sm:text-6xl md:text-8xl font-semibold mt-20 font-poetsen text-[#273c75]' id="roadmap">Roadmap</h2>
      <Roadmap />
      {/*<ChartPug/>*/}
      
      <Footer />
      {bones.map((bone) => (
        <div
          key={bone}
          className="falling-bone"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        >
          🦴
        </div>
      ))}
    </main>
  );
}

export default Home;


