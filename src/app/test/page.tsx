"use client"
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button} from "@/components/ui/button"
import { Input} from "@/components/ui/input"

export default function App() {
  const [isUsernameVisible, setUsernameVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleContinue = () => {
    setUsernameVisible(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        {isUsernameVisible ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <Button onClick={handleContinue} className="w-full px-4 py-2 text-white bg-blue-500 rounded">
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}