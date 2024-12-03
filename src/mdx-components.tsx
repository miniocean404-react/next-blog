import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  console.log(components)

  return {
    // Allows customizing built-in components, e.g. to add styling.
    h2: ({ children }) => <h1 style={{ color: "red", fontSize: "48px" }}>{children}</h1>,
  }
}
