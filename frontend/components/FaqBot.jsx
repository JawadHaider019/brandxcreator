"use client";

import React, { useState, useRef, useEffect } from "react";

const faqTree = {
    "How do I register on BrandXCreator?": {
      answer: "Go to the Sign Up page and choose either Brand or Influencer to register.",
      followups: {
        "What info do influencers need to provide?": {
          answer: "Influencers need to provide their full name, contact, city, content interests, and social media links.",
          followups: {
            "Is Instagram mandatory?": {
              answer: "Instagram link is required if the influencer selects Instagram as a platform.",
            },
            "What if I have multiple platforms?": {
              answer: "You can provide optional links for Facebook, TikTok, Snapchat, or a personal website.",
            }
          }
        },
        "How does admin verify my registration?": {
          answer: "Admin checks your social media profiles and content to ensure authenticity.",
          followups: {
            "What happens if I’m not verified?": {
              answer: "You won’t be able to access platform features until verified. Try updating your profile or contacting support.",
            }
          }
        }
      }
    },
  
    "How does the wallet system work?": {
      answer: "Each user has a wallet. Brands fund campaigns; influencers receive payments post-completion.",
      followups: {
        "What is 'locked fund' or escrow?": {
          answer: "Funds are locked in escrow until the campaign is completed and approved.",
          followups: {
            "Can I withdraw locked funds?": {
              answer: "No, only available balance can be withdrawn. Locked funds are held until campaign approval.",
            }
          }
        },
        "How to withdraw money?": {
          answer: "Go to your wallet and click 'Withdraw'. Minimum amount and processing time apply.",
        }
      }
    },
  
    "How do I create a campaign?": {
      answer: "Brands must subscribe to a plan first, then use the Create Campaign option or a template.",
      followups: {
        "What kind of templates are available?": {
          answer: "Templates include Product Review, Giveaway, Story + Feed, Unboxing, and Event Coverage.",
        },
        "What is required in a campaign brief?": {
          answer: "You need to add goals, deliverables, budget, timeline, and audience targeting.",
        }
      }
    },
  
    "How do influencers get selected?": {
      answer: "Influencers submit proposals to campaigns. Brands select them based on match and quality.",
      followups: {
        "Can brands message influencers?": {
          answer: "Yes, once selected, a private chat opens. The brand must send the first message.",
        },
        "What is a good proposal?": {
          answer: "A good proposal includes your price, delivery time, and a personalized message.",
        }
      }
    },
  
    "What is a digital contract?": {
      answer: "When a brand accepts a proposal and funds escrow, a smart contract is auto-generated.",
      followups: {
        "What does the contract include?": {
          answer: "It contains campaign terms, deliverables, payment, and timeline.",
        },
        "Can I view my past contracts?": {
          answer: "Yes, contracts are stored in your dashboard for future reference.",
        }
      }
    },
  
    "How does payment release work?": {
      answer: "Once the influencer marks the task complete and brand approves, funds are released to the wallet.",
      followups: {
        "What if edits are needed?": {
          answer: "The brand can request changes before approving and releasing funds.",
        }
      }
    },
  
    "How are ratings and feedback handled?": {
      answer: "After campaigns, both parties rate each other (1–5 stars) and leave optional feedback.",
      followups: {
        "Are ratings public?": {
          answer: "Yes, high-rated users are promoted publicly. Low ratings affect credibility.",
        }
      }
    },
  
    "Do I get notifications?": {
      answer: "Yes, you get real-time notifications for proposals, messages, payments, contracts, and ratings.",
      followups: {
        "Can I turn off email notifications?": {
          answer: "Yes, go to settings to manage your email notification preferences.",
        }
      }
    }
  };
  

export default function FaqBot() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [options, setOptions] = useState(Object.keys(faqTree));
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const handleClick = (question) => {
    const currentNode =
      faqTree[question] || findNodeInFollowups(faqTree, question);
    if (!currentNode) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: question },
      { type: "bot", text: currentNode.answer },
    ]);

    if (currentNode.followups) {
      setOptions(Object.keys(currentNode.followups));
    } else {
      setOptions([]);
      // Only show 'Anything else needed?' when there are no followups
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Anything else needed?" },
        ]);
        setOptions(Object.keys(faqTree));
      }, 600);
    }
  };

  const findNodeInFollowups = (tree, question) => {
    for (const mainKey in tree) {
      const followups = tree[mainKey].followups || {};
      if (followups[question]) return followups[question];
      // Recursively search deeper followups
      const deeper = findNodeInFollowups(followups, question);
      if (deeper) return deeper;
    }
    return null;
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const popupRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9998] bg-black/10" aria-label="Close FAQ Bot" />
      )}
      <div className="fixed bottom-4 right-6 z-[9999]">
        {open ? (
          <div
            ref={popupRef}
            className="w-[320px] md:w-[350px] h-[60vh] md:h-[550px] bg-white shadow-2xl border border-gray-200 rounded-3xl flex flex-col p-0 overflow-hidden animate-fadeIn"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-br from-teal-900 to-black text-white rounded-t-3xl">
              <h2 className="font-bold text-lg">💬 FAQ Bot</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-red-200 transition"
              >
                Close
              </button>
            </div>
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-50" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm p-2 rounded-xl max-w-[85%] ${
                    msg.type === "bot"
                      ? "bg-green-100 text-green-900 self-start"
                      : "bg-blue-100 text-blue-900 self-end text-right"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Options */}
            <div className="px-4 py-3 bg-white border-t border-gray-200 space-y-2">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(opt)}
                  className="w-full px-3 py-2 text-sm font-semibold bg-gradient-to-br from-teal-900 to-black text-white rounded-xl hover:from-black hover:to-teal-900 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-br from-teal-900 to-black text-white px-6 py-4 rounded-full shadow-2xl font-bold text-lg hover:scale-105 transition"
          >
            💬 Help?
          </button>
        )}
      </div>
    </>
  );
}
