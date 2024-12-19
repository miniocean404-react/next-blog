export function toggleClass(dom: string, className: string) {
  const element = document.querySelector(dom)
  element?.classList.toggle(className, !!element)
}
