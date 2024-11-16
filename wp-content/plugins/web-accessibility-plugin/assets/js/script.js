const $ = jQuery;

let globalVal = {
  fontSize: 0,
  colorAndContrast: {
    filter: "none",
    contrast: 1,
  },
  tts: false,
  ttsSetting: {
    voice: 0,
    speed: 1,
    pitch: 1,
  },
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
  $("#color-blind-filters").select2({
    dropdownParent: $("#color-blind-wrapper"),
    width: "100%",
    minimumResultsForSearch: -1,
  });

  $("#color-blind-filters").on("select2:select", function () {
    // console.log(this.value);
    globalVal.colorAndContrast.filter = this.value;
    $("html").css({
      filter: `contrast(${globalVal.colorAndContrast.contrast}) url("wp-content/plugins/web-accessibility-plugin/assets/svg/colorBlindFilters.svg#${globalVal.colorAndContrast.filter}")`,
      "webkit-filter": `contrast(${globalVal.colorAndContrast.contrast}) url("wp-content/plugins/web-accessibility-plugin/assets/svg/colorBlindFilters.svg#${globalVal.colorAndContrast.filter}")`,
    });
  });

  $("input[name='color-mode']").on("change", function () {
    // if (this.id == "grayscale") {
    //   globalVal.grayscale = this.value / 100;
    // } else if (this.id == "sepia") {
    //   globalVal.sepia = this.value / 100;
    // } else if (this.id == "contrast") {
    globalVal.colorAndContrast.contrast = 1 + this.value / 100;
    // }
    // console.log(this.id, this.value, globalVal);
    $("html").css({
      filter: `contrast(${globalVal.colorAndContrast.contrast}) url("wp-content/plugins/web-accessibility-plugin/assets/svg/colorBlindFilters.svg#${globalVal.colorAndContrast.filter}")`,
      "webkit-filter": `contrast(${globalVal.colorAndContrast.contrast}) url("wp-content/plugins/web-accessibility-plugin/assets/svg/colorBlindFilters.svg#${globalVal.colorAndContrast.filter}")`,
    });
  });

  //Reset Color Mode
  $(".color-control > .options > button").on("click", () => {
    globalVal.contrast = 1;
    $("html").css({
      filter: "contrast(1)",
    });
    $("input[name='color-mode']").val(0);
  });

  //TTS Setting
  function handleMouseEnter(event) {
    // console.log(1, event.target)
    let element = $(event.target);
    if (element.is(":visible") && !element.is(":hidden")) {
      if (element.is("input") || element.is("textarea")) {
        // console.log(element);
        $("body").keydown((e) => {
          if (e.ctrlKey && e.altKey && e.key === "s" && element.is(":focus")) {
            ttsEngine(element.val());
          }
        });
      } else if (element.is("p")) {
        ttsEngine(element.text());
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

  var voicesData = [];
  window.speechSynthesis.onvoiceschanged = function () {
    let voicesList = window.speechSynthesis.getVoices();
    voicesList.forEach((voice, index) => {
      voicesData.push({ id: index, text: voice.name });
    });
    $("#tss-voice").select2({
      data: voicesData,
      dropdownParent: $("#tts-voice-wrapper"),
      width: "100%",
      minimumResultsForSearch: -1,
    });
  };
  $("#tss-voice").on("select2:select", function () {
    globalVal.ttsSetting.voice = this.value;
  });

  $("input[name='tss-option']").on("change", function () {
    if(this.id == "speed"){
      globalVal.ttsSetting.speed = this.value;
    }
    if(this.id == "pitch"){
      globalVal.ttsSetting.pitch = this.value;
    }
    console.log(globalVal.ttsSetting)
  })

  function ttsEngine(text) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[globalVal.ttsSetting.voice]; // Choose a specific voice
    utterance.pitch = globalVal.ttsSetting.pitch;
    utterance.rate = globalVal.ttsSetting.speed;
    // Speak the text
    speechSynthesis.speak(utterance);
  }

  $(".text-to-speech-control > .tts-options > button").on("click", () => {
    globalVal.ttsSetting.pitch = 1;
    globalVal.ttsSetting.speed = 1;
    globalVal.ttsSetting.voice = 0;
    $("input[name='tss-option']").val(1);
    $("#tss-voice").val(0)
    $('#tss-voice').trigger('change');
  });

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
