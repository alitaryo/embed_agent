(function () {  
  class EmbedAgent extends HTMLElement {  
    constructor() {  
      super();  

      // Get the attributes from the custom element  
      const AppId = this.getAttribute("bbuilder-app-id");  
      const chatBubble = this.getAttribute("chat-bubble");  
      const minWidth = parseInt(this.getAttribute("min-width")) || 300; // Add sensible default values  
      const minHeight = parseInt(this.getAttribute("min-height")) || 300;  
      const maxWidth = parseInt(this.getAttribute("max-width")) || 600;  
      const maxHeight = parseInt(this.getAttribute("max-height")) || 600;  

      // Create an iframe element  
      const iframe = document.createElement("iframe");  

      // Set the iframe attributes  
      iframe.setAttribute("id", `agent-${AppId}`);  
      iframe.setAttribute(  
        "src",  
        `${this.getAttribute("host") || "https://app.alitahealth.ai/"}agent/${AppId}`  
      );  
      iframe.setAttribute("scrolling", this.getAttribute("scrolling") || "no");  
      iframe.setAttribute("frameborder", this.getAttribute("frameborder") || "0");  

      // Apply initial style  
      let style = `width: 100%; height: 100%; border: none; position: fixed; z-index: 1000;`;  
      if (chatBubble) {  
        style += "bottom: 0; right: 0; width: auto; height: auto;";  
      }  

      // Override if custom style is set  
      if (this.getAttribute("style")) {  
        style = this.getAttribute("style");  
      }  
      iframe.setAttribute("style", style);  

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

          // Update styles for responsiveness  
          iframe.style.width = `${newWidth}px`;  
          iframe.style.height = `${newHeight}px`;  

          // For mobile responsiveness, ensure positioning is correct  
          iframe.style.left = `calc(50% - ${newWidth / 2}px)`;  
          iframe.style.bottom = "0";  
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
