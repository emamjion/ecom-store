"use client"

import { useEffect } from "react"
import { useEcommerceStore } from "@/lib/store"
import HomePage from "./app/page"

export default function EcommerceWebsite() {
  const { initializeData } = useEcommerceStore()

  useEffect(() => {
    initializeData()
  }, [initializeData])

  return <HomePage />
}
