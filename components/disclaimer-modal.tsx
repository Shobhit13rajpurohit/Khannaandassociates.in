"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function DisclaimerModal() {
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    // Check if disclaimer has been accepted before
    const hasAccepted = localStorage.getItem("disclaimerAccepted")
    if (!hasAccepted) {
      setShowDisclaimer(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true")
    setShowDisclaimer(false)
  }

  if (!showDisclaimer) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-vk5WhtSBgcMvCSbvXXByJg24ULHyLh.gif"
                alt="Khanna and Associates Logo"
                width={180}
                height={50}
                className="mr-2"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#1a3c61]">Disclaimer</h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner.
              By accessing this website, www.khannaandassociates.in, you acknowledge and confirm that you are seeking
              information relating to Khanna and Associates of your own accord and that there has been no form of
              solicitation, advertisement or inducement by Khanna and Associates or its members.
            </p>
            <p>
              The content of this website is for informational purposes only and should not be interpreted as soliciting
              or advertisement. No material/information provided on this website should be construed as legal advice.
              Khanna and Associates shall not be liable for consequences of any action taken by relying on the
              material/information provided on this website.
            </p>
            <p>The contents of this website are the intellectual property of Khanna and Associates.</p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="accept" checked={accepted} onCheckedChange={(checked) => setAccepted(checked as boolean)} />
              <label
                htmlFor="accept"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the above.
              </label>
            </div>

            <Button
              onClick={handleAccept}
              disabled={!accepted}
              className="w-full md:w-auto bg-[#1a3c61] hover:bg-[#132e4a] text-white"
            >
              PROCEED TO WEBSITE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
