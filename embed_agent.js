(function () {
  class EmbedAgent extends HTMLElement {
    constructor() {
      super();

      const AppId = this.getAttribute("bbuilder-app-id");
      const chatBubble = this.getAttribute("chat-bubble");

      const iframe = document.createElement("iframe");

      iframe.setAttribute("id", `agent-${AppId}`);
      iframe.setAttribute(
        "src",
        `${this.getAttribute("host") || "https://app.alitahealth.ai/"
        }/agent/${AppId}`
      );
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "80vh"); // Responsive height  
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("frameborder", "0");

      if (chatBubble) {
        iframe.style.position = 'fixed';
        iframe.style.bottom = '0px';
        iframe.style.right = '0';
        iframe.style.zIndex = '1000';
        iframe.style.width = '100%'; // Responsive width  
        iframe.style.height = 'auto';
      }

      if (this.getAttribute("style")) {
        iframe.style.cssText += this.getAttribute("style");
      }

      this.appendChild(iframe);

      window.addEventListener("resize", () => {
        this.updateIframeDimensions(iframe);
      });
    }

    updateIframeDimensions(iframe) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      iframe.style.width = viewportWidth < 640 ? "100%" : "400px"; // Example: use full width on small screens  
      iframe.style.height = viewportHeight < 640 ? "70vh" : "600px"; // Example: responsive height  
    }
  }

  customElements.define("embed-agent", EmbedAgent);
})();