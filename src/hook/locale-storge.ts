"use client"
import { useState, useEffect, useRef } from "react"

export default function useLocalStorage(key: string, defaultValue: string) {
  const isMounted = useRef(false)
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setValue(JSON.parse(item))
      }
    } catch (e) {
      console.log(e)
    }
    return () => {
      isMounted.current = false
    }
  }, [key])

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      isMounted.current = true
    }
  }, [key, value])

  return [value, setValue]
}
