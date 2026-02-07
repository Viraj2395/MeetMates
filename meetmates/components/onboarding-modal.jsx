"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "./ui/UI/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { Progress } from "./ui/UI/progress"
import { ArrowRight, Heart } from "lucide-react"
import { MapPin } from "lucide-react"
import { useEffect } from "react"
import { CATEGORIES } from "@/lib/data"
import { api } from "@/convex/_generated/api"
import { useConvexMutation } from "@/hooks/use_convex_queries"
import { toast } from "sonner"
import { useMutation } from "convex/react"
import { Badge } from "lucide-react"
import { State } from "country-state-city"



export function OnboardingModal({ isOpen, onClose, onComplete }) {
    const [step, setStep] = useState(1);

    const [selectedInterests, setSelectedInterests] = useState([]);
    const [location, setLocation] = useState({
        state: "",
        city: "",
        country: "Australia",
    });

    const progress = (step / 2) * 100;


    const { mutate: completeOnboarding, isLoading } = useConvexMutation(
        api.users.completeOnboarding
    );

    const australianStates = State.getStatesOfCountry("AU");

    const cities = () => {
        if (!location.state) return [];

        const selectedState = australianStates.find(
            (s) => s.name === location.state
        );

        if (!selectedState) return [];

        return City.getCitiesOfState("IN", selectedState.isoCode);
    };

    const toggleInterest = (categoryId) => {
        setSelectedInterests((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleNext = () => {
        if (step === 1 && selectedInterests.length < 3) {
            toast.error("Please select at least 3 interests");
            return;
        }

        if (step === 2 && (!location.city || !location.state)) {
            toast.error("Please select both state and city");
            return;
        }

        if (step < 2) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };



    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent className="sm:max-w-2xl ">
                <DialogHeader>
                    <div className="mb-4">
                        <Progress value={progress} className="h-1" />
                    </div>
                    <DialogTitle className={"flex items-ceter gap-2 text-2xl"}>
                        {step === 1 ? (
                            <>
                                <Heart className="w-6 h-6 text-purple-500" />
                                What interests you?
                            </>
                        ) : (
                            <>
                                <MapPin className="w-6 h-6 text-purple-500" />
                                Where are you located?
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? "Select at least 3 categories to personalize your experience"
                            : "We'll show you events happening near you"}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-100 overflow-y-auto p-2">
                                {CATEGORIES.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => toggleInterest(category.id)}
                                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${selectedInterests.includes(category.id)
                                            ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                                            : "border-border hover:border-purple-300"
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{category.icon}</div>
                                        <div className="text-sm font-medium">{category.label}</div>
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={selectedInterests.length >= 3 ? "default" : "secondary"}
                                >
                                    {selectedInterests.length} selected
                                </Badge>

                                {selectedInterests.length >= 3 && (
                                    <span className="text-sm text-green-500">
                                        ✓ Ready to continue
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>


                <DialogFooter className="flex gap-3">
                    <Button className="flex-1 gap-2" disabled={isLoading} onClick={handleNext}>
                        {isLoading
                            ? "Completing..."
                            : step === 2
                                ? "Complete Setup"
                                : "Continue"}

                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
