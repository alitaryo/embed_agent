(function () {  
  class EmbedAgent extends HTMLElement {  
    constructor() {  
      super();  

      const AppId = this.getAttribute("bbuilder-app-id");  
      const chatBubble = this.getAttribute("chat-bubble");  
      const minWidth = this.getAttribute("min-width");  
      const minHeight = this.getAttribute("min-height");  
      const maxWidth = this.getAttribute("max-width");  
      const maxHeight = this.getAttribute("max-height");  

      const iframe = document.createElement("iframe");  

      iframe.setAttribute("id", `agent-${AppId}`);  
      iframe.setAttribute(  
        "src",  
        `${this.getAttribute("host") || "https://app.alitahealth.ai/"}/agent/${AppId}`  
      );  
      iframe.setAttribute("width", this.getAttribute("width") || "100%");  
      iframe.setAttribute("height", this.getAttribute("height") || "80vh");  
      iframe.setAttribute("scrolling", this.getAttribute("scrolling") || "no");  
      iframe.setAttribute("frameborder", this.getAttribute("frameborder") || "0");  
      iframe.setAttribute("allow", "clipboard-read; clipboard-write");  

      if (chatBubble) {  
        iframe.style.position = 'fixed';  
        iframe.style.bottom = '0px';  
        iframe.style.right = '0';  
        iframe.style.zIndex = '1000';  
      }  

      if (minWidth) {  
        iframe.style.minWidth = minWidth;  
      }  
      if (minHeight) {  
        iframe.style.minHeight = minHeight;  
      }  
      if (maxWidth) {  
        iframe.style.maxWidth = maxWidth;  
      }  
      if (maxHeight) {  
        iframe.style.maxHeight = maxHeight;  
      }  

      if (this.getAttribute("style")) {  
        iframe.style.cssText += this.getAttribute("style");  
      }  

      this.appendChild(iframe);  

      this.updateIframeDimensions(iframe);  
      window.addEventListener("resize", () => {  
        this.updateIframeDimensions(iframe);  
      });  

      window.addEventListener("message", (event) => {  
        if (event.data.type === "agent-embed-resize" && event.data.width && event.data.height) {  
          iframe.style.width = event.data.width + "px";  
          iframe.style.height = event.data.height + "px";  
        }  
      });  
    }  

    updateIframeDimensions(iframe) {  
      const viewportWidth = window.innerWidth;  

      if (viewportWidth < 640) {  
        iframe.style.width = "100%";  
        iframe.style.height = "70vh";  
      } else {  
        iframe.style.width = "400px";  
        iframe.style.height = "600px";  
      }  
    }  
  }  

  customElements.define("embed-agent", EmbedAgent);  
})();
