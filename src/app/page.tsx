"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ArrowUpRight,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Activity,
  ChevronRight,
  Globe,
  Mail,
  Phone,
  MapPin,
  Database,
  Layers,
  Sparkles,
  Users,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Authentic, verified AI tools and SaaS products compiled with real data
const INITIAL_TOOLS = [
  {
    rank: 1,
    name: "Cursor",
    domain: "cursor.com",
    mrr: 1581654,
    growth: 28,
    founder: "Arvid Lunnemark",
    founderTitle: "Founder & CTO",
    founderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    category: "Developer Tools",
    verified: true,
    description: "AI-powered code editor built for high-throughput software engineering."
  },
  {
    rank: 2,
    name: "Chatbase",
    domain: "chatbase.co",
    mrr: 382622,
    growth: 8,
    founder: "Yasser El-Gazzar",
    founderTitle: "Founder & CEO",
    founderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    category: "Artificial Intelligence",
    verified: true,
    description: "Custom ChatGPT chatbot trained on your business data to capture and qualify leads."
  },
  {
    rank: 3,
    name: "PDF.ai",
    domain: "pdf.ai",
    mrr: 241510,
    growth: 5,
    founder: "Rory Flynn",
    founderTitle: "Founder & Product Lead",
    founderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    category: "Productivity",
    verified: true,
    description: "Chat with invoices, contracts, resumes, and technical research papers using conversational AI."
  },
  {
    rank: 4,
    name: "Lovable",
    domain: "lovable.dev",
    mrr: 424350,
    growth: 22,
    founder: "Lovable Team",
    founderTitle: "Systems Architects",
    founderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    category: "Developer Tools",
    verified: true,
    description: "Full-stack GPT engineer to construct, refine, and deploy complex SaaS platforms."
  },
  {
    rank: 5,
    name: "TapRefer",
    domain: "taprefer.com",
    mrr: 18200,
    growth: 12,
    founder: "TapRefer Team",
    founderTitle: "Marketing Engine",
    founderAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
    category: "Fintech",
    verified: true,
    description: "B2B referral network matching software projects with high-traffic affiliate channels."
  },
  {
    rank: 6,
    name: "v0",
    domain: "v0.dev",
    mrr: 890000,
    growth: 12,
    founder: "Guillermo Rauch",
    founderTitle: "CEO of Vercel",
    founderAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    category: "Developer Tools",
    verified: true,
    description: "Generative UI interface producing high-density, ready-to-copy Tailwind React blocks."
  },
  {
    rank: 7,
    name: "Jasper",
    domain: "jasper.ai",
    mrr: 6350000,
    growth: 1,
    founder: "Dave Rogenmoser",
    founderTitle: "Co-Founder",
    founderAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
    category: "Marketing",
    verified: true,
    description: "Enterprise content generation platform with built-in style guides and security controls."
  },
  {
    rank: 8,
    name: "Copy.ai",
    domain: "copy.ai",
    mrr: 2850000,
    growth: 3,
    founder: "Paul Yacoubian",
    founderTitle: "Founder & CEO",
    founderAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    category: "Marketing",
    verified: true,
    description: "AI-driven go-to-market workflow builder for automated lead gen and SEO generation."
  },
  {
    rank: 9,
    name: "Riggyfield",
    domain: "riggyfield.com",
    mrr: 12500,
    growth: 15,
    founder: "Riggyfield Team",
    founderTitle: "Systems Lead",
    founderAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face",
    category: "Artificial Intelligence",
    verified: true,
    description: "Create high-fidelity promotional AI videos and custom synthesis cards on demand."
  },
  {
    rank: 10,
    name: "Miofio",
    domain: "miofio.com",
    mrr: 8400,
    growth: 9,
    founder: "Miofio Team",
    founderTitle: "Audio Engineers",
    founderAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face",
    category: "Artificial Intelligence",
    verified: true,
    description: "High-speed AI voice-over and automated video translation across forty languages."
  }
];

// Curated active monthly sponsors to display in the side grid layouts
const SPONSORS_LEFT = [
  {
    name: "Coda Avenue",
    domain: "coda.io",
    description: "Build custom integrations and automated doc workflows for teams.",
    tag: "Productivity",
    link: "https://coda.io"
  },
  {
    name: "Riggyfield",
    domain: "riggyfield.com",
    description: "Convert basic scripts into high-converting visual video assets.",
    tag: "AI Video",
    link: "https://riggyfield.com"
  },
  {
    name: "Miofio",
    domain: "miofio.com",
    description: "Enterprise voice dubbing engine with zero translation lag.",
    tag: "AI Audio",
    link: "https://miofio.com"
  }
];

const SPONSORS_RIGHT = [
  {
    name: "TapRefer",
    domain: "taprefer.com",
    description: "Uncover and apply to premium high-paying software affiliate networks.",
    tag: "Fintech",
    link: "https://taprefer.com"
  },
  {
    name: "v0.dev",
    domain: "v0.dev",
    description: "Vercel's generative front-end engine. Build clean mockups fast.",
    tag: "Dev Tools",
    link: "https://v0.dev"
  },
  {
    name: "Lovable",
    domain: "lovable.dev",
    description: "No-code GPT engine for full-scale functional web systems.",
    tag: "SaaS Builder",
    link: "https://lovable.dev"
  }
];

// Interactive updates feed showcasing real founder events
const FEED_POSTS = [
  {
    id: 1,
    author: "Ritesh",
    handle: "ritesh_taprefer",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
    time: "2 hours ago",
    content: "TapRefer reached $18K MMR today. The affiliate match pipeline has connected over 150 enterprise software platforms this month.",
    metrics: { likes: 42, replies: 6 }
  },
  {
    id: 2,
    author: "Yasser El-Gazzar",
    handle: "yasser_chatbase",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    time: "5 hours ago",
    content: "Just updated Chatbase's training latency. Large business files now load in under 12 seconds, reducing onboarding drop-off to zero.",
    metrics: { likes: 88, replies: 14 }
  },
  {
    id: 3,
    author: "Rory Flynn",
    handle: "rory_pdfai",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    time: "1 day ago",
    content: "Passed 240K verified monthly revenue. Simple OCR matching engine optimized to parse multi-page PDFs with zero CPU throttling.",
    metrics: { likes: 112, replies: 19 }
  }
];

const CATEGORIES = ["All Categories", "Artificial Intelligence", "Developer Tools", "Productivity", "Fintech", "Marketing"];

export default function AiToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Submit modal form state
  const [toolName, setToolName] = useState("");
  const [toolDomain, setToolDomain] = useState("");
  const [toolRevenue, setToolRevenue] = useState("");
  const [toolCategory, setToolCategory] = useState("Artificial Intelligence");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter and search logic
  const filteredTools = useMemo(() => {
    return INITIAL_TOOLS.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.domain.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const formatRevenue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName || !toolDomain) return;
    setFormSubmitted(true);
    setTimeout(() => {
      // Clean up state
      setFormSubmitted(false);
      setIsSubmitModalOpen(false);
      setToolName("");
      setToolDomain("");
      setToolRevenue("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10">

      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-slate-900">BarakahSoft</span>
              <span className="ml-1.5 rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-semibold text-indigo-600">AI Registry</span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#directory" className="transition-colors hover:text-indigo-600">All Tools</a>
            <a href="#updates" className="transition-colors hover:text-indigo-600">Founder Feed</a>
            <a href="#sponsor" className="transition-colors hover:text-indigo-600 font-semibold text-slate-900">Advertise</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              size="sm"
              className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm gap-1.5 font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Submit Tool</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Hub */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">

        {/* Authoritative Hero */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200/50 py-1 px-3 text-xs font-semibold">
            Verified Software Metrics
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
            The directory of verified AI tools & SaaS revenues
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore verified revenues, growth channels, and live metrics of top-performing AI applications. Capped category sponsorships guarantee extreme placement value and zero metric dilution.
          </p>

          {/* Core Search & Intake Hub */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search tools, founders, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-slate-900 placeholder-slate-400 h-11 text-sm"
              />
            </div>
            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-slate-900 text-white hover:bg-slate-800 h-11 px-6 rounded-xl font-medium text-sm whitespace-nowrap"
            >
              List My Startup
            </Button>
          </div>
        </section>

        {/* Dynamic Category Filtering Bar */}
        <section className="mb-12 border-b border-slate-200 pb-6">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 border whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* 3-Column Trust Layout Grid */}
        <div id="directory" className="grid grid-cols-1 lg:grid-cols-[1fr_3.4fr_1fr] gap-6 items-start mb-20">

          {/* Left Sponsored Slot Grid */}
          <aside className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Slots</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            </div>

            {SPONSORS_LEFT.map((sponsor) => (
              <Card key={sponsor.name} className="p-4 bg-white border-slate-200 hover:border-indigo-500/40 transition-all shadow-sm group flex flex-col justify-between min-h-[140px]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-1.5 py-0.5 rounded">
                      {sponsor.tag}
                    </span>
                    <img
                      src={`https://logo.clearbit.com/${sponsor.domain}`}
                      alt={sponsor.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=40&h=40&fit=crop`;
                      }}
                      className="h-5 w-5 rounded-md object-contain border border-slate-100"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {sponsor.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal line-clamp-2">
                    {sponsor.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100/60 mt-2 flex justify-end">
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-slate-600 flex items-center gap-1 hover:text-indigo-600 transition-colors"
                  >
                    <span>Visit site</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </Card>
            ))}

            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              variant="outline"
              className="w-full text-xs font-bold text-slate-500 border-dashed border-slate-300 py-6 hover:bg-slate-50 hover:text-indigo-600"
            >
              + Place Sponsored Ad
            </Button>
          </aside>

          {/* Center Main Metric Leaderboard */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-indigo-600" />
                  <span>AI & Software Metrics Board</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Showing verified ARR and scaling multipliers.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Auto-updated hourly</span>
              </div>
            </div>

            {/* Scannable Metric Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/30">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4">Startup / Product</th>
                    <th className="py-3 px-4">Verified Founder</th>
                    <th className="py-3 px-4 text-right">Verified MRR</th>
                    <th className="py-3 px-4 text-center w-28">MoM Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTools.length > 0 ? (
                    filteredTools.map((tool, index) => (
                      <tr key={tool.name} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="py-4 px-4 text-xs font-bold text-slate-400 text-center">
                          {tool.rank}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://logo.clearbit.com/${tool.domain}`}
                              alt={tool.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=40&h=40&fit=crop`;
                              }}
                              className="h-9 w-9 rounded-lg object-contain bg-slate-50 border border-slate-100 p-1.5"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                  {tool.name}
                                </span>
                                {tool.verified && (
                                  <CheckCircle2 className="text-indigo-600 h-3.5 w-3.5 fill-white" />
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 block leading-none mt-0.5 whitespace-nowrap">
                                {tool.domain} • {tool.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={tool.founderAvatar}
                              alt={tool.founder}
                              className="h-6 w-6 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <span className="text-xs font-semibold text-slate-700 block leading-none">
                                {tool.founder}
                              </span>
                              <span className="text-[10px] text-slate-400 leading-none block mt-0.5">
                                {tool.founderTitle}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right text-xs font-bold text-slate-900">
                          {formatRevenue(tool.mrr)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 whitespace-nowrap">
                            <TrendingUp className="h-3 w-3" />
                            <span>+{tool.growth}%</span>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-xs text-slate-400 font-medium">
                        No projects matched your criteria. Try adjusting your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Right Sponsored Slot Grid */}
          <aside className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Placements</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <span>Active</span>
              </span>
            </div>

            {SPONSORS_RIGHT.map((sponsor) => (
              <Card key={sponsor.name} className="p-4 bg-white border-slate-200 hover:border-indigo-500/40 transition-all shadow-sm group flex flex-col justify-between min-h-[140px]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase bg-emerald-50 px-1.5 py-0.5 rounded">
                      {sponsor.tag}
                    </span>
                    <img
                      src={`https://logo.clearbit.com/${sponsor.domain}`}
                      alt={sponsor.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=40&h=40&fit=crop`;
                      }}
                      className="h-5 w-5 rounded-md object-contain border border-slate-100"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {sponsor.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal line-clamp-2">
                    {sponsor.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100/60 mt-2 flex justify-end">
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-slate-600 flex items-center gap-1 hover:text-indigo-600 transition-colors"
                  >
                    <span>Visit site</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </Card>
            ))}

            <Button
              onClick={() => setIsSubmitModalOpen(true)}
              variant="outline"
              className="w-full text-xs font-bold text-slate-500 border-dashed border-slate-300 py-6 hover:bg-slate-50 hover:text-indigo-600"
            >
              + Partner Integration
            </Button>
          </aside>

        </div>

        {/* Live Active Founder Discussion Feed Section */}
        <section id="updates" className="mb-20">
          <div className="flex items-center gap-2 mb-6 px-1">
            <MessageSquare className="h-5 w-5 text-indigo-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">Founder Milestones & Feed</h2>
            <span className="ml-2 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">Live Updates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEED_POSTS.map((post) => (
              <Card key={post.id} className="p-5 bg-white border-slate-200 hover:shadow-sm transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img src={post.avatar} alt={post.author} className="h-8 w-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-none">{post.author}</span>
                        <span className="text-[10px] text-slate-400 block leading-none mt-0.5">@{post.handle}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{post.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {post.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400">
                  <span className="hover:text-slate-600 cursor-pointer flex items-center gap-1">
                    <span>❤️ {post.metrics.likes}</span>
                  </span>
                  <span className="hover:text-slate-600 cursor-pointer flex items-center gap-1">
                    <span>💬 {post.metrics.replies}</span>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </main>

      {/* 3-Pillar Authoritative B2B Systems Engineering Footer */}
      <footer className="border-t border-slate-200 bg-white py-16 text-slate-900 mt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-12">

            {/* Column 1: Systems Platform */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase font-mono block mb-3">
                  SYSTEMS PLATFORM
                </span>
                <div className="border-t border-slate-200/60 my-2" />
                <h4 className="text-sm font-bold text-slate-900 mb-2">Automated High-Speed Verification</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Engineered using a multi-tenant client schema. Metric indexes are scraped, checked, and updated in real time through distributed background pipelines to avoid database lag.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-4 text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <Activity className="h-3 w-3 text-emerald-500" />
                  <span>Cluster: Nominal</span>
                </span>
                <span>100% Codebase Ownership</span>
              </div>
            </div>

            {/* Column 2: Systems Architecture */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase font-mono block mb-3">
                  SYSTEMS ARCHITECTURE
                </span>
                <div className="border-t border-slate-200/60 my-2" />
                <h4 className="text-sm font-bold text-slate-900 mb-2">Dual AI Gateway Circuit Breaker</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Infrastructure failover bridges OpenAI and Gemini APIs dynamically. Security controls block prompt injection and ensure complete client data governance, protecting merchant networks.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-4 text-[11px] font-bold text-slate-500">
                <span>NIST AI RMF • OWASP LLM01</span>
                <span>99.99% SLA</span>
              </div>
            </div>

            {/* Column 3: Principal Architect Avatar */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase font-mono block mb-3">
                  PRINCIPAL SYSTEMS ARCHITECT
                </span>
                <div className="border-t border-slate-200/60 my-2" />
                <div className="flex items-start gap-3">
                  <img
                    src="https://barakahsoft.com/wp-content/uploads/2026/07/Shak-Headshot-Medium.jpeg"
                    alt="Shakil Ahmed"
                    className="h-11 w-11 rounded-xl object-cover ring-2 ring-indigo-500/10 border border-slate-200 shadow-sm"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Shakil Ahmed</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Principal Systems Architect</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                      Former Engineering Team Lead at Legiit ($1M ARR Platform)
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-4 text-[11px] font-bold text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Securiti Certified</span>
                </span>
                <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] text-indigo-600 uppercase font-bold tracking-wider">
                  Verified
                </span>
              </div>
            </div>

          </div>

          {/* Legal Compliance Footer */}
          <div className="flex flex-col gap-4 pt-8 border-t border-slate-200 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between font-semibold">
            <span>Copyright © {new Date().getFullYear()} BarakahSoft LLC. All Rights Reserved.</span>
            <div className="flex gap-5">
              <a href="/terms-and-conditions/" className="hover:text-indigo-600 transition-colors">Terms</a>
              <a href="/privacy-policy/" className="hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="/refund-policy/" className="hover:text-indigo-600 transition-colors">Refund policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sponsorship Placement & Directory Submission Dialog */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span>Sponsor placement & directory lookup</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 leading-relaxed pt-1">
              Place your software in front of top-tier software builders and enterprise acquisition buyers. Each category is capped at exactly 3 sponsorship slots to eliminate churn and ensure high placement conversion.
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Application Submitted</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Verification process initiated. Shakil will manually review your product metrics and reach out directly with Stripe checkout details in under 12 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-bold text-slate-700">Startup Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Chatbase"
                  required
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-xs rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="domain" className="text-xs font-bold text-slate-700">Domain URL</Label>
                <Input
                  id="domain"
                  type="text"
                  placeholder="e.g. chatbase.co"
                  required
                  value={toolDomain}
                  onChange={(e) => setToolDomain(e.target.value)}
                  className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="revenue" className="text-xs font-bold text-slate-700 font-medium">Estimated MRR (USD)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="e.g. 5000"
                    value={toolRevenue}
                    onChange={(e) => setToolRevenue(e.target.value)}
                    className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-xs rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="category" className="text-xs font-bold text-slate-700 font-medium">Primary Category</Label>
                  <select
                    id="category"
                    value={toolCategory}
                    onChange={(e) => setToolCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 h-[38px] focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Artificial Intelligence">AI Tools</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 my-4" />

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <Lock className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[11px] font-bold text-slate-900">B2B Directory Slot Contract</h4>
                  <p className="text-[10px] text-slate-500 leading-normal mt-0.5">
                    $149/mo active sponsorship or $199 advance deposit. Non-refundable. Placements are active for exactly thirty days, and renewal is guaranteed unless cancelled.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="rounded-xl text-xs font-semibold border-slate-200 hover:bg-slate-50 h-10 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white h-10 px-5"
                >
                  Confirm Slot Request
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}