
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const matcherFormSchema = z.object({
  gender: z.enum(["male", "female", "other"]),
  age: z.number().min(1).max(120),
  annualIncome: z.number().min(0),
  state: z.string().min(1),
  district: z.string().min(1),
  category: z.enum(["general", "obc", "sc", "st", "others"]),
  employmentStatus: z.enum(["employed", "unemployed", "self-employed", "student", "retired"]),
  education: z.enum(["none", "primary", "secondary", "higher_secondary", "graduate", "post_graduate", "phd"]),
  occupation: z.string().optional(),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
  disability: z.boolean(),
  disabilityDetails: z.string().optional(),
  familySize: z.number().min(1).max(50).optional(),
  houseOwnership: z.enum(["owned", "rented", "other"]).optional(),
  bplCardHolder: z.boolean().optional(),
  rationCardType: z.enum(["apl", "bpl", "aay", "none"]).optional(),
  aadharLinked: z.boolean().optional(),
  farmingLand: z.number().min(0).optional(),
  additionalInfo: z.string().optional(),
  interests: z.array(z.string()).optional(),
  seniorCitizen: z.boolean().optional(),
  childrenBelow18: z.number().min(0).max(20).optional(),
  bankAccountType: z.enum(["savings", "current", "none"]).optional(),
  pensioner: z.boolean().optional(),
  smallBusiness: z.boolean().optional(),
  residenceType: z.enum(["urban", "rural", "semi-urban"]).optional(),
});

type MatcherFormValues = z.infer<typeof matcherFormSchema>;

const states = [
  { value: "andhra_pradesh", label: "Andhra Pradesh" },
  { value: "arunachal_pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal_pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya_pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil_nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar_pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west_bengal", label: "West Bengal" },
  { value: "andaman_nicobar", label: "Andaman and Nicobar Islands" },
  { value: "chandigarh", label: "Chandigarh" },
  { value: "dadra_nagar_haveli", label: "Dadra and Nagar Haveli and Daman and Diu" },
  { value: "delhi", label: "Delhi" },
  { value: "jammu_kashmir", label: "Jammu and Kashmir" },
  { value: "ladakh", label: "Ladakh" },
  { value: "lakshadweep", label: "Lakshadweep" },
  { value: "puducherry", label: "Puducherry" },
];

const districtsByState: Record<string, { value: string; label: string }[]> = {
  andhra_pradesh: [
    { value: "anantapur", label: "Anantapur" },
    { value: "chittoor", label: "Chittoor" },
    { value: "east_godavari", label: "East Godavari" },
    { value: "guntur", label: "Guntur" },
    { value: "krishna", label: "Krishna" },
    { value: "kurnool", label: "Kurnool" },
    { value: "prakasam", label: "Prakasam" },
    { value: "srikakulam", label: "Srikakulam" },
    { value: "visakhapatnam", label: "Visakhapatnam" },
    { value: "vizianagaram", label: "Vizianagaram" },
    { value: "west_godavari", label: "West Godavari" },
    { value: "kadapa", label: "YSR Kadapa" },
  ],
  arunachal_pradesh: [
    { value: "anjaw", label: "Anjaw" },
    { value: "changlang", label: "Changlang" },
    { value: "east_kameng", label: "East Kameng" },
    { value: "east_siang", label: "East Siang" },
    { value: "kamle", label: "Kamle" },
    { value: "kra_daadi", label: "Kra Daadi" },
    { value: "kurung_kumey", label: "Kurung Kumey" },
    { value: "lohit", label: "Lohit" },
    { value: "longding", label: "Longding" },
    { value: "lower_dibang_valley", label: "Lower Dibang Valley" },
    { value: "lower_siang", label: "Lower Siang" },
    { value: "lower_subansiri", label: "Lower Subansiri" },
    { value: "namsai", label: "Namsai" },
    { value: "papum_pare", label: "Papum Pare" },
    { value: "pakke_kessang", label: "Pakke-Kessang" },
    { value: "shi_yomi", label: "Shi Yomi" },
    { value: "siang", label: "Siang" },
    { value: "tawang", label: "Tawang" },
    { value: "tirap", label: "Tirap" },
    { value: "upper_dibang_valley", label: "Upper Dibang Valley" },
    { value: "upper_siang", label: "Upper Siang" },
    { value: "upper_subansiri", label: "Upper Subansiri" },
    { value: "west_kameng", label: "West Kameng" },
    { value: "west_siang", label: "West Siang" },
  ],
  assam: [
    { value: "baksa", label: "Baksa" },
    { value: "barpeta", label: "Barpeta" },
    { value: "biswanath", label: "Biswanath" },
    { value: "bongaigaon", label: "Bongaigaon" },
    { value: "cachar", label: "Cachar" },
    { value: "charaideo", label: "Charaideo" },
    { value: "chirang", label: "Chirang" },
    { value: "darrang", label: "Darrang" },
    { value: "dhemaji", label: "Dhemaji" },
    { value: "dhubri", label: "Dhubri" },
    { value: "dibrugarh", label: "Dibrugarh" },
    { value: "goalpara", label: "Goalpara" },
    { value: "golaghat", label: "Golaghat" },
    { value: "hailakandi", label: "Hailakandi" },
    { value: "hojai", label: "Hojai" },
    { value: "jorhat", label: "Jorhat" },
    { value: "kamrup_metropolitan", label: "Kamrup Metropolitan" },
    { value: "kamrup", label: "Kamrup" },
    { value: "karbi_anglong", label: "Karbi Anglong" },
    { value: "karimganj", label: "Karimganj" },
    { value: "kokrajhar", label: "Kokrajhar" },
    { value: "lakhimpur", label: "Lakhimpur" },
    { value: "majuli", label: "Majuli" },
    { value: "morigaon", label: "Morigaon" },
    { value: "nagaon", label: "Nagaon" },
    { value: "nalbari", label: "Nalbari" },
    { value: "dima_hasao", label: "Dima Hasao" },
    { value: "sivasagar", label: "Sivasagar" },
    { value: "sonitpur", label: "Sonitpur" },
    { value: "south_salmara_mankachar", label: "South Salmara-Mankachar" },
    { value: "tinsukia", label: "Tinsukia" },
    { value: "udalguri", label: "Udalguri" },
    { value: "west_karbi_anglong", label: "West Karbi Anglong" },
  ],
  bihar: [
    { value: "araria", label: "Araria" },
    { value: "arwal", label: "Arwal" },
    { value: "aurangabad", label: "Aurangabad" },
    { value: "banka", label: "Banka" },
    { value: "begusarai", label: "Begusarai" },
    { value: "bhagalpur", label: "Bhagalpur" },
    { value: "bhojpur", label: "Bhojpur" },
    { value: "buxar", label: "Buxar" },
    { value: "darbhanga", label: "Darbhanga" },
    { value: "east_champaran", label: "East Champaran" },
    { value: "gaya", label: "Gaya" },
    { value: "gopalganj", label: "Gopalganj" },
    { value: "jamui", label: "Jamui" },
    { value: "jehanabad", label: "Jehanabad" },
    { value: "kaimur", label: "Kaimur" },
    { value: "katihar", label: "Katihar" },
    { value: "khagaria", label: "Khagaria" },
    { value: "kishanganj", label: "Kishanganj" },
    { value: "lakhisarai", label: "Lakhisarai" },
    { value: "madhepura", label: "Madhepura" },
    { value: "madhubani", label: "Madhubani" },
    { value: "munger", label: "Munger" },
    { value: "muzaffarpur", label: "Muzaffarpur" },
    { value: "nalanda", label: "Nalanda" },
    { value: "nawada", label: "Nawada" },
    { value: "patna", label: "Patna" },
    { value: "purnia", label: "Purnia" },
    { value: "rohtas", label: "Rohtas" },
    { value: "saharsa", label: "Saharsa" },
    { value: "samastipur", label: "Samastipur" },
    { value: "saran", label: "Saran" },
    { value: "sheikhpura", label: "Sheikhpura" },
    { value: "sheohar", label: "Sheohar" },
    { value: "sitamarhi", label: "Sitamarhi" },
    { value: "siwan", label: "Siwan" },
    { value: "supaul", label: "Supaul" },
    { value: "vaishali", label: "Vaishali" },
    { value: "west_champaran", label: "West Champaran" },
  ],
  // And so on for other states...
  delhi: [
    { value: "central_delhi", label: "Central Delhi" },
    { value: "east_delhi", label: "East Delhi" },
    { value: "new_delhi", label: "New Delhi" },
    { value: "north_delhi", label: "North Delhi" },
    { value: "north_east_delhi", label: "North East Delhi" },
    { value: "north_west_delhi", label: "North West Delhi" },
    { value: "shahdara", label: "Shahdara" },
    { value: "south_delhi", label: "South Delhi" },
    { value: "south_east_delhi", label: "South East Delhi" },
    { value: "south_west_delhi", label: "South West Delhi" },
    { value: "west_delhi", label: "West Delhi" },
  ],
  maharashtra: [
    { value: "ahmednagar", label: "Ahmednagar" },
    { value: "akola", label: "Akola" },
    { value: "amravati", label: "Amravati" },
    { value: "aurangabad", label: "Aurangabad" },
    { value: "beed", label: "Beed" },
    { value: "bhandara", label: "Bhandara" },
    { value: "buldhana", label: "Buldhana" },
    { value: "chandrapur", label: "Chandrapur" },
    { value: "dhule", label: "Dhule" },
    { value: "gadchiroli", label: "Gadchiroli" },
    { value: "gondia", label: "Gondia" },
    { value: "hingoli", label: "Hingoli" },
    { value: "jalgaon", label: "Jalgaon" },
    { value: "jalna", label: "Jalna" },
    { value: "kolhapur", label: "Kolhapur" },
    { value: "latur", label: "Latur" },
    { value: "mumbai_city", label: "Mumbai City" },
    { value: "mumbai_suburban", label: "Mumbai Suburban" },
    { value: "nagpur", label: "Nagpur" },
    { value: "nanded", label: "Nanded" },
    { value: "nandurbar", label: "Nandurbar" },
    { value: "nashik", label: "Nashik" },
    { value: "osmanabad", label: "Osmanabad" },
    { value: "palghar", label: "Palghar" },
    { value: "parbhani", label: "Parbhani" },
    { value: "pune", label: "Pune" },
    { value: "raigad", label: "Raigad" },
    { value: "ratnagiri", label: "Ratnagiri" },
    { value: "sangli", label: "Sangli" },
    { value: "satara", label: "Satara" },
    { value: "sindhudurg", label: "Sindhudurg" },
    { value: "solapur", label: "Solapur" },
    { value: "thane", label: "Thane" },
    { value: "wardha", label: "Wardha" },
    { value: "washim", label: "Washim" },
    { value: "yavatmal", label: "Yavatmal" },
  ],
  // For any state without specific districts, we'll provide a default
  default: [{ value: "all_districts", label: "All Districts" }],
};

const interests = [
  { id: "agriculture", label: "Agriculture" },
  { id: "education", label: "Education" },
  { id: "healthcare", label: "Healthcare" },
  { id: "housing", label: "Housing" },
  { id: "employment", label: "Employment" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "skill_development", label: "Skill Development" },
  { id: "women_empowerment", label: "Women Empowerment" },
  { id: "child_welfare", label: "Child Welfare" },
  { id: "disability_support", label: "Disability Support" },
  { id: "senior_citizen", label: "Senior Citizen" },
  { id: "minority_welfare", label: "Minority Welfare" },
  { id: "rural_development", label: "Rural Development" },
  { id: "urban_development", label: "Urban Development" },
  { id: "environmental", label: "Environmental" },
  { id: "digital_literacy", label: "Digital Literacy" },
  { id: "financial_inclusion", label: "Financial Inclusion" },
  { id: "msme", label: "MSME & Small Business" },
  { id: "tribal_welfare", label: "Tribal Welfare" },
  { id: "water_sanitation", label: "Water & Sanitation" },
  { id: "social_security", label: "Social Security" },
  { id: "startup_innovation", label: "Startup & Innovation" },
];

const SchemeMatcherForm = () => {
  const [selectedState, setSelectedState] = useState<string>("");
  const navigate = useNavigate();
  
  const form = useForm<MatcherFormValues>({
    resolver: zodResolver(matcherFormSchema),
    defaultValues: {
      gender: "male",
      age: 25,
      annualIncome: 0,
      state: "",
      district: "",
      category: "general",
      employmentStatus: "unemployed",
      education: "secondary",
      maritalStatus: "single",
      disability: false,
      interests: [],
      seniorCitizen: false,
      childrenBelow18: 0,
      farmingLand: 0,
      bplCardHolder: false,
      aadharLinked: true,
      residenceType: "urban",
    },
  });

  function onSubmit(values: MatcherFormValues) {
    console.log(values);
    
    // Store the form data in session storage to use in the results page
    sessionStorage.setItem("schemeMatcherData", JSON.stringify(values));
    
    // Navigate to the results page
    navigate("/scheme-matcher/results");
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-scheme-primary">Find Schemes For You</h2>
        <LanguageSelector variant="outline" />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="multiple" defaultValue={["personal", "location"]}>
            {/* Personal Information Section */}
            <AccordionItem value="personal">
              <AccordionTrigger className="text-lg font-semibold text-scheme-primary">
                Personal Information
              </AccordionTrigger>
              <AccordionContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <FormLabel htmlFor="male" className="font-normal">Male</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <FormLabel htmlFor="female" className="font-normal">Female</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <FormLabel htmlFor="other" className="font-normal">Other</FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter your age" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select marital status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="obc">OBC</SelectItem>
                            <SelectItem value="sc">SC</SelectItem>
                            <SelectItem value="st">ST</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="seniorCitizen"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Senior Citizen (60+ years)
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="childrenBelow18"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Children Below 18</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter number of children" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="familySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Family Size</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter family size" 
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Location Section */}
            <AccordionItem value="location">
              <AccordionTrigger className="text-lg font-semibold text-scheme-primary">
                Location Details
              </AccordionTrigger>
              <AccordionContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedState(value);
                            // Reset district when state changes
                            form.setValue("district", "");
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedState}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={selectedState ? "Select your district" : "Select state first"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(districtsByState[selectedState] || districtsByState.default).map((district) => (
                              <SelectItem key={district.value} value={district.value}>
                                {district.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="residenceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Residence Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select residence type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="urban">Urban</SelectItem>
                            <SelectItem value="rural">Rural</SelectItem>
                            <SelectItem value="semi-urban">Semi-Urban</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="houseOwnership"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>House Ownership</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ownership status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="owned">Owned</SelectItem>
                            <SelectItem value="rented">Rented</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Financial Information */}
            <AccordionItem value="financial">
              <AccordionTrigger className="text-lg font-semibold text-scheme-primary">
                Financial Information
              </AccordionTrigger>
              <AccordionContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name="annualIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Income (₹)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter your annual income" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employmentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your employment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                            <SelectItem value="self-employed">Self-Employed</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bplCardHolder"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            BPL Card Holder
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rationCardType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ration Card Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ration card type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apl">APL (Above Poverty Line)</SelectItem>
                            <SelectItem value="bpl">BPL (Below Poverty Line)</SelectItem>
                            <SelectItem value="aay">AAY (Antyodaya Anna Yojana)</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bankAccountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select bank account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="savings">Savings Account</SelectItem>
                            <SelectItem value="current">Current Account</SelectItem>
                            <SelectItem value="none">No Bank Account</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pensioner"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Receiving Pension
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Education & Occupation */}
            <AccordionItem value="education">
              <AccordionTrigger className="text-lg font-semibold text-scheme-primary">
                Education & Occupation
              </AccordionTrigger>
              <AccordionContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">No Formal Education</SelectItem>
                            <SelectItem value="primary">Primary Education</SelectItem>
                            <SelectItem value="secondary">Secondary Education</SelectItem>
                            <SelectItem value="higher_secondary">Higher Secondary</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="post_graduate">Post Graduate</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your occupation" 
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="smallBusiness"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Own/Run a Small Business/Shop
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="farmingLand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agricultural Land Owned (in acres)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter land size in acres" 
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Disability Information */}
            <AccordionItem value="disability">
              <AccordionTrigger className="text-lg font-semibold text-scheme-primary">
                Disability Information
              </AccordionTrigger>
              <AccordionContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-6 p-4 bg-gray-50 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name="disability"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Do you have any disability?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("disability") && (
                    <FormField
                      control={form.control}
                      name="disabilityDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disability Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about your disability" 
                              className="min-h-[100px]"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Documents & IDs */}
            <AccordionItem value="documents">
              <AccordionTrigger className="text-lg font-semibold text-scheme-primary">
                Documents & IDs
              </AccordionTrigger>
              <AccordionContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name="aadharLinked"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Aadhaar Card Linked to Mobile/Bank
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Interests / Focus Areas */}
            <AccordionItem value="interests">
              <AccordionTrigger className="text-lg font-semibold text-scheme-primary">
                Interests / Focus Areas
              </AccordionTrigger>
              <AccordionContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-6 p-4 bg-gray-50 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Select areas you're interested in</FormLabel>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {interests.map((interest) => (
                            <FormField
                              key={interest.id}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={interest.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(interest.id)}
                                        onCheckedChange={(checked) => {
                                          const currentValues = field.value || [];
                                          return checked
                                            ? field.onChange([...currentValues, interest.id])
                                            : field.onChange(
                                                currentValues.filter(
                                                  (value) => value !== interest.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {interest.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Additional Information */}
            <AccordionItem value="additional">
              <AccordionTrigger className="text-lg font-semibold text-scheme-primary">
                Additional Information
              </AccordionTrigger>
              <AccordionContent>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any additional information that might help us find suitable schemes for you</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter any additional information here" 
                            className="min-h-[100px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              className="bg-scheme-primary hover:bg-scheme-primary/90 text-white"
            >
              Find Schemes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SchemeMatcherForm;
