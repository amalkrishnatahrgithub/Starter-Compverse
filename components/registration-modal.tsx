"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, CreditCard, Calendar, MapPin, Clock, CheckCircle, Sparkles, X } from "lucide-react"

interface RegistrationEvent {
  id: string
  title: string
  date: Date
  time: string
  location: string
  price: number
  category: string
  audience: string
}

interface RegistrationModalProps {
  event: RegistrationEvent | null
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  emergencyContact: string
  emergencyPhone: string
  specialRequirements: string
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  agreeToTerms: boolean
}

export function RegistrationModal({ event, isOpen, onClose }: RegistrationModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    emergencyContact: "",
    emergencyPhone: "",
    specialRequirements: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    agreeToTerms: false,
  })

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateRegistrationNumber = () => {
    const prefix = event?.audience === "Kids" ? "KID" : "ADT"
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    const timestamp = Date.now().toString().slice(-4)
    return `${prefix}-${random}-${timestamp}`
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const regNumber = generateRegistrationNumber()
    setRegistrationNumber(regNumber)
    setCurrentStep(4)
    setIsProcessing(false)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setRegistrationNumber("")
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      emergencyContact: "",
      emergencyPhone: "",
      specialRequirements: "",
      paymentMethod: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      agreeToTerms: false,
    })
    onClose()
  }

  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl glassmorphism border-primary/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl text-foreground">
              {currentStep === 4 ? "Registration Confirmed!" : "Event Registration"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress Indicator */}
        {currentStep < 4 && (
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step <= currentStep ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-colors ${step < currentStep ? "bg-accent" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Event Summary */}
        {currentStep < 4 && (
          <Card className="glassmorphism border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.date.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="text-accent font-semibold">${event.price}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="bg-muted/20 text-muted-foreground">
                  {event.audience}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      className="pl-10 glassmorphism border-primary/30 focus:border-primary"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      className="pl-10 glassmorphism border-primary/30 focus:border-primary"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="pl-10 glassmorphism border-primary/30 focus:border-primary"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="pl-10 glassmorphism border-primary/30 focus:border-primary"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="age" className="text-foreground">
                  Age Group *
                </Label>
                <Select value={formData.age} onValueChange={(value) => updateFormData("age", value)}>
                  <SelectTrigger className="glassmorphism border-primary/30 focus:border-primary">
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-12">5-12 years</SelectItem>
                    <SelectItem value="13-17">13-17 years</SelectItem>
                    <SelectItem value="18-25">18-25 years</SelectItem>
                    <SelectItem value="26-35">26-35 years</SelectItem>
                    <SelectItem value="36-50">36-50 years</SelectItem>
                    <SelectItem value="50+">50+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleNextStep}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Emergency Contact & Requirements */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contact & Requirements</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="text-foreground">
                    Emergency Contact Name *
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                    className="glassmorphism border-primary/30 focus:border-primary"
                    placeholder="Enter emergency contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone" className="text-foreground">
                    Emergency Contact Phone *
                  </Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                    className="glassmorphism border-primary/30 focus:border-primary"
                    placeholder="Enter emergency contact phone"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="specialRequirements" className="text-foreground">
                  Special Requirements or Dietary Restrictions
                </Label>
                <Textarea
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => updateFormData("specialRequirements", e.target.value)}
                  className="glassmorphism border-primary/30 focus:border-primary mt-2"
                  placeholder="Please describe any special requirements, allergies, or dietary restrictions..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="glassmorphism border-primary/30 bg-transparent"
              >
                Previous
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!formData.emergencyContact || !formData.emergencyPhone}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Information */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Information</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground">Payment Method *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => updateFormData("paymentMethod", value)}
                  >
                    <SelectTrigger className="glassmorphism border-primary/30 focus:border-primary">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-foreground">
                    Card Number *
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => updateFormData("cardNumber", e.target.value)}
                      className="pl-10 glassmorphism border-primary/30 focus:border-primary"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-foreground">
                      Expiry Date *
                    </Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => updateFormData("expiryDate", e.target.value)}
                      className="glassmorphism border-primary/30 focus:border-primary"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-foreground">
                      CVV *
                    </Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => updateFormData("cvv", e.target.value)}
                      className="glassmorphism border-primary/30 focus:border-primary"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-foreground">
                    I agree to the terms and conditions and privacy policy
                  </Label>
                </div>
              </div>

              <Card className="glassmorphism border-primary/20 mt-6">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Event Fee</span>
                      <span className="text-foreground">${event.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span className="text-foreground">$2.50</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-accent">${event.price + 2.5}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="glassmorphism border-primary/30 bg-transparent"
              >
                Previous
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !formData.paymentMethod ||
                  !formData.cardNumber ||
                  !formData.expiryDate ||
                  !formData.cvv ||
                  !formData.agreeToTerms ||
                  isProcessing
                }
                className="bg-accent hover:bg-accent/90 text-accent-foreground animate-pulse-glow"
              >
                {isProcessing ? "Processing Payment..." : `Pay $${event.price + 2.5}`}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Success Confirmation */}
        {currentStep === 4 && (
          <div className="text-center space-y-6 py-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-accent/20 rounded-full flex items-center justify-center animate-pulse-glow">
                <CheckCircle className="w-12 h-12 text-accent animate-bounce" />
              </div>
              <div
                className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-accent/30 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gradient">Registration Successful!</h3>
              <p className="text-muted-foreground">
                Thank you for registering for <span className="text-foreground font-semibold">{event.title}</span>
              </p>
            </div>

            <Card className="glassmorphism border-accent/30 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Registration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Label className="text-muted-foreground">Registration Number</Label>
                  <div className="text-2xl font-bold text-accent mt-1 font-mono tracking-wider">
                    {registrationNumber}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event</span>
                    <span className="text-foreground">{event.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground">{event.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="text-foreground">{event.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participant</span>
                    <span className="text-foreground">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to <span className="text-foreground">{formData.email}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Please save your registration number and arrive 15 minutes before the event starts.
              </p>
            </div>

            <Button onClick={handleClose} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
