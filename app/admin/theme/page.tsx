"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Palette, Type, Layout, ImageIcon, Check } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export default function ThemeCustomizerPage() {
  const [primaryColor, setPrimaryColor] = useState("#1a3c61")
  const [secondaryColor, setSecondaryColor] = useState("#4BB4E6")
  const [accentColor, setAccentColor] = useState("#c8a45e")
  const [fontFamily, setFontFamily] = useState("Inter")
  const [headerStyle, setHeaderStyle] = useState("standard")
  const [footerColumns, setFooterColumns] = useState(4)
  const [borderRadius, setBorderRadius] = useState(8)
  const [buttonStyle, setButtonStyle] = useState("rounded")
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // In a real application, you would send this data to your API
    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)

      // Reset the saved message after 3 seconds
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1000)
  }

  const colorPresets = [
    { name: "Blue", primary: "#1a3c61", secondary: "#4BB4E6", accent: "#c8a45e" },
    { name: "Green", primary: "#0f4c35", secondary: "#3eb489", accent: "#f0c75e" },
    { name: "Purple", primary: "#4a2c82", secondary: "#9b72cf", accent: "#e6c27a" },
    { name: "Red", primary: "#7a1921", secondary: "#e63946", accent: "#f1faee" },
    { name: "Dark", primary: "#121212", secondary: "#3a3a3a", accent: "#e0e0e0" },
  ]

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setPrimaryColor(preset.primary)
    setSecondaryColor(preset.secondary)
    setAccentColor(preset.accent)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3c61]">Theme Customizer</h1>
          <p className="text-gray-600">Customize your website's appearance</p>
        </div>
        <Button className="bg-[#1a3c61]" onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {isSaved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Theme settings saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="colors">
            <TabsList className="mb-6">
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4 mr-2" /> Colors
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="h-4 w-4 mr-2" /> Typography
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="h-4 w-4 mr-2" /> Layout
              </TabsTrigger>
              <TabsTrigger value="components">
                <ImageIcon className="h-4 w-4 mr-2" /> Components
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Color Scheme</h3>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="primary-color" className="text-base">
                      Primary Color
                    </Label>
                    <div className="flex mt-1">
                      <div
                        className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                      <Input
                        id="primary-color"
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Used for main navigation, headings, and primary buttons
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="secondary-color" className="text-base">
                      Secondary Color
                    </Label>
                    <div className="flex mt-1">
                      <div
                        className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                        style={{ backgroundColor: secondaryColor }}
                      ></div>
                      <Input
                        id="secondary-color"
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Used for accents, links, and secondary buttons</p>
                  </div>

                  <div>
                    <Label htmlFor="accent-color" className="text-base">
                      Accent Color
                    </Label>
                    <div className="flex mt-1">
                      <div
                        className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center"
                        style={{ backgroundColor: accentColor }}
                      ></div>
                      <Input
                        id="accent-color"
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Used for highlights and special elements</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-3">Color Presets</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          className="border rounded-md p-3 text-center hover:border-[#4BB4E6] focus:outline-none focus:ring-2 focus:ring-[#4BB4E6]"
                          onClick={() => applyColorPreset(preset)}
                        >
                          <div className="flex justify-center space-x-1 mb-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accent }}></div>
                          </div>
                          <span className="text-sm">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="typography">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Typography Settings</h3>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="font-family" className="text-base">
                      Primary Font
                    </Label>
                    <select
                      id="font-family"
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Lato">Lato</option>
                      <option value="Poppins">Poppins</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Used for all text on your website</p>
                  </div>

                  <div>
                    <Label htmlFor="heading-size" className="text-base">
                      Heading Size Scale: 1.25
                    </Label>
                    <Slider id="heading-size" defaultValue={[1.25]} min={1} max={1.5} step={0.05} className="mt-2" />
                    <p className="text-sm text-gray-500 mt-1">Controls the size ratio between heading levels</p>
                  </div>

                  <div>
                    <Label htmlFor="base-font-size" className="text-base">
                      Base Font Size: 16px
                    </Label>
                    <Slider id="base-font-size" defaultValue={[16]} min={14} max={18} step={1} className="mt-2" />
                    <p className="text-sm text-gray-500 mt-1">Base size for all text on your website</p>
                  </div>

                  <div>
                    <Label htmlFor="line-height" className="text-base">
                      Line Height: 1.5
                    </Label>
                    <Slider id="line-height" defaultValue={[1.5]} min={1.2} max={2} step={0.1} className="mt-2" />
                    <p className="text-sm text-gray-500 mt-1">Controls the spacing between lines of text</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-3">Typography Preview</h4>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily }}>
                        Heading 1
                      </h1>
                      <h2 className="text-xl font-bold mb-2" style={{ fontFamily }}>
                        Heading 2
                      </h2>
                      <h3 className="text-lg font-bold mb-2" style={{ fontFamily }}>
                        Heading 3
                      </h3>
                      <p className="mb-2" style={{ fontFamily }}>
                        This is a paragraph of text that demonstrates how your typography settings will look on your
                        website. The font family, size, and line height all affect the readability of your content.
                      </p>
                      <a href="#" className="text-[#4BB4E6]" style={{ fontFamily }}>
                        This is a link
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="layout">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Layout Settings</h3>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="header-style" className="text-base">
                      Header Style
                    </Label>
                    <select
                      id="header-style"
                      value={headerStyle}
                      onChange={(e) => setHeaderStyle(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="standard">Standard</option>
                      <option value="centered">Centered</option>
                      <option value="minimal">Minimal</option>
                      <option value="transparent">Transparent</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="container-width" className="text-base">
                      Container Width: 1200px
                    </Label>
                    <Slider
                      id="container-width"
                      defaultValue={[1200]}
                      min={900}
                      max={1600}
                      step={50}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">Maximum width of content on your website</p>
                  </div>

                  <div>
                    <Label htmlFor="footer-columns" className="text-base">
                      Footer Columns
                    </Label>
                    <select
                      id="footer-columns"
                      value={footerColumns}
                      onChange={(e) => setFooterColumns(Number.parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={2}>2 Columns</option>
                      <option value={3}>3 Columns</option>
                      <option value={4}>4 Columns</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="section-spacing" className="text-base">
                      Section Spacing: 80px
                    </Label>
                    <Slider id="section-spacing" defaultValue={[80]} min={40} max={120} step={10} className="mt-2" />
                    <p className="text-sm text-gray-500 mt-1">Controls the vertical spacing between sections</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="components">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Component Styles</h3>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="border-radius" className="text-base">
                      Border Radius: {borderRadius}px
                    </Label>
                    <Slider
                      id="border-radius"
                      value={[borderRadius]}
                      onValueChange={(value) => setBorderRadius(value[0])}
                      min={0}
                      max={16}
                      step={1}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Controls the roundness of corners on cards, buttons, and inputs
                    </p>
                  </div>

                  <div>
                    <Label className="text-base mb-2 block">Button Style</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        className={`border rounded-md p-3 text-center hover:border-[#4BB4E6] focus:outline-none focus:ring-2 focus:ring-[#4BB4E6] ${buttonStyle === "rounded" ? "bg-gray-100 border-[#4BB4E6]" : ""}`}
                        onClick={() => setButtonStyle("rounded")}
                      >
                        <div className="flex justify-center mb-2">
                          <div className="bg-[#4BB4E6] text-white px-4 py-2 rounded-md text-sm">Rounded</div>
                        </div>
                        {buttonStyle === "rounded" && <Check className="h-4 w-4 mx-auto text-[#4BB4E6]" />}
                      </button>

                      <button
                        className={`border rounded-md p-3 text-center hover:border-[#4BB4E6] focus:outline-none focus:ring-2 focus:ring-[#4BB4E6] ${buttonStyle === "pill" ? "bg-gray-100 border-[#4BB4E6]" : ""}`}
                        onClick={() => setButtonStyle("pill")}
                      >
                        <div className="flex justify-center mb-2">
                          <div className="bg-[#4BB4E6] text-white px-4 py-2 rounded-full text-sm">Pill</div>
                        </div>
                        {buttonStyle === "pill" && <Check className="h-4 w-4 mx-auto text-[#4BB4E6]" />}
                      </button>

                      <button
                        className={`border rounded-md p-3 text-center hover:border-[#4BB4E6] focus:outline-none focus:ring-2 focus:ring-[#4BB4E6] ${buttonStyle === "square" ? "bg-gray-100 border-[#4BB4E6]" : ""}`}
                        onClick={() => setButtonStyle("square")}
                      >
                        <div className="flex justify-center mb-2">
                          <div className="bg-[#4BB4E6] text-white px-4 py-2 text-sm">Square</div>
                        </div>
                        {buttonStyle === "square" && <Check className="h-4 w-4 mx-auto text-[#4BB4E6]" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base mb-2 block">Card Style</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="border rounded-md p-3 text-center hover:border-[#4BB4E6] focus:outline-none focus:ring-2 focus:ring-[#4BB4E6] bg-gray-100 border-[#4BB4E6]">
                        <div className="flex justify-center mb-2">
                          <div className="bg-white border border-gray-200 shadow-sm rounded-md p-2 text-sm w-full">
                            Shadow
                          </div>
                        </div>
                        <Check className="h-4 w-4 mx-auto text-[#4BB4E6]" />
                      </button>

                      <button className="border rounded-md p-3 text-center hover:border-[#4BB4E6] focus:outline-none focus:ring-2 focus:ring-[#4BB4E6]">
                        <div className="flex justify-center mb-2">
                          <div className="bg-white border-2 border-gray-200 rounded-md p-2 text-sm w-full">Border</div>
                        </div>
                      </button>

                      <button className="border rounded-md p-3 text-center hover:border-[#4BB4E6] focus:outline-none focus:ring-2 focus:ring-[#4BB4E6]">
                        <div className="flex justify-center mb-2">
                          <div className="bg-gray-50 rounded-md p-2 text-sm w-full">Flat</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-medium mb-4">Theme Preview</h3>

            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="h-10 flex items-center px-3" style={{ backgroundColor: primaryColor }}>
                <div className="w-3 h-3 rounded-full bg-white mr-1"></div>
                <div className="w-3 h-3 rounded-full bg-white mr-1"></div>
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>

              <div className="p-4">
                <div className="h-6 w-24 mb-4" style={{ backgroundColor: primaryColor }}></div>

                <div className="space-y-2 mb-4">
                  <div className="h-3 w-full bg-gray-200 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
                </div>

                <div
                  className={`h-8 w-24 mb-4 flex items-center justify-center text-white text-xs`}
                  style={{
                    backgroundColor: secondaryColor,
                    borderRadius:
                      buttonStyle === "pill" ? "9999px" : buttonStyle === "rounded" ? `${borderRadius}px` : "0px",
                  }}
                >
                  Button
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="h-16 bg-gray-100 rounded" style={{ borderRadius: `${borderRadius}px` }}></div>
                  <div className="h-16 bg-gray-100 rounded" style={{ borderRadius: `${borderRadius}px` }}></div>
                </div>

                <div className="h-4 w-16 mb-4" style={{ backgroundColor: accentColor }}></div>

                <div className="space-y-1">
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                  <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                </div>
              </div>

              <div
                className="h-8 flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: primaryColor }}
              >
                Footer
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button className="w-full bg-[#1a3c61] mb-2" onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" className="w-full">
                Reset to Defaults
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
