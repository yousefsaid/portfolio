const EVENT_NAME = "portfolio:focus-project";

/**
 * Lets the globe (a hover-only index) hand off to the project grid (the
 * canonical, scannable list) instead of duplicating its detail content.
 */
export function focusProject(id: string): void {
  window.dispatchEvent(new CustomEvent<string>(EVENT_NAME, { detail: id }));
}

export function onFocusProject(handler: (id: string) => void): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<string>).detail);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
