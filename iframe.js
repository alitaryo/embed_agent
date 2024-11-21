(function () {  
  // Create a custom HTML element 'Alita-embed-agent'  
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

      // Determine minimized state from localStorage  
      const isMinimized = localStorage.getItem("agentMinimized") === "true";  

      // Set the iframe attributes  
      iframe.setAttribute("id", `agent-${AppId}`);  
      iframe.setAttribute(  
        "src",  
        `${this.getAttribute("host") || "https://app.alitahealth.ai/"  
        }/agent/${AppId}?minimized=${isMinimized}`  
      );  
      iframe.setAttribute("width", this.getAttribute("width") || "100%");  
      iframe.setAttribute("height", this.getAttribute("height") || "700");  
      iframe.setAttribute("scrolling", this.getAttribute("scrolling") || "no");  
      iframe.setAttribute(  
        "frameborder",  
        this.getAttribute("frameborder") || "0"  
      );  
      iframe.setAttribute("allow", "clipboard-read; clipboard-write");  

      // Handle chat bubble styling or provided styling  
      if (chatBubble) {  
        iframe.setAttribute(  
          "style",  
          "position: fixed; bottom: 0; right: 0; z-index: 1000; height: auto; width: auto;"  
        );  
      }  

      if (this.getAttribute("style")) {  
        iframe.setAttribute("style", this.getAttribute("style"));  
      }  

      // Attach the iframe to the custom element  
      this.appendChild(iframe);  

      // Add a listener to the iframe to listen for messages  
      window.addEventListener("message", (event) => {  
        // List of trusted origins  
        const trustedOrigins = [  
          "https://app.alitahealth.ai",  
          "http://localhost:3000"  
        ];  

        // Event condition checks, with width and height data handling  
        if (trustedOrigins.includes(event.origin)) {  
          console.log("Message received:", event.data);  

          // Handle different types of messages  
          if (event.data.type === "alita-embed-open" && event.data.width && event.data.height) {  
            iframe.style.width = event.data.width;  
            iframe.style.height = event.data.height;  

            if (minWidth && parseInt(event.data.width) < parseInt(minWidth)) {  
              iframe.style.width = minWidth;  
            }  

            if (minHeight && parseInt(event.data.height) < parseInt(minHeight)) {  
              iframe.style.height = minHeight;  
            }  

            if (maxWidth && parseInt(event.data.width) > parseInt(maxWidth)) {  
              iframe.style.maxWidth = maxWidth;  
            }  

            if (maxHeight && parseInt(event.data.height) > parseInt(maxHeight)) {  
              iframe.style.maxHeight = maxHeight;  
            }  

            localStorage.setItem("agentMinimized", "false");  

          } else if (event.data.type === "alita-embed-close") {  
            setTimeout(() => {  
              iframe.style.width = "auto";  
              iframe.style.height = "auto";  
            }, 300);  

            localStorage.setItem("agentMinimized", "true");  

          } else if (event.data.type === "alita-embed-resize" && event.data.width && event.data.height) {  
            iframe.width = event.data.width;  
            iframe.height = event.data.height;  
            iframe.style.width = (parseInt(event.data.width) + 20) + "px";  
            iframe.style.height = (parseInt(event.data.height) + 20) + "px";  
          }  
        } else {  
          console.warn("Untrusted origin:", event.origin);  
        }  
      });  
    }  
  }  

  // Register the custom element  
  customElements.define("embed-agent", EmbedAgent);  
})();
