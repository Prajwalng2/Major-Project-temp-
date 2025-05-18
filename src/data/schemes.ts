import { SchemeProps } from '../components/SchemeCard';

const schemes: SchemeProps[] = [
  {
    id: "pmjdy",
    title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    description: "Financial inclusion program that ensures access to financial services like banking, savings accounts, remittance, credit, insurance, and pension for all households in the country.",
    category: "finance",
    ministry: "Ministry of Finance",
    eligibility: {
      minAge: 10,
      maxAge: 65,
      states: ["all"],
    },
    eligibilityText: "Any Indian citizen above 10 years of age",
    isPopular: true,
    benefitAmount: "Overdraft facility up to ₹10,000",
    deadline: "Ongoing",
    launchDate: "August 28, 2014",
    documents: [
      "Aadhaar Card",
      "PAN Card (Optional)",
      "Identity Proof",
      "Address Proof"
    ],
    tags: ["Banking", "Financial"],
    applicationUrl: "https://www.pmjdy.gov.in/",
    fundingMinistry: "Ministry of Finance",
    implementingAgency: "Department of Financial Services",
    beneficiaries: "All Indian Citizens",
    objective: "Financial inclusion and universal banking access"
  },
  {
    id: "pmay",
    title: "Pradhan Mantri Awas Yojana (PMAY)",
    description: "Housing scheme that aims to provide housing for all in urban and rural areas by 2022 with a target of building 20 million affordable houses.",
    category: "housing",
    ministry: "Ministry of Housing and Urban Affairs",
    eligibility: {
      category: ["ews", "lig", "mig"],
      maxIncome: 1800000,
    },
    eligibilityText: "EWS, LIG, and MIG categories based on income",
    isPopular: true,
    benefitAmount: "₹1.5 to ₹2.67 lakh subsidy",
    deadline: "December 31, 2024",
    launchDate: "June 25, 2015",
    documents: [
      "Aadhaar Card",
      "Income Certificate",
      "Property Documents",
      "Bank Account Details"
    ],
    tags: ["Housing", "Urban Development"],
    applicationUrl: "https://pmaymis.gov.in/",
    state: "All States",
    implementingAgency: "State Housing Boards",
    beneficiaries: "Economically weaker sections and low income groups",
    objective: "Housing for all by 2022"
  },
  {
    id: "pmfby",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance scheme that aims to reduce the premium burden on farmers and ensure early settlement of crop assurance claims for the full insured sum.",
    category: "agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.",
    isPopular: true,
    benefitAmount: "Full insurance coverage for crop loss",
    deadline: "Varies by crop season",
    launchDate: "February 18, 2016",
    documents: [
      "Land Records",
      "Aadhaar Card",
      "Bank Account Details",
      "Crop Sowing Certificate"
    ],
    tags: ["Agriculture", "Insurance"],
    implementingAgency: "State Agriculture Departments",
    beneficiaries: "Farmers",
    objective: "Provide insurance coverage and financial support to farmers"
  },
  {
    id: "pmkisan",
    title: "PM Kisan Samman Nidhi Yojana",
    description: "Income support scheme that provides financial assistance to all small and marginal farmers across the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities.",
    category: "agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: "Small and Marginal farmers with cultivable landholding up to 2 hectares.",
    isPopular: true,
    benefitAmount: "₹6,000 per year in three installments",
    deadline: "Ongoing",
    launchDate: "February 24, 2019",
    documents: [
      "Aadhaar Card",
      "Land Records",
      "Bank Account Details"
    ],
    tags: ["Agriculture", "Financial Support"],
    implementingAgency: "Department of Agriculture, Cooperation & Farmers Welfare",
    beneficiaries: "Small and marginal farmers",
    objective: "Direct income support to farmers"
  },
  {
    id: "pmuy",
    title: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    description: "Scheme to provide clean cooking fuel to women in poor households to reduce health risks associated with using unclean cooking fuels and prevent deaths due to indoor pollution.",
    category: "social",
    ministry: "Ministry of Petroleum and Natural Gas",
    eligibility: {
      category: ["bpl", "antyodaya"],
      gender: ["female"],
    },
    eligibilityText: "Women from BPL households",
    benefitAmount: "Free LPG connection",
    deadline: "Ongoing",
    launchDate: "May 1, 2016",
    documents: [
      "Aadhaar Card",
      "BPL Ration Card",
      "Bank Account Details"
    ],
    tags: ["Energy", "Women Welfare"],
    implementingAgency: "Oil Marketing Companies",
    beneficiaries: "Women from BPL households",
    objective: "Provide clean cooking fuel to women in poor households"
  },
  {
    id: "sukanya",
    title: "Sukanya Samriddhi Yojana",
    description: "Small savings scheme for the girl child to encourage parents to build funds for future education and marriage expenses for their female child.",
    category: "finance",
    ministry: "Ministry of Finance",
    eligibility: {
      gender: ["female"],
      maxAge: 10,
    },
    eligibilityText: "Girls below the age of 10 years",
    benefitAmount: "Higher interest rate of 7.6% (tax-free)",
    deadline: "Ongoing",
    launchDate: "January 22, 2015",
    documents: [
      "Birth Certificate of Girl Child",
      "Identity Proof of Guardian",
      "Address Proof"
    ],
    tags: ["Financial", "Girl Child"],
    implementingAgency: "Department of Posts & Banks",
    beneficiaries: "Girl children below 10 years",
    objective: "Financial security for the girl child"
  },
  {
    id: "pmsby",
    title: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    description: "Accidental insurance scheme offering coverage for death or disability due to accident to eligible account holders of participating banks.",
    category: "finance",
    ministry: "Ministry of Finance",
    eligibility: {
      minAge: 18,
      maxAge: 70,
    },
    eligibilityText: "Any person between 18-70 years with a bank account",
    benefitAmount: "₹2 lakh for accidental death",
    deadline: "Annual renewal by May 31",
    launchDate: "May 9, 2015",
    documents: [
      "Bank Account",
      "KYC Documents"
    ],
    tags: ["Insurance", "Financial"],
    implementingAgency: "Public and Private Sector Insurance Companies",
    beneficiaries: "Bank account holders between ages 18-70",
    objective: "Provide affordable accidental insurance"
  },
  {
    id: "naps",
    title: "National Apprenticeship Promotion Scheme",
    description: "Scheme to promote apprenticeship training and increase the engagement of apprentices in establishments to provide skilled manpower to industry.",
    category: "employment",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    eligibility: {
      minAge: 14,
      maxAge: 40,
      education: ["8th pass", "10th pass", "12th pass", "ITI", "Diploma", "Graduate"],
    },
    eligibilityText: "Youth seeking skill training opportunities",
    benefitAmount: "Stipend support to apprentice",
    deadline: "Ongoing",
    launchDate: "August 19, 2016",
    documents: [
      "Educational Certificates",
      "Aadhaar Card",
      "Bank Account Details"
    ],
    tags: ["Skills", "Employment"],
    implementingAgency: "Directorate General of Training",
    beneficiaries: "Youth and industries",
    objective: "Promote apprenticeship training and create skilled workforce"
  },
  {
    id: "pmjjby",
    title: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    description: "Life insurance scheme offering coverage for death due to any reason to eligible account holders of participating banks.",
    category: "finance",
    ministry: "Ministry of Finance",
    eligibility: {
      minAge: 18,
      maxAge: 50,
    },
    eligibilityText: "Any person between 18-50 years with a bank account",
    benefitAmount: "₹2 lakh for death",
    deadline: "Annual renewal by May 31",
    launchDate: "May 9, 2015",
    documents: [
      "Bank Account",
      "KYC Documents",
      "Age Proof"
    ],
    tags: ["Insurance", "Financial"],
    implementingAgency: "LIC of India and other Insurance companies",
    beneficiaries: "Bank account holders between ages 18-50",
    objective: "Provide affordable life insurance"
  },
  {
    id: "pmegp",
    title: "Prime Minister's Employment Generation Program (PMEGP)",
    description: "Credit-linked subsidy program aimed at generating self-employment opportunities through establishment of micro-enterprises in the non-farm sector.",
    category: "employment",
    ministry: "Ministry of MSME",
    eligibility: {
      minAge: 18,
      education: ["8th pass"],
    },
    eligibilityText: "Individuals above 18 years with at least 8th pass qualification",
    benefitAmount: "Subsidy up to 35% (urban) and 25% (rural)",
    deadline: "Ongoing",
    launchDate: "August 15, 2008",
    documents: [
      "Identity Proof",
      "Address Proof",
      "Educational Qualification Certificate",
      "Project Report"
    ],
    tags: ["Self-employment", "MSME"],
    implementingAgency: "KVIC, State KVIC, District Industries Centers",
    beneficiaries: "Entrepreneurs and unemployed youth",
    objective: "Generate self-employment opportunities"
  },
  {
    id: "pmmy",
    title: "Pradhan Mantri MUDRA Yojana (PMMY)",
    description: "Scheme to provide loans up to 10 lakh to the non-corporate, non-farm small/micro enterprises for income generating activities in manufacturing, trading and services sectors.",
    category: "finance",
    ministry: "Ministry of Finance",
    eligibility: "Any Indian citizen with a business plan for non-farm income generating activities such as manufacturing, processing, trading or service sector activities.",
    isPopular: true,
    benefitAmount: "Loans up to ₹10 lakh in three categories: Shishu, Kishore, and Tarun",
    deadline: "Ongoing",
    launchDate: "April 8, 2015",
    documents: [
      "Identity Proof",
      "Address Proof",
      "Business Plan",
      "Bank Account Details"
    ],
    tags: ["Small Business", "Financial"],
    implementingAgency: "Banks, NBFCs and MFIs",
    beneficiaries: "Small/micro entrepreneurs",
    objective: "Promote entrepreneurship and provide funding to small businesses"
  },
  {
    id: "nsp",
    title: "National Scholarship Portal",
    description: "Single-window electronic platform for students to apply for various scholarships schemes launched by Central and State Governments.",
    category: "scholarship",
    ministry: "Ministry of Education",
    eligibility: "Students from minority communities, SC, ST, OBC, EWS, and students with disabilities based on respective scheme criteria.",
    eligibilityText: "Students meeting specific criteria by scholarship type",
    isPopular: true,
    benefitAmount: "Varies by scholarship type",
    deadline: "Varies by scheme",
    launchDate: "July 15, 2015",
    documents: [
      "Student ID/Registration",
      "Income Certificate",
      "Category Certificate",
      "Academic Records"
    ],
    tags: ["Education", "Scholarship"],
    applicationUrl: "https://scholarships.gov.in/",
    implementingAgency: "Department of Higher Education",
    beneficiaries: "Eligible students",
    objective: "Streamline scholarship application and disbursement process"
  },
  {
    id: "ayushman",
    title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)",
    description: "Health insurance scheme providing coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization to poor and vulnerable families.",
    category: "health",
    ministry: "Ministry of Health and Family Welfare",
    eligibility: "Families identified based on SECC database and belonging to poor and vulnerable categories.",
    eligibilityText: "Economically vulnerable families as per SECC data",
    isPopular: true,
    benefitAmount: "Health cover of ₹5 lakh per family per year",
    deadline: "Ongoing",
    launchDate: "September 23, 2018",
    documents: [
      "Aadhaar Card",
      "Ration Card",
      "Any Government ID"
    ],
    tags: ["Health", "Insurance"],
    applicationUrl: "https://pmjay.gov.in/",
    implementingAgency: "National Health Authority",
    beneficiaries: "10.74 crore poor and vulnerable families",
    objective: "Provide health insurance coverage to reduce catastrophic expenditure on healthcare"
  },
  {
    id: "pmkvy",
    title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    description: "Skill development initiative scheme that aims to enable Indian youth to take up industry-relevant skill training that will help them in securing a better livelihood.",
    category: "skills",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    eligibility: "Indian nationals who are school/college dropouts or unemployed.",
    eligibilityText: "Youth seeking skill training opportunities",
    isPopular: true,
    benefitAmount: "Free training and certification",
    deadline: "Ongoing",
    launchDate: "July 15, 2015",
    documents: [
      "Aadhaar Card",
      "Educational Certificates",
      "Bank Account Details"
    ],
    tags: ["Skills", "Employment"],
    applicationUrl: "https://www.pmkvyofficial.org/",
    implementingAgency: "National Skill Development Corporation",
    beneficiaries: "Youth seeking skill development",
    objective: "Increase workforce with certified skills"
  },
  {
    id: "pmgsy",
    title: "Pradhan Mantri Gram Sadak Yojana",
    description: "Rural road connectivity scheme that aims to provide all-weather road access to eligible unconnected habitations in rural areas.",
    category: "Infrastructure",
    ministry: "Ministry of Rural Development",
    deadline: "Ongoing",
    eligibility: "Rural habitations with population of 500+ in plain areas and 250+ in hill states",
    eligibilityText: "Rural habitations meeting population criteria",
    launchDate: "December 25, 2000",
    isPopular: true,
    benefitAmount: "Project-based funding",
    documents: [
      "Detailed Project Report",
      "Population Certificate",
      "Land Availability Certificate"
    ],
    tags: ["rural", "infrastructure"],
    applicationUrl: "https://pmgsy.nic.in/"
  },
  {
    id: "nrlm",
    title: "National Rural Livelihood Mission",
    description: "Poverty alleviation program focusing on promoting self-employment and organization of rural poor.",
    category: "Employment",
    ministry: "Ministry of Rural Development",
    deadline: "Ongoing",
    eligibility: {
      category: ["rural", "women", "shg"],
      maxIncome: 100000
    },
    eligibilityText: "Rural women from poor households",
    launchDate: "June 3, 2011",
    benefitAmount: "Up to ₹10 lakh for SHGs",
    documents: [
      "Identity Proof",
      "Income Certificate",
      "SHG Registration"
    ],
    tags: ["rural", "women empowerment"],
    applicationUrl: "https://aajeevika.gov.in/"
  },
  {
    id: "svamitva",
    title: "SVAMITVA Scheme",
    description: "Survey of villages and mapping with improvised technology in village areas to provide property cards to rural households.",
    category: "Rural Development",
    ministry: "Ministry of Panchayati Raj",
    deadline: "2024-12-31",
    eligibility: "Rural property owners",
    eligibilityText: "Property owners in rural areas",
    launchDate: "April 24, 2020",
    benefitAmount: "Property Card",
    documents: [
      "Aadhaar Card",
      "Existing Property Documents",
      "Residence Proof"
    ],
    tags: ["rural", "property"]
  },
  {
    id: "pgmsy",
    title: "Prime Minister's Garib Mangal Scheme Yojana",
    description: "Comprehensive welfare scheme for economically disadvantaged sections providing various benefits including healthcare and education support.",
    category: "Social Welfare",
    ministry: "Ministry of Social Justice and Empowerment",
    deadline: "Ongoing",
    eligibility: {
      maxIncome: 250000,
      category: ["bpl", "ews"]
    },
    eligibilityText: "BPL and EWS category families",
    launchDate: "January 15, 2023",
    benefitAmount: "Various benefits up to ₹2 lakh",
    documents: [
      "Income Certificate",
      "Caste Certificate",
      "BPL Card"
    ],
    tags: ["welfare", "poverty"]
  },
  {
    id: "pmshri",
    title: "PM Schools for Rising India",
    description: "Development of exemplar schools with modern infrastructure and focus on quality education, incorporating elements of NEP 2020.",
    category: "Education",
    ministry: "Ministry of Education",
    deadline: "2024-12-31",
    eligibility: "All students in selected schools",
    eligibilityText: "Students in PM SHRI schools",
    launchDate: "September 5, 2022",
    benefitAmount: "Quality education and infrastructure",
    documents: [
      "Previous Academic Records",
      "Residence Proof",
      "Transfer Certificate"
    ],
    tags: ["education", "infrastructure"]
  },
  {
    id: "pmmsy",
    title: "Pradhan Mantri Matsya Sampada Yojana",
    description: "Sustainable development of fisheries sector providing various benefits to fishers, fish farmers, and young entrepreneurs.",
    category: "Agriculture & Farming",
    ministry: "Ministry of Fisheries, Animal Husbandry & Dairying",
    deadline: "2024-03-31",
    eligibility: {
      category: ["fishers", "entrepreneurs"],
      maxAge: 60
    },
    eligibilityText: "Fishers and young entrepreneurs",
    launchDate: "May 20, 2020",
    benefitAmount: "Up to ₹50 lakh for projects",
    documents: [
      "Project Proposal",
      "Identity Proof",
      "Bank Account Details"
    ],
    tags: ["fisheries", "entrepreneurship"]
  },
  {
    id: "disha",
    title: "Digital Saksharta Abhiyan",
    description: "Digital literacy program aimed at making at least one person in every household digitally literate.",
    category: "Digital Literacy",
    ministry: "Ministry of Electronics & Information Technology",
    deadline: "Ongoing",
    eligibility: {
      minAge: 14,
      maxAge: 60,
      category: ["rural", "urban"]
    },
    eligibilityText: "Citizens aged 14-60 years",
    launchDate: "March 1, 2023",
    benefitAmount: "Free digital literacy training",
    documents: [
      "Aadhaar Card",
      "Age Proof",
      "Address Proof"
    ],
    tags: ["digital", "education"]
  },
  {
    id: "naps",
    title: "National Ayush Mission",
    description: "Promotion of AYUSH medical systems through cost-effective AYUSH services and strengthening of educational systems.",
    category: "Health",
    ministry: "Ministry of AYUSH",
    deadline: "Ongoing",
    eligibility: "All citizens",
    eligibilityText: "Available to all citizens",
    launchDate: "September 15, 2014",
    benefitAmount: "Varies by treatment",
    documents: [
      "Identity Proof",
      "Medical Records",
      "Income Certificate (optional)"
    ],
    tags: ["health", "ayush"]
  },
  {
    id: "startup",
    title: "Startup India Seed Fund Scheme",
    description: "Financial assistance to startups for proof of concept, prototype development, product trials, and market entry.",
    category: "entrepreneur",
    ministry: "Ministry of Commerce and Industry",
    deadline: "2024-12-31",
    eligibility: {
      maxAge: 7,
      category: ["startup"]
    },
    eligibilityText: "DPIIT recognized startups under 7 years",
    launchDate: "April 1, 2021",
    benefitAmount: "Up to ₹5 crore",
    documents: [
      "DPIIT Recognition Certificate",
      "Business Plan",
      "Company Registration"
    ],
    tags: ["startup", "innovation"]
  },
  {
    id: "gati",
    title: "PM Gati Shakti",
    description: "National Master Plan for Multi-modal Connectivity providing integrated and seamless connectivity for movement of people, goods and services.",
    category: "Infrastructure",
    ministry: "Ministry of Commerce and Industry",
    deadline: "Ongoing",
    eligibility: "Infrastructure projects",
    eligibilityText: "Infrastructure development projects",
    launchDate: "October 13, 2021",
    benefitAmount: "Project-based funding",
    documents: [
      "Detailed Project Report",
      "Environmental Clearance",
      "Land Acquisition Details"
    ],
    tags: ["infrastructure", "connectivity"]
  },
  {
    id: "jan-dhan-yojana",
    title: "Jan Dhan Yojana",
    description: "Financial inclusion program to ensure access to financial services, including banking, credit, insurance, pension in an affordable manner.",
    category: "finance",
    ministry: "Ministry of Finance",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      states: ["all"],
    },
    eligibilityText: "Any Indian citizen above 18 years of age",
    isPopular: false,
    benefitAmount: "Zero balance account with RuPay debit card",
    deadline: "Ongoing",
    launchDate: "August 28, 2014",
    documents: [
      "Aadhaar Card",
      "PAN Card (Optional)",
      "Address Proof"
    ],
    tags: ["Banking", "Financial Inclusion"],
    applicationUrl: "https://www.jandhanyojana.net/",
    fundingMinistry: "Ministry of Finance",
    implementingAgency: "Public Sector Banks",
    beneficiaries: "Low-income households",
    objective: "Universal banking access and financial inclusion"
  },
  {
    id: "kcc-scheme",
    title: "Kisan Credit Card Scheme",
    description: "Provides farmers with affordable credit for cultivation expenses and other needs, promoting timely access to credit.",
    category: "agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: "All farmers, tenant farmers, sharecroppers, self-help groups of farmers.",
    eligibilityText: "All farmers with land ownership or cultivation rights",
    isPopular: false,
    benefitAmount: "Credit limit based on land holding and crops grown",
    deadline: "Ongoing",
    launchDate: "August 1998",
    documents: [
      "Land Records",
      "Identity Proof",
      "Address Proof",
      "Passport-size Photograph"
    ],
    tags: ["Agriculture", "Credit"],
    applicationUrl: "https://pmkisan.gov.in/",
    fundingMinistry: "Ministry of Agriculture & Farmers Welfare",
    implementingAgency: "NABARD and Commercial Banks",
    beneficiaries: "Farmers",
    objective: "Provide adequate and timely credit to farmers"
  },
  {
    id: "ayushman-bharat-health-infra",
    title: "PM Ayushman Bharat Health Infrastructure Mission",
    description: "Aims to achieve the target of building an advanced healthcare system and infrastructure capable of responding to any future pandemic or health emergency.",
    category: "health",
    ministry: "Ministry of Health and Family Welfare",
    eligibility: "All citizens",
    eligibilityText: "Universal coverage",
    isPopular: true,
    benefitAmount: "Infrastructure development",
    deadline: "2025-12-31",
    launchDate: "October 25, 2021",
    documents: [],
    tags: ["Health", "Infrastructure"],
    fundingMinistry: "Ministry of Health and Family Welfare",
    implementingAgency: "National Health Authority",
    beneficiaries: "All citizens",
    objective: "Develop health infrastructure for future pandemic preparedness"
  },
  {
    id: "agnipath-scheme",
    title: "Agnipath Scheme",
    description: "A recruitment scheme for Indian youth to serve in the Armed Forces for a period of four years.",
    category: "employment",
    ministry: "Ministry of Defence",
    eligibility: {
      minAge: 17.5,
      maxAge: 23,
      category: ["general", "sc", "st", "obc"]
    },
    eligibilityText: "Indian youth between 17.5 and 23 years of age",
    isPopular: false,
    benefitAmount: "Monthly salary and Seva Nidhi package",
    deadline: "Annual recruitment",
    launchDate: "June 14, 2022",
    documents: [
      "Aadhaar Card",
      "Educational Certificates",
      "Birth Certificate",
      "Physical Fitness Certificate"
    ],
    tags: ["Defence", "Employment"],
    applicationUrl: "https://www.joinindianarmy.nic.in/",
    implementingAgency: "Indian Armed Forces",
    beneficiaries: "Youth seeking career in armed forces",
    objective: "Young, tech-savvy profile of armed forces"
  },
  {
    id: "ddugky",
    title: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
    description: "Placement linked skill development program for rural poor youth.",
    category: "skills",
    ministry: "Ministry of Rural Development",
    eligibility: {
      minAge: 15,
      maxAge: 35,
      category: ["rural", "bpl"]
    },
    eligibilityText: "Rural youth from poor families aged 15-35 years",
    isPopular: false,
    benefitAmount: "Free training, food and accommodation",
    deadline: "Ongoing",
    launchDate: "September 25, 2014",
    documents: [
      "Aadhaar Card",
      "BPL Certificate/Income Certificate",
      "Educational Certificates"
    ],
    tags: ["Skill Development", "Rural"],
    applicationUrl: "https://ddugky.gov.in/",
    fundingMinistry: "Ministry of Rural Development",
    implementingAgency: "State Rural Livelihood Missions",
    beneficiaries: "Rural poor youth",
    objective: "Skill rural youth for wage employment"
  },
  {
    id: "smart-cities-mission",
    title: "Smart Cities Mission",
    description: "Urban renewal and retrofitting program to develop smart cities across India that provide core infrastructure, quality life and sustainable environment.",
    category: "Infrastructure",
    ministry: "Ministry of Housing and Urban Affairs",
    eligibility: "Selected 100 cities across India",
    eligibilityText: "Residents of 100 selected cities",
    isPopular: false,
    benefitAmount: "Infrastructure development",
    deadline: "2023-06-30",
    launchDate: "June 25, 2015",
    documents: [],
    tags: ["Urban", "Infrastructure"],
    fundingMinistry: "Ministry of Housing and Urban Affairs",
    implementingAgency: "Special Purpose Vehicles in each city",
    beneficiaries: "Urban residents",
    objective: "Sustainable and inclusive development of cities"
  },
  {
    id: "national-rural-health-mission",
    title: "National Rural Health Mission",
    description: "Provides accessible, affordable, accountable, and reliable healthcare to the rural population, especially vulnerable groups.",
    category: "health",
    ministry: "Ministry of Health and Family Welfare",
    eligibility: "All rural citizens",
    eligibilityText: "All rural residents",
    isPopular: false,
    benefitAmount: "Free healthcare services",
    deadline: "Ongoing",
    launchDate: "April 12, 2005",
    documents: [
      "Health Card",
      "Aadhaar Card (Optional)",
      "Address Proof"
    ],
    tags: ["Health", "Rural"],
    implementingAgency: "State Health Departments",
    beneficiaries: "Rural population",
    objective: "Improve healthcare access in rural areas"
  },
  {
    id: "stand-up-india",
    title: "Stand-Up India Scheme",
    description: "Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one Scheduled Caste/Scheduled Tribe borrower and one woman borrower per bank branch for setting up greenfield enterprises.",
    category: "entrepreneur",
    ministry: "Ministry of Finance",
    eligibility: {
      category: ["sc", "st", "women"],
      minAge: 18
    },
    eligibilityText: "SC, ST, and Women entrepreneurs starting greenfield projects",
    isPopular: true,
    benefitAmount: "Bank loans between ₹10 lakh and ₹1 crore",
    deadline: "Ongoing",
    launchDate: "April 5, 2016",
    documents: [
      "Caste Certificate (for SC/ST)",
      "Identity Proof",
      "Address Proof",
      "Project Report"
    ],
    tags: ["entrepreneurship", "loans", "startup"],
    applicationUrl: "https://www.standupmitra.in/",
    implementingAgency: "SIDBI and NABARD",
    beneficiaries: "SC, ST, and Women entrepreneurs",
    objective: "Promote entrepreneurship among underprivileged sections of society"
  },
  {
    id: "pmegp",
    title: "Prime Minister's Employment Generation Programme",
    description: "Credit-linked subsidy program aimed at generating self-employment opportunities through establishment of micro-enterprises in non-farm sector.",
    category: "entrepreneur",
    ministry: "Ministry of MSME",
    eligibility: {
      minAge: 18,
      education: ["8th pass"],
      maxIncome: 300000
    },
    eligibilityText: "Individuals above 18 years with at least 8th pass qualification",
    isPopular: true,
    benefitAmount: "Subsidy up to 35% in urban and 25% in rural areas",
    deadline: "Ongoing",
    launchDate: "August 15, 2008",
    documents: [
      "Educational Qualification Certificate",
      "Income Certificate",
      "Project Report",
      "Caste Certificate (if applicable)"
    ],
    tags: ["self-employment", "micro-enterprise", "subsidy"],
    applicationUrl: "https://www.kviconline.gov.in/pmegp/pmegponlineform",
    implementingAgency: "KVIC, KVIB, and DICs",
    beneficiaries: "Individuals looking to start micro-enterprises",
    objective: "Generate employment opportunities in rural and urban areas"
  },
  {
    id: "mudra-yojana",
    title: "Pradhan Mantri MUDRA Yojana",
    description: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises for income generating activities across three categories: Shishu, Kishore, and Tarun.",
    category: "entrepreneur",
    ministry: "Ministry of Finance",
    eligibility: "Small business owners and entrepreneurs",
    eligibilityText: "Small/micro enterprises in non-farm sector",
    isPopular: true,
    benefitAmount: "Loans up to ₹10 lakh (Shishu: up to ₹50,000, Kishore: ₹50,001 to ₹5 lakh, Tarun: ₹5,00,001 to ₹10 lakh)",
    deadline: "Ongoing",
    launchDate: "April 8, 2015",
    documents: [
      "Identity Proof",
      "Address Proof",
      "Business Plan",
      "Proof of Business Existence"
    ],
    tags: ["micro-finance", "small business", "loans"],
    applicationUrl: "https://www.mudra.org.in/",
    implementingAgency: "Banks, MFIs, and NBFCs",
    beneficiaries: "Small business owners and entrepreneurs",
    objective: "Fund the unfunded micro enterprises in India"
  },
  {
    id: "seed-fund",
    title: "Startup India Seed Fund Scheme",
    description: "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
    category: "entrepreneur",
    ministry: "Ministry of Commerce and Industry",
    eligibility: {
      maxAge: 10,
      category: ["startup"]
    },
    eligibilityText: "DPIIT recognized startups not more than 10 years old",
    benefitAmount: "Up to ₹20 lakh for validation and up to ₹50 lakh for market entry",
    deadline: "Ongoing",
    launchDate: "April 1, 2021",
    documents: [
      "DPIIT Recognition Certificate",
      "Company Registration Certificate",
      "Pitch Deck",
      "Business Plan"
    ],
    tags: ["startup", "funding", "innovation"],
    applicationUrl: "https://seedfund.startupindia.gov.in/",
    implementingAgency: "Department for Promotion of Industry and Internal Trade",
    beneficiaries: "Early stage startups",
    objective: "Support startups through their initial stages of growth"
  },
  {
    id: "aspire",
    title: "ASPIRE - Scheme for Promotion of Innovation in Rural Industry",
    description: "Promotes innovation, entrepreneurship and agro-industry by setting up a network of Livelihood Business Incubators (LBI) and Technology Business Incubators (TBI).",
    category: "entrepreneur",
    ministry: "Ministry of MSME",
    eligibility: {
      category: ["rural", "entrepreneurs", "incubators"]
    },
    eligibilityText: "Rural entrepreneurs and incubation centers",
    benefitAmount: "Up to ₹1 crore for setting up business incubators",
    deadline: "Ongoing",
    launchDate: "March 18, 2015",
    documents: [
      "Project Proposal",
      "Organization Registration",
      "Land Ownership/Lease Documents"
    ],
    tags: ["rural industry", "incubation", "innovation"],
    applicationUrl: "https://aspire.msme.gov.in/",
    implementingAgency: "Ministry of MSME",
    beneficiaries: "Rural entrepreneurs and incubation centers",
    objective: "Set up network of technology and incubation centers to accelerate entrepreneurship"
  },
  {
    id: "women-entrepreneurship-platform",
    title: "Women Entrepreneurship Platform",
    description: "NITI Aayog initiative that brings together women from diverse backgrounds and offers them access to mentorship, learning resources, and funding support for business ventures.",
    category: "entrepreneur",
    ministry: "NITI Aayog",
    eligibility: {
      gender: ["female"],
      minAge: 18
    },
    eligibilityText: "Women entrepreneurs of all ages",
    benefitAmount: "Mentorship, incubation, and funding opportunities",
    deadline: "Ongoing",
    launchDate: "March 8, 2018",
    documents: [
      "Identity Proof",
      "Business Registration (if applicable)",
      "Business Plan"
    ],
    tags: ["women entrepreneurs", "mentorship", "capacity building"],
    applicationUrl: "https://wep.gov.in/",
    implementingAgency: "NITI Aayog",
    beneficiaries: "Women entrepreneurs and aspiring entrepreneurs",
    objective: "Foster women's entrepreneurship in India"
  },
  {
    id: "msme-innovative",
    title: "MSME Innovative Scheme",
    description: "Holistic approach to foster creativity, innovation, and entrepreneurship in MSMEs through incubation, design intervention, and intellectual property rights protection.",
    category: "entrepreneur",
    ministry: "Ministry of MSME",
    eligibility: "MSMEs registered under Udyam Registration",
    eligibilityText: "Registered MSMEs with innovative product/process ideas",
    benefitAmount: "Up to ₹15 lakh for design projects, up to ₹2.5 lakh for IP registration",
    deadline: "Ongoing",
    launchDate: "June 10, 2022",
    documents: [
      "MSME/Udyam Registration Certificate",
      "Project Proposal",
      "Patent/Design Application (if applicable)"
    ],
    tags: ["innovation", "intellectual property", "design"],
    applicationUrl: "https://innovation.msme.gov.in/",
    implementingAgency: "Office of Development Commissioner, MSME",
    beneficiaries: "Micro, small, and medium enterprises",
    objective: "Promote and support untapped creativity of MSMEs"
  },
  {
    id: "samridh",
    title: "SAMRIDH Acceleration Program",
    description: "Supports promising startups by providing funding up to ₹4 crore, mentorship, go-to-market strategies, and technical assistance to scale their business models.",
    category: "entrepreneur",
    ministry: "Ministry of Electronics & Information Technology",
    eligibility: {
      category: ["startup"],
      maxAge: 7
    },
    eligibilityText: "Technology startups with validated solutions ready to scale",
    benefitAmount: "Funding support up to ₹4 crore",
    deadline: "Ongoing",
    launchDate: "August 25, 2021",
    documents: [
      "Company Registration Certificate",
      "Pitch Deck",
      "Business Plan",
      "Financial Projections"
    ],
    tags: ["startup", "acceleration", "scaling"],
    applicationUrl: "https://meitystartuphub.in/samridh/",
    implementingAgency: "MeitY Startup Hub",
    beneficiaries: "Growth-stage technology startups",
    objective: "Create 300 startups with funding support to generate 1.5 lakh jobs"
  },
  {
    id: "digital-india-mission",
    title: "Digital India Mission",
    description: "Flagship program to transform India into a digitally empowered society and knowledge economy, focusing on digital infrastructure, governance, and services.",
    category: "digital",
    ministry: "Ministry of Electronics & Information Technology",
    eligibility: "All citizens and businesses",
    eligibilityText: "Open to all citizens, businesses, and government departments",
    isPopular: true,
    benefitAmount: "Digital infrastructure and services",
    deadline: "Ongoing",
    launchDate: "July 1, 2015",
    documents: [
      "Aadhaar Card",
      "PAN Card (for businesses)"
    ],
    tags: ["digital", "governance", "technology"],
    applicationUrl: "https://digitalindia.gov.in/",
    implementingAgency: "MeitY",
    beneficiaries: "All citizens and businesses",
    objective: "Transform India into a digitally empowered society"
  },
  {
    id: "digital-village",
    title: "Digital Village Program",
    description: "Initiative to transform rural India by leveraging digital technologies for empowerment, providing Wi-Fi hotspots, digital literacy, and e-services.",
    category: "digital",
    ministry: "Ministry of Electronics & Information Technology",
    eligibility: "Villages selected under the program",
    eligibilityText: "Rural villages selected based on population criteria",
    benefitAmount: "Digital infrastructure and training",
    deadline: "Ongoing",
    launchDate: "January 1, 2021",
    documents: [],
    tags: ["rural", "digital", "connectivity"],
    applicationUrl: "https://csc.gov.in/digitalvillage",
    implementingAgency: "Common Service Centres",
    beneficiaries: "Rural citizens",
    objective: "Bridge urban-rural digital divide"
  },
  {
    id: "digipay",
    title: "DigiPay Assistance Program",
    description: "Promotes digital payments through incentives, cashbacks and infrastructure support to merchants and consumers adopting digital payment methods.",
    category: "digital",
    ministry: "Ministry of Finance",
    eligibility: {
      category: ["merchants", "consumers"],
      maxIncome: 1000000
    },
    eligibilityText: "Small merchants and consumers",
    benefitAmount: "Cashbacks up to ₹1000 per month",
    deadline: "Ongoing",
    launchDate: "April 14, 2022",
    documents: [
      "Business Registration",
      "Bank Account Details",
      "GST Registration (optional)"
    ],
    tags: ["fintech", "digital payments", "cashless"],
    implementingAgency: "National Payments Corporation of India",
    beneficiaries: "Small merchants and consumers",
    objective: "Promote digital transactions nationwide"
  },
  {
    id: "bharat-net",
    title: "BharatNet Broadband Initiative",
    description: "National optical fiber network providing high-speed broadband connectivity to all Gram Panchayats for improved e-governance and digital services delivery.",
    category: "digital",
    ministry: "Ministry of Communications",
    eligibility: "Gram Panchayats across India",
    eligibilityText: "All Gram Panchayats in India",
    benefitAmount: "High-speed internet connectivity",
    deadline: "Ongoing",
    launchDate: "October 25, 2011",
    documents: [],
    tags: ["broadband", "connectivity", "rural development"],
    applicationUrl: "https://bbnl.nic.in/",
    implementingAgency: "Bharat Broadband Network Limited",
    beneficiaries: "Rural citizens",
    objective: "Connect all 2.5 lakh Gram Panchayats with broadband"
  },
  {
    id: "digital-literacy-mission",
    title: "National Digital Literacy Mission",
    description: "Initiative to impart digital literacy to 6 crore rural households by teaching skills like operating digital devices, internet browsing, email, and digital payments.",
    category: "digital",
    ministry: "Ministry of Electronics & Information Technology",
    eligibility: {
      minAge: 14,
      category: ["rural", "urban", "underprivileged"]
    },
    eligibilityText: "One person per eligible household aged 14-60 years",
    benefitAmount: "Free digital literacy training",
    deadline: "Ongoing",
    launchDate: "March 21, 2018",
    documents: [
      "Aadhaar Card",
      "Address Proof"
    ],
    tags: ["education", "skill development", "digital literacy"],
    applicationUrl: "https://www.pmgdisha.in/",
    implementingAgency: "CSC e-Governance Services India Limited",
    beneficiaries: "Rural households",
    objective: "Make at least one person in every family digitally literate"
  },
  {
    id: "cyber-suraksha",
    title: "Cyber Suraksha Program",
    description: "Comprehensive cybersecurity awareness and protection program offering resources, tools and insurance for citizens and small businesses against cyber threats.",
    category: "digital",
    ministry: "Ministry of Electronics & Information Technology",
    eligibility: "All citizens and registered MSMEs",
    eligibilityText: "Open to all citizens and registered MSMEs",
    benefitAmount: "Cybersecurity tools and insurance coverage up to ₹5 lakh",
    deadline: "Ongoing",
    launchDate: "February 21, 2023",
    documents: [
      "Identity Proof",
      "Business Registration (for MSMEs)"
    ],
    tags: ["cybersecurity", "digital protection", "insurance"],
    implementingAgency: "Indian Computer Emergency Response Team",
    beneficiaries: "Citizens and small businesses",
    objective: "Create a secure digital environment for citizens and businesses"
  },
];

export default schemes;
