export interface SkillItem {
  code: string
  name: string
  level: "strong" | "comfortable"
  percent: number
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  items: SkillItem[]
}

export interface YearMonth {
  year: number
  month: number // 1-12
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  start: YearMonth
  end: YearMonth | null // null means Present
  period: string
  current?: boolean
  highlights: string[]
  tags: string[]
}

export interface CredentialItem {
  name: string
  org: string
  status: "completed" | "in-progress" | "planned"
  statusLabel: string
  kind: "certification" | "education"
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]

function formatYearMonth(ym: YearMonth): string {
  return `${MONTH_NAMES[ym.month - 1]} ${ym.year}`
}

function formatPeriod(start: YearMonth, end: YearMonth | null): string {
  return `${formatYearMonth(start)} — ${end ? formatYearMonth(end) : "Present"}`
}

function computeTotalYearsLabel(
  roles: Array<{ start: YearMonth; end: YearMonth | null }>,
): string {
  const now = new Date()
  const nowYm: YearMonth = { year: now.getFullYear(), month: now.getMonth() + 1 }
  const totalMonths = roles.reduce((sum, role) => {
    const end = role.end ?? nowYm
    const months = Math.max(0, (end.year - role.start.year) * 12 + (end.month - role.start.month) + 1)
    return sum + months
  }, 0)
  const years = Math.max(1, Math.floor(totalMonths / 12))
  return `${years}+`
}

const CURRENT_YEAR = String(new Date().getFullYear())

const RAW_EXPERIENCES: Array<Omit<ExperienceItem, "period">> = [
  {
    id: "capital-one",
    role: "Site Reliability Engineer / DevOps",
    company: "Capital One",
    location: "Toronto, ON",
    start: { year: 2024, month: 9 },
    end: null,
    current: true,
    highlights: [
      "Engineered CI/CD pipelines via GitHub Actions & Jenkins; automated SonarQube quality gates and deployment validation across 15+ Capital One production workloads.",
      "Managed containerized deployment lifecycle using Docker, Kubernetes (EKS), and OpenShift with Helm chart management; sustained high availability during regulated releases.",
      "Provisioned and governed AWS infrastructure (EC2, ECS, EKS, Lambda, S3, RDS, IAM) with CloudFormation and Terraform; applied Ansible for configuration management.",
      "Designed full-stack observability using Dynatrace APM, Synthetic, Davis AI, and ELK/OpenSearch pipelines; built service maps and indexed anomaly detections.",
      "Implemented SLO/SLI framework with error budgets aligned to golden signals — cut repeat production incidents by 38% through RCA and reliability fixes.",
      "Led P1/P2 incident bridges as coordinator; ran SQL queries against financial services applications; correlated ELK logs for root cause and used Dynatrace Davis for rapid triage.",
      "Cut AWS cloud spend by 28% via right-sizing, savings plans, and AI-powered cost optimization triggers.",
    ],
    tags: [
      "AWS",
      "Kubernetes EKS",
      "OpenShift",
      "GitHub Actions",
      "Terraform",
      "Dynatrace",
      "ELK / OpenSearch",
      "SLO / SLI",
    ],
  },
  {
    id: "accenture",
    role: "Associate Software Engineer — SRE / DevOps / Cloud",
    company: "Accenture",
    location: "India",
    start: { year: 2021, month: 7 },
    end: { year: 2023, month: 4 },
    highlights: [
      "Built and maintained CI/CD workflows using Jenkins, Git, Maven, SonarQube, Nexus, and Artifactory.",
      "Integrated observability and reliability checkpoints into SDLC; enforced quality across enterprise production environments.",
      "Operated Dynatrace APM (PurePath, Smartscape, Davis AI) and ELK/OpenSearch to identify and resolve critical production bottlenecks; built Kibana dashboards and Grafana panels for NOC and SRE teams.",
      "Administered Linux (RHEL, Ubuntu) and Windows Server environments; authored Bash/Shell and Python scripts for OS patching, SLO renewals, CVE remediation, health checks, and data enrichment.",
      "Provided 24/7 production support; maintained SLA compliance through structured escalation and post-incident documentation.",
    ],
    tags: [
      "Jenkins",
      "Dynatrace APM",
      "Kibana & Grafana",
      "Linux RHEL/Ubuntu",
      "Python & Bash",
      "SonarQube",
    ],
  },
]

export const EXPERIENCES: ExperienceItem[] = RAW_EXPERIENCES.map((exp) => ({
  ...exp,
  period: formatPeriod(exp.start, exp.end),
}))

export const TOTAL_EXPERIENCE_YEARS = computeTotalYearsLabel(RAW_EXPERIENCES)

export const PROFILE = {
  name: "Rahul Adepu",
  handle: "rahul_adepu",
  title: "Site Reliability Engineer · DevOps · Cloud Engineer",
  location: "Toronto, Ontario, Canada",
  email: "rahuladepu09@gmail.com",
  phone: "647-375-4990",
  phoneHref: "tel:+16473754990",
  linkedin: "https://www.linkedin.com/in/-rahuladepu/",
  github: "https://github.com/RahulAdepu",
  summary: `Results-driven SRE & DevOps engineer with ${TOTAL_EXPERIENCE_YEARS} years delivering production reliability in regulated financial environments. Proficient in full-stack CI/CD, cloud automation across AWS & Azure, and ELK/OpenSearch observability. Experienced in SLO/SLI design, incident command (P1/P2), cost optimization, and SQL-based production troubleshooting.`,
  aboutParagraphs: [
    "I build and automate reliable cloud infrastructure for high-stakes financial environments. My work centers on squeezing latency out of pipelines, hardening deployments with policy-as-code, and ensuring incidents resolve fast — with full observability from day one.",
    "At Capital One I engineered end-to-end CI/CD pipelines using GitHub Actions and Jenkins, deployed containerized workloads on Kubernetes and OpenShift, and cut AWS cloud spend by 28% through right-sizing and automated triggers.",
    "I approach problems by correlating signals — ELK logs, Dynatrace APM, SLO budget burn — and building frameworks that teams can operate confidently. Zero repeat incidents after sustained SLO/SLI work with RCA and full Blameless PIRs.",
  ],
  metrics: [
    {
      value: TOTAL_EXPERIENCE_YEARS,
      unit: "YEARS",
      label: "Production SRE & DevOps in regulated finance",
    },
    {
      value: "-38%",
      unit: "INCIDENTS",
      label: "Cut repeat production incidents via SLO/SLI & RCA",
    },
    {
      value: "-28%",
      unit: "AWS SPEND",
      label: "Reduced cloud cost via right-sizing & AI triggers",
    },
    {
      value: "15+",
      unit: "WORKLOADS",
      label: "Capital One workloads automated with CI/CD gates",
    },
  ],
}

export const HERO_CONFIG = {
  index: "SRE/01",
  discipline: "DevOps & Cloud",
  tagline: "Build it reliable",
  collection: ["Toronto", "Canada"] as [string, string],
  reel: ["Capital One · Accenture", `${TOTAL_EXPERIENCE_YEARS} Years Production SRE`] as [
    string,
    string,
  ],
  year: CURRENT_YEAR,
  initials: "RA",
  badge: "Hire me",
  line2: "Rahul Adepu",
  line3: "DevOps",
  word: "Work",
  verticalTag: "Cloud",
  bracketed: "S",
  seekingLabel: "Open for*",
  seeking: "SRE / Cloud",
  href: "#contact",
  services: ["Site Reliability", "AWS & K8s", "CI/CD & IaC", "Observability"],
  greetings: [
    "Hey, I'm Rahul Adepu!",
    "38% fewer repeat incidents via SLO/SLI & RCA.",
    "AWS · Kubernetes · Dynatrace · Terraform.",
    "Based in Toronto — let's build resilient systems!",
  ],
  skin: "#e3b28c",
  beanie: "#1d1d1f",
  shirt: "#18181a",
  tag: "#b98158",
  accent: "#5fb57a",
  paper: "#ebebea",
  ink: "#111111",
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cloud",
    title: "Cloud Platforms",
    description: "Multi-cloud infrastructure and managed services.",
    items: [
      { code: "AW", name: "AWS (EC2 / ECS / EKS / Lambda)", level: "strong", percent: 92 },
      { code: "CF", name: "CloudFormation", level: "strong", percent: 85 },
      { code: "AZ", name: "Azure", level: "comfortable", percent: 72 },
      { code: "GC", name: "GCP (in progress)", level: "comfortable", percent: 55 },
    ],
  },
  {
    id: "containers",
    title: "Containers & Orchestration",
    description: "Container lifecycle, deployment, and orchestration.",
    items: [
      { code: "DK", name: "Docker", level: "strong", percent: 92 },
      { code: "K8", name: "Kubernetes (EKS)", level: "strong", percent: 88 },
      { code: "OS", name: "OpenShift", level: "strong", percent: 80 },
      { code: "HM", name: "Helm", level: "strong", percent: 80 },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & IaC",
    description: "Pipeline automation and infrastructure-as-code.",
    items: [
      { code: "GH", name: "GitHub Actions", level: "strong", percent: 90 },
      { code: "TF", name: "Terraform", level: "strong", percent: 88 },
      { code: "JK", name: "Jenkins", level: "strong", percent: 85 },
      { code: "AN", name: "Ansible", level: "strong", percent: 80 },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    description: "Full-stack monitoring, logging, and APM.",
    items: [
      { code: "DY", name: "Dynatrace", level: "strong", percent: 88 },
      { code: "EK", name: "ELK / OpenSearch", level: "strong", percent: 85 },
      { code: "PG", name: "PagerDuty", level: "comfortable", percent: 75 },
      { code: "SP", name: "Splunk", level: "comfortable", percent: 72 },
    ],
  },
]

export const CREDENTIALS: CredentialItem[] = [
  {
    name: "Post-Graduate Certificate — Cloud Computing",
    org: "Loyalist College, Toronto",
    status: "completed",
    statusLabel: formatPeriod({ year: 2022, month: 5 }, { year: 2024, month: 9 }),
    kind: "education",
  },
  {
    name: "Bachelor of Engineering — Computer Engineering",
    org: "Vidyalankar Institute of Technology, India",
    status: "completed",
    statusLabel: formatPeriod({ year: 2017, month: 6 }, { year: 2021, month: 5 }),
    kind: "education",
  },
  {
    name: "ITIL Foundation",
    org: "Axelos / PeopleCert",
    status: "completed",
    statusLabel: "Completed",
    kind: "certification",
  },
  {
    name: "Azure Fundamentals (AZ-900)",
    org: "Microsoft",
    status: "in-progress",
    statusLabel: "In Progress",
    kind: "certification",
  },
  {
    name: "AWS Solutions Architect Professional",
    org: "Amazon Web Services",
    status: "planned",
    statusLabel: "Planned",
    kind: "certification",
  },
]
