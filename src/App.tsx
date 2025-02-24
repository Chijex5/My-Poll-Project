import React, { useEffect, useState } from "react";
import { VotingCard } from "./components/VotingCard";
import { Results } from "./components/Results";
import { ThankYouModal } from "./components/ThankYouModal";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

export function App() {
  type Votes = {
    [key: string]: number;
    JavaScript: number;
    Python: number;
    Java: number;
    "C++": number;
  };

  const [votes, setVotes] = useState<Votes>({
    JavaScript: 20,
    Python: 24,
    Java: 17,
    "C++": 11
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hasSeenConfetti, setHasSeenConfetti] = useState(false);
  const handleVote = (option: string) => {
    if (!hasVoted) {
      setVotes(prev => ({
        ...prev,
        [option]: prev[option] + 1
      }));
      setSelectedOption(option);
      if (!hasSeenConfetti) {
        setShowModal(true);
        setHasSeenConfetti(true);
        localStorage.setItem("hasSeenConfetti", "true");
      } else {
        setHasVoted(true);
      }
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    setHasVoted(true);
  };
  const handleChangeAnswer = () => {
    console.log("Change answer");
    if (selectedOption) {
      console.log("Change answer", selectedOption);
      setVotes(prev => ({
        ...prev,
        [selectedOption]: prev[selectedOption] - 1
      }));
    }
    setHasVoted(false);
    setSelectedOption(null);
  };
  return (
    <main className="app-container">
      <ThankYouModal isOpen={showModal} onClose={handleModalClose} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="poll-card"
      >
        <div className="gradient-overlay" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="poll-header"
        >
          <h1 className="poll-title">Quick Poll</h1>
          <p className="poll-description">
            What is your favorite programming language?
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!hasVoted ? (
            <motion.div 
              key="voting"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="voting-options"
            >
              {Object.keys(votes).map((option, index) => (
                <motion.div 
                  key={option}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VotingCard 
                    option={option}
                    votes={votes[option]}
                    totalVotes={Object.values(votes).reduce((a, b) => a + b, 0)}
                    selected={selectedOption === option}
                    onVote={() => handleVote(option)}
                    hasVoted={hasVoted}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="results-container"
            >
              <Results 
                votes={votes}
                selectedOption={selectedOption}
                onChangeAnswer={handleChangeAnswer}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}