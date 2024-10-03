(function () {  
  // Create a custom HTML element 'alita-health.ai'  
  class EmbedAgent extends HTMLElement {  
    constructor() {  
      super();  

      // Get the attributes from the custom element  
      const AppId = this.getAttribute("bbuilder-app-id");  
      const chatBubble = this.getAttribute("chat-bubble");  
      const minWidth = this.getAttribute("min-width") || "300px"; // Set default min size for better mobile view  
      const minHeight = this.getAttribute("min-height") || "300px";  
      const maxWidth = this.getAttribute("max-width") || "100%"; // Use relative units for responsiveness  
      const maxHeight = this.getAttribute("max-height") || "100%";  

      // Create an iframe element  
      const iframe = document.createElement("iframe");  

      // Set the iframe attributes  
      iframe.setAttribute("id", `agent-${AppId}`);  
      iframe.setAttribute(  
        "src",  
        `${  
          this.getAttribute("host") || "https://app.example.com/"  
        }/agent/${AppId}`  
      );  
      iframe.setAttribute("scrolling", this.getAttribute("scrolling") || "no");  
      iframe.setAttribute(  
        "frameborder",  
        this.getAttribute("frameborder") || "0"  
      );  

      // Add responsive styles  
      iframe.style.width = "100%";       // Use 100% to fit the parent container  
      iframe.style.height = "100vh";     // Full viewport height for mobile devices  
      iframe.style.maxWidth = maxWidth;  // Set max-width for larger screens  
      iframe.style.maxHeight = maxHeight;  
      iframe.style.minWidth = minWidth;  // Ensure it's not smaller than minWidth  
      iframe.style.minHeight = minHeight;  

      if (chatBubble) {  
        iframe.style.position = "fixed";  
        iframe.style.bottom = "0px";  
        iframe.style.right = "0";  
        iframe.style.zIndex = "1000";  
        iframe.style.height = "auto";  
        iframe.style.width = "auto";  
      }  

      // Attach the iframe to the custom element  
      this.appendChild(iframe);  

      // Adjust iframe size based on window resize  
      const adjustIframeSize = () => {  
        const newWidth = window.innerWidth < parseInt(minWidth, 10)  
          ? minWidth  
          : '100%';  
        const newHeight = window.innerHeight < parseInt(minHeight, 10)  
          ? minHeight  
          : '100vh';  
        
        iframe.style.width = newWidth;  
        iframe.style.height = newHeight;  
      };  

      window.addEventListener("resize", adjustIframeSize);  
      adjustIframeSize(); // Initial adjust  

      // Add a listener to the iframe to listen for messages  
      window.addEventListener("message", (event) => {  
        if (event.data.type === "openApp" || event.data.type === "closeApp") {  
          adjustIframeSize();  
        }  
      });  
    }  
  }  
  // Register the custom element  
  customElements.define("embed-agent", EmbedAgent);  
})();
