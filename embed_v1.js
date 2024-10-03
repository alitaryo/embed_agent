(function () {
  // Create a custom HTML element 'promptly-app-embed'
  class EmbedAgent extends HTMLElement {
    constructor() {
      super();

      // Get the attributes from the custom element
      const AppId = this.getAttribute("bbuilder-app-id");
      const chatBubble = this.getAttribute("chat-bubble");
      const minWidth = this.getAttribute("min-width");
      const minHeight = this.getAttribute("min-height");
      const maxWidth = this.getAttribute("max-width");
      const maxHeight = this.getAttribute("max-height");

      // Create an iframe element
      const iframe = document.createElement("iframe");

      // Set the iframe attributes
      iframe.setAttribute("id", `agent-${AppId}`);
      iframe.setAttribute(
        "src",
        `${
          this.getAttribute("host") || "https://app.alitahealth.ai/"
        }/agent/${AppId}`
      );
      iframe.setAttribute("width", this.getAttribute("width") || "100%");
      iframe.setAttribute("height", this.getAttribute("height") || "700");
      iframe.setAttribute("scrolling", this.getAttribute("scrolling") || "no");
      iframe.setAttribute(
        "frameborder",
        this.getAttribute("frameborder") || "0"
      );

      if (chatBubble) {
        iframe.setAttribute(
          "style",
          "position: fixed; bottom: 0px; right: 0; z-index: 1000; height: auto; width: auto;"
        );
      }

      // Set the iframe style attribute if it exists
      if (this.getAttribute("style")) {
        iframe.setAttribute("style", this.getAttribute("style"));
      }

      // Attach the iframe to the custom element
      this.appendChild(iframe);

      // Add a listener to the iframe to listen for messages
      window.addEventListener("message", (event) => {
        // Assumes iframe is in scope, consider binding iframe from constructor scope if needed
        const adjustIframeSize = (width, height, ) => {
          let newWidth = width;
          let newHeight = height;
      
          if (minWidth && newWidth < minWidth) {
            newWidth = minWidth;
          }
      
          if (minHeight && newHeight < minHeight) {
            newHeight = minHeight;
          }
      
          if (maxWidth && newWidth > maxWidth) {
            newWidth = maxWidth;
          }
      
          if (maxHeight && newHeight > maxHeight) {
            newHeight = maxHeight;
          }
      
          iframe.style.width = newWidth;
          iframe.style.height = newHeight;
        };
      
        if (event.data.type === "openApp") {
          adjustIframeSize(event.data.width, event.data.height);
        } else if (event.data.type === "closeApp") {
          adjustIframeSize(event.data.width, event.data.height);
        }
      });
    }
  }
  // Register the custom element
  customElements.define("embed-agent", EmbedAgent);
})();