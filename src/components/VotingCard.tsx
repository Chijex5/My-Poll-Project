import React from "react";
import { motion } from "framer-motion";
import "./VotingCard.css";

interface VotingCardProps {
  option: string;
  votes: number;
  totalVotes: number;
  selected: boolean;
  onVote: () => void;
  hasVoted: boolean;
}

export const VotingCard: React.FC<VotingCardProps> = ({
  option,
  votes,
  totalVotes,
  selected,
  onVote,
  hasVoted
}) => {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <motion.button
      onClick={onVote}
      disabled={hasVoted}
      whileHover={!hasVoted ? { scale: 1.02 } : {}}
      whileTap={!hasVoted ? { scale: 0.98 } : {}}
      className={`voting-card ${selected ? "selected" : ""} ${hasVoted ? "disabled" : ""}`}
      aria-label={`Vote for ${option}`}
    >
      <div className="card-content">
        <div className="card-header">
          <span className="option-text">{option}</span>
          {hasVoted && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="percentage-text"
            >
              {percentage}%
            </motion.span>
          )}
        </div>
      </div>

      {hasVoted && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="progress-bar"
        />
      )}
    </motion.button>
  );
};