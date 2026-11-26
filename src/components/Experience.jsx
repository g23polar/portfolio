import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { MapPin, Briefcase, Calendar } from 'lucide-react';

function Experience() {
  const { theme } = useContext(ThemeContext);

  const experiences = [
  {
    title: 'Creator & Maintainer',
    company: 'factory',
    period: 'Sep 2026 - Present',
    location: 'Remote',
    type: 'Open-Source Multi-Agent Coding System',
    description: [
      'Extended an open-source (GPL) pipeline into an agentic coding system on Claude Code: 8 specialized LLM agents take a GitHub issue through intake, spec-driven implementation, multi-lens AI code review, and approval, each in an isolated context (its own session and git worktree).',
      'Designed guardrails for autonomous agents: deterministic orchestration and a script-enforced merge policy keep control decisions out of the model, a least-privilege tool allowlist contains prompt-injection risk from untrusted issue text, and risky changes escalate to a human in the loop.',
      'Built risk-based model routing across Claude Opus, Sonnet, and Haiku and compressed agent shell output through rtk (76% fewer tool-output tokens); review agents return structured verdicts that drive automatic rework loops. Dogfooded: it ships its own features through the pipeline, backed by 63 policy tests.',
      'Stack: Python, Claude Code, Orca, GitHub CLI, Bash.'
    ]
  },
  {
    title: 'Founding Solutions Engineer, Applied AI',
    company: 'Omnea',
    period: 'Jun 2026 - Aug 2026',
    location: 'London, UK',
    type: 'Contract',
    description: [
      'Launched a RAG system (Claude, Chroma) over the codebase and knowledge base that traces logs to the relevant code in under 60s with documented reasoning; eval-validated and used by a 4-person team on every ticket.',
      'Integrated 15+ customers across 11 enterprise systems, including NetSuite, Dynamics, Okta, Azure, and Jira.',
      'Closed 480+ support tickets in 6 weeks, cutting ticket volume escalated to engineering by 94%, and shipped 2–5 fixes per day directly, 3–8 weeks sooner than the standard engineering queue.'
    ]
  },
  {
    title:'Founder ?, part-time PM, definitely Software Engineer', 
    company:'Gig Connector',
    period:'Jan 2026 - Apr 2026', 
    location:'New York City, NY' ,
    type:'Full-time + rest of my day', 
    description:[
      'Building a one stop shop for musician-venue collaboration',
      'Sign up for local performances',
      'Track your earnings, event history, gross revenue, ticket sales and more.',  
    ]
  },
    
  {
    title: 'Software Engineer, High Grade Credit Trading',
    company: 'MarketAxess',
    period: 'Sep 2022 - Nov 2025',
    location: 'New York City, NY',
    type: 'Full-time',
    description: [
      'Shipped standardized API validation and automated message handling for a regulated, high-volume traffic stream, eliminating $1M+ per-incident compliance exposure for enterprise clients.',
      'Owned production reliability for a trading platform; cut MTTR 35% and customer-impacting incidents 50% by isolating JVM and cross-platform bugs.',
      'Shipped 16 full-stack and API features, including a stateful-update API that lets clients amend in-flight transactions concurrently across trading protocols.',
      'Led 8 major releases and disaster-recovery exercises end to end, owning rollout, rollback, and on-call recovery.',
      'Built health-check and maintenance tooling for 2 global API gateways serving 350+ internal operators.',
      'Mentored 2 engineering interns through scoping, technical design, and delivery of full-stack projects.'
    ],
  }, 
  {
    title:'Back-end Software Engineer', company:'SentinelOne', period:'Jun 2020 - Jan 2021', location:'Remote', type:'Intern/Contract',
    description:[
      'Built a PowerShell SDK and CLI that gave endpoint clients one scriptable interface to 27 administrative and security operations, including YARA scans, file-system operations, and WMI queries.',
      'Built forensic reporting on top of the SDK, letting remote endpoints ship system reports and logs to AWS S3 and Glacier.'
    ]
  }, 
  {
    title:'Data Science Intern', company:'MSwipe Technologies', period:'Dec 2019 - Jan 2020', location:'Mumbai, India', type:'Intern',
    description:[
      'Built facial detection software from OpenCV and TensorFlow libraries to automate merchant verification process. Optimization led to saving 6-8 hours of work per week']
  }, 
  {
    title:'Analytics Intern', company:'8x8', period:'May 2019 - Jul 2019', location:'San Jose, CA', type:'Intern',
    description:[
      'Built a pipeline that moved 10–80 GB/month of lead data from provider to sales through 4 enrichment and caching stages, automating a manual transfer for lead generation and churn prevention.'
    ]
  }, 
  {
    title:'Mover', company:'Going Moving Company', period:'Apr 2021 - May 2022', location:'Blacksburg, VA', type:'Part-time',
    description:[
      'Responsible for building in-house CRM to optimize worker efficiency and transparency. Utilized Google APIs to automate scheduling and resolve inventory/schedule conflicts',
      'Developed strategies to increase sales and reach. Oversaw smooth operations of small and large scale jobs around Virginia. Team leader for 10+ multi-day assignments', 
      'Moved boxes and lots of heavy stuff'
    ]
  }
]

  return (
    <section
      id="experience"
      className={`py-24 px-6 relative overflow-hidden bg-transparent`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
          }`}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2
            className={`text-5xl md:text-6xl font-bold mb-4 ${
              theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
            }`}
          >
            Experience
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`h-1 mx-auto rounded-full ${
              theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
            }`}
          />
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`absolute left-0 md:left-12 top-0 w-0.5 ${
              theme === 'dark' ? 'bg-[#b8f2e6]/30' : 'bg-[#aed9e0]/40'
            }`}
          />

          {/* Experience Items */}
          {experiences.filter(exp => exp.title).map((experience, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.3 }}
              className="relative pl-12 md:pl-32 pb-12"
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.6 + i * 0.3 }}
                className={`absolute left-0 md:left-12 top-2 -translate-x-1/2 w-5 h-5 rounded-full border-4 ${
                  theme === 'dark'
                    ? 'bg-[#b8f2e6] border-[#1c1c1c]'
                    : 'bg-[#aed9e0] border-[#fafafa]'
                }`}
              >
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-full ${
                    theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
                  }`}
                />
              </motion.div>

              {/* Content */}
              <div>
                {/* Header */}
                <div className="mb-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.3 }}
                    className={`text-3xl md:text-4xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
                    }`}
                  >
                    {experience.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.3 }}
                    className={`text-xl md:text-2xl font-semibold mb-4 ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}
                  >
                    {experience.company}
                  </motion.p>

                  {/* Meta Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + i * 0.3 }}
                    className="flex flex-wrap gap-4"
                  >
                    <div className={`flex items-center gap-2 text-sm md:text-base ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>
                      <Calendar size={16} className={theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#aed9e0]'} />
                      <span>{experience.period}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm md:text-base ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>
                      <MapPin size={16} className={theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#aed9e0]'} />
                      <span>{experience.location}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm md:text-base ${
                      theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                    }`}>
                      <Briefcase size={16} className={theme === 'dark' ? 'text-[#b8f2e6]' : 'text-[#aed9e0]'} />
                      <span>{experience.type}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Description */}
                <ul className="space-y-3">
                  {experience.description.map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1 + i * 0.3 + idx * 0.1 }}
                      className="group/item"
                    >
                      <motion.div
                        whileHover={{ x: 8 }}
                        className="flex items-start gap-3"
                      >
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 90 }}
                          className={`mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                            theme === 'dark' ? 'bg-[#b8f2e6]' : 'bg-[#aed9e0]'
                          }`}
                        />
                        <span
                          className={`text-base md:text-lg leading-relaxed ${
                            theme === 'dark' ? 'text-[#aed9e0]' : 'text-[#5e6472]'
                          } opacity-85 group-hover/item:opacity-100 transition-opacity`}
                        >
                          {point}
                        </span>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;