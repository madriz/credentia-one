// Curated list of 500+ common professional skills for autocomplete.
// Sources: O*NET, ESCO, and commonly used skills on job platforms.

export const SKILLS_LIST: string[] = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'C', 'Go', 'Rust', 'Ruby',
  'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Lua', 'Dart', 'Elixir',
  'Haskell', 'Clojure', 'Objective-C', 'Assembly', 'COBOL', 'Fortran', 'Julia', 'Groovy',
  'Visual Basic', 'Shell Scripting', 'Bash', 'PowerShell', 'SQL', 'PL/SQL', 'T-SQL',

  // Frontend Frameworks & Libraries
  'React', 'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby', 'Astro',
  'jQuery', 'Backbone.js', 'Ember.js', 'Lit', 'Solid.js', 'Alpine.js', 'HTMX',
  'Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Ant Design', 'Sass',
  'LESS', 'CSS Modules', 'Styled Components', 'Storybook', 'Figma to Code',

  // Backend Frameworks
  'Node.js', 'Express.js', 'NestJS', 'Fastify', 'Hono', 'Django', 'Flask', 'FastAPI',
  'Spring Boot', 'Spring Framework', 'ASP.NET', '.NET Core', 'Ruby on Rails', 'Sinatra',
  'Laravel', 'Symfony', 'Gin', 'Echo', 'Actix', 'Phoenix', 'Ktor',

  // Databases
  'PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'Oracle Database', 'SQL Server',
  'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'CouchDB', 'Neo4j',
  'InfluxDB', 'TimescaleDB', 'Supabase', 'Firebase Realtime Database', 'Firestore',
  'Cockroach DB', 'PlanetScale', 'Neon',

  // Cloud & Infrastructure
  'AWS', 'Amazon Web Services', 'Azure', 'Google Cloud Platform', 'GCP', 'Heroku',
  'DigitalOcean', 'Vercel', 'Netlify', 'Cloudflare', 'Alibaba Cloud',
  'AWS Lambda', 'AWS S3', 'AWS EC2', 'AWS ECS', 'AWS EKS', 'AWS RDS', 'AWS SQS',
  'AWS SNS', 'AWS CloudFormation', 'AWS CDK', 'Azure Functions', 'Azure DevOps',
  'Google Cloud Functions', 'Cloud Run', 'BigQuery',

  // DevOps & CI/CD
  'Docker', 'Kubernetes', 'Helm', 'Terraform', 'Ansible', 'Puppet', 'Chef',
  'Jenkins', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'Travis CI', 'ArgoCD',
  'Datadog', 'Grafana', 'Prometheus', 'New Relic', 'PagerDuty', 'Splunk',
  'Nginx', 'Apache', 'Caddy', 'HAProxy', 'Istio', 'Consul', 'Vault',

  // Data & ML
  'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'NLP',
  'Computer Vision', 'TensorFlow', 'PyTorch', 'Keras', 'scikit-learn', 'Pandas',
  'NumPy', 'SciPy', 'Jupyter', 'Apache Spark', 'Apache Kafka', 'Airflow',
  'dbt', 'Snowflake', 'Databricks', 'Tableau', 'Power BI', 'Looker',
  'Data Modeling', 'ETL', 'Data Warehousing', 'Data Pipeline', 'Feature Engineering',
  'A/B Testing', 'Statistical Analysis', 'Bayesian Statistics', 'Time Series Analysis',
  'Recommendation Systems', 'LLMs', 'Prompt Engineering', 'RAG', 'Fine-tuning',
  'Hugging Face', 'OpenAI API', 'LangChain', 'Vector Databases',

  // Mobile
  'React Native', 'Flutter', 'iOS Development', 'Android Development',
  'SwiftUI', 'UIKit', 'Jetpack Compose', 'Xamarin', 'Ionic', 'Capacitor',
  'App Store Optimization', 'Mobile Testing', 'Push Notifications',

  // Testing
  'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'Jest', 'Mocha',
  'Cypress', 'Playwright', 'Selenium', 'Puppeteer', 'JUnit', 'pytest',
  'RSpec', 'TestNG', 'Test-Driven Development', 'TDD', 'Behavior-Driven Development',
  'Load Testing', 'Performance Testing', 'Security Testing', 'Penetration Testing',

  // Version Control
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial',
  'Code Review', 'Pull Requests', 'Branching Strategies', 'Git Flow',

  // APIs & Integration
  'REST API', 'GraphQL', 'gRPC', 'WebSocket', 'OAuth', 'OpenID Connect',
  'SAML', 'JWT', 'API Gateway', 'Swagger', 'OpenAPI', 'Postman',
  'Webhook', 'Microservices', 'Service Mesh', 'Event-Driven Architecture',
  'Message Queues', 'RabbitMQ', 'Apache Kafka', 'NATS', 'MQTT',

  // Security
  'Cybersecurity', 'Network Security', 'Application Security', 'OWASP',
  'Encryption', 'PKI', 'SSL/TLS', 'Identity Management', 'IAM',
  'SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'PCI DSS', 'Zero Trust',
  'Vulnerability Assessment', 'Incident Response', 'SIEM', 'Firewalls',

  // Design & UX
  'UI Design', 'UX Design', 'UX Research', 'Interaction Design',
  'Wireframing', 'Prototyping', 'Figma', 'Sketch', 'Adobe XD', 'InVision',
  'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe After Effects',
  'Adobe Premiere Pro', 'Final Cut Pro', 'Canva', 'Blender', 'Cinema 4D',
  'User Testing', 'Accessibility', 'WCAG', 'Responsive Design', 'Design Systems',
  'Information Architecture', 'Content Strategy', 'Typography', 'Color Theory',

  // Project Management & Agile
  'Agile', 'Scrum', 'Kanban', 'SAFe', 'Lean', 'Six Sigma',
  'JIRA', 'Confluence', 'Asana', 'Trello', 'Monday.com', 'Linear',
  'Notion', 'ClickUp', 'Microsoft Project', 'Basecamp',
  'Sprint Planning', 'Retrospectives', 'Backlog Grooming', 'Story Points',
  'OKRs', 'KPIs', 'Gantt Charts', 'Critical Path Method', 'Risk Management',
  'Stakeholder Management', 'Change Management', 'PMP', 'PRINCE2',

  // Product Management
  'Product Strategy', 'Product Roadmap', 'Product Discovery',
  'User Stories', 'Requirements Gathering', 'Market Research',
  'Competitive Analysis', 'Product Analytics', 'Feature Prioritization',
  'Go-to-Market Strategy', 'Pricing Strategy', 'Product-Led Growth',
  'Customer Development', 'Jobs to Be Done', 'Design Thinking',

  // Marketing
  'Digital Marketing', 'Content Marketing', 'SEO', 'SEM', 'PPC',
  'Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Social Media Marketing',
  'Email Marketing', 'Marketing Automation', 'HubSpot', 'Salesforce Marketing Cloud',
  'Mailchimp', 'Google Analytics', 'Adobe Analytics', 'Mixpanel', 'Amplitude',
  'Conversion Rate Optimization', 'Growth Hacking', 'Brand Strategy',
  'Public Relations', 'Copywriting', 'Technical Writing', 'Content Creation',

  // Sales & CRM
  'Sales Strategy', 'B2B Sales', 'B2C Sales', 'Enterprise Sales',
  'Account Management', 'Lead Generation', 'Pipeline Management',
  'Salesforce', 'HubSpot CRM', 'Zoho CRM', 'Pipedrive',
  'Cold Outreach', 'Negotiation', 'Contract Management', 'Revenue Forecasting',

  // Finance & Accounting
  'Financial Analysis', 'Financial Modeling', 'Budgeting', 'Forecasting',
  'Accounting', 'GAAP', 'IFRS', 'Auditing', 'Tax Preparation',
  'QuickBooks', 'SAP', 'Oracle Financials', 'Bloomberg Terminal',
  'Private Equity', 'Venture Capital', 'Investment Banking', 'Portfolio Management',
  'Risk Analysis', 'Derivatives', 'Fixed Income', 'Equity Research',
  'Corporate Finance', 'Mergers and Acquisitions', 'Due Diligence',
  'Excel', 'VBA', 'Financial Reporting', 'Cash Flow Management',

  // Human Resources
  'Talent Acquisition', 'Recruiting', 'Employer Branding', 'Onboarding',
  'Performance Management', 'Compensation and Benefits', 'HRIS',
  'Workday', 'BambooHR', 'ADP', 'Employee Engagement', 'Diversity and Inclusion',
  'Labor Law', 'Employee Relations', 'Organizational Development',
  'Training and Development', 'Succession Planning', 'HR Analytics',

  // Legal
  'Contract Law', 'Corporate Law', 'Intellectual Property', 'Patent Law',
  'Regulatory Compliance', 'Employment Law', 'Data Privacy', 'Litigation',
  'Legal Research', 'Contract Negotiation', 'Corporate Governance',

  // Operations
  'Supply Chain Management', 'Logistics', 'Procurement', 'Inventory Management',
  'Lean Manufacturing', 'Quality Assurance', 'Quality Control', 'ISO 9001',
  'Process Improvement', 'Business Process Reengineering', 'Vendor Management',
  'Facilities Management', 'Fleet Management', 'Warehouse Management',

  // Healthcare
  'Clinical Research', 'Patient Care', 'Electronic Health Records', 'EHR',
  'HIPAA Compliance', 'Medical Coding', 'ICD-10', 'CPT', 'Pharmacology',
  'Public Health', 'Epidemiology', 'Health Informatics', 'Telemedicine',

  // Engineering (Non-Software)
  'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering',
  'Chemical Engineering', 'Biomedical Engineering', 'AutoCAD', 'SolidWorks',
  'CATIA', 'ANSYS', 'MATLAB Simulink', 'PLC Programming', 'SCADA',
  'Structural Analysis', 'Thermodynamics', 'Fluid Dynamics',

  // Communication
  'Technical Writing', 'Business Writing', 'Presentation Skills',
  'Public Speaking', 'Storytelling', 'Grant Writing', 'Proposal Writing',
  'Documentation', 'API Documentation', 'Content Editing', 'Proofreading',

  // Soft Skills
  'Leadership', 'Team Management', 'Mentoring', 'Coaching',
  'Cross-functional Collaboration', 'Conflict Resolution', 'Decision Making',
  'Critical Thinking', 'Problem Solving', 'Analytical Thinking',
  'Time Management', 'Prioritization', 'Delegation', 'Strategic Planning',
  'Emotional Intelligence', 'Adaptability', 'Resilience', 'Creativity',
  'Active Listening', 'Empathy', 'Cultural Awareness', 'Remote Team Management',
  'Stakeholder Communication', 'Client Relations', 'Customer Service',

  // Industry-Specific
  'Real Estate', 'Property Management', 'Construction Management',
  'Retail Management', 'E-commerce', 'Shopify', 'WooCommerce', 'Magento',
  'Hospitality Management', 'Food Safety', 'HACCP',
  'Media Production', 'Video Production', 'Audio Engineering', 'Podcasting',
  'Education Technology', 'Curriculum Development', 'Instructional Design',
  'Nonprofit Management', 'Fundraising', 'Grant Management',
  'Government Relations', 'Policy Analysis', 'Regulatory Affairs',
  'Insurance', 'Underwriting', 'Claims Management', 'Actuarial Science',
  'Banking', 'Lending', 'Credit Analysis', 'Anti-Money Laundering',
  'Blockchain', 'Smart Contracts', 'Solidity', 'Web3', 'DeFi',
  'Cryptocurrency', 'Tokenomics',
  'Telecommunications', '5G', 'Network Engineering', 'VoIP',
  'Aerospace', 'Aviation', 'Defense',
  'Energy', 'Renewable Energy', 'Solar', 'Wind', 'Oil and Gas',
  'Mining', 'Environmental Science', 'Sustainability', 'ESG',
  'Agriculture', 'Precision Agriculture', 'Food Science',
  'Biotechnology', 'Genomics', 'CRISPR', 'Drug Discovery',
  'Robotics', 'IoT', 'Embedded Systems', 'FPGA', 'RTOS',
  'AR/VR', 'Augmented Reality', 'Virtual Reality', 'Unity', 'Unreal Engine',
  'Game Development', 'Game Design', '3D Modeling', 'Animation',
];
