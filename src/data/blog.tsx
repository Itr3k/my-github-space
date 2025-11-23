import { BlogPost } from '../types';

const SAMPLE_CONTENT = `
<p class="text-lg text-zinc-300 leading-relaxed mb-8">
  In today's rapidly evolving digital landscape, artificial intelligence has moved beyond a buzzword to become a critical driver of business innovation. This transformation is not just about efficiency—it's about reimagining what's possible in the enterprise.
</p>

<h2 class="text-2xl font-bold text-white mb-4 mt-12">The Shift to Agentic Workflows</h2>
<p class="text-zinc-400 leading-relaxed mb-6">
  Traditional automation was linear and rigid. You defined a trigger and a set of actions. Agentic workflows, however, introduce decision-making capabilities at every step. An AI agent doesn't just follow a script; it assesses the context, determines the best tool for the job, and executes complex sequences of tasks that previously required human oversight.
</p>

<ul class="list-disc list-outside pl-6 space-y-2 mb-8 text-zinc-400">
  <li><strong>Dynamic Decision Making:</strong> Agents adapt to changing inputs without breaking the workflow.</li>
  <li><strong>Multi-Modal Capabilities:</strong> Processing text, images, and code simultaneously.</li>
  <li><strong>Self-Correction:</strong> Identifying errors and retrying with adjusted parameters.</li>
</ul>

<h2 class="text-2xl font-bold text-white mb-4 mt-12">Implementation Strategies</h2>
<p class="text-zinc-400 leading-relaxed mb-6">
  For organizations looking to adopt these technologies, the path forward involves a strategic assessment of current bottlenecks. Where are your teams spending the most time on repetitive, cognitive tasks? These are your prime candidates for agentic automation.
</p>

<blockquote class="border-l-4 border-indigo-500 pl-6 py-2 my-12 bg-white/5 rounded-r-xl">
  <p class="text-lg text-indigo-200 italic">
    "The companies that win in the next decade will be those that successfully integrate human creativity with AI agent scalability."
  </p>
</blockquote>

<h2 class="text-2xl font-bold text-white mb-4 mt-12">Looking Ahead</h2>
<p class="text-zinc-400 leading-relaxed mb-6">
  As these models become smaller, faster, and more specialized, we can expect to see a proliferation of "micro-agents" dedicated to specific enterprise functions—from HR onboarding to supply chain optimization. The key is to start building the infrastructure today that will support this agentic future.
</p>
`;

export const LATEST_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "This Week: AI-Powered Talent Acquisition Enhances Hiring Speed",
    excerpt: "This week's AI news reveals how businesses can cut hiring time by 50% and boost candidate quality with AI-powered talent acquisition tools.",
    category: "AI in the Workplace",
    readTime: "5 min read",
    date: "Nov 9, 2025",
    views: "28 views",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "Sarah Chen",
      role: "Head of Strategy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    tags: ["Recruitment", "HR Tech", "Automation", "Enterprise"]
  },
  {
    id: 2,
    title: "This Week: AI-Driven Predictability Fortifies Supply Chains",
    excerpt: "AI-powered predictive analytics is redefining supply chain resilience, offering Southern California businesses 15-30% in inventory reduction.",
    category: "AI Consulting",
    readTime: "7 min read",
    date: "Nov 9, 2025",
    views: "1 view",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "Michael Ross",
      role: "Senior Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    tags: ["Supply Chain", "Predictive Analytics", "Logistics", "Operations"]
  },
  {
    id: 3,
    title: "This Week: Unlocking Niche Efficiency with Small Language Models",
    excerpt: "Discover how Small Language Models (SLMs) boost efficiency and data security for Southern California businesses, saving 20% on compute costs.",
    category: "AI Tips",
    readTime: "4 min read",
    date: "Nov 9, 2025",
    views: "0 views",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "David Kim",
      role: "Lead Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    tags: ["SLM", "Cost Optimization", "Security", "Edge Computing"]
  },
  {
    id: 4,
    title: "AI's New Rulebook: Navigating Governance This Week",
    excerpt: "New AI governance frameworks this week mean Southern California businesses must act now to reduce legal & reputational risk.",
    category: "AI Thought Leadership",
    readTime: "6 min read",
    date: "Nov 9, 2025",
    views: "10 views",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "Elena Rodriguez",
      role: "Legal Tech Specialist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    tags: ["Governance", "Compliance", "Legal", "Risk Management"]
  },
  {
    id: 5,
    title: "This Week: Hyper-Personalized CX with Generative AI",
    excerpt: "This week, generative AI for CX promises Southern California businesses 15-25% revenue growth & 20-30% support cost reduction.",
    category: "AI Services",
    readTime: "5 min read",
    date: "Nov 9, 2025",
    views: "1 view",
    image: "https://images.unsplash.com/photo-1535378437327-b712818f6982?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "Sarah Chen",
      role: "Head of Strategy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    tags: ["Customer Experience", "Generative AI", "Support", "Sales"]
  },
  {
    id: 6,
    title: "Gemini Automate: This Week's Game Changer for Business",
    excerpt: "Google's new Gemini Automate framework promises significant efficiency gains for Southern California businesses, offering 20% productivity boosts.",
    category: "AI News",
    readTime: "3 min read",
    date: "Nov 9, 2025",
    views: "0 views",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "David Kim",
      role: "Lead Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    tags: ["Google Gemini", "Automation", "Productivity", "Tools"]
  },
  // --- Extra Posts for Pagination Testing ---
  {
    id: 7,
    title: "The Rise of Vertical AI Agents in Healthcare",
    excerpt: "How specialized medical AI agents are reducing administrative burden and improving diagnostic accuracy in hospitals.",
    category: "AI in the Workplace",
    readTime: "6 min read",
    date: "Nov 8, 2025",
    views: "15 views",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "Dr. Emily Wong",
      role: "Healthcare AI Specialist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    tags: ["Healthcare", "Vertical AI", "Medicine", "Automation"]
  },
  {
    id: 8,
    title: "Prompt Engineering: From Art to Science",
    excerpt: "Moving beyond trial and error: structured approaches to prompt engineering that yield consistent enterprise results.",
    category: "AI Tips",
    readTime: "8 min read",
    date: "Nov 8, 2025",
    views: "42 views",
    image: "https://images.unsplash.com/photo-1662947036642-adc62b7a037d?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "David Kim",
      role: "Lead Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    tags: ["Prompt Engineering", "LLMs", "Development", "Best Practices"]
  },
  {
    id: 9,
    title: "AI Ethics: Navigating the Gray Areas",
    excerpt: "A practical framework for addressing ethical dilemmas in AI deployment before they become PR nightmares.",
    category: "AI Thought Leadership",
    readTime: "9 min read",
    date: "Nov 7, 2025",
    views: "33 views",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "Elena Rodriguez",
      role: "Legal Tech Specialist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    tags: ["Ethics", "Responsibility", "Policy", "Governance"]
  },
  {
    id: 10,
    title: "Data Cleanrooms: The Unsung Hero of AI Strategy",
    excerpt: "Why secure data environments are becoming the cornerstone of multi-party AI collaboration and model training.",
    category: "AI Consulting",
    readTime: "5 min read",
    date: "Nov 6, 2025",
    views: "8 views",
    image: "https://images.unsplash.com/photo-1558494949-ef526b004297?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "Michael Ross",
      role: "Senior Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    tags: ["Data Security", "Infrastructure", "Collaboration", "Enterprise"]
  },
  {
    id: 11,
    title: "Beyond Chatbots: The Era of Action Models",
    excerpt: "Large Action Models (LAMs) are taking over where LLMs left off, performing real-world tasks across applications.",
    category: "AI News",
    readTime: "4 min read",
    date: "Nov 5, 2025",
    views: "56 views",
    image: "https://images.unsplash.com/photo-1614726365723-49cfae9278b7?q=80&w=1976&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "Sarah Chen",
      role: "Head of Strategy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    tags: ["LAMs", "Future Tech", "Automation", "Agents"]
  },
  {
    id: 12,
    title: "Optimizing RAG Pipelines for Scale",
    excerpt: "Technical deep dive: How to maintain low latency and high accuracy when your vector database grows to millions of embeddings.",
    category: "AI Services",
    readTime: "11 min read",
    date: "Nov 5, 2025",
    views: "21 views",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    content: SAMPLE_CONTENT,
    author: {
      name: "David Kim",
      role: "Lead Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
    },
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    tags: ["RAG", "Engineering", "Vector DB", "Scaling"]
  }
];
