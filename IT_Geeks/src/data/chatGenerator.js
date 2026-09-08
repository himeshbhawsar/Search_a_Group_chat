export const PARTICIPANTS = [
  {
    id: "p1",
    name: "Rahul",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
    color: "#06b6d4",
    role: "Trip Organizer",
  },
  {
    id: "p2",
    name: "Priya",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    color: "#ec4899",
    role: "Treasury / Budget Manager",
  },
  {
    id: "p3",
    name: "Amit",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces",
    color: "#f59e0b",
    role: "Itinerary Planner",
  },
  {
    id: "p4",
    name: "Sneha",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    color: "#10b981",
    role: "Food & Resort Reviewer",
  },
  {
    id: "p5",
    name: "Rohan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    color: "#8b5cf6",
    role: "Cab & Logistics Driver",
  },
  {
    id: "p6",
    name: "Ananya",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
    color: "#ef4444",
    role: "Photographer & Socials",
  },
  {
    id: "p7",
    name: "Vikram",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    color: "#3b82f6",
    role: "Tech Lead / Offsite Host",
  },
  {
    id: "p8",
    name: "Neha",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    color: "#14b8a6",
    role: "Activities Lead",
  },
];
export const GROUND_TRUTH_ANCHORS = {
  MANALI_DECISION: "msg_decision_manali_001",
  BUDGET_DECISION: "msg_decision_budget_002",
  GPAY_DECISION: "msg_decision_gpay_003",
  OFFSITE_DECISION: "msg_decision_offsite_004",
  FOOD_VEG_DECISION: "msg_decision_food_005",
  AIRPORT_CAB_DECISION: "msg_decision_cab_006",
  ADVANCE_PAYMENT: "msg_decision_token_007",
  MOUNTAIN_VS_BEACH: "msg_decision_mountain_008",
  FLIGHT_BOOKING: "msg_decision_flight_009",
  WORKSHOP_VENUE: "msg_decision_workshop_010",
};
export function generateSyntheticGroupChat() {
  const messages = [];
  const startDate = new Date("2026-03-01T08:00:00Z");
  const endDate = new Date("2026-08-31T22:00:00Z");
  let currentTimestamp = startDate.getTime();
  const totalTargetMessages = 4150;
  const timeStepAvg =
    (endDate.getTime() - startDate.getTime()) / totalTargetMessages;
  const banterOpening = [
    "subah subah kya chal raha hai",
    "good morning guys",
    "bhai koi jaag raha hai kya",
    "bhai kal wala match dekha?",
    "kya scene hai aaj ka",
    "kaun free hai shaam ko",
    "chai peene chalein?",
    "bhai project ka build fail ho gaya",
    "meeting link share karo",
    "bhai kya chal raha hai office main",
    "lunch me kya mangwana hai",
    "kaafi thak gaya bro",
  ];
  const banterMiddle = [
    "haha sahi bol raha hai",
    "bhai bilkul mat karna aisa",
    "lol 100%",
    "chalo thik hai",
    "mujhe bhi tag kar dena",
    "haan bhai bilkul",
    "sahi me?",
    "bhai aisa thodi hota hai",
    "deck ready ho gayi kya",
    "gpay wala notification aaya kya",
    "kaun kaun aa raha hai batana",
    "resort ka rating kitna hai google pe",
    "bohot maza aayega",
    "cab book karein?",
  ];
  const oneWordReplies = [
    "ha",
    "nhi",
    "k",
    "ok",
    "done",
    "sahi",
    "lol",
    "bhai",
    "nice",
    "gpayed",
    "great",
    "sure",
  ];
  const formatMsg = (id, timeMs, sender, text, options = {}) => {
    const d = new Date(timeMs);
    const dateStr = d.toISOString().split("T")[0];
    return {
      id,
      timestamp: d.toISOString(),
      date: dateStr,
      sender,
      text,
      isHinglish: true,
      ...options,
    };
  };
  let msgCounter = 1;
  for (let i = 0; i < totalTargetMessages; i++) {
    const delta = Math.floor((Math.random() * 0.8 + 0.6) * timeStepAvg);
    currentTimestamp += delta;
    const senderObj = PARTICIPANTS[i % PARTICIPANTS.length];
    const sender = senderObj.name;
    const msgId = `msg_${String(msgCounter).padStart(5, "0")}`;
    if (i === 1595) {
      messages.push(
        formatMsg(
          `msg_thread1_001`,
          currentTimestamp,
          "Rahul",
          "guys summer trip discuss karein? Beach vs Mountains? Goa bohot hot hoga iss time",
          { threadId: "manali_trip" },
        ),
      );
      continue;
    }
    if (i === 1596) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.MOUNTAIN_VS_BEACH,
          currentTimestamp + 60000,
          "Amit",
          "beach bohot hot hoga is time pe, pahad chalte hain bhai crisp air milegi",
          { threadId: "manali_trip", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 1597) {
      messages.push(
        formatMsg(
          `msg_thread1_003`,
          currentTimestamp + 120000,
          "Sneha",
          "Manali ya Rishikesh? Manali me weather amazing hoga September starting tak",
          { threadId: "manali_trip" },
        ),
      );
      continue;
    }
    if (i === 1598) {
      messages.push(
        formatMsg(
          `msg_thread1_004`,
          currentTimestamp + 180000,
          "Priya",
          "dates kya rakhein? mid September works for everyone?",
          { threadId: "manali_trip" },
        ),
      );
      continue;
    }
    if (i === 1599) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.MANALI_DECISION,
          currentTimestamp + 240000,
          "Rahul",
          "chalo Manali fix hai 14th Sept to 18th Sept pack kar dete hain tickets ready baseline",
          { threadId: "manali_trip", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 1805) {
      messages.push(
        formatMsg(
          `msg_thread2_001`,
          currentTimestamp,
          "Sneha",
          "resort options shortlist kiye hain apple orchard cottages per night rate 13k overall",
          { threadId: "budget_stay" },
        ),
      );
      continue;
    }
    if (i === 1806) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.BUDGET_DECISION,
          currentTimestamp + 60000,
          "Priya",
          "resort cost per head 6500 inr final including breakfast and dinner",
          { threadId: "budget_stay", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 1807) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.GPAY_DECISION,
          currentTimestamp + 120000,
          "Priya",
          "sab log Priya ko 5k gpay kar do immediately token advance bhej na h resort ko",
          { threadId: "budget_stay", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 1808) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.ADVANCE_PAYMENT,
          currentTimestamp + 180000,
          "Rohan",
          "resort token money 10k Transfer done bro confirmation slip received",
          { threadId: "budget_stay", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 2400) {
      messages.push(
        formatMsg(
          `msg_thread3_001`,
          currentTimestamp,
          "Vikram",
          "team Q3 architecture workshop & hackathon planning start karein?",
          { threadId: "work_offsite" },
        ),
      );
      continue;
    }
    if (i === 2401) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.OFFSITE_DECISION,
          currentTimestamp + 60000,
          "Vikram",
          "august ke 3rd week 18th-20th workshop rakhte hain Bangalore branch main",
          { threadId: "work_offsite", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 2402) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.WORKSHOP_VENUE,
          currentTimestamp + 120000,
          "Ananya",
          "Bangalore tech park office hall 4 reserve ho gaya hai for hackathon",
          { threadId: "work_offsite", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 800) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.FOOD_VEG_DECISION,
          currentTimestamp,
          "Sneha",
          "resort menu mein shuddh shakahari options ready hain pure veg kitchen available",
          { threadId: "budget_stay", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 1200) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.AIRPORT_CAB_DECISION,
          currentTimestamp,
          "Rohan",
          "subah 4 baje cab pick kar legi sabko airport departure flight ke liye",
          { threadId: "manali_trip", isDecision: true },
        ),
      );
      continue;
    }
    if (i === 3100) {
      messages.push(
        formatMsg(
          GROUND_TRUTH_ANCHORS.FLIGHT_BOOKING,
          currentTimestamp,
          "Neha",
          "group flight booking confirm ho gayi 6:15 am morning flight Indigo",
          { threadId: "manali_trip", isDecision: true },
        ),
      );
      continue;
    }
    let text = "";
    const randType = Math.random();
    if (randType < 0.25) {
      text = banterOpening[Math.floor(Math.random() * banterOpening.length)];
    } else if (randType < 0.65) {
      text = banterMiddle[Math.floor(Math.random() * banterMiddle.length)];
    } else if (randType < 0.85) {
      text = oneWordReplies[Math.floor(Math.random() * oneWordReplies.length)];
    } else {
      const snippets = [
        "bhai link open karke check karo na",
        "kaun sa resort final karna hai batana",
        "gpay id share kar do Priya",
        "weather kaisa hai wahan abhi?",
        "ticket price increase ho gaya lagta hai",
        "bhai 5 mins me call join karta hu",
        "presentation ready hai for review",
        "photo drive folder me upload ho gayi",
        "bhai next weekend ka plan kya hai?",
        "resort me wifi and breakfast included hai na?",
      ];
      text = snippets[Math.floor(Math.random() * snippets.length)];
    }
    messages.push(formatMsg(msgId, currentTimestamp, sender, text));
    msgCounter++;
  }
  return messages;
}