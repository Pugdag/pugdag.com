import { motion, useAnimation } from "framer-motion";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "../../lib/utils";

interface RoadmapItemProps {
  phase: string;
  title: string;
  description: string;
  emoji: string;
}

const roadmapData = [
  {
    phase: "Phase 1",
    title: "Establish the Great PUG Empire",
    description: "Mainnet launch, explorer development, wallets development, website creation, and building a community where every PUG and PUG-lover feels at home. Bow ties, belly rubs, and endless treats for all!",
    emoji: "🌟",
  },
  {
    phase: "Phase 2 ",
    title: "Smart Contracts Integration",
    description: "Get ready for smart contracts with the PRC20 protocol. Because even PUGs deserve some intelligence in their transactions!",
    emoji: "💡",
  },
  {
    phase: "Phase 3",
    title: "Play2Earn Ecosystem Development",
    description: "Developing tools and an ecosystem to promote the creation of Play2Earn games. More PUGs, more fun, more gains!",
    emoji: "🎮",
  },
  {
    phase: "Phase 4",
    title: "Onchain Loyalty Programs",
    description: "Using BlockDAG technology to deploy onchain loyalty programs. Because every PUG deserves to be rewarded for their loyalty!",
    emoji: "🦴",
  },
  {
    phase: "Phase 5",
    title: "Launch a Global PUG Party",
    description: "Get ready for a worldwide celebration of pug adorableness, spreading joy and wagging tails everywhere. World domination? More like a global PUG fest!",
    emoji: "🐾",
  },
  {
    phase: "Phase 6",
    title: "PugDAG to the Moon",
    description: "Our mission to take PugDAG to astronomical heights, one paw at a time. Moonwalking PUGs, anyone?",
    emoji: "🚀",
  },
  {
    phase: "Phase 7",
    title: "PUG Overthrows Doge",
    description: "It’s time for the PUG to take the throne and become the top dog in the meme coin world. Move over, Doge!",
    emoji: "🐕‍🦺",
  },
];

const RoadmapItem: FC<RoadmapItemProps> = ({ phase, title, description, emoji }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.5 }}
      className="flex items-start mb-12 relative"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-black flex items-center justify-center text-white z-10 text-2xl">
        <span>{emoji}</span>
      </div>
      <div className="ml-6">
        <h4 className="text-2xl text-[#273c75] font-bold">{phase}</h4>
        <h3 className="text-3xl text-[#273c75] font-semibold">{title}</h3>
        <p className="mt-4 text-lg text-gray-700">{description}</p>
      </div>
      <div className="absolute left-[calc(1.5rem-1px)] top-0 w-[2px] bg-gray-300 h-full"></div>
    </motion.div>
  );
};

const Roadmap: FC = () => {
  return (
    <div className={cn("relative z-0 max-w-full lg:max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16")}>
      {roadmapData.map((item, index) => (
        <RoadmapItem
          key={index}
          phase={item.phase}
          title={item.title}
          description={item.description}
          emoji={item.emoji}
        />
      ))}
    </div>
  );
};

export default Roadmap;
