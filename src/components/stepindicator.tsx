import { Check } from "lucide-react"

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              index <= currentStep
                ? "bg-primary text-primary-foreground border-primary bg-green-800"
                : "border-gray-300 text-purple-300"
            }`}
          >
            {index < currentStep ? <Check className="w-5 h-5" /> : <span  >{index + 1}</span>}
          </div>
          <span className={`ml-2 ${index <= currentStep ? "text-primary font-bold text-purple-400" : "text-purple-400"}`}>{step}</span>
          {index < steps.length - 1 && (
            <div className={`w-10 h-0.5 mx-2 ${index < currentStep ? "bg-primary" : "bg-purple-400"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

