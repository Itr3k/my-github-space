import { ShieldCheck, Truck, TrendingUp, BarChart3, Stethoscope, ShoppingCart } from 'lucide-react';
import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "jpmorgan",
    client: "JPMorgan Chase",
    category: "AI-Powered Business Automation",
    headline: "JPMorgan Automates Document Reviews, Saves 360k Hours",
    image: "https://images.unsplash.com/photo-1669296143651-192ed9c87c22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnRyYWN0JTIwZG9jdW1lbnQlMjByZXZpZXclMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjM3NjY5ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    challenge: "Manual loan document reviews were slow and error-prone, consuming thousands of lawyer hours.",
    solution: "Deployed COiN (Contract Intelligence), a machine-learning system to analyze contracts and extract key clauses automatically.",
    results: "360,000 hours of legal work eliminated annually, reducing errors and operational costs by millions.",
    icon: ShieldCheck,
    fullDescription: "JPMorgan Chase faced a significant bottleneck in their loan processing workflow. Legal teams were spending approximately 360,000 hours annually reviewing commercial loan agreements. This manual process was not only time-consuming and expensive but also prone to human error.\n\nTo address this, the bank developed COiN (Contract Intelligence), a proprietary machine learning platform. COiN runs on a private cloud and uses unsupervised learning to analyze legal documents. It can review documents in seconds that would take human lawyers thousands of hours. The system extracts 150 critical data points from 12,000 annual commercial credit agreements.",
    stats: [
      { value: "360k", label: "Hours Saved Annually" },
      { value: "100%", label: "Error Reduction" },
      { value: "12k", label: "Contracts Analyzed" }
    ]
  },
  {
    id: "ups",
    client: "UPS",
    category: "Custom AI Solution – Logistics",
    headline: "UPS Optimizes Routes to Cut Fuel Use and Delays",
    image: "https://images.unsplash.com/photo-1662135426498-72a27149a7dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBkZWxpdmVyeSUyMHRydWNrJTIwcm91dGUlMjBtYXB8ZW58MXx8fHwxNzYzNzY2OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    challenge: "Inefficient delivery routes led to wasted fuel, increased emissions, and delivery delays.",
    solution: "Implemented ORION AI system to dynamically optimize driver routes based on traffic and package volume.",
    results: "Tens of millions of miles eliminated yearly, saving millions in fuel costs and improving on-time delivery rates.",
    icon: Truck,
    fullDescription: "UPS operates one of the largest delivery fleets in the world. With rising fuel costs and environmental concerns, route efficiency became a top priority. Drivers often took suboptimal routes, leading to excess mileage and fuel consumption.\n\nThe solution was ORION (On-Road Integrated Optimization and Navigation), an advanced AI system that analyzes over 250 million address data points. ORION recalculates routes throughout the day based on changing traffic conditions and delivery commitments. It ensures drivers take the most efficient path, saving time and fuel.",
    stats: [
      { value: "100M", label: "Miles Saved/Year" },
      { value: "10M", label: "Gallons Fuel Saved" },
      { value: "$300M", label: "Annual Cost Savings" }
    ]
  },
  {
    id: "boa",
    client: "Bank of America",
    category: "AI Voice & Chat Support",
    headline: "Bank of America’s “Erica” Handles Millions of Queries",
    image: "https://images.unsplash.com/photo-1573166918385-7d4308892300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nJTIwZGlnaXRhbCUyMGFic3RyYWN0fGVufDF8fHx8MTc2Mzc2Njk4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    challenge: "Call centers were overloaded with routine customer inquiries, leading to long wait times.",
    solution: "Launched Erica virtual assistant (voice/text AI) for 24/7 instant customer support.",
    results: "Over 50 million users served with 98% query resolution, cutting support wait times drastically.",
    icon: TrendingUp,
    fullDescription: "Bank of America needed a way to scale its customer support without exponentially increasing headcount. Routine queries like balance checks and transaction history were clogging up phone lines, frustrating customers with long wait times.\n\nErica, an AI-driven virtual financial assistant, was introduced to the mobile app. Erica uses Natural Language Processing (NLP) to understand and respond to voice and text commands. It provides proactive insights, helps with transactions, and monitors for recurring charges, effectively acting as a 24/7 personal banker.",
    stats: [
      { value: "1B+", label: "Interactions" },
      { value: "98%", label: "Resolution Rate" },
      { value: "50M", label: "Users Served" }
    ]
  },
  {
    id: "cdw",
    client: "CDW",
    category: "AI Consulting & Automation",
    headline: "CDW Streamlines Order Processing with AI Workflow",
    image: "https://images.unsplash.com/photo-1754825653361-e55b7b2367da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlciUyMGJsdWUlMjBtb2Rlcm58ZW58MXx8fHwxNzYzNzY2OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    challenge: "Complex IT product orders were processed manually, delaying quotes and frustrating customers.",
    solution: "Introduced AI bots and voice assistants to automate quoting, availability checks, and FAQs.",
    results: "Quote turnaround time slashed by >80%, enabling higher sales and freeing staff for value-added services.",
    icon: BarChart3,
    fullDescription: "CDW, a leading provider of IT solutions, struggled with the manual volume of quote requests and order processing. Sales engineers were spending too much time on administrative tasks rather than consulting with clients.\n\nBy implementing an intelligent automation workflow, CDW automated the intake and processing of standard quotes. AI bots now check inventory across distribution centers, calculate pricing based on client tiers, and generate quote documents instantly. This transformation allowed the sales team to focus on complex, high-value deals.",
    stats: [
      { value: "80%", label: "Faster Quotes" },
      { value: "24/7", label: "Availability" },
      { value: "2x", label: "Sales Capacity" }
    ]
  },
  {
    id: "anthem",
    client: "Anthem",
    category: "AI Audit & Custom SaaS",
    headline: "Anthem Uses AI to Halve Insurance Claim Processing Time",
    image: "https://images.unsplash.com/photo-1758691462668-046fd85ceac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMGRhdGElMjB0YWJsZXR8ZW58MXx8fHwxNzYzNzY2OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    challenge: "Claims took weeks to review manually, driving up costs and delaying reimbursement.",
    solution: "Implemented an AI-driven claims audit and processing system to verify coverage and flag errors.",
    results: "50% faster claim approvals, tens of millions saved annually through efficiency and fraud prevention.",
    icon: Stethoscope,
    fullDescription: "Anthem (now Elevance Health) faced the industry-wide challenge of slow claims processing. Manual review of medical codes and policy adherence was inefficient and led to payment delays.\n\nThe company deployed a custom AI auditing system that uses machine learning to review claims against policy rules and historical data. The system can automatically approve standard claims and flag potential errors or fraud for human review. This hybrid approach significantly sped up the reimbursement cycle while maintaining strict compliance.",
    stats: [
      { value: "50%", label: "Faster Processing" },
      { value: "$10M+", label: "Annual Savings" },
      { value: "60%", label: "Auto-Approval Rate" }
    ]
  },
  {
    id: "walmart",
    client: "Walmart",
    category: "Business Automation (Retail AI)",
    headline: "Walmart’s Shelf-Scanning AI Boosts In-Stock Items",
    image: "https://images.unsplash.com/photo-1652518892062-7dab3e60aa0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMGludmVudG9yeSUyMHNoZWx2aW5nJTIwbW9kZXJufGVufDF8fHx8MTc2Mzc2Njk4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    challenge: "Stores struggled with stockouts and inventory imbalances due to infrequent manual checks.",
    solution: "Deployed shelf-scanning robots and AI demand forecasting to optimize inventory levels in real-time.",
    results: "Stockouts down by 30%, excess inventory reduced by 28%, driving higher sales and lower waste.",
    icon: ShoppingCart,
    fullDescription: "Managing inventory across thousands of supercenters is a massive logistical challenge. Walmart found that items were often out of stock on shelves even when they were available in the backroom, leading to lost sales.\n\nWalmart introduced shelf-scanning robots and computer vision systems to continuously monitor on-shelf availability. Combined with predictive AI for demand forecasting, the system alerts associates to restock specific items and adjusts supply chain orders to prevent future stockouts. This granular, real-time visibility revolutionized their inventory management.",
    stats: [
      { value: "30%", label: "Fewer Stockouts" },
      { value: "28%", label: "Less Excess Stock" },
      { value: "15%", label: "Sales Lift" }
    ]
  }
];
