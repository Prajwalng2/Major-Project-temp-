import { SchemeProps } from "@/components/SchemeCard";
import allSchemes from "@/data/schemes"; // Import the schemes directly

export interface UserProfile {
  age?: number;
  gender?: string;
  income?: number;
  location?: string;
  category?: string[];
  occupation?: string;
  education?: string;
  interests?: string[];
  maritalStatus?: string;
  disabilities?: string[];
  familySize?: number;
  employmentStatus?: string;
  techLiteracy?: string;
  preferredLanguage?: string;
  ruralOrUrban?: string;
  householdIncome?: number;
  educationLevel?: string;
  skillLevel?: string[];
  industrySector?: string;
  ownsBusiness?: boolean;
  hasLand?: boolean;
  landSize?: number;
}

export interface MatchingFactor {
  factor: string;
  description: string;
  weight: number;
}

export interface MatchedScheme {
  scheme: SchemeProps;
  score: number;
  matchingFactors: MatchingFactor[];
}

export type SchemeMatch = MatchedScheme;

// Enhanced matching algorithm with more complex relevancy scoring
const calculateMatchScore = (scheme: SchemeProps, profile: UserProfile): MatchedScheme => {
  let score = 0;
  const matchingFactors: MatchingFactor[] = [];
  let totalPossibleScore = 0; // Track maximum possible score for normalization

  // Helper functions
  const addMatchingFactor = (factor: string, description: string, weight: number) => {
    score += weight;
    matchingFactors.push({ factor, description, weight });
  };

  // Parse eligibility if it's a string representation of an object
  let eligibility = scheme.eligibility;
  if (typeof eligibility === 'string' && eligibility.startsWith('{')) {
    try {
      eligibility = JSON.parse(eligibility);
    } catch (e) {
      // Keep as string if parsing fails
    }
  }

  // Category matching (highest priority)
  if (profile.category && profile.category.length > 0) {
    totalPossibleScore += 25;
    const lowerCategory = scheme.category.toLowerCase();
    for (const cat of profile.category) {
      if (lowerCategory === cat.toLowerCase()) {
        addMatchingFactor(
          "Category", 
          `You selected ${cat} as an area of interest`, 
          25
        );
        break;
      }
    }
  }

  // Gender-specific matching
  if (profile.gender) {
    totalPossibleScore += 20;
    // Check eligibility object
    if (typeof eligibility === 'object' && eligibility !== null && 'gender' in eligibility) {
      const eligibleGenders = eligibility.gender;
      if (Array.isArray(eligibleGenders) && eligibleGenders.includes(profile.gender.toLowerCase())) {
        addMatchingFactor(
          "Gender Eligibility", 
          `This scheme is designed for ${profile.gender} applicants`, 
          20
        );
      }
    } 
    // Check description and title for gender keywords
    else {
      const gender = profile.gender.toLowerCase();
      const lowerTitle = scheme.title.toLowerCase();
      const lowerDesc = scheme.description.toLowerCase();
      const eligibilityText = typeof scheme.eligibilityText === 'string' ? scheme.eligibilityText.toLowerCase() : '';
      
      if (gender === 'female' || gender === 'woman' || gender === 'women') {
        if (
          lowerTitle.includes('women') || 
          lowerTitle.includes('female') || 
          lowerTitle.includes('girl') ||
          lowerDesc.includes('women') || 
          lowerDesc.includes('female') || 
          lowerDesc.includes('girl') ||
          eligibilityText.includes('women') || 
          eligibilityText.includes('female') ||
          eligibilityText.includes('girl')
        ) {
          addMatchingFactor(
            "Women-Focused", 
            "This scheme specifically benefits women/girls", 
            20
          );
        }
      }
      else if (gender === 'male' || gender === 'man' || gender === 'men') {
        if (
          lowerTitle.includes('men') || 
          lowerTitle.includes('male') || 
          lowerTitle.includes('boy') ||
          lowerDesc.includes('men') || 
          lowerDesc.includes('male') || 
          lowerDesc.includes('boy') ||
          eligibilityText.includes('men') || 
          eligibilityText.includes('male') ||
          eligibilityText.includes('boy')
        ) {
          addMatchingFactor(
            "Men-Focused", 
            "This scheme specifically benefits men/boys", 
            20
          );
        }
      }
    }
  }

  // Age eligibility
  if (typeof profile.age === 'number') {
    totalPossibleScore += 15;
    // Check eligibility object for age criteria
    if (typeof eligibility === 'object' && eligibility !== null) {
      const minAge = eligibility.minAge as number | undefined;
      const maxAge = eligibility.maxAge as number | undefined;
      
      if (minAge !== undefined && maxAge !== undefined) {
        if (profile.age >= minAge && profile.age <= maxAge) {
          addMatchingFactor(
            "Age Eligibility", 
            `Your age (${profile.age}) is within the eligible range of ${minAge}-${maxAge} years`, 
            15
          );
        }
      } 
      else if (minAge !== undefined) {
        if (profile.age >= minAge) {
          addMatchingFactor(
            "Age Eligibility", 
            `You meet the minimum age requirement of ${minAge} years`, 
            10
          );
        }
      } 
      else if (maxAge !== undefined) {
        if (profile.age <= maxAge) {
          addMatchingFactor(
            "Age Eligibility", 
            `You meet the maximum age requirement of ${maxAge} years`, 
            10
          );
        }
      }
    }
    
    // Text-based age matching
    if (typeof scheme.eligibilityText === 'string') {
      const ageText = scheme.eligibilityText.toLowerCase();
      
      // Check for senior citizens mentions
      if (profile.age >= 60 && (
        ageText.includes('senior') || 
        ageText.includes('elderly') || 
        ageText.includes('old age') || 
        ageText.includes('above 60')
      )) {
        addMatchingFactor(
          "Senior Citizen", 
          "This scheme is targeted at senior citizens", 
          15
        );
      }
      
      // Check for youth mentions
      if (profile.age <= 35 && (
        ageText.includes('youth') || 
        ageText.includes('young') || 
        ageText.includes('below 35') ||
        ageText.includes('under 35')
      )) {
        addMatchingFactor(
          "Youth Focused", 
          "This scheme is targeted at young citizens", 
          15
        );
      }
      
      // Check for children mentions
      if (profile.age < 18 && (
        ageText.includes('child') || 
        ageText.includes('minor') || 
        ageText.includes('below 18') ||
        ageText.includes('under 18')
      )) {
        addMatchingFactor(
          "Child Focused", 
          "This scheme is targeted at children", 
          15
        );
      }
    }
  }

  // Income eligibility
  if (typeof profile.income === 'number') {
    totalPossibleScore += 15;
    // Check eligibility object
    if (typeof eligibility === 'object' && eligibility !== null && 'maxIncome' in eligibility) {
      const maxIncome = eligibility.maxIncome as number | undefined;
      if (maxIncome !== undefined && profile.income <= maxIncome) {
        addMatchingFactor(
          "Income Eligibility", 
          `Your income is below the maximum limit of ₹${maxIncome.toLocaleString()}`, 
          15
        );
      }
    }
    
    // Check for BPL (Below Poverty Line) mentions
    if (profile.income < 100000) { // Assuming BPL income threshold
      if (
        scheme.eligibilityText?.toLowerCase().includes('bpl') ||
        scheme.eligibilityText?.toLowerCase().includes('below poverty line') ||
        scheme.description?.toLowerCase().includes('bpl') ||
        scheme.description?.toLowerCase().includes('below poverty line')
      ) {
        addMatchingFactor(
          "BPL Eligibility", 
          "This scheme is targeted at BPL families", 
          15
        );
      }
    }
  }

  // Location/state matching
  if (profile.location) {
    totalPossibleScore += 15;
    const userLocation = profile.location.toLowerCase();
    
    if (scheme.state) {
      const schemeState = scheme.state.toLowerCase();
      
      if (schemeState === 'all' || schemeState === 'all states' || schemeState === 'pan india') {
        addMatchingFactor(
          "Geographic Coverage", 
          "This scheme is available across India", 
          10
        );
      }
      else if (schemeState === userLocation) {
        addMatchingFactor(
          "State-Specific", 
          `This scheme is specifically for residents of ${profile.location}`, 
          15
        );
      }
    }
    
    // Check for regional keywords
    const northeastStates = ['assam', 'arunachal pradesh', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'sikkim', 'tripura'];
    const hillStates = ['himachal pradesh', 'uttarakhand', 'jammu and kashmir', 'ladakh'];
    
    if (northeastStates.includes(userLocation) && (
      scheme.description?.toLowerCase().includes('north east') || 
      scheme.description?.toLowerCase().includes('north-east') || 
      scheme.description?.toLowerCase().includes('northeast') ||
      scheme.eligibilityText?.toLowerCase().includes('north east') || 
      scheme.eligibilityText?.toLowerCase().includes('north-east') || 
      scheme.eligibilityText?.toLowerCase().includes('northeast')
    )) {
      addMatchingFactor(
        "North East Region", 
        "This scheme has special provisions for North East states", 
        15
      );
    }
    
    if (hillStates.includes(userLocation) && (
      scheme.description?.toLowerCase().includes('hill') || 
      scheme.description?.toLowerCase().includes('mountain') ||
      scheme.eligibilityText?.toLowerCase().includes('hill') || 
      scheme.eligibilityText?.toLowerCase().includes('mountain')
    )) {
      addMatchingFactor(
        "Hill/Mountain Region", 
        "This scheme has special provisions for hill/mountain states", 
        15
      );
    }
  }

  // Occupation matching
  if (profile.occupation) {
    totalPossibleScore += 20;
    const occupation = profile.occupation.toLowerCase();
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    // Farmer matching
    if ((occupation.includes('farm') || occupation.includes('agricultur')) && 
       (eligibilityText.includes('farm') || description.includes('farm') || 
        eligibilityText.includes('agricultur') || description.includes('agricultur'))) {
      addMatchingFactor(
        "Occupation", 
        "This scheme is relevant to farmers/agricultural workers", 
        20
      );
    }
    
    // Student matching
    if ((occupation.includes('student') || occupation.includes('study')) && 
       (eligibilityText.includes('student') || description.includes('student') || 
        eligibilityText.includes('education') || description.includes('education'))) {
      addMatchingFactor(
        "Occupation", 
        "This scheme is relevant to students or education", 
        20
      );
    }
    
    // Entrepreneur matching
    if ((occupation.includes('business') || occupation.includes('entrepreneur') || 
         occupation.includes('self-employed') || occupation.includes('startup')) && 
       (eligibilityText.includes('business') || description.includes('business') || 
        eligibilityText.includes('entrepreneur') || description.includes('entrepreneur') ||
        eligibilityText.includes('startup') || description.includes('startup') ||
        eligibilityText.includes('self-employed') || description.includes('self-employed'))) {
      addMatchingFactor(
        "Occupation", 
        "This scheme is relevant to entrepreneurs/business owners", 
        20
      );
    }
    
    // General occupation matching
    if (eligibilityText.includes(occupation) || description.includes(occupation)) {
      addMatchingFactor(
        "Occupation", 
        `This scheme is relevant to your occupation (${profile.occupation})`, 
        15
      );
    }
  }

  // Education level matching
  if (profile.education) {
    totalPossibleScore += 15;
    const education = profile.education.toLowerCase();
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    // Check if eligibility object has education criteria
    if (typeof eligibility === 'object' && eligibility !== null && 'education' in eligibility) {
      const eligibleEducation = eligibility.education;
      if (Array.isArray(eligibleEducation) && 
          eligibleEducation.some(edu => education.includes(edu.toLowerCase()))) {
        addMatchingFactor(
          "Education Level", 
          `Your education level matches the eligibility criteria`, 
          10
        );
      }
    }
    
    // Text-based education matching
    if (eligibilityText.includes(education) || description.includes(education)) {
      addMatchingFactor(
        "Education Level", 
        `This scheme is relevant to your education level (${profile.education})`, 
        10
      );
    }
  }

  // Marital Status matching (new)
  if (profile.maritalStatus) {
    totalPossibleScore += 15;
    const maritalStatus = profile.maritalStatus.toLowerCase();
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    // Look for specific marital status mentions
    const maritalStatusKeywords = {
      'single': ['single', 'unmarried', 'bachelor'],
      'married': ['married', 'spouse', 'husband', 'wife'],
      'divorced': ['divorced', 'divorcee', 'separated'],
      'widowed': ['widow', 'widower', 'widowed']
    };
    
    const userStatusKeywords = maritalStatusKeywords[maritalStatus as keyof typeof maritalStatusKeywords] || [];
    
    for (const keyword of userStatusKeywords) {
      if (eligibilityText.includes(keyword) || description.includes(keyword)) {
        addMatchingFactor(
          "Marital Status", 
          `This scheme is relevant to your marital status (${profile.maritalStatus})`, 
          15
        );
        break;
      }
    }
  }
  
  // Disabilities matching (new)
  if (profile.disabilities && profile.disabilities.length > 0) {
    totalPossibleScore += 20;
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    const disabilityKeywords = [
      'disability', 'disabled', 'handicapped', 'differently abled', 
      'special needs', 'pwd', 'persons with disabilities'
    ];
    
    // Check if the scheme mentions disabilities in general
    const hasDisabilityMention = disabilityKeywords.some(keyword => 
      eligibilityText.includes(keyword) || description.includes(keyword)
    );
    
    if (hasDisabilityMention) {
      addMatchingFactor(
        "Disability Support", 
        "This scheme offers support for persons with disabilities", 
        20
      );
    }
    
    // Check for specific disabilities mentioned by user
    for (const disability of profile.disabilities) {
      const lowerDisability = disability.toLowerCase();
      if (eligibilityText.includes(lowerDisability) || description.includes(lowerDisability)) {
        addMatchingFactor(
          "Specific Disability Support", 
          `This scheme specifically mentions support for ${disability}`, 
          20
        );
        break; // Only add once
      }
    }
  }
  
  // Rural/Urban location matching (new)
  if (profile.ruralOrUrban) {
    totalPossibleScore += 15;
    const locationPreference = profile.ruralOrUrban.toLowerCase();
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    if (locationPreference === 'rural' && 
        (eligibilityText.includes('rural') || 
         description.includes('rural') || 
         description.includes('village'))) {
      addMatchingFactor(
        "Rural Focus", 
        "This scheme is focused on rural areas", 
        15
      );
    } else if (locationPreference === 'urban' && 
              (eligibilityText.includes('urban') || 
               description.includes('urban') || 
               description.includes('city'))) {
      addMatchingFactor(
        "Urban Focus", 
        "This scheme is focused on urban areas", 
        15
      );
    }
  }
  
  // Employment status matching (new)
  if (profile.employmentStatus) {
    totalPossibleScore += 15;
    const empStatus = profile.employmentStatus.toLowerCase();
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    // Unemployed matching
    if (empStatus === 'unemployed' && 
        (eligibilityText.includes('unemployed') || 
         description.includes('unemployed') ||
         eligibilityText.includes('jobless') || 
         description.includes('jobless'))) {
      addMatchingFactor(
        "Employment Status", 
        "This scheme targets unemployed individuals", 
        15
      );
    }
    
    // Self-employed matching
    if (empStatus === 'self-employed' && 
        (eligibilityText.includes('self-employed') || 
         description.includes('self-employed') ||
         eligibilityText.includes('entrepreneur') || 
         description.includes('entrepreneur'))) {
      addMatchingFactor(
        "Employment Status", 
        "This scheme targets self-employed individuals", 
        15
      );
    }
    
    // Part-time employed matching
    if (empStatus === 'part-time' && 
        (eligibilityText.includes('part-time') || 
         description.includes('part-time') ||
         eligibilityText.includes('part time') || 
         description.includes('part time'))) {
      addMatchingFactor(
        "Employment Status", 
        "This scheme may be suitable for part-time workers", 
        15
      );
    }
  }

  // Family size matching (new)
  if (typeof profile.familySize === 'number') {
    totalPossibleScore += 10;
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    // Check for large family mentions
    if (profile.familySize >= 5 && 
        (eligibilityText.includes('large family') || 
         description.includes('large family') ||
         eligibilityText.includes('big family') || 
         description.includes('big family'))) {
      addMatchingFactor(
        "Family Size", 
        "This scheme may offer additional benefits for large families", 
        10
      );
    }
  }
  
  // Land ownership matching (new)
  if (profile.hasLand !== undefined) {
    totalPossibleScore += 15;
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    if (profile.hasLand && 
        (eligibilityText.includes('land owner') || 
         description.includes('land owner') ||
         eligibilityText.includes('landowner') || 
         description.includes('landowner'))) {
      addMatchingFactor(
        "Land Ownership", 
        "This scheme targets land owners", 
        15
      );
    }
    
    if (!profile.hasLand && 
        (eligibilityText.includes('landless') || 
         description.includes('landless'))) {
      addMatchingFactor(
        "Landless", 
        "This scheme targets landless individuals", 
        15
      );
    }
    
    // Land size matching
    if (profile.hasLand && typeof profile.landSize === 'number') {
      // Check for small holding farmers
      if (profile.landSize < 2 && 
          (eligibilityText.includes('small farmer') || 
           description.includes('small farmer') ||
           eligibilityText.includes('marginal farmer') || 
           description.includes('marginal farmer'))) {
        addMatchingFactor(
          "Small Land Holding", 
          "This scheme targets small or marginal farmers", 
          15
        );
      }
    }
  }

  // Interests matching with tags and description
  if (profile.interests && profile.interests.length > 0 && scheme.tags && scheme.tags.length > 0) {
    const possibleScore = profile.interests.length * 10;
    totalPossibleScore += possibleScore;
    
    const matchingInterests = profile.interests.filter(interest => 
      scheme.tags!.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
    );
    
    if (matchingInterests.length > 0) {
      addMatchingFactor(
        "Interests", 
        `Matches your interest${matchingInterests.length > 1 ? 's' : ''} in ${matchingInterests.join(', ')}`, 
        10 * matchingInterests.length
      );
    }
    
    // Also check description for interests
    for (const interest of profile.interests) {
      if (scheme.description.toLowerCase().includes(interest.toLowerCase())) {
        addMatchingFactor(
          "Related Content", 
          `This scheme content relates to your interest in ${interest}`, 
          5
        );
        break; // Only add this factor once
      }
    }
  }
  
  // Industry sector matching (new)
  if (profile.industrySector) {
    totalPossibleScore += 15;
    const sector = profile.industrySector.toLowerCase();
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    if (eligibilityText.includes(sector) || description.includes(sector)) {
      addMatchingFactor(
        "Industry Sector", 
        `This scheme is relevant to your industry (${profile.industrySector})`, 
        15
      );
    }
  }
  
  // Skills matching (new)
  if (profile.skillLevel && profile.skillLevel.length > 0) {
    totalPossibleScore += 15;
    const eligibilityText = scheme.eligibilityText?.toLowerCase() || '';
    const description = scheme.description.toLowerCase();
    
    for (const skill of profile.skillLevel) {
      const lowerSkill = skill.toLowerCase();
      if (eligibilityText.includes(lowerSkill) || description.includes(lowerSkill)) {
        addMatchingFactor(
          "Skills Match", 
          `This scheme is relevant to your skill in ${skill}`, 
          15
        );
        break; // Only add once
      }
    }
  }

  // Popular scheme bonus
  if (scheme.isPopular) {
    totalPossibleScore += 5;
    addMatchingFactor(
      "Popular Scheme", 
      "This is a widely-used government scheme", 
      5
    );
  }

  // Calculate normalized percentage score (0-100)
  // Ensure we have some possible score to avoid division by zero
  const normalizedScore = totalPossibleScore > 0 
    ? Math.min(Math.round((score / totalPossibleScore) * 100), 100) 
    : 0;

  // Return the result with sorted factors (highest weight first)
  return {
    scheme,
    score: normalizedScore,
    matchingFactors: matchingFactors.sort((a, b) => b.weight - a.weight)
  };
};

export const matchSchemesToProfile = (schemes: SchemeProps[], profile: UserProfile): MatchedScheme[] => {
  // Calculate match scores for all schemes
  const matches = schemes.map(scheme => calculateMatchScore(scheme, profile));
  
  // Sort by score (highest first)
  return matches.sort((a, b) => b.score - a.score);
};

// Fixed function that's being imported in SchemeMatcherResults.tsx
// No longer using require() which was causing the runtime error
export const matchSchemesToUser = (profile: UserProfile): MatchedScheme[] => {
  // Use the imported schemes directly instead of require()
  return matchSchemesToProfile(allSchemes, profile);
};

// Function to get scheme recommendations based on a specific scheme
export const getRelatedSchemes = (
  currentScheme: SchemeProps,
  allSchemes: SchemeProps[],
  limit: number = 3
): SchemeProps[] => {
  // Remove the current scheme from consideration
  const otherSchemes = allSchemes.filter(s => s.id !== currentScheme.id);
  
  // Score schemes based on similarity to current scheme
  const scoredSchemes = otherSchemes.map(scheme => {
    let score = 0;
    
    // Same category is a strong signal
    if (scheme.category === currentScheme.category) {
      score += 10;
    }
    
    // Same ministry is a medium signal
    if (scheme.ministry === currentScheme.ministry) {
      score += 5;
    }
    
    // Tag overlap
    if (scheme.tags && currentScheme.tags) {
      const schemeTags = Array.isArray(scheme.tags) ? scheme.tags : [];
      const currentTags = Array.isArray(currentScheme.tags) ? currentScheme.tags : [];
      
      const commonTags = schemeTags.filter(tag => 
        currentTags.includes(tag)
      );
      
      score += commonTags.length * 3;
    }
    
    // Semantic similarity in title and description
    const calculateTextSimilarity = (text1: string, text2: string): number => {
      const words1 = text1.toLowerCase().split(/\W+/).filter(w => w.length > 2);
      const words2 = text2.toLowerCase().split(/\W+/).filter(w => w.length > 2);
      
      const commonWords = words1.filter(w => words2.includes(w));
      return commonWords.length / Math.max(words1.length, words2.length, 1);
    };
    
    const titleSimilarity = calculateTextSimilarity(scheme.title, currentScheme.title);
    const descSimilarity = calculateTextSimilarity(scheme.description, currentScheme.description);
    
    score += titleSimilarity * 7;
    score += descSimilarity * 5;
    
    return { scheme, score };
  });
  
  // Sort by score and take top results
  return scoredSchemes
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.scheme);
};
