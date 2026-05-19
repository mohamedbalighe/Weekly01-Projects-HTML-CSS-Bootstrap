 var Scrolling = document.querySelectorAll(".ToScroll");
window.addEventListener("scroll", function() {
    
    for (var i = 0; i < Scrolling.length; i++) {
         var id = Scrolling[i].getAttribute("href"); 
        var section = document.querySelector(id);

        if (section) {
            var box = section.getBoundingClientRect();

            if (box.top <= 150 && box.bottom >= 150) {
                Scrolling[i].style.color = "rgb(99,102,241)"; 
            } else {
                Scrolling[i].style.color = "";
            }
        }
    }
});

var Dark=document.querySelector(".Mood");
Dark.addEventListener("click", function(){
document.documentElement.classList.toggle("dark");

})



const carousel = document.querySelector("#testimonials-carousel");
const nextBtn = document.querySelector("#next-testimonial");
const prevBtn = document.querySelector("#prev-testimonial");
const indicators = document.querySelectorAll(".carousel-indicator");
const cards = document.querySelectorAll(".testimonial-card");

let currentIndex = 0;

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    
    carousel.style.transform = `translateX(${currentIndex * cardWidth}px)`;
    
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add("bg-accent");
            indicator.classList.remove("bg-slate-400", "dark:bg-slate-600");
            indicator.setAttribute("aria-selected", "true");
        } else {
            indicator.classList.remove("bg-accent");
            indicator.classList.add("bg-slate-400");
            indicator.setAttribute("aria-selected", "false");
        }
    });
}

nextBtn.addEventListener("click", () => {
    const maxIndex = cards.length - Math.round(carousel.offsetWidth / cards[0].offsetWidth);
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0; 
    }
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        const maxIndex = cards.length - Math.round(carousel.offsetWidth / cards[0].offsetWidth);
        currentIndex = maxIndex; 
    }
    updateCarousel();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
    });
});

window.addEventListener("resize", updateCarousel);




var Viwe_All=document.querySelector("#Viwe-All");
var websites_Projects=document.querySelector("#websites-Projects");
var App_Projects=document.querySelector("#App-Projects");
var Design_projects=document.querySelector("#Design-projects");
var e_commerce=document.querySelector("#e-commerce");


var we_b=document.querySelector(".web");
var Ap_p=document.querySelector(".App");
var desi_gen=document.querySelector(".desigen");
var web_2=document.querySelector(".web2");
var App_2=document.querySelector(".App2");
var E_co=document.querySelector(".E-co");
var web_3=document.querySelector(".web3");
var App_3=document.querySelector(".App3");
var App_4=document.querySelector(".App4");
var design_2=document.querySelector(".design2");

Viwe_All.addEventListener("click", function() {
    var allProjects = [we_b, Ap_p, desi_gen, web_2, App_2, E_co, web_3, App_3, App_4, design_2];
    allProjects.forEach(function(project) {
        if(project) project.classList.remove("hidden");
    });
});

    websites_Projects.addEventListener("click", function(){
        we_b.classList.remove("hidden");
        web_2.classList.remove("hidden");
        web_3.classList.remove("hidden");

         Ap_p.classList.add("hidden");
        desi_gen.classList.add("hidden");
        App_2.classList.add("hidden");
        E_co.classList.add("hidden");
        App_3.classList.add("hidden");
        App_4.classList.add("hidden");

        design_2.classList.add("hidden");
    })

     App_Projects.addEventListener("click", function(){
        Ap_p.classList.remove("hidden");
        App_2.classList.remove("hidden");
        App_3.classList.remove("hidden");
         App_4.classList.remove("hidden");


         we_b.classList.add("hidden");
        desi_gen.classList.add("hidden");
        web_2.classList.add("hidden");
        E_co.classList.add("hidden");
        web_3.classList.add("hidden");
        design_2.classList.add("hidden");
    })

    Design_projects.addEventListener("click", function(){
        desi_gen.classList.remove("hidden");
        design_2.classList.remove("hidden");

         we_b.classList.add("hidden");
        Ap_p.classList.add("hidden");
        web_2.classList.add("hidden");
        E_co.classList.add("hidden");
        web_3.classList.add("hidden");
        App_2.classList.add("hidden");
        App_3.classList.add("hidden");
        App_4.classList.add("hidden");


    })

        e_commerce.addEventListener("click", function(){
        E_co.classList.remove("hidden");

        Ap_p.classList.add("hidden");
        desi_gen.classList.add("hidden");
        App_2.classList.add("hidden");
        we_b.classList.add("hidden");
        web_2.classList.add("hidden");
        web_3.classList.add("hidden");
        App_3.classList.add("hidden");
        App_4.classList.add("hidden");

        design_2.classList.add("hidden");
    })



document.addEventListener("DOMContentLoaded", function () {
     const settingsToggle = document.querySelector("#settings-toggle");
    const settingsSidebar = document.querySelector("#settings-sidebar");
    const closeSettings = document.querySelector("#close-settings");

    if (settingsToggle && settingsSidebar) {
        settingsToggle.addEventListener("click", () => settingsSidebar.classList.remove("translate-x-full"));
    }
    if (closeSettings && settingsSidebar) {
        closeSettings.addEventListener("click", () => settingsSidebar.classList.add("translate-x-full"));
    }
 
    const fontOptions = document.querySelectorAll(".font-option");
    fontOptions.forEach(button => {
        button.addEventListener("click", function () {
            fontOptions.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            
            const chosenFont = this.getAttribute("data-font");
            document.body.style.fontFamily = chosenFont;
        });
    });
 
    const colorButtons = document.querySelectorAll(".color-option");

     function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
            : null;
    }

     const colorPalettes = {
        "#6366f1": { secondary: "#8b5cf6", accent: "#ec4899" },   
        "#10b981": { secondary: "#06b6d4", accent: "#f59e0b" },   
        "#f59e0b": { secondary: "#ef4444", accent: "#ec4899" },   
        "#3b82f6": { secondary: "#6366f1", accent: "#8b5cf6" },   
        "#ef4444": { secondary: "#f97316", accent: "#ec4899" },   
        "#8b5cf6": { secondary: "#6366f1", accent: "#ec4899" },   
        "#ec4899": { secondary: "#8b5cf6", accent: "#f59e0b" },   
        "#14b8a6": { secondary: "#06b6d4", accent: "#10b981" },   
      };

    colorButtons.forEach(button => {
        button.addEventListener("click", function () {
             colorButtons.forEach(btn => btn.classList.remove("ring-4", "ring-slate-400"));
            this.classList.add("ring-4", "ring-slate-400");

             const selectedColor = this.getAttribute("data-color");
            const palette = colorPalettes[selectedColor] || { secondary: selectedColor, accent: selectedColor };

             document.documentElement.style.setProperty("--color-primary", selectedColor);
            document.documentElement.style.setProperty("--color-secondary", palette.secondary);
            document.documentElement.style.setProperty("--color-accent", palette.accent);

         });
    });

    const resetBtn = document.getElementById("reset-settings");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {

             document.documentElement.style.removeProperty("--color-primary");
            document.documentElement.style.removeProperty("--color-secondary");
            document.documentElement.style.removeProperty("--color-accent");

             document.body.style.fontFamily = "";

             colorButtons.forEach(btn => btn.classList.remove("ring-4", "ring-slate-400"));

             fontOptions.forEach(btn => btn.classList.remove("active"));

         });
    }
});



