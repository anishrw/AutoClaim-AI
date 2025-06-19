"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Phone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ChatbotProps {
  analysisResult?: any
  vehicleInfo?: any
}

export function Chatbot({ analysisResult, vehicleInfo }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your State Farm AI assistant. I'm here to help you with your vehicle damage claim. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Explain my damage analysis",
        "Find a State Farm agent",
        "Help with filing a claim",
        "What should I do next?",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("damage") || message.includes("analysis")) {
      if (analysisResult) {
        return `Based on your damage analysis, I can see you have ${analysisResult.damages.length} areas of damage with a total repair cost of $${analysisResult.totalRepairCost.toLocaleString()}. The main damage includes ${analysisResult.damages.map((d: any) => d.location).join(" and ")}. Would you like me to help you understand what this means for your claim?`
      }
      return "I'd be happy to help explain damage analysis! Please upload your vehicle photos first so I can provide specific guidance about your situation."
    }

    if (message.includes("agent") || message.includes("find")) {
      return "I can help you find a State Farm agent near you! They can provide personalized assistance with your claim. Would you like me to search for agents in your area?"
    }

    if (message.includes("claim") || message.includes("file")) {
      return "Filing a claim is easy! Here's what you'll need: 1) Your policy number, 2) Photos of the damage, 3) Details about when/how it happened, 4) Police report (if applicable). I can guide you through each step. What would you like to know first?"
    }

    if (message.includes("next") || message.includes("what should")) {
      if (analysisResult) {
        return `Based on your analysis showing $${analysisResult.totalRepairCost.toLocaleString()} in damage, I recommend: 1) Contact a State Farm agent, 2) File your claim online or by phone, 3) Get repair estimates from approved shops, 4) Schedule an inspection if needed. Would you like help with any of these steps?`
      }
      return "Here's what I recommend: 1) Upload clear photos of your vehicle damage, 2) Get an AI analysis of repair costs, 3) Contact a State Farm agent, 4) File your claim. Let me know which step you'd like help with!"
    }

    if (message.includes("cost") || message.includes("price") || message.includes("expensive")) {
      return "Repair costs can vary based on damage severity, vehicle type, and location. Our AI analysis provides estimates based on current market rates. For the most accurate quote, I recommend getting estimates from State Farm preferred repair shops. Would you like help finding shops near you?"
    }

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! I'm here to help with your vehicle damage claim. I can explain your damage analysis, help you find agents, guide you through filing a claim, or answer questions about the process. What would you like to know?"
    }

    if (message.includes("thank")) {
      return "You're welcome! I'm always here to help with your State Farm needs. Is there anything else I can assist you with regarding your vehicle damage or claim?"
    }

    // Default response
    return "I'm here to help with your vehicle damage claim! I can assist with understanding your damage analysis, finding State Farm agents, filing claims, or explaining the repair process. What specific question do you have?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
        suggestions: inputValue.includes("agent")
          ? ["Find agents near me", "Call State Farm"]
          : inputValue.includes("claim")
            ? ["File a claim", "What documents do I need?"]
            : ["Explain my analysis", "Find an agent", "File a claim"],
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl shadow-red-500/25 transform hover:scale-110 transition-all duration-300"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chatbot Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] animate-in slide-in-from-bottom-4 duration-300">
          <Card className="h-full bg-black/95 border-red-500/20 backdrop-blur-xl shadow-2xl shadow-red-500/20 flex flex-col">
            <CardHeader className="pb-4 border-b border-red-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-red-500/30">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-red-500/20 text-red-300">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">State Farm AI Assistant</CardTitle>
                    <p className="text-xs text-green-400">Online • Ready to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-red-500/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          {message.type === "bot" ? (
                            <AvatarFallback className="bg-red-500/20 text-red-300">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback className="bg-blue-500/20 text-blue-300">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-red-600 text-white"
                              : "bg-gray-800 text-gray-100 border border-red-500/20"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Suggestions */}
                  {messages[messages.length - 1]?.type === "bot" && messages[messages.length - 1]?.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs border-red-500/30 text-red-300 hover:bg-red-500/10"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-red-500/20 text-red-300">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-800 border border-red-500/20 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-red-500/20">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your claim..."
                    className="flex-1 bg-black/20 border-red-500/30 text-white placeholder:text-gray-500 focus:border-red-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center mt-2 space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
