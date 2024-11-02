// document.addEventListener("DOMContentLoaded", function() {
//     const contrastBtn = document.getElementById("ah-contrast-toggle");
//     const increaseFontBtn = document.getElementById("ah-increase-font");
//     const decreaseFontBtn = document.getElementById("ah-decrease-font");

//     // Contrast toggle
//     if (localStorage.getItem("contrastMode") === "high") {
//         document.body.classList.add("high-contrast");
//     }

//     contrastBtn.addEventListener("click", function() {
//         document.body.classList.toggle("high-contrast");
//         const contrastMode = document.body.classList.contains("high-contrast") ? "high" : "normal";
//         localStorage.setItem("contrastMode", contrastMode);
//     });

//     // Font resizing
//     let fontSize = localStorage.getItem("fontSize") || "normal";
//     document.body.classList.add(fontSize);

//     increaseFontBtn.addEventListener("click", function() {
//         document.body.classList.remove("small-font", "normal");
//         document.body.classList.add("large-font");
//         localStorage.setItem("fontSize", "large-font");
//     });

//     decreaseFontBtn.addEventListener("click", function() {
//         document.body.classList.remove("large-font", "normal");
//         document.body.classList.add("small-font");
//         localStorage.setItem("fontSize", "small-font");
//     });
// });


jQuery(document).ready(function($) {

    $('#accessibility-button').click(function() {
        $('.accessibility-dropdown').toggleClass('open');
    });

    // Close the dropdown if clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.accessibility-dropdown').length) {
            $('.accessibility-dropdown').removeClass('open');
        }
    });

    let fontSize = parseInt($('body').css('font-size')); // Initial font size

    function autoreset(){
        $('body').css('filter', 'none');
    }

    // Increase Font Size
    $('#increase-font').click(function() {
        fontSize += 5;
        $('body').css('font-size', fontSize + 'px');
    });

    // Decrease Font Size
    $('#decrease-font').click(function() {
        if (fontSize > 10) {
            fontSize -= 5;
            $('body').css('font-size', fontSize + 'px');
        }
    });

    // High Contrast Mode
    $('#contrast-toggle').click(function() {
        autoreset();
        $('body').css('filter', 'contrast(100)');
        $('body').css('background-color', 'black');
        $('body').css('color', 'White');
        $('body a').css({'background-color': 'yellow', 'color': 'black'});
    });

    // Grayscale Mode
    $('#grayscale-toggle').click(function() {
        autoreset();
        $('body').css('filter', 'grayscale(1)');
        console.log("Grayscale applied");
    });

    // Sepia Mode
    $('#sepia-toggle').click(function() {
        autoreset();
        $('body').css('filter', 'sepia(1)');
        console.log("Sepia applied");
    });

    $('#contrast-dark').click(function() {
        autoreset();
        $('body').css('filter', 'invert(1) hue-rotate(180deg)'); // Invert colors for dark mode
        $('body').css('background-color', 'black');
        $('body').css('color', 'red');
        $('body p').css('color', 'green');
        $('body a').css({'background-color': 'yellow', 'color': 'black'});
    });

    // Light High Contrast Mode
    $('#contrast-light').click(function() {
        autoreset();
        $('body').css('filter', 'invert(0.9)'); // Slightly invert for light mode
        console.log("Light high contrast mode applied");
    });

    // Blue High Contrast Mode
    $('#contrast-blue').click(function() {
        autoreset();
        $('body').css('filter', 'invert(1) hue-rotate(180deg) contrast(1.2)'); // Invert colors and enhance contrast for blue mode
        console.log("Blue high contrast mode applied");
    });

    // Reset filter on re-click
    $('#reset-toggle').click(function() {
        $('body').css('filter', 'none');
        $('body').css('font-size', '16px');
    });
});

