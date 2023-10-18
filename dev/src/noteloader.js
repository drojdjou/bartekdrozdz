const parseMD = () => {
    let container = document.querySelector("article");
    
    let content = container.innerHTML;
    content = content.replace(/CO2/g, "CO₂");
    content = marked.parse(content);

    container.innerHTML = content;
}

parseMD();