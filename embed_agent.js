(function () {  
  class EmbedAgent extends HTMLElement {  
    constructor() {  
      super();  

      // Get the attributes from the custom element  
      const AppId = this.getAttribute("bbuilder-app-id");  
      const chatBubble = this.getAttribute("chat-bubble");  
      const minWidth = parseInt(this.getAttribute("min-width") || "300");  
      const minHeight = parseInt(this.getAttribute("min-height") || "400");  
      const maxWidth = parseInt(this.getAttribute("max-width") || "100%");  
      const maxHeight = parseInt(this.getAttribute("max-height") || "100%");  

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
      iframe.setAttribute("scrolling", this.getAttribute("scrolling") || "no");  
      iframe.setAttribute("frameborder", this.getAttribute("frameborder") || "0");  

      // Apply responsive styles  
      iframe.style.width = "100%";  
      iframe.style.height = "100vh";  
      iframe.style.border = "none";  

      if (chatBubble) {  
        iframe.style.position = "fixed";  
        iframe.style.bottom = "20px";  
        iframe.style.right = "20px";  
        iframe.style.zIndex = "1000";  
        iframe.style.maxWidth = "90%";  
        iframe.style.maxHeight = "90%";  
      }  

      // Ensure a minimum size  
      iframe.style.minWidth = `${minWidth}px`;  
      iframe.style.minHeight = `${minHeight}px`;  

      // Attach the iframe to the custom element  
      this.appendChild(iframe);  

      // Add a listener to the iframe to listen for messages  
      window.addEventListener("message", (event) => {  
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

          iframe.style.width = `${newWidth}px`;  
          iframe.style.height = `${newHeight}px`;  
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
