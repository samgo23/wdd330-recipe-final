async function loadTemplate(path) {
  const response = await fetch(path);
  
  if (response.ok) { // if HTTP-status is 200-299 get the response body
    const template = await response.text();
    return template;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

export async function loadHeaderFooter() {
  // Get header and footer elements
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
  
  // Load header and footer templates
  const headerTemplate = await loadTemplate("snippets/header.html");
  const footerTemplate = await loadTemplate("snippets/footer.html");
  
  // Render header and footer templates
  if (headerElement && headerTemplate) {
    headerElement.innerHTML = headerTemplate;
  } else {
    console.error("Could not render header: header element or template is missing.");
  }
  
  if (footerElement && footerTemplate) {
    footerElement.innerHTML = footerTemplate;
  } else {
    console.error("Could not render footer: footer element or template is missing.");
  }
}
