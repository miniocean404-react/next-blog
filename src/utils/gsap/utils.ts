export function toggleClass(dom: string, className: string) {
  const element = document.querySelector(dom)

  if (element?.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element?.classList.add(className)
  }
}
