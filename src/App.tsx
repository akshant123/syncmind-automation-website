import { useEffect, useMemo, useRef, useState } from 'react';
import { postForm } from '@/lib/api';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, Building2, Check, ChevronDown, ChevronLeft, ChevronRight,
  CircleDollarSign, CircleHelp, Code2, Facebook, GraduationCap,
  Instagram, Linkedin, Menu, Network, Plus, Quote, ScanLine, Settings2, ShieldCheck,
  SquareKanban, Twitter, Upload, Users, Workflow, X, Youtube, Zap,
} from 'lucide-react';
import { products, aiSolutions, services } from '@/detail-data';
import type { DetailConfig } from '@/detail-data';

const fullLogo = '/assets/logo/image copy 14.png';
const iconLogo = '/assets/logo/image copy 14.png';

const industries = ['Banking & Financial Services', 'Education', 'Retail & Distribution', 'Professional Services', 'Healthcare', 'Manufacturing', 'Technology', 'SMEs & Enterprises'];
const navGroups = [
  { label: 'Platform', items: products.map((p) => ({ label: p.label, href: `/platform/${p.slug}` })) },
  { label: 'AI & Automation', items: aiSolutions.map((p) => ({ label: p.label, href: `/ai/${p.slug}` })) },
  { label: 'Services', items: services.map((p) => ({ label: p.label, href: `/services/${p.slug}` })) },
];

function navigate(href: string) {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function groupHref(groupTitle: string, slug: string) {
  const base = groupTitle === 'Platform' ? '/platform/' : groupTitle === 'Services' ? '/services/' : '/ai/';
  return base + slug;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <button className={`logo-wrap ${compact ? 'logo-compact' : ''}`} onClick={() => navigate('/')} aria-label="SyncMind Automation home"><img className="logo-image" src={compact ? iconLogo : fullLogo} alt="SyncMind Automation" /></button>;
}

function Button({ children, href = '/contact', variant = 'primary', onClick }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'ghost' | 'text'; onClick?: () => void }) {
  return <button className={`button button-${variant}`} onClick={onClick ?? (() => navigate(href))}>{children}<ArrowRight size={16} /></button>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}><div className="nav-inner"><Logo /><nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
    <button onClick={() => { navigate('/'); setOpen(false); }}>Home</button>
    {navGroups.map((group) => <div className="nav-dropdown" key={group.label}><button onClick={() => setActive(active === group.label ? null : group.label)}>{group.label}<ChevronDown size={14} /></button><div className={`dropdown-menu ${active === group.label ? 'dropdown-visible' : ''}`}>{group.items.map((item) => <button key={item.href} onClick={() => { navigate(item.href); setOpen(false); setActive(null); }}>{item.label}<ArrowRight size={14} /></button>)}</div></div>)}
    <button onClick={() => { navigate('/resources'); setOpen(false); }}>Resources</button><button onClick={() => { navigate('/company'); setOpen(false); }}>Company</button><button onClick={() => { navigate('/careers'); setOpen(false); }}>Careers</button>
    <div className="mobile-cta"><Button href="/demo">Request a Demo</Button></div>
  </nav><div className="nav-actions"><Button href="/demo">Request a Demo</Button><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button></div></div></header>;
}

function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="section-label"><span />{children}</p>; }
function SectionHeading({ eyebrow, title, description, align = 'left' }: { eyebrow?: string; title: React.ReactNode; description?: string; align?: 'left' | 'center' }) { return <div className={`section-heading heading-${align}`}>{eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}<h2>{title}</h2>{description && <p>{description}</p>}</div>; }

function IntelligenceVisual() {
  const nodes = ['ERP', 'CRM', 'HR', 'APIs', 'VOICE', 'CHAT'];
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(max-width: 800px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setOffset({ x: ((e.clientX - r.left - r.width / 2) / r.width) * 14, y: ((e.clientY - r.top - r.height / 2) / r.height) * 14 });
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return <div className="intelligence-visual" ref={ref} aria-label="SyncMind intelligence connects business applications and channels"><div className="visual-parallax" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}><div className="visual-grid" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="particle-track track-one"><span className="particle" /><span className="particle particle-2" /></div><div className="particle-track track-two"><span className="particle" /><span className="particle particle-2" /></div>{nodes.map((node, index) => <div className={`visual-node node-${index}`} key={node} style={{ animationDelay: `${index * 0.7}s` }}><span style={{ animationDelay: `${index * 0.7}s` }} />{node}</div>)}<div className="core"><div className="core-ring"><BrainCircuit size={42} /></div><strong>SYNCMIND</strong><span>INTELLIGENCE</span></div><div className="flow-caption"><span>BUSINESS SYSTEMS</span><ArrowRight size={14} /><span>DECISION</span><ArrowRight size={14} /><span>EXECUTION</span></div></div></div>;
}

function Home() {
  return <main>
    <section className="hero section-shell"><div className="hero-copy"><div className="eyebrow-pill"><span className="pulse-dot" />AI <i /> AUTOMATION <i /> BUSINESS SOFTWARE</div><h1>The intelligence<br /><em>behind business.</em></h1><p className="hero-description">AI-powered business software and intelligent automation designed to simplify operations, accelerate decisions and help businesses scale.</p><div className="hero-actions"><Button href="#solutions" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}>Explore solutions</Button><Button href="/contact" variant="ghost">Talk to us</Button></div><div className="hero-proof"><ShieldCheck size={17} /><span>Business technology, built around intelligence.</span></div></div><IntelligenceVisual /></section>
    <section className="positioning-strip"><div><strong>BUSINESS SOFTWARE</strong><span>•</span><strong>ARTIFICIAL INTELLIGENCE</strong><span>•</span><strong>AUTOMATION</strong><span>•</span><strong>CUSTOM TECHNOLOGY</strong></div><p>One intelligent ecosystem for the modern business.</p></section>
    <section className="intro section-shell" id="solutions"><SectionHeading eyebrow="THE SYNCMIND APPROACH" title={<>Software runs your business.<br /><em>Intelligence moves it forward.</em></>} description="SyncMind brings business software, artificial intelligence and automation together to help organizations operate smarter, faster and with less manual effort." /><div className="intro-grid">{[{ icon: Building2, title: 'Business software', text: 'Run core business operations through connected business applications.' }, { icon: BrainCircuit, title: 'AI & intelligence', text: 'Make systems understand context, support decisions and take action.' }, { icon: Workflow, title: 'Automation', text: 'Turn repetitive business processes into intelligent workflows.' }].map((item, index) => <div className="intro-card" key={item.title}><span className="card-index">0{index + 1}</span><item.icon size={25} /><h3>{item.title}</h3><p>{item.text}</p><ArrowDownRight size={18} /></div>)}</div></section>
    <section className="products section-shell section-dark"><SectionHeading eyebrow="BUSINESS SOFTWARE" title="One ecosystem. Every business function." description="A connected suite of business applications designed to help organizations manage operations, people, customers and processes more intelligently." /><div className="product-grid">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div></section>
    <section className="ai-section section-shell"><div className="ai-copy"><SectionHeading eyebrow="AI & AUTOMATION" title="AI that doesn't just assist. It acts." description="Build intelligent systems that understand context, make decisions and execute tasks across your business." /><Button href="/ai/agentic-ai">Explore AI & automation</Button></div><div className="ai-stack">{aiSolutions.map((item, index) => <button className="ai-row" key={item.slug} onClick={() => navigate(`/ai/${item.slug}`)}><span className="ai-row-number">0{index + 1}</span><item.icon size={22} /><div><strong>{item.label}</strong><p>{item.description}</p></div><ArrowUpRight /></button>)}</div></section>
    <section className="orchestration section-shell"><SectionHeading eyebrow="SYNCMIND INTELLIGENCE" title={<>From business intent<br /><em>to intelligent execution.</em></>} align="center" /><div className="orchestration-flow">{['Business', 'SyncMind intelligence', 'AI + data + applications', 'Automation', 'Execution', 'Business outcome'].map((step, i) => <div className="flow-step" key={step}><div className="flow-number">0{i + 1}</div><span>{step}</span>{i < 5 && <ChevronRight className="flow-arrow" />}</div>)}</div><div className="orchestration-bottom"><span>Connect</span><span>Understand</span><span>Decide</span><span>Automate</span><span>Optimize</span></div></section>
    <section className="services section-shell section-dark"><div className="services-header"><SectionHeading eyebrow="TECHNOLOGY SERVICES" title={<>Have an idea?<br /><em>Let's build it.</em></>} description="Not every business problem fits an existing product. SyncMind works with organizations to design, build, integrate and automate technology solutions around their unique requirements." /><Button href="/services/custom-software">Build with SyncMind</Button></div><div className="service-grid">{services.map((service) => <button className="service-card" key={service.slug} onClick={() => navigate(`/services/${service.slug}`)}><service.icon size={26} /><h3>{service.label}</h3><p>{service.description}</p><span>Explore service <ArrowUpRight size={15} /></span></button>)}</div></section>
    <section className="industries section-shell"><SectionHeading eyebrow="INDUSTRIES" title={<>Built for the way<br /><em>industries work.</em></>} description="Technology solutions designed for modern organizations across industries." /><div className="industry-grid">{industries.map((industry, index) => <div className="industry-card" key={industry}><span>0{index + 1}</span><h3>{industry}</h3><ArrowUpRight size={18} /></div>)}</div></section>
    <section className="why section-shell"><SectionHeading eyebrow="WHY SYNCMIND" title={<>Technology built<br /><em>around intelligence.</em></>} /><div className="why-grid">{[{ icon: BrainCircuit, title: 'AI-first', text: 'Intelligence designed into solutions from the beginning.' }, { icon: Workflow, title: 'Automation by design', text: 'Reduce repetitive work through intelligent workflows.' }, { icon: Network, title: 'Connected systems', text: 'Bring applications, APIs, data and processes together.' }, { icon: ShieldCheck, title: 'Enterprise ready', text: 'Designed with scalability, security and reliability in mind.' }, { icon: Settings2, title: 'Flexible by nature', text: 'Use SyncMind products or build something completely custom.' }, { icon: Zap, title: 'Built to evolve', text: 'Technology that can adapt as business requirements change.' }].map((item) => <div className="why-card" key={item.title}><item.icon size={22} /><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
    <SuccessStories />
    <section className="final-cta section-shell"><div className="cta-mark"><BrainCircuit size={54} /></div><SectionHeading title={<>When intelligence<br /><em>meets automation.</em></>} description="Software runs your business. Intelligence moves it forward." align="center" /><Button href="/demo">Start a conversation</Button></section>
  </main>;
}

function ProductCard({ product }: { product: DetailConfig }) { return <button className="product-card" onClick={() => navigate(`/platform/${product.slug}`)}><div className="product-card-top"><span className="icon-box"><product.icon size={21} /></span><ArrowUpRight size={18} /></div><div><p>{product.eyebrow}</p><h3>SyncMind {product.label}</h3><span className="product-category">{product.label === 'Education' ? 'School & Education Management' : `${product.label} Management`}</span><p className="product-description">{product.description}</p></div><span className="card-link">Explore <ArrowRight size={15} /></span></button>; }

function DetailPage({ config }: { config: DetailConfig }) {
  const Icon = config.icon;
  const [showForm, setShowForm] = useState(false);
  const isProduct = config.kind === 'product';
  const isAi = config.kind === 'ai';
  const isService = config.kind === 'service';

  const bandSteps = config.howItWorks?.steps ?? (config.ourApproach?.steps ?? ['CONNECT', 'UNDERSTAND', 'EXECUTE']);
  const bandLabel = isAi ? 'HOW IT WORKS' : isService ? 'OUR APPROACH' : 'INTELLIGENT BY DESIGN';
  const bandTitle = isAi ? 'From understanding to action — every step connected.' : isService ? 'A clear path from idea to working result.' : 'Connect the system. Understand the context. Move the work forward.';

  return <main className="detail-page">
    <section className="detail-hero section-shell">
      <div className="detail-hero-copy">
        <SectionLabel>{config.eyebrow}</SectionLabel>
        <h1>{config.title}</h1>
        <p>{config.description}</p>
        <div className="hero-actions">
          <Button onClick={() => setShowForm(true)}>Talk to our team</Button>
          <Button href="/" variant="ghost">Explore SyncMind</Button>
        </div>
      </div>
      <div className="detail-visual">
        <div className="detail-icon"><Icon size={62} /></div>
        <div className="detail-orbit orbit-one" />
        <div className="detail-orbit orbit-two" />
        <span className="detail-chip chip-a">CONTEXT</span>
        <span className="detail-chip chip-b">DECISION</span>
        <span className="detail-chip chip-c">OUTCOME</span>
      </div>
    </section>

    <section className="detail-content section-shell">
      <div className="detail-intro">
        <SectionHeading eyebrow="A BETTER WAY FORWARD" title={config.introTitle} description={config.introDescription} />
      </div>
      <div className="capability-layout">
        <div className="capability-list">
          <p className="section-label"><span />CORE CAPABILITIES</p>
          {config.capabilities.map((capability, index) => <div className="capability" key={capability}><span>0{index + 1}</span><strong>{capability}</strong><Check size={17} /></div>)}
        </div>
        <div className="use-case-panel">
          <p className="section-label"><span />DESIGNED FOR</p>
          <h3>{config.useCaseHeading}</h3>
          {config.useCases.map((useCase) => <div className="use-case" key={useCase}><Plus size={17} />{useCase}</div>)}
        </div>
      </div>
    </section>

    {config.manages && (
      <section className="detail-section section-shell">
        <SectionHeading eyebrow="WHAT IT HELPS MANAGE" title="One platform for connected operations." />
        <div className="detail-chip-grid">
          {config.manages.map((item) => <div className="detail-chip-item" key={item}><Check size={16} />{item}</div>)}
        </div>
      </section>
    )}

    {config.whatWeDeliver && (
      <section className="detail-section section-shell">
        <SectionHeading eyebrow="WHAT WE DELIVER" title="Built around your real needs." />
        <div className="detail-chip-grid">
          {config.whatWeDeliver.map((item) => <div className="detail-chip-item" key={item}><Check size={16} />{item}</div>)}
        </div>
      </section>
    )}

    {(config.automation || config.aiCapabilities) && (
      <section className="detail-section section-dark section-shell">
        <SectionHeading eyebrow="INTELLIGENCE & AUTOMATION" title="Automated workflows. Intelligent by design." />
        <div className="detail-duo-grid">
          {config.automation && (
            <div className="detail-duo-card">
              <p className="section-label"><span />AUTOMATION</p>
              {config.automation.map((item, i) => <div className="detail-duo-item" key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}
            </div>
          )}
          {config.aiCapabilities && (
            <div className="detail-duo-card">
              <p className="section-label"><span />AI CAPABILITIES</p>
              {config.aiCapabilities.map((item, i) => <div className="detail-duo-item" key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}
            </div>
          )}
        </div>
      </section>
    )}

    {config.benefits.length > 0 && (
      <section className="detail-section section-shell">
        <SectionHeading eyebrow="BUSINESS BENEFITS" title={isProduct ? 'What it means for your business.' : isAi ? 'Real value from intelligent automation.' : 'Why businesses choose SyncMind.'} />
        <div className="detail-benefits-grid">
          {config.benefits.map((benefit, i) => <div className="detail-benefit-card" key={benefit}><span className="benefit-num">0{i + 1}</span><strong>{benefit}</strong></div>)}
        </div>
      </section>
    )}

    <section className="detail-band">
      <div className="section-shell">
        <SectionHeading eyebrow={bandLabel} title={bandTitle} align="center" />
        <div className="detail-steps">
          {bandSteps.flatMap((step, i) => [
            i > 0 ? <ArrowRight key={`a-${i}`} className="step-arrow" /> : null,
            <span key={step} className="step-item">{String(i + 1).padStart(2, '0')} / {step}</span>,
          ])}
        </div>
      </div>
    </section>

    <section className="detail-cta section-shell">
      <SectionHeading title="Ready to explore what this could look like for your business?" align="center" />
      <Button onClick={() => setShowForm(true)}>{config.ctaLabel}</Button>
    </section>

    {showForm && <DemoModal onClose={() => setShowForm(false)} />}
  </main>;
}

function Resources() { const cards = [{ icon: ScanLine, title: 'Insights', text: 'Perspectives on business software, AI and intelligent automation.' }, { icon: Quote, title: 'Case studies', text: 'Real-world stories and solutions from the SyncMind journey.' }, { icon: SquareKanban, title: 'Guides', text: 'Practical resources for building smarter, more automated businesses.' }, { icon: CircleHelp, title: 'FAQs', text: 'Answers to common questions about SyncMind products, AI and automation.' }]; return <main className="simple-page section-shell"><SectionHeading eyebrow="RESOURCES" title={<>Ideas for a more<br /><em>intelligent business.</em></>} description="Explore perspectives, practical guides and insights around business software, AI and intelligent automation." /><div className="resource-grid">{cards.map((card) => <div className="resource-card" key={card.title}><card.icon size={25} /><h3>{card.title}</h3><p>{card.text}</p><span>Coming soon <ArrowRight size={15} /></span></div>)}</div></main>; }
function Company() {
  const beliefs = [
    { icon: BrainCircuit, title: 'Intelligence by design', text: 'Technology should understand the context behind the work, not simply execute instructions.' },
    { icon: Workflow, title: 'Automation with purpose', text: 'Automation should remove repetitive effort and create measurable operational value.' },
    { icon: Network, title: 'Connected systems', text: 'Business data, applications and teams should work together as one connected ecosystem.' },
    { icon: Zap, title: 'Built for outcomes', text: 'Every solution should contribute to better decisions, faster execution and sustainable growth.' },
  ];
  const approachSteps = [
    { num: '01', label: 'Understand', text: 'Understand the business, processes, users and challenges.' },
    { num: '02', label: 'Connect', text: 'Connect systems, data and workflows into a unified foundation.' },
    { num: '03', label: 'Intelligently automate', text: 'Apply AI and automation where they create meaningful impact.' },
    { num: '04', label: 'Optimize', text: 'Continuously improve processes, visibility and business performance.' },
  ];
  const buildCards = [
    { icon: Building2, title: 'Business Software', text: 'Connected applications for core business operations.' },
    { icon: BrainCircuit, title: 'AI & Intelligence', text: 'Systems that understand context and support decisions.' },
    { icon: Workflow, title: 'Workflow Automation', text: 'Intelligent workflows that reduce manual effort.' },
    { icon: Code2, title: 'Custom Software', text: 'Tailored technology built around unique requirements.' },
    { icon: Network, title: 'System Integration', text: 'Bring applications, APIs and data together.' },
    { icon: Quote, title: 'Voice & Conversational AI', text: 'Conversational interfaces for support and engagement.' },
  ];
  const ecosystemItems = ['Finance & Operations', 'Customer Management', 'Human Resources', 'Education', 'Support', 'Expense Management', 'Data & Integrations', 'Intelligent Automation'];
  return <main className="company-page">
    <section className="company-hero section-shell"><SectionHeading eyebrow="THE COMPANY" title={<>Building the intelligence<br /><em>behind business.</em></>} description="SyncMind Automation brings business software, artificial intelligence and intelligent automation together to help organizations simplify operations, connect systems and turn complex processes into measurable business outcomes." /></section>
    <section className="company-who section-shell"><SectionHeading eyebrow="WHO WE ARE" title="Technology that connects people, processes and intelligence." description="SyncMind Automation is a technology company focused on building intelligent business systems for modern organizations. We combine business software, AI and automation to help companies operate with greater clarity, speed and control. From core business platforms to AI-powered solutions and custom technology development, our approach is centered on solving real operational challenges rather than adding unnecessary complexity." /></section>
    <section className="company-vm section-shell section-dark"><div className="vm-block"><SectionLabel>OUR VISION</SectionLabel><h2>A world where businesses spend less time managing technology and more time creating value.</h2></div><div className="vm-divider" /><div className="vm-block"><SectionLabel>OUR MISSION</SectionLabel><h2>Make intelligent technology practical for every business.</h2><p>Our mission is to build software and automation that turns complex business processes into simple, connected and scalable experiences — enabling teams to work smarter and organizations to move faster.</p></div></section>
    <section className="company-beliefs section-shell"><SectionHeading eyebrow="WHAT WE BELIEVE" title={<>Principles that guide<br /><em>everything we build.</em></>} /><div className="beliefs-grid">{beliefs.map((item) => <div className="belief-card" key={item.title}><item.icon size={24} /><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
    <section className="company-approach section-dark"><div className="section-shell"><SectionHeading eyebrow="HOW WE WORK" title={<>From business challenge<br /><em>to intelligent outcome.</em></>} align="center" /><div className="approach-flow">{approachSteps.map((step, i) => <div className="approach-step" key={step.label}><span className="approach-num">{step.num}</span><strong>{step.label}</strong><p>{step.text}</p>{i < 3 && <ArrowRight className="approach-arrow" size={18} />}</div>)}</div></div></section>
    <section className="company-build section-shell"><SectionHeading eyebrow="WHAT WE BUILD" title={<>One technology partner.<br /><em>Multiple business capabilities.</em></>} /><div className="build-grid">{buildCards.map((item) => <div className="build-card" key={item.title}><item.icon size={23} /><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
    <section className="company-ecosystem section-shell section-dark"><SectionHeading eyebrow="BUSINESS ECOSYSTEM" title={<>Designed to work<br /><em>across the business.</em></>} description="SyncMind solutions can support functions across the entire organization — connecting operations, people, customers and data into one intelligent ecosystem." /><div className="ecosystem-grid">{ecosystemItems.map((item) => <div className="ecosystem-item" key={item}><Check size={16} />{item}</div>)}</div></section>
    <section className="company-cta section-shell"><div className="company-cta-inner"><SectionHeading title={<>Ready to build<br /><em>what's next?</em></>} description="Whether you are looking to modernize operations, automate repetitive work, build intelligent software or create something completely new, SyncMind Automation helps turn business requirements into practical technology." align="center" /><div className="company-cta-actions"><Button href="/demo">Request a Demo</Button><Button href="/contact" variant="ghost">Talk to Us</Button></div></div></section>
  </main>;
}
function Demo({ contact = false }: { contact?: boolean }) { return <main className="form-page section-shell"><div className="form-intro"><SectionHeading eyebrow={contact ? 'CONTACT' : 'REQUEST A DEMO'} title={contact ? <>Let's build<br /><em>what's next.</em></> : <>See what intelligent<br /><em>business technology can do.</em></>} description={contact ? "Whether you want to automate an existing process, deploy AI or build something completely new, let's start a conversation." : 'Tell us what you want to improve, automate or build.'} /><div className="contact-details"><span><strong>Email</strong>service@syncmindautomation.com</span><span><strong>Location</strong>Office-B-15 Rajnagar, Delhi NCR<br />India</span></div></div><DemoForm /></main>; }
function DemoForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const interestedIn = String(data.get('interestedIn') || '').trim();
    const companySize = String(data.get('companySize') || '').trim();
    const requirement = String(data.get('requirement') || '').trim();
    if (!fullName || !email) { setStatus('error'); setMessage('Please fill in your name and email.'); return; }
    setStatus('submitting'); setMessage('');
    const { error } = await postForm<{ success: boolean; message: string }>('demo-request', { fullName, email, company, interestedIn, companySize, requirement });
    if (error) { setStatus('error'); setMessage(error); return; }
    setStatus('success'); setMessage('Thank you. Your request has been received. Our team will contact you shortly.'); form.reset();
  };

  return <form className="demo-form" ref={formRef} onSubmit={handleSubmit}>
    <div className="form-row"><label>Full name<input name="fullName" required placeholder="Your name" /></label><label>Work email<input name="email" required type="email" placeholder="you@company.com" /></label></div>
    <label>Company<input name="company" placeholder="Company name" /></label>
    <div className="form-row"><label>Interested in<select name="interestedIn" defaultValue=""><option value="" disabled>Select an area</option><option>ERP</option><option>CRM</option><option>HR</option><option>Agentic AI</option><option>Voice AI</option><option>Automation</option><option>Custom Software</option><option>Other</option></select></label><label>Company size<select name="companySize" defaultValue=""><option value="" disabled>Select a range</option><option>1–50</option><option>51–200</option><option>201–1000</option><option>1000+</option></select></label></div>
    <label>Requirement<textarea name="requirement" rows={5} placeholder="What would you like to improve, automate or build?" /></label>
    {status === 'success' && <div className="form-alert form-alert-success"><Check size={18} /><span>{message}</span></div>}
    {status === 'error' && <div className="form-alert form-alert-error"><X size={18} /><span>{message}</span></div>}
    <button type="submit" className="button button-primary" disabled={status === 'submitting'}>{status === 'submitting' ? <><span className="spinner" />Submitting...</> : <>Request a demo<ArrowRight size={16} /></>}</button>
    <p className="form-note">By submitting this form, you are starting a conversation with SyncMind Automation.</p>
  </form>;
}
function DemoModal({ onClose }: { onClose: () => void }) { return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><X /></button><SectionHeading eyebrow="START A CONVERSATION" title="Tell us what you're building." description="Share a little context and our team will help you find the right path." /><DemoForm /></div></div>; }

function DiscordIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5.5C6 6 4.5 7 4 8.5C3 11 3 14 3.5 16.5C4 18 5 19 6.5 19.5L7.5 17C7.5 17 7 15.5 7 15" /><path d="M16 5.5C18 6 19.5 7 20 8.5C21 11 21 14 20.5 16.5C20 18 19 19 17.5 19.5L16.5 17C16.5 17 17 15.5 17 15" /><path d="M7.5 7.5C9.5 6.8 11.2 6.5 12 6.5C12.8 6.5 14.5 6.8 16.5 7.5" /><path d="M7.5 16.5C9.5 17.2 11.2 17.5 12 17.5C12.8 17.5 14.5 17.2 16.5 16.5" /><circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" /><circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/syncmindautomation', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/syncmind_automation', icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1EX99YFMnY', icon: Facebook },
  { label: 'X', href: 'https://x.com/Syncmind_Auto', icon: Twitter },
  { label: 'Discord', href: 'https://discordapp.com/users/1512459500789956647', icon: DiscordIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@SyncmindAutomation', icon: Youtube },
];

const successStories = [
  { company: 'VTS Infotech', role: 'Head of Technology', industry: 'Technology', testimonial: 'The AI-driven automation reduced manual data entry by 90% and eliminated human errors. Our team can now focus on strategic initiatives instead of repetitive tasks.', icon: Code2 },
  { company: 'ManufacturePro', role: 'Plant Manager', industry: 'Manufacturing', testimonial: 'Production line automation increased output by 60% while reducing defects by 85%. The ROI was achieved in under 4 months.', icon: Settings2 },
  { company: 'JSP Projects Pvt. Ltd.', role: 'CTO', industry: 'Finance', testimonial: 'Their RPA solutions streamlined our operations and reduced operational costs by 45% in just 6 months. The implementation was seamless and the support team is exceptional.', icon: CircleDollarSign },
  { company: 'Jeevanasha Hospital', role: 'Operations Director', industry: 'Healthcare', testimonial: 'Automation improved patient data management accuracy to 99.8% and helped us achieve full regulatory compliance. The system has been running flawlessly 24/7.', icon: ShieldCheck },
];

function SuccessStories() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused) return; const timer = setInterval(() => { setCurrent((prev) => (prev + 1) % successStories.length); }, 5000); return () => clearInterval(timer); }, [paused]);
  const goToSlide = (index: number) => { setCurrent(index); setPaused(true); };
  const next = () => { setCurrent((prev) => (prev + 1) % successStories.length); setPaused(true); };
  const prev = () => { setCurrent((prev) => (prev - 1 + successStories.length) % successStories.length); setPaused(true); };
  return <section className="success-stories section-shell" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}><SectionHeading eyebrow="CLIENT SUCCESS STORIES" title={<>Trusted by<br /><em>Industry Leaders</em></>} description="See how forward-thinking companies are transforming operations with intelligent automation." align="center" /><div className="success-carousel"><button className="success-nav success-prev" onClick={prev} aria-label="Previous slide"><ChevronLeft size={24} /></button><div className="success-viewport"><div className="success-track" style={{ transform: `translateX(-${current * 100}%)` }}>{successStories.map((story) => { const Icon = story.icon; return <div className="success-slide" key={story.company}><div className="success-slide-inner"><div className="success-icon"><Icon size={32} /></div><div className="success-stars">★★★★★</div><p className="success-testimonial">"{story.testimonial}"</p><div className="success-client"><strong>{story.company}</strong><span>{story.role}</span><span className="success-industry">{story.industry}</span></div></div></div>; })}</div></div><button className="success-nav success-next" onClick={next} aria-label="Next slide"><ChevronRight size={24} /></button></div><div className="success-dots">{successStories.map((_, index) => <button key={index} className={`success-dot ${index === current ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={`Go to slide ${index + 1}`} />)}</div></section>;
}

function Careers() {
  return <main className="form-page section-shell"><div className="form-intro"><SectionHeading eyebrow="CAREERS" title={<>Build the future<br /><em>with SyncMind.</em></>} description="We are building intelligent software, AI and automation that help businesses work smarter." /></div><CareerForm /></main>;
}

function CareerForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [fileError, setFileError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

  const validateFile = (file: File | null): { valid: boolean; base64?: string } => {
    setFileError('');
    if (!file) { setFileError('Please upload your resume.'); return { valid: false }; }
    const lowerName = file.name.toLowerCase();
    const extOk = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
    if (!extOk) { setFileError('Only PDF, DOC, or DOCX files are allowed.'); return { valid: false }; }
    if (file.size > MAX_FILE_SIZE) { setFileError('File too large. Maximum size is 5MB.'); return { valid: false }; }
    return { valid: true };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') || '').trim();
    const jobRole = String(data.get('jobRole') || '').trim();
    const file = fileRef.current?.files?.[0] ?? null;
    if (!fullName || !jobRole) { setStatus('error'); setMessage('Please fill in your name and select a role.'); return; }
    const fileCheck = validateFile(file);
    if (!fileCheck.valid) { setStatus('error'); return; }
    setStatus('submitting'); setMessage('');
    const fileToRead = file as File;
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';
      const { error } = await postForm<{ success: boolean; message: string }>('career-application', {
        fullName,
        jobRole,
        fileName: fileToRead.name,
        fileType: fileToRead.type,
        fileSize: fileToRead.size,
        fileBase64: base64,
      });
      if (error) { setStatus('error'); setMessage(error); return; }
      setStatus('success'); setMessage('Thank you for applying. Your application has been received successfully.'); form.reset();
    };
    reader.onerror = () => { setStatus('error'); setMessage("We couldn't read your file. Please try again."); };
    reader.readAsDataURL(fileToRead);
  };

  return <form className="demo-form" onSubmit={handleSubmit}>
    <div className="form-row"><label>Full name<input name="fullName" required placeholder="Your name" /></label><label>Job role<select name="jobRole" defaultValue=""><option value="" disabled>Select a role</option><option>Product Manager</option><option>Business Analyst</option><option>Software Developer</option><option>Frontend Developer</option><option>Backend Developer</option><option>Full Stack Developer</option><option>AI / ML Engineer</option><option>Automation Engineer</option><option>UI/UX Designer</option><option>QA Engineer</option><option>Sales & Business Development</option><option>Other</option></select></label></div>
    <label>Upload resume<input ref={fileRef} type="file" accept=".pdf,.doc,.docx" /></label>
    {fileError && <div className="form-alert form-alert-error"><X size={18} /><span>{fileError}</span></div>}
    {status === 'success' && <div className="form-alert form-alert-success"><Check size={18} /><span>{message}</span></div>}
    {status === 'error' && !fileError && message && <div className="form-alert form-alert-error"><X size={18} /><span>{message}</span></div>}
    <button type="submit" className="button button-primary" disabled={status === 'submitting'}>{status === 'submitting' ? <><span className="spinner" />Submitting...</> : <>Submit application<ArrowRight size={16} /></>}</button>
    <p className="form-note">SyncMind Automation will review your application and reach out if there is a fit.</p>
  </form>;
}

function Footer() { const groups = [{ title: 'Platform', links: products }, { title: 'AI & Automation', links: aiSolutions }, { title: 'Services', links: services }]; return <footer><div className="footer-main section-shell"><div className="footer-brand"><Logo /><p>The intelligence behind business.</p><Button href="/demo">Request a demo</Button></div>{groups.map((group) => <div className="footer-col" key={group.title}><strong>{group.title}</strong>{group.links.map((link) => <button key={link.slug} onClick={() => navigate(groupHref(group.title, link.slug))}>{link.label}</button>)}</div>)}<div className="footer-col"><strong>Company</strong><button onClick={() => navigate('/company')}>About</button><button onClick={() => navigate('/careers')}>Careers</button><button onClick={() => navigate('/resources')}>Resources</button><button onClick={() => navigate('/contact')}>Contact</button><div className="socials">{socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}><social.icon size={20} /></a>)}</div></div></div><div className="footer-bottom section-shell"><span>© 2026 SyncMind Automation. All rights reserved.</span><span>Software + AI + Automation</span></div></footer>; }

function App() { const [path, setPath] = useState(window.location.pathname); useEffect(() => { const update = () => setPath(window.location.pathname); window.addEventListener('popstate', update); return () => window.removeEventListener('popstate', update); }, []); const page = useMemo(() => { if (path === '/') return <Home />; if (path === '/resources') return <Resources />; if (path === '/company') return <Company />; if (path === '/demo') return <Demo />; if (path === '/contact') return <Demo contact />; if (path === '/careers') return <Careers />; const product = path.startsWith('/platform/') ? products.find((item) => path === `/platform/${item.slug}`) : undefined; const ai = path.startsWith('/ai/') || path === '/automation' ? aiSolutions.find((item) => path === `/ai/${item.slug}` || path === '/automation' && item.slug === 'automation') : undefined; const service = path.startsWith('/services/') ? services.find((item) => path === `/services/${item.slug}`) : undefined; return <DetailPage config={product ?? ai ?? service ?? products[0]} />; }, [path]); return <><Navbar />{page}<Footer /></>; }

export default App;
