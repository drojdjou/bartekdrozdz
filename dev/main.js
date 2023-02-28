let e = document.querySelector("#email");

e.addEventListener("click", () => {
    console.log("ac");
    let m = "mailto:" + window.atob("YmFydGVrQGV2ZXJ5ZGF5M2QuY29t");
    window.location.href = m;
});