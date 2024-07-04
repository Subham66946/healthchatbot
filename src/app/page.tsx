"use client";

import { AuroraBackground } from "@/utils/ui/aurora-background";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation";
// import { AuroraBackground } from "@/utils/ui/aurora-background";

export default function AuroraBackgroundDemo() {
  const router=useRouter()
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-black">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-7xl font-bold font-sans dark:text-white text-center tracking-widest">
              Health Chatbot
            </div>
            <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 tracking-widest">
            Your health is the priority
            </div>
            <Button onClick={()=>{router.push("/c")}} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
              Get Started
            </Button>
          </motion.div>
        </AuroraBackground>
      </div>
    </>
  );
}
