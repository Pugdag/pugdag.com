'use client'
import React from 'react';
import ProjectCard from '../magicui/ProjectCard';
import { motion } from 'framer-motion';

const Projects = () => {
  const cardVariants = (delay: number) => ({
    offscreen: { opacity: 0, x: -100 },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: delay }
    },
  });

  const projectInfos = [
    {
      src: '/fastest.webp',
      title: "FASTEST TRANSACTIONS",
      description: "PugDAG’s blockDAG network generates multiple blocks every second for posting transactions to the ledger. Combined with fully confirmed transactions in 10 seconds, this makes PugDAG ideal for everyday transactions."
    },
    {
      src: "/transactions.webp",
      title: "INSTANT CONFIRMATION",
      description: "PugDAG was designed to be hundreds of times faster than Bitcoin, with each PugDAG transaction visible to the network in one second, and each transaction fully confirmed in 10 seconds on average."
    },
    {
      src: "/scalability.webp",
      title: "SCALABILITY",
      description: "PugDAG solves the scalability problem with its ability to generate and confirm multiple blocks per second. This comes with no trade-off to security and decentralization as seen with Proof-of-Stake networks."
    },
    {
      src: "/pow.webp",
      title: "EFFICIENT PROOF-OF-WORK",
      description: "PugDAG utilizes the optical-mining ready Karlsen algorithm for consensus and security of the network. This algorithm, combined with high-throughput DAG and no-wasted-blocks, makes it less energy intensive than other PoW networks."
    },
    {
      src: "/security.webp",
      title: "SECURITY",
      description: "PugDAG harnesses an ultra secure block network with no compromise to decentralization. Achieved with pure, stake-less, proof-of-work combined with a revolutionary GhostDAG Consensus mechanism."
    },
    {
      src: "/blockdag.webp",
      title: "BLOCKDAG",
      description: "Overcoming the problem of blockchains, PugDAG processes all blocks in parallel linking all side-chains. This leads to a Directed Acyclic Graph (DAG) structure that increases the formation of blocks per second drastically, creating a blockDAG."
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20" id="projects">
      <div className="flex flex-wrap justify-center gap-10 px-10">
        {projectInfos.map((project, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 mx-auto"
            variants={cardVariants(0.2 * index)}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ProjectCard
              src={project.src}
              title={project.title}
              description={project.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

