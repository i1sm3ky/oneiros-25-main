"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StepIndicator } from "@/components/stepindicator"
import axios from 'axios';
import Image from "next/image"


import {
  Gloock,
  Instrument_Sans,
  Montserrat,
  Inclusive_Sans,
} from "next/font/google";

// Configure fonts
const gloock = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gloock",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-instrument-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const inclusiveSans = Inclusive_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inclusive-sans",
});


const steps = ["Team Information","Team Members", "Event Selection", "Submission"]
const events = [
  {
    name: "Destival",
    description:
      "The stage is set, the beats are dropping, and the best dancers are here to own it. Destival brings top talent from everywhere to battle it out, delivering high energy performances that set the floor on fire. Get ready for a dance showdown like never before!",
  },
  {
    name: "Requiem",
    description:
      "Requiem is a thrilling competition that tests participant&#39;s strategic thinking and teamwork abilities."
  },
  {
    name: "Cosmos",
    description: "Cosmos is an innovative event that explores the intersection of technology and imagination.",
  },
]

export default function MajortRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errormessage, SetErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    teamLeader: "",
    teamLeaderEmail: "",
    teamLeaderContact: "",
    teamLeaderIdCard: "",
    collegeName: "",
    collegeRegion: "",
    teamName: "",
    teamMembersCount: "",
    teamMembersNames: "",
    selectedEvent: "",
    entryLink: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Function to validate required fields for each step
  const validateForm = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.teamLeader &&
          formData.teamLeaderEmail &&
          formData.teamLeaderContact &&
          formData.teamLeaderIdCard &&
          formData.collegeName
        );
      case 1:
        return formData.teamName && formData.teamMembersCount && formData.teamMembersNames;
      case 2:
        return formData.selectedEvent;
      case 3:
        return formData.entryLink;
      default:
        return false;
    }
  };
  
  // Modified handleNext to prevent moving forward if form is invalid
  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
       SetErrorMessage("Please fill in all required fields.");
      console.log('Please fill in all required fields.');
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Send data to backend
      await axios.post("/api/register", formData);
  
      console.log("Form submitted successfully");
  
      // Reset form data
      setFormData({
        teamLeader: "",
        teamLeaderEmail: "",
        teamLeaderContact: "",
        teamLeaderIdCard: "",
        collegeName: "",
        collegeRegion: "",
        teamName: "",
        teamMembersCount: "",
        teamMembersNames: "",
        selectedEvent: "",
        entryLink: "",
      });
  
      // Optionally reset current step to the first one
      setCurrentStep(0);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
     <div className="flex flex-col items-center justify-center">
  <Image src="/neon-with.png" alt="Logo" width={200} height={100} className="mb-1" />
</div>
<Card className="w-full max-w-4xl border-purple-500 mx-auto bg-black text-purple-200">
  <CardHeader className="text-center space-y-2">
    <CardTitle className="text-3xl text-purple-400 font-bold font-gloock">Major Events Registration</CardTitle>
    <CardDescription className="text-lg font-inclusive-sans">Register for Oneiros events: Destival, Requiem, and Cosmos</CardDescription>
  </CardHeader>
  <CardContent>
  <div className="hidden sm:block">
      <StepIndicator steps={steps} currentStep={currentStep} />
    </div>
    <form onSubmit={handleSubmit}>
      {/* Step 1: Basic Details */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamLeader" className="text-purple-400">Team Leader *</Label>
              <Input
                id="teamLeader"
                name="teamLeader"
                value={formData.teamLeader}
                onChange={handleInputChange}
                className="bg-black border-purple-400 text-purple-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamLeaderEmail" className="text-purple-400">Team Leader Email *</Label>
              <Input
                id="teamLeaderEmail"
                name="teamLeaderEmail"
                type="email"
                value={formData.teamLeaderEmail}
                onChange={handleInputChange}
                className="bg-black border-purple-400 text-purple-200"
                required
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamLeaderContact" className="text-purple-400">Team Leader Contact Number *</Label>
              <Input
                id="teamLeaderContact"
                name="teamLeaderContact"
                type="tel"
                value={formData.teamLeaderContact}
                onChange={handleInputChange}
                className="bg-black border-purple-400 text-purple-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamLeaderIdCard" className="text-purple-400">Team Leader&#39;s College ID Card (Drive Link) *</Label>
              <Input
                id="teamLeaderIdCard"
                name="teamLeaderIdCard"
                type="url"
                value={formData.teamLeaderIdCard}
                onChange={handleInputChange}
                className="bg-black border-purple-400 text-purple-200"
                required
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collegeName" className="text-purple-400">College Name *</Label>
              <Input
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                className="bg-black border-purple-400 text-purple-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collegeRegion" className="text-purple-400">Region/State of College</Label>
              <Input
                id="collegeRegion"
                name="collegeRegion"
                value={formData.collegeRegion}
                onChange={handleInputChange}
                className="bg-black border-purple-400 text-purple-200"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Team Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamName" className="text-purple-400">Team Name *</Label>
              <Input
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                className="bg-black border-purple-400 text-purple-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamMembersCount" className="text-purple-400">Number of Team Members *</Label>
              <Input
                id="teamMembersCount"
                name="teamMembersCount"
                type="number"
                value={formData.teamMembersCount}
                onChange={handleInputChange}
                className="bg-black border-purple-400 text-purple-200"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamMembersNames" className="text-purple-400">Name of Team Members (Add all the names) *</Label>
            <Textarea
              id="teamMembersNames"
              name="teamMembersNames"
              value={formData.teamMembersNames}
              onChange={handleInputChange}
              className="bg-black border-purple-400 text-purple-200"
              required
            />
          </div>
        </div>
      )}

      {/* Step 3: Event Selection */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="selectedEvent" className="text-purple-400">Select Event *</Label>
            <Select
              name="selectedEvent"
              onValueChange={(value) => handleSelectChange(value, "selectedEvent")}
            >
              <SelectTrigger className="bg-black border-purple-400 text-purple-200">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent className="bg-black border-purple-400 text-purple-200">
                {events.map((event) => (
                  <SelectItem key={event.name} value={event.name} className="hover:bg-purple-800">
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {formData.selectedEvent && (
            <Card className="bg-black border-purple-500 text-purple-200">
              <CardHeader>
                <CardTitle>{formData.selectedEvent}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{events.find((e) => e.name === formData.selectedEvent)?.description}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 4: Entry Submission */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="entryLink" className="text-purple-400">Upload Your Entry Here (Post Link) *</Label>
            <Input
              id="entryLink"
              name="entryLink"
              type="url"
              value={formData.entryLink}
              onChange={handleInputChange}
              className="bg-black border-purple-400 text-purple-200"
              required
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col items-center mt-6">
  {/* Display error message if any required fields are missing */}
  {!validateForm() && currentStep < steps.length - 1 && (
    <div className="text-red-500 text-sm mb-4">
      Please fill in all required fields.
    </div>
  )}
  
  <div className="flex justify-between w-full">
    <Button
      type="button"
      onClick={handlePrevious}
      disabled={currentStep === 0}
      className={`px-6 py-3 text-purple-200 rounded-lg ${
        currentStep === 0
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-700"
      }`}
    >
      Previous
    </Button>
    
    {currentStep < steps.length - 1 ? (
      <Button
        type="button"
        onClick={handleNext}
        className="px-6 py-3 bg-purple-600 text-purple-200 rounded-lg hover:bg-purple-700"
      >
        Next
      </Button>
    ) : (
      <Button
        type="submit"
        className="px-6 py-3 bg-green-600 text-purple-200 rounded-lg hover:bg-green-700"
      >
        Submit
      </Button>
    )}
  </div>
</div>
    </form>
  </CardContent>
</Card>
    </>
    
  )
}

