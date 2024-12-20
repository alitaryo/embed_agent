(function () {  
  // Create a custom HTML element 'Alita-embed-agent'  
  class EmbedAgent extends HTMLElement {  
    constructor() {  
      super();  

      // Get the attributes from the custom element  
      const AppId = this.getAttribute("bbuilder-app-id");  
      const chatBubble = this.getAttribute("chat-bubble");  
      const minWidth = parseInt(this.getAttribute("min-width"));  
      const minHeight = parseInt(this.getAttribute("min-height"));  
      const maxWidth = parseInt(this.getAttribute("max-width"));  
      const maxHeight = parseInt(this.getAttribute("max-height"));  

      // Create an iframe element  
      const iframe = document.createElement("iframe");  

      // Determine minimized state from localStorage  
      const isMinimized = localStorage.getItem("agentMinimized") === "true";  

      // Set the iframe attributes  
      iframe.setAttribute("id", `agent-${AppId}`);  
      iframe.setAttribute(  
        "src",  
        `${  
          this.getAttribute("host") || "https://app.alitahealth.ai/"  
        }/agent/${AppId}?minimized=${isMinimized}`  
      );  
      iframe.setAttribute("width", this.getAttribute("width") || "100%");  
      iframe.setAttribute("height", this.getAttribute("height") || "700");  
      iframe.setAttribute("scrolling", this.getAttribute("scrolling") || "no");  
      iframe.setAttribute(  
        "frameborder",  
        this.getAttribute("frameborder") || "0"  
      );  

      // Handle chat bubble styling or provided styling  
      if (chatBubble) {  
        iframe.style.position = "fixed";  
        iframe.style.bottom = "0px";  
        iframe.style.right = "0";  
        iframe.style.zIndex = "1000";  
        iframe.style.height = "auto";  
        iframe.style.width = "auto";  
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
        
        if (trustedOrigins.includes(event.origin)) {  
          console.log("Message received:", event.data);  

          const adjustIframeSize = (width, height) => {  
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

            iframe.style.width = newWidth + "px";  
            iframe.style.height = newHeight + "px";  
          };  

          if (event.data.type === "openApp") {  
            adjustIframeSize(event.data.width, event.data.height);  
            localStorage.setItem("agentMinimized", "false");  
          } else if (event.data.type === "closeApp") {  
            adjustIframeSize(event.data.width, event.data.height);  
            localStorage.setItem("agentMinimized", "true");  
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
