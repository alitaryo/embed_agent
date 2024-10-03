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
        `${this.getAttribute("host") || "https://app.alitahealth.ai/"}/agent/${AppId}`  
      );  
      iframe.setAttribute("width", "100%");  
      iframe.setAttribute("height", "80vh"); // Default height  
      iframe.setAttribute("scrolling", "no");  
      iframe.setAttribute("frameborder", "0");  

      if (chatBubble) {  
        iframe.style.position = 'fixed';  
        iframe.style.bottom = '0px';  
        iframe.style.right = '0';  
        iframe.style.zIndex = '1000';  
        iframe.style.width = '100%'; // Full width for chat bubble  
      }  

      if (this.getAttribute("style")) {  
        iframe.style.cssText += this.getAttribute("style");  
      }  

      this.appendChild(iframe);  

      this.updateIframeDimensions(iframe); // Set initial dimensions  
      window.addEventListener("resize", () => {  
        this.updateIframeDimensions(iframe);  
      });  
    }  

    updateIframeDimensions(iframe) {  
      const viewportWidth = window.innerWidth;  

      // Responsive width and height based on screen size  
      if (viewportWidth < 640) {  
        // Small screen adjustments  
        iframe.style.width = "100%";  
        iframe.style.height = "70vh";  
      } else {  
        // Larger screen adjustments  
        iframe.style.width = "400px";  
        iframe.style.height = "600px";  
      }  
    }  
  }  

  customElements.define("embed-agent", EmbedAgent);  
})();
