





export interface UseCase {
  id: number;
  icon: string;
  title: string;
  description: string;
  tag?: string;
  infographicHTML: string;
  architectureHTML: string;
  solutionFlowHTML?: string;
}

const useCase1Infographic = `
    <div class="infographic-container">
        <header class="infographic-header animate-fade-in-down">
            <h2>The Future of Incident Management</h2>
            <p>Leveraging ServiceNow's AI to automate, predict, and proactively resolve IT issues.</p>
        </header>

        <section class="infographic-section animate-fade-in-up" style="animation-delay: 100ms;">
            <h3>Phase 1: AI for Data Integrity & Analytics</h3>
            <p class="section-subtitle">Using Predictive Intelligence, the system analyzes historical data to predict and suggest values for fields on new incidents, ensuring consistency and saving agent time.</p>
            <div class="grid-container">
                <div class="grid-item">
                    <h4>How It Works in Detail</h4>
                    <div class="step-list">
                       <div class="step-item"><div>1</div><p><span>Predictive Intelligence Setup:</span> A Classification solution learns from resolved incidents, mapping descriptions to correct Impact, Urgency, and Cause Codes.</p></div>
                       <div class="step-item"><div>2</div><p><span>Train the Model:</span> The system automatically trains on your historical data, learning patterns</p></div>
                       <div class="step-item"><div>3</div><p><span>(Optional) Use Now Assist Skill:</span> Now Assist Skill helps to summarize, understand and provide smarter responses.</p></div>
                       <div class="step-item"><div>3</div><p><span>Apply the Model:</span> As an agent types, the model runs in real-time, proposing best-fit values for one-click auto-population.</p></div>
                    </div>
                    <div class="stat-highlight">
                        <span class="stat-number">45%</span>
                        <p class="stat-label">Reduction in Manual Field Entry Time</p>
                    </div>
                </div>
                <div class="grid-item">
                    <h4>High-Level Flow</h4>
                    <div class="flow-diagram">
                        <div class="flow-card"><span>1. Agent Creates Incident</span><p>The process starts in the ServiceNow platform.</p></div>
                        <div class="flow-arrow">&darr;</div>
                        <div class="flow-card"><span>2. AI Analyzes Description</span><p>Now Assist / Predictive intelligence analyzes text in real-time.</p></div>
                        <div class="flow-arrow">&darr;</div>
                        <div class="flow-card"><span>3. AI Proposes Fields</span><p>Predicts Impact, Urgency, Cause Code, etc.</p></div>
                        <div class="flow-arrow">&darr;</div>
                        <div class="flow-card highlight"><span>4. Agent Reviews & Accepts</span><p>Final confirmation with one click.</p></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="infographic-section animate-fade-in-up" style="animation-delay: 200ms;">
            <div class="grid-container reverse">
                <div class="grid-item">
                    <h4>Impact on Root Cause Analysis</h4>
                    <p>By automatically linking incidents to the changes that may have caused them, the AI provides immediate context, drastically reducing RCA time.</p>
                    <div class="chart-container">
                        <canvas id="timeToResolveChart"></canvas>
                    </div>
                </div>
                <div class="grid-item">
                    <h3>Phase 2: Proactive Incident & Change Linking</h3>
                    <p>The AI Agent identifies and creates critical connections between incidents and change requests, ensuring a complete, accurate history.</p>
                    <div class="step-list">
                       <div class="step-item"><div>1</div><p><span>AI Agent Triggers:</span> Activates when an incident is created or updated.</p></div>
                       <div class="step-item"><div>2</div><p><span>Analyzes Context:</span> Scans notes for keywords like "maintenance" or "CRQ number".</p></div>
                       <div class="step-item"><div>3</div><p><span>Proposes Link:</span> Automatically suggests linking the incident to a relevant change record.</p></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="infographic-section animate-fade-in-up" style="animation-delay: 300ms;">
             <div class="infographic-header">
                <h3>Phase 3: Automated Recurring Incident Detection</h3>
                <p>The shift from reactive to proactive problem management. The AI identifies systemic patterns, allowing teams to address the root cause and prevent future incidents.</p>
            </div>
            <div class="grid-container">
                 <div class="grid-item">
                     <div class="flow-diagram vertical">
                        <div class="flow-card"><div>🎟️</div><p class="font-semibold">Multiple Similar Incidents Created</p></div>
                        <div class="flow-arrow">&darr;</div>
                        <div class="flow-card"><div>🤖</div><p class="font-semibold">Now Assist Identifies a Pattern</p></div>
                        <div class="flow-arrow">&darr;</div>
                        <div class="flow-card highlight"><div>💡</div><p class="font-semibold">AI Agent Recommends existing tickets of same nature</p></div>
                    </div>
                 </div>
                 <div class="grid-item">
                    <h4>Projected Reduction in Recurring Incidents</h4>
                    <p>By elevating recurring issues into a formal problem, teams can focus on permanent fixes, leading to a sustained drop in incident volume.</p>
                    <div class="chart-container">
                        <canvas id="recurringIncidentsChart"></canvas>
                    </div>
                 </div>
            </div>
        </section>
    </div>
`;

const useCase1Architecture = `
    <div class="infographic-container">
        <header class="infographic-header animate-fade-in-down">
            <h2>ITSM Solution Architecture</h2>
            <p>This diagram outlines the system components, integrations, and data flows for the AI-powered ITSM solution.</p>
        </header>
        <section class="infographic-section animate-fade-in-up">
            <h3 style="text-align: center;">[Architecture Diagram Placeholder]</h3>
            <p style="text-align: center; color: #A0AEC0;">A detailed visual diagram will be embedded here, showing the interaction between ServiceNow, AI models, and external systems.</p>
        </section>
    </div>
`;

const useCase1SolutionFlow = `
    <div class="infographic-container">
        <header class="infographic-header animate-fade-in-down">
            <h2>Solution & Flow</h2>
            <p>Comprehensive breakdown of the solution logic, decision points, and data flow.</p>
        </header>
        <section class="infographic-section animate-fade-in-up">
            <h3>Process Logic</h3>
            <div class="grid-container">
                <div class="grid-item">
                     <div class="flow-diagram">
                        <div class="flow-card"><span>Start</span><p>Incident Created</p></div>
                        <div class="flow-arrow">&darr;</div>
                        <div class="flow-card highlight"><span>Analyze</span><p>AI scans short description</p></div>
                        <div class="flow-arrow">&darr;</div>
                        <div class="flow-card"><span>Predict</span><p>Category & Priority Assigned</p></div>
                        <div class="flow-arrow">&darr;</div>
                        <div class="flow-card"><span>Resolve</span><p>Route to Assignment Group</p></div>
                    </div>
                </div>
                <div class="grid-item">
                    <h4>Key Decision Points</h4>
                    <ul class="step-list">
                        <li class="step-item"><p><span>Confidence Score Check:</span> Is the AI confidence > 80%?</p></li>
                        <li class="step-item"><p><span>Availability Check:</span> Are agents available in the predicted group?</p></li>
                        <li class="step-item"><p><span>Automation Trigger:</span> Can this be resolved by Virtual Agent?</p></li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
`;

export const initialUseCases: UseCase[] = [
  {
      id: 1,
      title: 'Intelligent Field Prediction & Autofill',
      tag: 'Featured',
      icon: 'fa-cogs',
      description: 'Leverage AI-powered predictive models to recommend the most suitable attributes for each incident, improving data quality and accelerating resolution.',
      infographicHTML: useCase1Infographic,
      architectureHTML: useCase1Architecture,
      solutionFlowHTML: useCase1SolutionFlow
  },
  {
      id: 101, // Duplicate of ID 1
      title: 'Improved Incident Resolution Through Automated Linkage',
      tag: 'Featured',
      icon: 'fa-cogs',
      description: 'Use PI to identify and establish dependencies between incidents, improving correlation, reducing duplicates, and enhancing service insights.',
      infographicHTML: useCase1Infographic,
      architectureHTML: useCase1Architecture,
      solutionFlowHTML: useCase1SolutionFlow
  },
  { 
      id: 2, 
      title: 'AI-Powered L1 Ticket Automation & Self-Service Enablement', 
      tag: 'Automation',
      icon: 'fa-headset', 
      description: 'AI provides instant, conversational self-service guidance, speeding resolution and lowering ticket volume.', 
      infographicHTML: `
          <div class="infographic-container">
              <header class="infographic-header animate-fade-in-down">
                  <h2>Revolutionizing <span style="color: var(--glow-color);">L1 Support</span></h2>
                  <p>An End-to-End AI and Automation Strategy with ServiceNow</p>
              </header>

              <section class="infographic-section animate-fade-in-up" style="animation-delay: 100ms;">
                  <h3>The AI-Powered User Journey</h3>
                  <div class="journey-steps-container">
                      <div class="journey-step">
                          <div class="icon-wrapper"><i class="fas fa-user-alt"></i></div>
                          <h4>User Has an Issue</h4>
                          <p>An employee needs help, like a "how-to" question or a service request.</p>
                      </div>
                      <div class="journey-connector"></div>
                      <div class="journey-step">
                          <div class="icon-wrapper"><i class="fas fa-comments"></i></div>
                          <h4>Conversational AI Engages</h4>
                          <p>Now Assist & Virtual Agent instantly starts a conversation to understand the user's intent.</p>
                      </div>
                      <div class="journey-connector"></div>
                      <div class="journey-step">
                          <div class="icon-wrapper"><i class="fas fa-lightbulb"></i></div>
                          <h4>Intelligence at Work</h4>
                          <p>GenAI finds answers. Predictive Intelligence triages and routes tickets instantly if needed.</p>
                      </div>
                      <div class="journey-connector"></div>
                      <div class="journey-step">
                          <div class="icon-wrapper"><i class="fas fa-check-circle"></i></div>
                          <h4>User Satisfied</h4>
                          <p>The issue is resolved instantly, or the ticket is already with the correct expert.</p>
                      </div>
                  </div>
              </section>

              <section class="infographic-section animate-fade-in-up" style="animation-delay: 200ms;">
                  <h3>Transformative <span style="color: var(--glow-color);">Benefits</span></h3>
                  <div class="grid-container benefits-grid">
                      <div class="benefit-card"><i class="fas fa-heart"></i><h4>Enhanced User Experience</h4><p>Instant, 24/7 support and consistent answers improve employee satisfaction and productivity.</p></div>
                      <div class="benefit-card"><i class="fas fa-bolt"></i><h4>Increased Agent Efficiency</h4><p>Automate repetitive tasks, freeing up agents to focus on high-value, complex incidents.</p></div>
                      <div class="benefit-card"><i class="fas fa-chart-line"></i><h4>Drastic Cost Reduction</h4><p>Lower operational costs by deflecting L1 tickets and slashing mean time to resolution (MTTR).</p></div>
                      <div class="benefit-card"><i class="fas fa-robot"></i><h4>Autonomous Resolution</h4><p>Enable zero-touch, end-to-end task execution across systems for common requests.</p></div>
                  </div>
              </section>

              <section class="infographic-section animate-fade-in-up" style="animation-delay: 300ms;">
                  <h3>Automation in <span style="color: var(--glow-color);">Action</span></h3>
                  <div class="tab-container">
                      <div class="tab-buttons">
                          <button class="tab-btn active" data-target="tab-self-service"><i class="fas fa-hand-holding-heart"></i> Self-Service</button>
                          <button class="tab-btn" data-target="tab-triage"><i class="fas fa-sitemap"></i> Automated Triage</button>
                          <button class="tab-btn" data-target="tab-autonomous"><i class="fas fa-robot"></i> Autonomous Execution</button>
                      </div>
                      <div class="tab-content-container">
                          <div id="tab-self-service" class="tab-content active">
                              <div class="example-card"><div class="example-icon"><i class="fas fa-question-circle"></i></div><div><h4>"How-to" Questions</h4><p>A user asks, "How do I connect to the VPN?" The Virtual Agent uses GenAI to find and provide a clear, step-by-step guide from knowledge articles.</p></div></div>
                              <div class="example-card"><div class="example-icon"><i class="fas fa-tools"></i></div><div><h4>Software Installation Issues</h4><p>A user says, "I can't install the new Adobe Suite." The Virtual Agent provides the top three most common solutions, such as checking for admin rights.</p></div></div>
                              <div class="example-card"><div class="example-icon"><i class="fas fa-folder-plus"></i></div><div><h4>Requesting Access</h4><p>A user types, "I need access to the marketing shared drive." The Virtual Agent provides a direct link to the correct service catalog item to initiate the request.</p></div></div>
                          </div>
                          <div id="tab-triage" class="tab-content">
                              <div class="example-card"><div class="example-icon"><i class="fas fa-server"></i></div><div><h4>Application Down</h4><p>A ticket "CRM is down" is auto-assigned to Application Support, with Category "Software" and Priority "Critical" set by Predictive Intelligence.</p></div></div>
                              <div class="example-card"><div class="example-icon"><i class="fas fa-desktop"></i></div><div><h4>Hardware Issues</h4><p>A ticket "My laptop monitor won't turn on" is auto-assigned to Desktop Support, with Category "Hardware" and CI "Laptop" predicted by the AI.</p></div></div>
                              <div class="example-card"><div class="example-icon"><i class="fas fa-code-branch"></i></div><div><h4>Request for Change</h4><p>A ticket "Request for a new API endpoint" is auto-classified as a "Change" and assigned directly to the "Engineering - Backend" group.</p></div></div>
                          </div>
                          <div id="tab-autonomous" class="tab-content">
                              <div class="example-card"><div class="example-icon"><i class="fas fa-key"></i></div><div><h4>Password Reset</h4><p>The Now AI Agent confirms a user's identity, securely logs into Salesforce via API, performs the password reset, and sends a temporary password.</p></div></div>
                              <div class="example-card"><div class="example-icon"><i class="fas fa-cloud-download-alt"></i></div><div><h4>Software Provisioning</h4><p>The AI Agent receives a request, verifies the user's role, checks for an available license, provisions it, and sends a welcome email with login details.</p></div></div>
                              <div class="example-card"><div class="example-icon"><i class="fas fa-user-lock"></i></div><div><h4>User Unlock</h4><p>The AI Agent detects a locked account, verifies the user's identity via secondary challenge, and performs the account unlock in Active Directory.</p></div></div>
                          </div>
                      </div>
                  </div>
              </section>
          </div>
      `,
      architectureHTML: '<div class="infographic-header animate-fade-in-down"><h2>Architecture Coming Soon</h2><p>Content for this use case is being prepared.</p></div>'
  },
  { 
      id: 3, 
      title: 'AI-Driven Incident Field Automation & Insights', 
      tag: 'New',
      icon: 'fa-robot', 
      description: 'Automatically populate critical incident fields with data-driven accuracy, link incidents and changes intelligently, and detect recurring incidents to enable proactive resolution.', 
      infographicHTML: '<div class="infographic-header animate-fade-in-down"><h2>Details Coming Soon</h2><p>Content for this use case is being prepared.</p></div>',
      architectureHTML: '<div class="infographic-header animate-fade-in-down"><h2>Architecture Coming Soon</h2><p>Content for this use case is being prepared.</p></div>'
  },
  { 
      id: 4, 
      title: 'Security Operations', 
      tag: 'Core',
      icon: 'fa-shield-alt', 
      description: 'Respond to threats faster by connecting security and IT teams.', 
      infographicHTML: '<div class="infographic-header animate-fade-in-down"><h2>Details Coming Soon</h2><p>Content for Security Operations is being prepared.</p></div>',
      architectureHTML: '<div class="infographic-header animate-fade-in-down"><h2>Architecture Coming Soon</h2><p>Content for Security Operations is being prepared.</p></div>'
  },
  {
    id: 5,
    icon: "fas fa-users-cog",
    title: "HR Service Delivery (HRSD)",
    description: "Provide employees with a single place for all HR needs, from onboarding to payroll questions, creating a seamless employee experience.",
    infographicHTML: '<div class="infographic-header animate-fade-in-down"><h2>Details Coming Soon</h2><p>Content for HR Service Delivery is being prepared.</p></div>',
    architectureHTML: '<div class="infographic-header animate-fade-in-down"><h2>Architecture Coming Soon</h2><p>Content for HR Service Delivery is being prepared.</p></div>'
  },
  {
    id: 8,
    icon: "fas fa-boxes-stacked",
    title: "IT Asset Management (ITAM)",
    description: "Track and manage the lifecycle of all IT assets. Optimize spend, reduce risk, and support data-driven decisions.",
    infographicHTML: '<div class="infographic-header animate-fade-in-down"><h2>Details Coming Soon</h2><p>Content for IT Asset Management is being prepared.</p></div>',
    architectureHTML: '<div class="infographic-header animate-fade-in-down"><h2>Architecture Coming Soon</h2><p>Content for IT Asset Management is being prepared.</p></div>'
  },
];