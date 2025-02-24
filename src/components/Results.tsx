import React from "react";
import { motion } from "framer-motion";
import "./Results.css";
import { ArrowLeft, TrendingUp, Award, Users } from "lucide-react";

interface ResultsProps {
  votes: Record<string, number>;
  selectedOption: string | null;
  onChangeAnswer: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  votes,
  selectedOption,
  onChangeAnswer
}) => {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const sortedResults = Object.entries(votes).sort(([, a], [, b]) => b - a);
  const winner = sortedResults[0][0];

  return (
    <div className="results-container">
      <div className="results-animated-wrapper">
        <div className="results-header">
          <h2 className="results-title">Poll Results</h2>
          <button onClick={onChangeAnswer} className="change-vote-button">
            <ArrowLeft className="back-arrow-icon" />
            Change Vote
          </button>
        </div>

        <div className="stats-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stats-card total-votes-card"
          >
            <Users className="stats-icon votes-icon" />
            <p className="stats-number">{totalVotes}</p>
            <p className="stats-label">Total Votes</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="stats-card winner-card"
          >
            <Award className="stats-icon winner-icon" />
            <p className="stats-number">{winner}</p>
            <p className="stats-label">Leading Choice</p>
          </motion.div>
        </div>
      </div>

      <div className="votes-list">
        {sortedResults.map(([option, voteCount], index) => {
          const percentage = totalVotes > 0 ? Math.round(voteCount / totalVotes * 100) : 0;
          const isLeading = index === 0;
          const isSelected = option === selectedOption;

          return (
            <motion.div 
              key={option}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="vote-item"
            >
              <div className="vote-header">
                <div className="vote-option-info">
                  <span className="option-label">{option}</span>
                  {isLeading && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="leading-indicator"
                    >
                      <TrendingUp className="trending-icon" />
                    </motion.span>
                  )}
                  {isSelected && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="user-vote-badge"
                    >
                      Your Vote
                    </motion.span>
                  )}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="vote-count-info"
                >
                  <span className="vote-count">{voteCount} {voteCount === 1 ? "vote" : "votes"}</span>
                  <span className="vote-percentage">{percentage}%</span>
                </motion.div>
              </div>

              <div className="progress-bar-container">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ 
                    duration: 1,
                    delay: 0.2 + index * 0.1,
                    ease: "easeOut"
                  }}
                  className={`progress-bar ${isLeading ? "leading-progress" : ""}`}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="progress-bar-pattern"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};