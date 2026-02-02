import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  Bot,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Menu,
  X,
  Bell,
  Settings,
  Activity,
  Zap,
  HeadphonesIcon,
  Languages,
  ShieldCheck,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Target,
  PlayCircle,
  PauseCircle,
  PhoneCall,
  MessageCircleMore,
  Building2,
} from "lucide-react";

import { ComponentType } from "react";

interface ConversationCardProps {
  type: string;
  customer: string;
  amount: number;
  status: "success" | "failed" | "pending";
  language: string;
  time: string;
  onClick?: () => void;
}

interface StatCardProps {
  icon: ComponentType<any>; // React icon component
  label: string;
  value: number | string;
  trend?: "up" | "down";
  trendValue?: string;
  color?: string;
  suffix?: string;
  prefix?: string;
}

// SPEACH
type DemoType = "voice" | "chat" | "ivr";

type StepType = "alert" | "voice" | "chat" | "action" | "success" | "result";

interface DemoStep {
  speaker: "system" | "ai" | "customer" | "merchant" | "agent";
  text: string;
  type: StepType;
}

interface DemoScenario {
  id: number;
  title: string;
  type: DemoType;
  customer: string;
  amount: number;
  language: string;
  steps: DemoStep[];
}

const Finx = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<any>(null);
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Live stats that update in real-time
  const [liveStats, setLiveStats] = useState({
    activeConversations: 847,
    paymentsRecovered: 2340000,
    successRate: 47.3,
    avgResponseTime: 8.2,
    totalTransactions: 12456,
    automationRate: 87.5,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        activeConversations: Math.max(
          700,
          prev.activeConversations + Math.floor(Math.random() * 20 - 8),
        ),
        paymentsRecovered:
          prev.paymentsRecovered + Math.floor(Math.random() * 75000),
        successRate: Math.min(
          100,
          Math.max(40, prev.successRate + (Math.random() * 0.8 - 0.3)),
        ),
        avgResponseTime: Math.max(
          5,
          Math.min(15, prev.avgResponseTime + (Math.random() * 0.6 - 0.3)),
        ),
        totalTransactions:
          prev.totalTransactions + Math.floor(Math.random() * 15),
        automationRate: Math.min(
          95,
          Math.max(80, prev.automationRate + (Math.random() * 0.4 - 0.2)),
        ),
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Demo scenarios
  const demoScenarios: DemoScenario[] = [
    {
      id: 1,
      title: "Failed Payment → Instant Recovery",
      type: "voice",
      customer: "Rajesh Kumar",
      amount: 4500,
      language: "Hindi",
      steps: [
        {
          speaker: "system",
          text: "💳 Payment Failed - UPI Transaction",
          type: "alert",
        },
        {
          speaker: "ai",
          text: "Namaste! Aapka payment complete nahi ho paaya. Koi problem nahi — main abhi aapki madad karta hoon.",
          type: "voice",
        },
        {
          speaker: "customer",
          text: "Haan, payment fail ho gaya.",
          type: "voice",
        },
        {
          speaker: "ai",
          text: "Main aapko ek secure payment link WhatsApp par bhej raha hoon. Aap sirf ek click mein payment complete kar sakte hain.",
          type: "voice",
        },
        {
          speaker: "system",
          text: "📱 WhatsApp payment link sent",
          type: "action",
        },
        { speaker: "customer", text: "Payment completed ✓", type: "success" },
        {
          speaker: "ai",
          text: "Dhanyavaad! Aapka payment safaltapoorvak complete ho gaya hai.",
          type: "voice",
        },
        {
          speaker: "system",
          text: "✅ Recovery Time: 58 seconds | Zero human intervention",
          type: "result",
        },
      ],
    },
    {
      id: 2,
      title: "Merchant-Initiated Collection",
      type: "chat",
      customer: "Priya Sharma",
      amount: 8200,
      language: "English",
      steps: [
        {
          speaker: "merchant",
          text: "Send payment link to customer for Order #4567",
          type: "chat",
        },
        {
          speaker: "ai",
          text: "Payment link generated and sent via WhatsApp and SMS.",
          type: "chat",
        },
        {
          speaker: "system",
          text: "☎️ AI Voice Call initiated to customer",
          type: "action",
        },
        {
          speaker: "ai",
          text: "Hello! Yeh call ShopKaro.com ki taraf se hai. Aapke order ke liye payment pending hai.",
          type: "voice",
        },
        {
          speaker: "ai",
          text: "Main abhi aapko ek secure payment link bhej raha hoon.",
          type: "voice",
        },
        { speaker: "customer", text: "Payment completed ✓", type: "success" },
        {
          speaker: "system",
          text: "✅ Merchant collects without follow-ups | PG processes extra transaction",
          type: "result",
        },
      ],
    },
    {
      id: 3,
      title: "Conversational IVR (No Press 1)",
      type: "ivr",
      customer: "Mohammed Ali",
      amount: 0,
      language: "Hindi",
      steps: [
        {
          speaker: "system",
          text: "📞 Customer calls support line",
          type: "action",
        },
        {
          speaker: "ai",
          text: "Namaste! Bataiye main aapki kaise madad kar sakta hoon?",
          type: "voice",
        },
        {
          speaker: "customer",
          text: "Mera refund status chahiye.",
          type: "voice",
        },
        {
          speaker: "ai",
          text: "Aapke last transaction ka refund 24 ghante mein process ho jaayega. Kya main aapko SMS update bhej doon?",
          type: "voice",
        },
        { speaker: "customer", text: "Haan.", type: "voice" },
        { speaker: "ai", text: "Done. Aur kuch madad chahiye?", type: "voice" },
        {
          speaker: "system",
          text: "✅ No agent involved | No IVR menu frustration",
          type: "result",
        },
      ],
    },
    {
      id: 4,
      title: "Merchant Dashboard Support",
      type: "chat",
      customer: "Merchant: QuickBuy",
      amount: 125000,
      language: "English",
      steps: [
        {
          speaker: "merchant",
          text: "Why is my settlement delayed?",
          type: "chat",
        },
        {
          speaker: "ai",
          text: "Your settlement for ₹1,25,000 is scheduled for tomorrow due to a bank holiday. Would you like a detailed report?",
          type: "chat",
        },
        { speaker: "merchant", text: "Yes.", type: "chat" },
        {
          speaker: "ai",
          text: "Report sent to your registered email.",
          type: "chat",
        },
        {
          speaker: "system",
          text: "✅ Merchant self-service | Reduced PG support tickets",
          type: "result",
        },
      ],
    },
    {
      id: 5,
      title: "EMI Reminder - Voice AI",
      type: "voice",
      customer: "Anita Desai",
      amount: 15600,
      language: "Tamil",
      steps: [
        {
          speaker: "system",
          text: "📅 EMI due tomorrow - Auto trigger",
          type: "action",
        },
        {
          speaker: "ai",
          text: "Reminder: Ungal EMI naalai due agirathu. Payment ippo seiya virumbugireergala?",
          type: "voice",
        },
        { speaker: "customer", text: "Aamam (Yes).", type: "voice" },
        {
          speaker: "ai",
          text: "WhatsApp la payment link anupuren.",
          type: "voice",
        },
        {
          speaker: "system",
          text: "📱 Payment link sent via WhatsApp",
          type: "action",
        },
        {
          speaker: "customer",
          text: "EMI payment completed ✓",
          type: "success",
        },
        {
          speaker: "ai",
          text: "Nandri! Ungal EMI payment successful.",
          type: "voice",
        },
        {
          speaker: "system",
          text: "✅ Higher on-time payments | Zero manual calls",
          type: "result",
        },
      ],
    },
    {
      id: 6,
      title: "Smart Escalation to Agent",
      type: "voice",
      customer: "Vikram Singh",
      amount: 6800,
      language: "English",
      steps: [
        {
          speaker: "customer",
          text: "Mujhe payment issue samajh nahi aa raha.",
          type: "voice",
        },
        {
          speaker: "ai",
          text: "Koi baat nahi. Main abhi aapko support agent se connect karta hoon.",
          type: "voice",
        },
        {
          speaker: "system",
          text: "🔄 Transferring to human agent with full context...",
          type: "action",
        },
        {
          speaker: "agent",
          text: "Hello Vikram, I can see you had a failed payment of ₹6,800. Let me help you.",
          type: "voice",
        },
        {
          speaker: "system",
          text: "✅ Agent doesn't repeat questions | Faster resolution",
          type: "result",
        },
      ],
    },
  ];

  // Helper function for speech
  const speakText = (text: string, language: string) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang =
      language === "Hindi" ? "hi-IN" : language === "Tamil" ? "ta-IN" : "en-IN";

    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Play demo
  // const playDemo = (demo: any) => {
  //   setSelectedDemo(demo);
  //   setDemoStep(0);
  //   setIsPlaying(true);
  // };

  const playDemo = (demo: DemoScenario) => {
    window.speechSynthesis.cancel(); // stop previous demo
    setSelectedDemo(demo);
    setDemoStep(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && selectedDemo && demoStep < selectedDemo.steps.length - 1) {
      const timer = setTimeout(() => {
        setDemoStep((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (demoStep >= selectedDemo?.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, demoStep, selectedDemo]);

  useEffect(() => {
    if (!isPlaying || !selectedDemo) return;

    const step = selectedDemo.steps[demoStep];
    if (!step) return;

    if (step.type === "voice") {
      speakText(step.text, selectedDemo.language);
    }

    const timer = setTimeout(() => {
      if (demoStep < selectedDemo.steps.length - 1) {
        setDemoStep((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [demoStep, isPlaying, selectedDemo]);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    trend,
    trendValue,
    color,
    suffix = "",
    prefix = "",
  }: StatCardProps) => (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${trend === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {trend === "up" ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            {trendValue}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800">
        {prefix}
        {value}
        {suffix}
      </div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );

  const ConversationCard = ({
    type,
    customer,
    amount,
    status,
    language,
    time,
    onClick,
  }: ConversationCardProps) => (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-4 border border-gray-200 mb-3 shadow-sm active:bg-gray-50 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {type === "voice" ? (
            <div className="bg-blue-100 p-2 rounded-full">
              <Phone size={16} className="text-blue-600" />
            </div>
          ) : type === "ivr" ? (
            <div className="bg-purple-100 p-2 rounded-full">
              <PhoneCall size={16} className="text-purple-600" />
            </div>
          ) : (
            <div className="bg-green-100 p-2 rounded-full">
              <MessageSquare size={16} className="text-green-600" />
            </div>
          )}
          <div>
            <div className="font-semibold text-sm text-gray-800">
              {customer}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Languages size={12} />
              {language}
            </div>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : status === "pending"
                ? "bg-blue-100 text-blue-700"
                : "bg-orange-100 text-orange-700"
          }`}
        >
          {status}
        </div>
      </div>
      {amount > 0 && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="text-sm font-semibold text-gray-700">
            ₹{amount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Clock size={12} />
            {time}
          </div>
        </div>
      )}
    </div>
  );

  // Tab Components
  const OverviewTab = () => (
    <div className="space-y-4">
      {/* Hero Stats */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="animate-pulse" size={24} />
            <h2 className="text-lg font-bold">FinX AI Voice Platform</h2>
          </div>
          <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            LIVE
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-3xl font-bold">
              {liveStats.activeConversations}
            </div>
            <div className="text-blue-100 text-sm">Active Conversations</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              ₹{(liveStats.paymentsRecovered / 100000).toFixed(1)}L
            </div>
            <div className="text-blue-100 text-sm">Recovered Today</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={TrendingUp}
          label="Recovery Rate"
          value={liveStats.successRate.toFixed(1)}
          suffix="%"
          trend="up"
          trendValue="12.3"
          color="bg-green-500"
        />
        <StatCard
          icon={Clock}
          label="Avg Response"
          value={liveStats.avgResponseTime.toFixed(1)}
          suffix="s"
          trend="down"
          trendValue="8.2"
          color="bg-blue-500"
        />
        <StatCard
          icon={Bot}
          label="AI Automation"
          value={liveStats.automationRate.toFixed(1)}
          suffix="%"
          color="bg-purple-500"
          trend={undefined}
          trendValue={undefined}
        />
        <StatCard
          icon={BarChart3}
          label="Total Txns Today"
          value={(liveStats.totalTransactions / 1000).toFixed(1)}
          suffix="K"
          trend="up"
          trendValue="15.7"
          color="bg-orange-500"
        />
      </div>

      {/* Real Impact Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-l-4 border-green-500">
        <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
          <CheckCircle size={18} className="text-green-600" />
          Proven Results (Last Month)
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">₹2.3Cr</div>
            <div className="text-xs text-gray-600">Payments Recovered</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">55</div>
            <div className="text-xs text-gray-600">vs 200 Ops Team</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">47%</div>
            <div className="text-xs text-gray-600">Failed Pmt Recovery</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-600">₹4Cr</div>
            <div className="text-xs text-gray-600">NPA Saved</div>
          </div>
        </div>
      </div>

      {/* Channel Distribution */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MessageCircleMore size={18} className="text-blue-600" />
          Channel Distribution (Today)
        </h3>
        <div className="space-y-3">
          {[
            {
              channel: "Voice AI",
              count: 5234,
              percent: 42,
              color: "bg-blue-500",
              icon: Phone,
            },
            {
              channel: "WhatsApp Bot",
              count: 3821,
              percent: 31,
              color: "bg-green-500",
              icon: MessageSquare,
            },
            {
              channel: "Smart IVR",
              count: 2187,
              percent: 17,
              color: "bg-purple-500",
              icon: PhoneCall,
            },
            {
              channel: "Web Chat",
              count: 1214,
              percent: 10,
              color: "bg-orange-500",
              icon: MessageCircleMore,
            },
          ].map((item) => (
            <div key={item.channel}>
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <item.icon size={14} className="text-gray-600" />
                  <span className="text-gray-700">{item.channel}</span>
                </div>
                <div className="font-semibold text-gray-800">
                  {item.count} ({item.percent}%)
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Language Support */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Languages size={18} className="text-purple-600" />
          Language-wise Conversations
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { lang: "Hindi", percent: 34, flag: "🇮🇳" },
            { lang: "English", percent: 28, flag: "🇬🇧" },
            { lang: "Tamil", percent: 15, flag: "🇮🇳" },
            { lang: "Bengali", percent: 12, flag: "🇮🇳" },
            { lang: "Telugu", percent: 6, flag: "🇮🇳" },
            { lang: "Marathi", percent: 5, flag: "🇮🇳" },
          ].map((item) => (
            <div
              key={item.lang}
              className="bg-gray-50 rounded-lg p-2 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>{item.flag}</span>
                  <span className="text-xs font-semibold text-gray-700">
                    {item.lang}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-800">
                  {item.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DemosTab = () => (
    <div className="space-y-4">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-4">
        <h2 className="text-lg font-bold mb-2">Live Demo Scenarios</h2>
        <p className="text-sm text-purple-100">
          See how FinX AI recovers payments in real-time
        </p>
      </div>

      {/* Demo Cards */}
      {demoScenarios.map((demo) => (
        <div
          key={demo.id}
          className="bg-white rounded-xl p-4 shadow-md border border-gray-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {demo.type === "voice" && (
                  <Phone size={16} className="text-blue-600" />
                )}
                {demo.type === "chat" && (
                  <MessageSquare size={16} className="text-green-600" />
                )}
                {demo.type === "ivr" && (
                  <PhoneCall size={16} className="text-purple-600" />
                )}
                <h3 className="font-bold text-gray-800 text-sm">
                  {demo.title}
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  {demo.customer}
                </div>
                <div className="flex items-center gap-1">
                  <Languages size={12} />
                  {demo.language}
                </div>
              </div>
              {demo.amount > 0 && (
                <div className="text-sm font-semibold text-gray-700">
                  ₹{demo.amount.toLocaleString()}
                </div>
              )}
            </div>
            <button
              onClick={() => playDemo(demo)}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              <PlayCircle size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Demo Player Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{selectedDemo.title}</h3>
                <button
                  onClick={() => {
                    setSelectedDemo(null);
                    setIsPlaying(false);
                    setDemoStep(0);
                  }}
                  className="bg-white/20 p-1 rounded-full hover:bg-white/30"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4 text-xs text-blue-100">
                <span>{selectedDemo.customer}</span>
                <span>•</span>
                <span>{selectedDemo.language}</span>
                {selectedDemo.amount > 0 && (
                  <>
                    <span>•</span>
                    <span>₹{selectedDemo.amount.toLocaleString()}</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 space-y-3">
              {selectedDemo.steps.slice(0, demoStep + 1).map(
                (
                  step: {
                    type: string;
                    speaker:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | null
                      | undefined;
                    text:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  },
                  idx: React.Key | null | undefined,
                ) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      step.type === "alert"
                        ? "bg-red-50 border-l-4 border-red-500"
                        : step.type === "action"
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : step.type === "success"
                            ? "bg-green-50 border-l-4 border-green-500"
                            : step.type === "result"
                              ? "bg-purple-50 border-l-4 border-purple-500"
                              : step.speaker === "ai"
                                ? "bg-blue-100 ml-0 mr-8"
                                : step.speaker === "customer"
                                  ? "bg-gray-100 ml-8 mr-0"
                                  : step.speaker === "merchant"
                                    ? "bg-green-100 ml-0 mr-8"
                                    : step.speaker === "agent"
                                      ? "bg-orange-100 ml-0 mr-8"
                                      : "bg-gray-50"
                    } ${idx === demoStep ? "animate-pulse" : ""}`}
                  >
                    <div className="flex items-start gap-2">
                      {step.speaker === "ai" && (
                        <Bot size={16} className="text-blue-600 mt-0.5" />
                      )}
                      {step.speaker === "customer" && (
                        <Users size={16} className="text-gray-600 mt-0.5" />
                      )}
                      {step.speaker === "merchant" && (
                        <Building2
                          size={16}
                          className="text-green-600 mt-0.5"
                        />
                      )}
                      {step.speaker === "agent" && (
                        <HeadphonesIcon
                          size={16}
                          className="text-orange-600 mt-0.5"
                        />
                      )}
                      {step.speaker === "system" && (
                        <Zap size={16} className="text-purple-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-600 mb-1 capitalize">
                          {step.speaker}
                        </div>
                        <div className="text-sm text-gray-800">{step.text}</div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-600">
                  Step {demoStep + 1} of {selectedDemo.steps.length}
                </div>
                <button
                  onClick={() => {
                    if (isPlaying) {
                      setIsPlaying(false);
                    } else if (demoStep < selectedDemo.steps.length - 1) {
                      setIsPlaying(true);
                    } else {
                      setDemoStep(0);
                      setIsPlaying(true);
                    }
                  }}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
                >
                  {isPlaying ? (
                    <>
                      <PauseCircle size={16} />
                      Pause
                    </>
                  ) : demoStep >= selectedDemo.steps.length - 1 ? (
                    <>
                      <RefreshCw size={16} />
                      Restart
                    </>
                  ) : (
                    <>
                      <PlayCircle size={16} />
                      {demoStep === 0 ? "Play" : "Resume"}
                    </>
                  )}
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((demoStep + 1) / selectedDemo.steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const MerchantsTab = () => (
    <div className="space-y-4">
      {/* Merchant Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Building2}
          label="Active Merchants"
          value="1,247"
          trend="up"
          trendValue="8.3"
          color="bg-blue-500"
        />
        <StatCard
          icon={Target}
          label="Avg Collections"
          prefix="₹"
          value="34.5K"
          trend="up"
          trendValue="12.1"
          color="bg-green-500"
        />
      </div>

      {/* Top Merchants */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-green-600" />
          Top Performing Merchants (Today)
        </h3>
        <div className="space-y-3">
          {[
            {
              name: "ShopKaro.com",
              recovered: 245000,
              txns: 156,
              rate: 52,
              logo: "🛒",
            },
            {
              name: "PayFast Retail",
              recovered: 198000,
              txns: 124,
              rate: 48,
              logo: "💳",
            },
            {
              name: "QuickBuy Solutions",
              recovered: 167000,
              txns: 98,
              rate: 45,
              logo: "⚡",
            },
          ].map((merchant, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{merchant.logo}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-sm">
                    {merchant.name}
                  </div>
                  <div className="text-xs text-green-600 font-semibold">
                    {merchant.rate}% recovery rate
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Recovered</div>
                  <div className="font-bold text-green-600">
                    ₹{(merchant.recovered / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Transactions</div>
                  <div className="font-bold text-blue-600">{merchant.txns}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Merchant Activity */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            {
              merchant: "ShopKaro.com",
              action: "triggered 23 payment links",
              icon: Zap,
              color: "bg-blue-100 text-blue-600",
              time: "5m",
            },
            {
              merchant: "PayFast Retail",
              action: "recovered ₹34,500 via AI",
              icon: CheckCircle,
              color: "bg-green-100 text-green-600",
              time: "12m",
            },
            {
              merchant: "QuickBuy",
              action: "customer query resolved",
              icon: MessageSquare,
              color: "bg-purple-100 text-purple-600",
              time: "18m",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
            >
              <div className={`p-2 rounded-full ${item.color}`}>
                <item.icon size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">
                  {item.merchant}
                </div>
                <div className="text-xs text-gray-600">{item.action}</div>
              </div>
              <div className="text-xs text-gray-400">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-4">
      {/* Platform Features */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings size={18} className="text-gray-600" />
          Platform Configuration
        </h3>
        <div className="space-y-3">
          {[
            {
              name: "Voice AI Auto-calls",
              desc: "Auto-trigger for failed payments",
              enabled: true,
            },
            {
              name: "WhatsApp Integration",
              desc: "Send payment links via WhatsApp",
              enabled: true,
            },
            {
              name: "Smart IVR",
              desc: "Conversational IVR (No Press 1)",
              enabled: true,
            },
            {
              name: "EMI Reminders",
              desc: "Proactive payment reminders",
              enabled: true,
            },
            {
              name: "Agent Escalation",
              desc: "Transfer complex issues to humans",
              enabled: false,
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-800">
                  {feature.name}
                </div>
                <div className="text-xs text-gray-500">{feature.desc}</div>
              </div>
              <div
                className={`w-12 h-6 rounded-full relative transition ${feature.enabled ? "bg-green-500" : "bg-gray-300"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${feature.enabled ? "right-1" : "left-1"}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Support */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Languages size={18} className="text-purple-600" />
          Supported Languages (8)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Hindi 🇮🇳",
            "English 🇬🇧",
            "Tamil 🇮🇳",
            "Telugu 🇮🇳",
            "Bengali 🇮🇳",
            "Marathi 🇮🇳",
            "Kannada 🇮🇳",
            "Malayalam 🇮🇳",
          ].map((lang) => (
            <div
              key={lang}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg border border-purple-200"
            >
              <CheckCircle size={14} className="text-green-600" />
              <span className="text-xs font-semibold text-gray-700">
                {lang}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-l-4 border-green-500">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ShieldCheck size={18} className="text-green-600" />
          Compliance & Security
        </h3>
        <div className="space-y-2">
          {[
            "RBI Guidelines Compliant",
            "Consent-based Calling Only",
            "Full Audit Trail Maintained",
            "End-to-End Encryption",
            "GDPR & Data Privacy Ready",
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Options */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Integration Channels</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              name: "REST API",
              status: "Active",
              color: "bg-green-100 text-green-700",
            },
            {
              name: "Webhook",
              status: "Active",
              color: "bg-green-100 text-green-700",
            },
            {
              name: "Dashboard",
              status: "Active",
              color: "bg-green-100 text-green-700",
            },
            {
              name: "Mobile SDK",
              status: "Coming Soon",
              color: "bg-orange-100 text-orange-700",
            },
          ].map((channel, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="font-semibold text-sm text-gray-800 mb-1">
                {channel.name}
              </div>
              <div
                className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${channel.color}`}
              >
                {channel.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 sticky top-0 z-40 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold">FinX AI Voice</h1>
              <p className="text-xs text-blue-100">Payment Gateway Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white/20 p-2 rounded-lg backdrop-blur relative">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                12
              </div>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-white/20 p-2 rounded-lg backdrop-blur"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-3 flex items-center gap-4 text-xs overflow-x-auto pb-2">
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">
            <Activity size={12} />
            <span>{liveStats.activeConversations} Active</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">
            <TrendingUp size={12} />
            <span>{liveStats.successRate.toFixed(0)}% Recovery</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">
            <Bot size={12} />
            <span>{liveStats.automationRate.toFixed(0)}% Automated</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "demos" && <DemosTab />}
        {activeTab === "merchants" && <MerchantsTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${
              activeTab === "overview"
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <BarChart3 size={20} />
            <span className="text-xs font-semibold">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("demos")}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${
              activeTab === "demos"
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <PlayCircle size={20} />
            <span className="text-xs font-semibold">Demos</span>
          </button>
          <button
            onClick={() => setActiveTab("merchants")}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${
              activeTab === "merchants"
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Building2 size={20} />
            <span className="text-xs font-semibold">Merchants</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${
              activeTab === "settings"
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Settings size={20} />
            <span className="text-xs font-semibold">Settings</span>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl z-30 animate-pulse">
        <Phone size={24} />
      </button>

      {/* Branding Footer */}
      <div className="fixed bottom-20 left-0 right-0 text-center text-xs text-gray-500 pb-2 pointer-events-none">
        Powered by FinX Platform • Rupenet Technology
      </div>
    </div>
  );
};

export default Finx;
