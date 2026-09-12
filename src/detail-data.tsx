import {
  Bot, BrainCircuit, CircleDollarSign, Code2, GraduationCap,
  Headphones, Layers3, Network, Phone, Sparkles, Users, Workflow,
} from 'lucide-react';

type IconType = typeof BrainCircuit;
type DetailKind = 'product' | 'ai' | 'service';

export type DetailConfig = {
  slug: string;
  label: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  icon: IconType;
  kind: DetailKind;
  introTitle: string;
  introDescription: string;
  useCaseHeading: string;
  capabilities: string[];
  useCases: string[];
  manages?: string[];
  automation?: string[];
  aiCapabilities?: string[];
  benefits: string[];
  howItWorks?: { steps: string[] };
  whatWeDeliver?: string[];
  ourApproach?: { steps: string[] };
  ctaLabel: string;
  ctaHref: string;
};

export const products: DetailConfig[] = [
  {
    slug: 'erp', label: 'ERP', eyebrow: 'BUSINESS SOFTWARE', kind: 'product', icon: Layers3,
    title: <>A connected foundation<br />for the modern business.</>,
    description: 'SyncMind ERP brings core business operations, data and workflows together in one connected platform, helping organizations manage operations with greater visibility and control.',
    introTitle: 'One connected foundation for core operations.',
    introDescription: 'SyncMind ERP brings the work of running the business into one intelligent platform — so teams spend less time chasing information and more time acting on it.',
    useCaseHeading: 'Where connected operations create clearer decisions.',
    manages: ['Finance & Accounting', 'Procurement', 'Sales & Operations', 'Inventory', 'Assets', 'Workflows', 'Reports & Analytics', 'Users & Permissions'],
    capabilities: ['Centralized business operations', 'Configurable workflows', 'Approval management', 'Operational reporting', 'Document and data management', 'Role-based access', 'Process automation'],
    automation: ['Approval workflows', 'Notifications and alerts', 'Recurring task automation', 'Data movement between modules', 'Operational workflow automation'],
    aiCapabilities: ['AI-assisted business search', 'Intelligent insights', 'Document understanding', 'Natural-language business queries', 'Workflow assistance'],
    benefits: ['Less manual work', 'Better operational visibility', 'Faster processes', 'Connected information', 'Improved control'],
    useCases: ['Finance and operations', 'Planning and coordination', 'Cross-business visibility', 'Procurement and inventory', 'Asset management'],
    ctaLabel: 'Explore SyncMind ERP', ctaHref: '/demo',
  },
  {
    slug: 'crm', label: 'CRM', eyebrow: 'BUSINESS SOFTWARE', kind: 'product', icon: Users,
    title: <>Turn customer relationships<br />into business momentum.</>,
    description: 'SyncMind CRM connects leads, customers, sales activities and communication into one intelligent customer management experience.',
    introTitle: 'Customer relationships, connected end to end.',
    introDescription: 'SyncMind CRM brings every interaction, conversation and commitment into one place — so teams can move relationships forward with full context.',
    useCaseHeading: 'Where relationship clarity becomes momentum.',
    capabilities: ['Lead Management', 'Customer Management', 'Sales Pipeline', 'Opportunity Management', 'Follow-ups', 'Tasks & Activities', 'Interaction History', 'Campaign Management', 'Sales Reporting'],
    automation: ['Automated lead assignment', 'Follow-up reminders', 'Sales workflow automation', 'Notifications', 'Customer journey workflows'],
    aiCapabilities: ['Customer insights', 'Lead prioritization', 'Conversation summaries', 'AI-assisted sales workflows', 'Natural-language CRM queries'],
    benefits: ['Better customer visibility', 'Faster follow-ups', 'Improved sales coordination', 'Consistent customer engagement', 'Clearer sales pipeline'],
    useCases: ['Customer relationships', 'Sales coordination', 'Customer visibility', 'Pipeline management', 'Campaign tracking'],
    ctaLabel: 'Explore SyncMind CRM', ctaHref: '/demo',
  },
  {
    slug: 'hr', label: 'HR', eyebrow: 'BUSINESS SOFTWARE', kind: 'product', icon: Users,
    title: <>Simplify people operations.<br />Connect your workforce.</>,
    description: 'SyncMind HR brings employee information, HR processes and workforce workflows together in one connected platform.',
    introTitle: 'People operations, organized and connected.',
    introDescription: 'SyncMind HR brings employee information, HR processes and workforce workflows together — so people operations feel simpler for everyone.',
    useCaseHeading: 'Where simpler people workflows support growth.',
    capabilities: ['Employee Management', 'Attendance', 'Leave Management', 'Recruitment', 'Onboarding', 'Performance Management', 'Employee Documents', 'HR Workflows', 'Reports'],
    automation: ['Employee onboarding', 'Leave approvals', 'HR notifications', 'Document workflows', 'Recurring HR processes'],
    aiCapabilities: ['Employee information search', 'Document intelligence', 'AI-assisted HR workflows', 'Workforce insights', 'Natural-language HR queries'],
    benefits: ['Reduced administrative effort', 'Faster HR processes', 'Centralized employee information', 'Better workforce visibility', 'Improved employee experience'],
    useCases: ['Employee operations', 'People workflows', 'Workforce coordination', 'Recruitment and onboarding', 'Performance tracking'],
    ctaLabel: 'Explore SyncMind HR', ctaHref: '/demo',
  },
  {
    slug: 'education', label: 'Education', eyebrow: 'BUSINESS SOFTWARE', kind: 'product', icon: GraduationCap,
    title: <>One connected platform<br />for education operations.</>,
    description: 'SyncMind Education connects academic, administrative and operational activities to help educational organizations manage their day-to-day operations more efficiently.',
    introTitle: 'One connected view across education operations.',
    introDescription: 'SyncMind Education brings academic, administrative and operational activities together — so education organizations can coordinate more and chase less.',
    useCaseHeading: 'Where connected information supports better education.',
    capabilities: ['Student Management', 'Admissions', 'Academic Management', 'Attendance', 'Examinations', 'Fees', 'Staff Management', 'Parent Communication', 'Transport', 'Inventory', 'Reports'],
    automation: ['Admission workflows', 'Fee reminders', 'Attendance notifications', 'Approval workflows', 'Student communication', 'Administrative workflows'],
    aiCapabilities: ['Intelligent document processing', 'AI-assisted communication', 'Student information search', 'Administrative assistance', 'AI-powered insights'],
    benefits: ['Connected school operations', 'Reduced administrative work', 'Faster communication', 'Better visibility', 'Improved coordination'],
    useCases: ['Academic administration', 'School operations', 'Education workflows', 'Admissions and fees', 'Parent communication'],
    ctaLabel: 'Explore SyncMind Education', ctaHref: '/demo',
  },
  {
    slug: 'helpdesk', label: 'Helpdesk', eyebrow: 'BUSINESS SOFTWARE', kind: 'product', icon: Headphones,
    title: <>Support that keeps<br />business moving.</>,
    description: 'SyncMind Helpdesk centralizes support requests, service workflows and resolution processes into one connected workspace.',
    introTitle: 'Support that connects requests to resolution.',
    introDescription: 'SyncMind Helpdesk brings service requests, workflows and customer context into one connected workspace — so support teams can resolve faster and more consistently.',
    useCaseHeading: 'Where connected support keeps the business moving.',
    capabilities: ['Ticket Management', 'Service Requests', 'Assignment', 'Prioritization', 'SLA Management', 'Escalation', 'Knowledge Base', 'Notifications', 'Service Analytics'],
    automation: ['Automatic ticket routing', 'Escalation workflows', 'SLA notifications', 'Assignment automation', 'Resolution workflows'],
    aiCapabilities: ['AI ticket classification', 'Suggested responses', 'Conversation summaries', 'Knowledge assistance', 'Intelligent routing'],
    benefits: ['Faster resolution', 'Better support visibility', 'Reduced manual coordination', 'Consistent service workflows', 'Improved customer experience'],
    useCases: ['Customer support', 'Internal service teams', 'Request coordination', 'SLA management', 'Knowledge management'],
    ctaLabel: 'Explore SyncMind Helpdesk', ctaHref: '/demo',
  },
  {
    slug: 'expense', label: 'Expense', eyebrow: 'BUSINESS SOFTWARE', kind: 'product', icon: CircleDollarSign,
    title: <>Bring intelligence<br />to every business expense.</>,
    description: 'SyncMind Expense helps businesses manage, verify, approve and monitor expenses through connected workflows and intelligent automation.',
    introTitle: 'Expense workflows, visible and automated.',
    introDescription: 'SyncMind Expense brings clarity, verification and automation to every expense — so finance teams spend less time chasing and more time deciding.',
    useCaseHeading: 'Where expense clarity improves financial control.',
    capabilities: ['Expense Submission', 'Receipt Management', 'Expense Verification', 'Policy Validation', 'Approval Workflows', 'Expense Tracking', 'Reporting', 'Audit Visibility'],
    automation: ['Expense validation', 'Approval routing', 'Receipt processing', 'Policy checks', 'Notifications', 'Exception handling'],
    aiCapabilities: ['Receipt data extraction', 'Expense classification', 'Document understanding', 'Anomaly identification', 'AI-assisted expense review'],
    benefits: ['Faster expense processing', 'Reduced manual work', 'Better policy control', 'Improved visibility', 'Stronger audit readiness'],
    useCases: ['Expense operations', 'Approvals and review', 'Finance coordination', 'Policy compliance', 'Audit and reporting'],
    ctaLabel: 'Explore SyncMind Expense', ctaHref: '/demo',
  },
];

export const aiSolutions: DetailConfig[] = [
  {
    slug: 'agentic-ai', label: 'Agentic AI', eyebrow: 'AI & AUTOMATION', kind: 'ai', icon: Bot,
    title: <>Intelligence that<br />understands the work — then acts.</>,
    description: 'SyncMind Agentic AI enables intelligent agents to understand context, reason through tasks and take controlled actions across connected business systems.',
    introTitle: 'Agents that understand the work — then act on it.',
    introDescription: 'SyncMind Agentic AI brings context, reasoning and action together — so intelligent agents can take on real business tasks with the right oversight.',
    useCaseHeading: 'Where intelligent action supports real operations.',
    capabilities: ['Context Understanding', 'Task Reasoning', 'Planning', 'Tool Usage', 'System Interaction', 'Workflow Execution', 'Human Approval', 'Action Monitoring'],
    howItWorks: { steps: ['UNDERSTAND', 'REASON', 'PLAN', 'ACT', 'VERIFY'] },
    automation: ['Automated task execution', 'Multi-step workflow orchestration', 'Human-in-the-loop approvals', 'Action monitoring and logging'],
    aiCapabilities: ['Context-aware reasoning', 'Business process understanding', 'Multi-system interaction', 'Controlled action execution'],
    benefits: ['Reduce repetitive work', 'Accelerate business processes', 'Connect intelligence with execution', 'Keep humans in control of important decisions'],
    useCases: ['Business operations', 'Customer support', 'Research', 'Data processing', 'Internal assistance', 'Workflow execution', 'Knowledge operations'],
    ctaLabel: 'Explore Agentic AI', ctaHref: '/contact',
  },
  {
    slug: 'voice-ai', label: 'Voice AI', eyebrow: 'AI & AUTOMATION', kind: 'ai', icon: Phone,
    title: <>Natural conversations.<br />Intelligent business actions.</>,
    description: 'SyncMind Voice AI enables businesses to create natural voice experiences connected to real business workflows.',
    introTitle: 'Voice experiences connected to business workflows.',
    introDescription: 'SyncMind Voice AI turns conversations into actions — so people can speak naturally while the system connects to the work behind it.',
    useCaseHeading: 'Where natural conversations drive real outcomes.',
    capabilities: ['Speech Recognition', 'Natural Language Understanding', 'Context Awareness', 'Voice Responses', 'Conversation History', 'Business System Integration', 'Workflow Actions'],
    howItWorks: { steps: ['LISTEN', 'UNDERSTAND', 'RESPOND', 'ACT', 'COMPLETE'] },
    automation: ['Voice-triggered workflows', 'Automated call routing', 'Follow-up automation', 'CRM and system updates from conversations'],
    aiCapabilities: ['Natural language understanding', 'Context-aware conversations', 'Voice-to-action integration', 'Conversation memory'],
    benefits: ['Natural customer interactions', 'Faster responses', 'Connected voice workflows', 'Reduced repetitive communication'],
    useCases: ['Customer support', 'Lead qualification', 'Appointment handling', 'Employee assistance', 'Service requests', 'Outbound communication'],
    ctaLabel: 'Explore Voice AI', ctaHref: '/contact',
  },
  {
    slug: 'chat-ai', label: 'Chat AI', eyebrow: 'AI & AUTOMATION', kind: 'ai', icon: Sparkles,
    title: <>Conversations that<br />help business get work done.</>,
    description: 'SyncMind Chat AI provides conversational experiences that understand questions, retrieve relevant information and assist users with business tasks.',
    introTitle: 'Conversational intelligence for everyday work.',
    introDescription: 'SyncMind Chat AI brings context-aware responses to questions and tasks — so teams and customers can get things done through conversation.',
    useCaseHeading: 'Where guided conversations help work get done.',
    capabilities: ['Knowledge Search', 'Document Q&A', 'Contextual Responses', 'Business Queries', 'Workflow Assistance', 'Task Guidance', 'Conversation History'],
    howItWorks: { steps: ['ASK', 'UNDERSTAND', 'RETRIEVE', 'RESPOND', 'ACT'] },
    automation: ['Automated query resolution', 'Task initiation from chat', 'Document retrieval workflows', 'Follow-up automation'],
    aiCapabilities: ['Knowledge retrieval', 'Document understanding', 'Context-aware responses', 'Business task assistance'],
    benefits: ['Faster access to information', 'Better user experience', 'Reduced support effort', 'Intelligent business assistance'],
    useCases: ['Customer support', 'Employee assistance', 'Internal knowledge', 'Operations support', 'Product assistance'],
    ctaLabel: 'Explore Chat AI', ctaHref: '/contact',
  },
  {
    slug: 'automation', label: 'Workflow Automation', eyebrow: 'AI & AUTOMATION', kind: 'ai', icon: Workflow,
    title: <>Turn repetitive work<br />into intelligent flow.</>,
    description: 'SyncMind Workflow Automation connects people, systems, data and decisions through automated business processes.',
    introTitle: 'From repetitive work to intelligent flow.',
    introDescription: 'SyncMind Workflow Automation connects people, systems and decisions into automated flows — so work moves forward with less manual effort.',
    useCaseHeading: 'Where automated workflows improve operational efficiency.',
    capabilities: ['Workflow Design', 'Triggers', 'Business Rules', 'Approvals', 'Notifications', 'API Integration', 'Data Transformation', 'Exception Handling', 'Monitoring'],
    howItWorks: { steps: ['TRIGGER', 'PROCESS', 'DECIDE', 'EXECUTE', 'MONITOR'] },
    automation: ['Approval automation', 'Data transformation pipelines', 'Notification workflows', 'Cross-system orchestration'],
    aiCapabilities: ['Intelligent routing', 'Smart exception handling', 'Workflow optimization', 'Anomaly detection'],
    benefits: ['Reduce repetitive work', 'Improve process consistency', 'Connect disconnected systems', 'Increase operational speed', 'Create visible and repeatable workflows'],
    useCases: ['Approvals', 'Employee onboarding', 'Finance operations', 'Customer workflows', 'Data processing', 'Reporting', 'Service operations'],
    ctaLabel: 'Explore Workflow Automation', ctaHref: '/contact',
  },
];

export const services: DetailConfig[] = [
  {
    slug: 'custom-software', label: 'Custom Software', eyebrow: 'TECHNOLOGY SERVICES', kind: 'service', icon: Code2,
    title: <>Build the software<br />your business actually needs.</>,
    description: 'SyncMind designs and builds custom software around the way your business actually operates — from internal platforms to customer-facing applications.',
    introTitle: 'Software built around your real workflows.',
    introDescription: 'SyncMind works with you to design and build business applications that fit your requirements — from first concept to working product.',
    useCaseHeading: 'Where custom software solves real business problems.',
    capabilities: ['Product Discovery', 'Business Analysis', 'UI/UX Design', 'Software Architecture', 'Development', 'Testing', 'Deployment', 'Support'],
    whatWeDeliver: ['Business Applications', 'Enterprise Platforms', 'Customer Portals', 'Internal Tools', 'Workflow Systems', 'Industry-Specific Solutions', 'API-Driven Applications'],
    ourApproach: { steps: ['DISCOVER', 'DESIGN', 'BUILD', 'TEST', 'DEPLOY', 'EVOLVE'] },
    benefits: ['Technology aligned with business processes', 'Scalable architecture', 'Better operational efficiency', 'Reduced manual work', 'Purpose-built user experiences'],
    useCases: ['New business applications', 'Modernizing existing workflows', 'Distinctive digital products', 'Internal platforms', 'Customer portals'],
    ctaLabel: 'Build With SyncMind', ctaHref: '/demo',
  },
  {
    slug: 'ai-development', label: 'AI Development', eyebrow: 'TECHNOLOGY SERVICES', kind: 'service', icon: BrainCircuit,
    title: <>Move from AI ambition<br />to useful capability.</>,
    description: 'SyncMind helps organizations turn practical AI opportunities into products, assistants and intelligent workflows that solve real business problems.',
    introTitle: 'From AI ambition to practical capability.',
    introDescription: 'SyncMind helps you design and develop AI-powered products and workflows that are grounded in real business needs — not just demos.',
    useCaseHeading: 'Where practical AI creates real business value.',
    capabilities: ['AI Strategy', 'LLM Applications', 'AI Agent Development', 'Prompt & Context Design', 'Knowledge Integration', 'AI Workflow Integration', 'Evaluation & Optimization'],
    whatWeDeliver: ['AI Assistants', 'AI Agents', 'Conversational AI', 'Document Intelligence', 'Knowledge Systems', 'Intelligent Workflows', 'AI-Powered Applications'],
    ourApproach: { steps: ['IDENTIFY', 'DESIGN', 'BUILD', 'INTEGRATE', 'MEASURE', 'IMPROVE'] },
    benefits: ['Practical AI adoption', 'Reduced manual work', 'Faster access to information', 'Better employee and customer experiences'],
    useCases: ['AI product concepts', 'Internal intelligence', 'Customer-facing AI', 'Document intelligence', 'Intelligent workflows'],
    ctaLabel: 'Build With AI', ctaHref: '/demo',
  },
  {
    slug: 'automation', label: 'Automation', eyebrow: 'TECHNOLOGY SERVICES', kind: 'service', icon: Workflow,
    title: <>Turn manual processes<br />into intelligent workflows.</>,
    description: 'SyncMind transforms repetitive and fragmented business processes into connected workflows that reduce manual effort and improve execution.',
    introTitle: 'Manual processes, transformed into flow.',
    introDescription: 'SyncMind helps you discover, design and automate workflows across teams and systems — so repetitive work stops slowing the business down.',
    useCaseHeading: 'Where automation connects people, systems and decisions.',
    capabilities: ['Process Discovery', 'Workflow Design', 'Business Rules', 'System Connectivity', 'Automation', 'Monitoring', 'Optimization'],
    whatWeDeliver: ['Approvals', 'Data Processing', 'Notifications', 'Onboarding', 'Reporting', 'Operational Workflows', 'Customer Processes', 'Finance Processes'],
    ourApproach: { steps: ['DISCOVER', 'MAP', 'AUTOMATE', 'MONITOR', 'OPTIMIZE'] },
    benefits: ['Less repetitive work', 'Faster execution', 'Fewer manual errors', 'Better process visibility', 'More consistent operations'],
    useCases: ['Manual process reduction', 'Approvals and handoffs', 'Operations orchestration', 'Data processing', 'Reporting automation'],
    ctaLabel: 'Automate With SyncMind', ctaHref: '/demo',
  },
  {
    slug: 'integration', label: 'Integration', eyebrow: 'TECHNOLOGY SERVICES', kind: 'service', icon: Network,
    title: <>Make your systems<br />work better together.</>,
    description: 'SyncMind connects applications, APIs, platforms and data sources so your business systems can work as one connected environment.',
    introTitle: 'Systems that work better together.',
    introDescription: 'SyncMind connects your applications, APIs, platforms and data — so information moves freely and the business works as one.',
    useCaseHeading: 'Where connected systems improve business handoffs.',
    capabilities: ['API Integration', 'System Integration', 'Data Synchronization', 'Webhooks', 'Authentication', 'Data Mapping', 'Monitoring', 'Error Handling'],
    whatWeDeliver: ['ERP', 'CRM', 'Payment Systems', 'Business Applications', 'Third-Party APIs', 'Government / External APIs', 'Data Platforms', 'Internal Systems'],
    ourApproach: { steps: ['CONNECT', 'SYNCHRONIZE', 'VALIDATE', 'MONITOR', 'OPTIMIZE'] },
    benefits: ['Connected systems', 'Reliable data flow', 'Reduced duplicate work', 'Better operational visibility', 'Faster business processes'],
    useCases: ['Platform connectivity', 'Data synchronization', 'Enterprise application ecosystems', 'Payment integration', 'External API connectivity'],
    ctaLabel: 'Connect Your Systems', ctaHref: '/demo',
  },
];
