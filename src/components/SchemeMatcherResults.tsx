
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SchemeCard from "@/components/SchemeCard";
import { matchSchemesToUser, UserProfile, MatchedScheme } from "@/utils/schemeMatcher";

const SchemeMatcherResults = () => {
  const navigate = useNavigate();
  const [matchedSchemes, setMatchedSchemes] = useState<MatchedScheme[]>([]);
  const [displayedSchemes, setDisplayedSchemes] = useState<MatchedScheme[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>("relevance");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Expanded categories array
  const categories = ["all", "agriculture", "education", "health", "finance", "housing", "social", 
                     "employment", "digital", "entrepreneur", "skills", "scholarship"];
  
  useEffect(() => {
    // Performance tracking
    const startTime = performance.now();
    
    // Retrieve user profile data from session storage
    const storedData = sessionStorage.getItem("schemeMatcherData");
    
    if (!storedData) {
      // If no data, redirect to the form
      navigate("/scheme-matcher");
      return;
    }
    
    try {
      const userData = JSON.parse(storedData) as UserProfile;
      setUserProfile(userData);
      
      // Use immediate function execution for faster loading
      const processMatches = () => {
        try {
          const matched = matchSchemesToUser(userData);
          
          // Cache results to avoid recalculation
          setMatchedSchemes(matched);
          setDisplayedSchemes(matched);
          setIsLoading(false);
          
          const elapsed = performance.now() - startTime;
          console.log(`Matching completed in ${elapsed.toFixed(2)}ms with ${matched.length} results`);
        } catch (error) {
          console.error("Error in scheme matching:", error);
          setIsLoading(false);
        }
      };
      
      // Process immediately without requestAnimationFrame for faster results
      processMatches();
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/scheme-matcher");
    }
  }, [navigate]);
  
  // Optimized filtering with memoized calculation
  // This is separated from the render cycle for performance
  useEffect(() => {
    if (matchedSchemes.length === 0) return;
    
    // Start performance measurement
    const filterStartTime = performance.now();
    
    // Use higher-performance filtering approach
    const applyFilters = () => {
      // Start with full array
      const filtered = [...matchedSchemes];
      
      // Apply category filter if needed
      const categoryFiltered = categoryFilter !== "all" 
        ? filtered.filter(item => item.scheme.category.toLowerCase() === categoryFilter)
        : filtered;
      
      // Apply sorting - optimized for performance
      let sorted = categoryFiltered;
      
      if (sortOption === "newest") {
        // Pre-calculate dates once for performance
        sorted = categoryFiltered.slice().sort((a, b) => {
          const dateA = a.scheme.launchDate ? new Date(a.scheme.launchDate).getTime() : 0;
          const dateB = b.scheme.launchDate ? new Date(b.scheme.launchDate).getTime() : 0;
          return dateB - dateA;
        });
      } 
      else if (sortOption === "deadline") {
        // Pre-calculate dates once for performance
        sorted = categoryFiltered.slice().sort((a, b) => {
          const dateA = a.scheme.deadline ? new Date(a.scheme.deadline).getTime() : 9999999999999;
          const dateB = b.scheme.deadline ? new Date(b.scheme.deadline).getTime() : 9999999999999;
          return dateA - dateB;
        });
      }
      
      setDisplayedSchemes(sorted);
      
      // Log performance metrics
      console.log(`Filter/sort completed in ${performance.now() - filterStartTime}ms`);
    };
    
    // Execute directly for immediate results
    applyFilters();
  }, [matchedSchemes, sortOption, categoryFilter]);
  
  const handleBack = () => {
    navigate("/scheme-matcher");
  };

  const handleFindMoreSchemes = () => {
    navigate("/scheme-matcher");
  };
  
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-scheme-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-scheme-primary mb-2">Finding Schemes For You</h2>
          <p className="text-gray-600">Analyzing your profile to match you with the best government schemes...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mb-2 pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-scheme-primary">
            Schemes Matched For You
          </h1>
          <p className="text-gray-600 mt-1">
            Found {displayedSchemes.length} schemes matching your profile
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={handleFindMoreSchemes}
            className="whitespace-nowrap"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Find More Schemes
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center w-full md:w-auto">
            <SlidersHorizontal className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium">Refine Results</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-1">
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="deadline">Upcoming Deadlines</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {displayedSchemes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No matching schemes found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or updating your profile information.
          </p>
          <Button onClick={handleFindMoreSchemes}>
            Update Your Profile
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSchemes.map((matchedScheme, index) => (
            <motion.div
              key={matchedScheme.scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }} // Cap delay to improve perceived speed
            >
              <div className="relative h-full">
                <div className={`absolute top-0 right-0 z-10 px-2 py-1 rounded-tr-lg rounded-bl-lg text-white text-xs font-bold
                  ${matchedScheme.score >= 80 ? 'bg-green-500' : 
                    matchedScheme.score >= 60 ? 'bg-scheme-primary' :
                    matchedScheme.score >= 40 ? 'bg-yellow-500' : 'bg-gray-500'}`}>
                  Match: {matchedScheme.score}%
                </div>
                <SchemeCard 
                  scheme={matchedScheme.scheme} 
                  showMatchingFactors={true}
                  matchingFactors={matchedScheme.matchingFactors}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchemeMatcherResults;
