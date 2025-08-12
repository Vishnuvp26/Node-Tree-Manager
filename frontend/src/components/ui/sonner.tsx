// sonner.tsx
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import type { ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme === "system" ? "dark" : (theme as "light" | "dark")}
      className="toaster group"
      {...props}
    />
  )
}

export { Toaster }