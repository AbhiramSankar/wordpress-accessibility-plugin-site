const $ = jQuery;

let globalVal = {
  fontSize: 0,
  grayscale: 0,
  sepia: 0,
  contrast: 1,
  tts: false,
};

$(() => {
  //UI Controls
  $("#accessibility-button").on("click", () => {
    // Toggle accessibility menu
    $("#accessibility-menu").slideToggle();
  });

  //Update font size
  $(".font-size-control > .control > button").on("click", function () {
    let btn = this;

    $("body *")
      .filter(function () {
        // Check if the element has at least one text node with non-whitespace content
        return (
          $(this)
            .contents()
            .filter(function () {
              return (
                this.nodeType === Node.TEXT_NODE &&
                $.trim(this.nodeValue).length > 0
              );
            }).length > 0
        );
      })
      .each(function () {
        var size = parseInt($(this).css("font-size"));
        if (size > 0) {
          if (btn.className == "plus") {
            size = size + 1 + "px";
          } else {
            if (globalVal.fontSize > 0) {
              size = size - 1 + "px";
            }
          }
        }
        $(this).css({
          "font-size": size,
        });
      });

    if (this.className == "plus") {
      globalVal.fontSize += 1;
    } else {
      if (globalVal.fontSize > 0) {
        globalVal.fontSize -= 1;
      }
    }

    $(".font-size-control > .control > span").html(`${globalVal.fontSize}`);
  });

  //Color Mode
  $("input[name='color-mode']").on("change", function () {
    if (this.id == "grayscale") {
      globalVal.grayscale = this.value / 100;
    } else if (this.id == "sepia") {
      globalVal.sepia = this.value / 100;
    } else if (this.id == "contrast") {
      globalVal.contrast = 1 + this.value / 100;
    }
    // console.log(this.id, this.value, globalVal);
    $("html").css({
      filter: `grayscale(${globalVal.grayscale}) contrast(${globalVal.contrast}) sepia(${globalVal.sepia})`,
    });
  });

  //Reset Color Mode
  $(".color-control > .options > button").on("click", () => {
    globalVal.grayscale = 0;
    globalVal.sepia = 0;
    globalVal.contrast = 1;
    $("html").css({
      filter: "grayscale(0) contrast(1) sepia(0)",
    });
    $("input[name='color-mode']").val(0);
  });

  //TTS Setting
  function handleMouseEnter(event) {
    $().articulate("stop");
    // console.log(1, event.target)
    let element = $(event.target);
    if (element.is(":visible") && !element.is(":hidden")) {
      if (element.is("input") || element.is("textarea")) {
        console.log(element);
        $("body").keydown((e) => {
          if (
            e.ctrlKey &&
            e.altKey &&
            e.key === "s" &&
            element.is(":focus")
          ) {
            ttsEngine(element.val());
          }
        });
      } else if (element.is("p")) {
        element.articulate("speak");
      } else if (element.is("img") || element.is("video")) {
        ttsEngine(element.attr("alt"));
      } else {
        if (hasTextNodeWithContent(event.target)) {
          ttsEngine(element.text());
        }
      }
    }
  }

  function hasTextNodeWithContent(element) {
    return Array.from(element.childNodes).some(
      (node) =>
        node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0
    );
  }

  function ttsEngine(text) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice
    // Speak the text
    speechSynthesis.speak(utterance);
  }

  $("input[name='tts']").on("change", function () {
    if ($(this).is(":checked")) {
      ttsEngine(
        "Text to Speech has been enabled. Hover over the elements of the website to hear their content. For active inputs, press control, alt and s to read."
      );
      document.addEventListener("mouseover", handleMouseEnter);
    } else {
      ttsEngine("Text to Speech has been disabled");
      document.removeEventListener("mouseover", handleMouseEnter);
    }
  });
});
