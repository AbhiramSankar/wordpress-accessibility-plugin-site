const $ = jQuery;

let globalVal;
if (!sessionStorage.getItem("globalVal")) {
  sessionStorage.setItem(
    "globalVal",
    JSON.stringify({
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
    })
  );
}
globalVal = JSON.parse(sessionStorage.getItem("globalVal"));

$(() => {
  /* UI Controls */
  $("#accessibility-button").on("click", () => {
    // Toggle accessibility menu
    $("#accessibility-menu").slideToggle();
  });

  //Color Mode Select Init
  $("#color-blind-filters").select2({
    dropdownParent: $("#color-blind-wrapper"),
    width: "100%",
    minimumResultsForSearch: -1,
  });

  //TTS Voice Data Select Init
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

    //Set stored font size
    if (globalVal.fontSize > 0) {
      updateFontSize(function (element) {
        // console.log($(".select2-selection__rendered"), $(".select2"), "CJ1");
        var size = parseInt($(element).css("font-size"));
        if (size > 0) {
          size = size + globalVal.fontSize + "px";
        }

        if (!$(element).hasClass(".select2-selection__rendered")) {
          $(element).css({
            "font-size": size,
          });
        }
      });
      $(".font-size-control > .control > span").html(`${globalVal.fontSize}`);
    }

    //Set stored filter
    if (globalVal.colorAndContrast.filter !== "none") {
      $("#color-blind-filters")
        .val(globalVal.colorAndContrast.filter)
        .trigger("change");
    }

    //Set stored contrast
    if (globalVal.colorAndContrast.contrast !== 1) {
      $("input[name='color-mode']")
        .val((globalVal.colorAndContrast.contrast - 1) * 100)
        .trigger("change");
    }

    if (globalVal.tts) {
      $("input[name='tts']").prop("checked", globalVal.tts).trigger("change");
    }

    if (globalVal.ttsSetting.voice !== 0) {
      $("#tss-voice").val(globalVal.ttsSetting.voice).trigger("change");
    }

    if (globalVal.ttsSetting.speed !== 1) {
      $("input[name='tss-option']#speed")
        .val(globalVal.ttsSetting.speed)
        .trigger("change");
    }

    if (globalVal.ttsSetting.pitch !== 1) {
      $("input[name='tss-option']#pitch")
        .val(globalVal.ttsSetting.pitch)
        .trigger("change");
    }
  };

  $("#tss-voice").on("select2:select", function () {
    globalVal.ttsSetting.voice = this.value;
    sessionStorage.setItem("globalVal", JSON.stringify(globalVal));
  });

  // Function to update font size
  function updateFontSize(callback = null) {
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
        callback(this);
      });
  }

  //Update font size
  $(".font-size-control > .control > button").on("click", function () {
    let btn = this;
    updateFontSize(function (element) {
      var size = parseInt($(element).css("font-size"));
      if (size > 0) {
        if (btn.className == "plus") {
          size = size + 1 + "px";
        } else {
          if (globalVal.fontSize > 0) {
            size = size - 1 + "px";
          }
        }
      }
      $(element).css({
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
    sessionStorage.setItem("globalVal", JSON.stringify(globalVal));
  });

  //Update Color Blind Filter
  $("#color-blind-filters").on("change", function () {
    // console.log(this.value);
    globalVal.colorAndContrast.filter = this.value;
    $("html").css({
      filter: `contrast(${globalVal.colorAndContrast.contrast}) url("/wordpress-accessibility-plugin-site/wp-content/plugins/web-accessibility-plugin/assets/svg/colorBlindFilters.svg#${globalVal.colorAndContrast.filter}")`,
      "webkit-filter": `contrast(${globalVal.colorAndContrast.contrast}) url("/wordpress-accessibility-plugin-site/wp-content/plugins/web-accessibility-plugin/assets/svg/colorBlindFilters.svg#${globalVal.colorAndContrast.filter}")`,
    });
    sessionStorage.setItem("globalVal", JSON.stringify(globalVal));
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
      filter: `contrast(${globalVal.colorAndContrast.contrast}) url("/wordpress-accessibility-plugin-site/wp-content/plugins/web-accessibility-plugin/assets/svg/colorBlindFilters.svg#${globalVal.colorAndContrast.filter}")`,
      "webkit-filter": `contrast(${globalVal.colorAndContrast.contrast}) url("/wordpress-accessibility-plugin-site/wp-content/plugins/web-accessibility-plugin/assets/svg/colorBlindFilters.svg#${globalVal.colorAndContrast.filter}")`,
    });
    if (globalVal.tts) {
      ttsEngine(`Contrast changed to ${globalVal.colorAndContrast.contrast}`);
    }
    sessionStorage.setItem("globalVal", JSON.stringify(globalVal));
  });

  //Reset Color Mode
  $(".color-control > .options > button").on("click", () => {
    globalVal.contrast = 1;
    $("html").css({
      filter: "contrast(1)",
    });
    $("#color-blind-filters").val("none").trigger("change");
    $("input[name='color-mode']").val(0).trigger("change");
    if (globalVal.tts) {
      ttsEngine(`Contrast reset to ${globalVal.colorAndContrast.contrast}`);
    }
    sessionStorage.setItem("globalVal", JSON.stringify(globalVal));
    // $("input[name='color-mode']").val(0);
  });

  //TTS Setting
  function handleMouseEnter(event) {
    // console.log(1, event.target)
    let element = $(event.target);
    if (element.is(":visible") && !element.is(":hidden")) {
      if (element.is("input") || element.is("textarea")) {
        // console.log(element);
        let type = element.attr("type");
        let id = element.attr("id");
        // console.log(type);
        if (type == "checkbox" || type == "radio") {
          let checked = element.is(":checked") ? "checked" : "unchecked";
          ttsEngine((id ? id + " " : "") + type + " input");
          element.on("click", () => {
            ttsEngine(`${id ? id : type} is ${checked}`);
          });
        } else if (type == "slider") {
          ttsEngine((id ? id + " " : "") + type + " input");
          element.on("change", () => {
            ttsEngine(`${id ? id : type} changed to ${element.val()}`);
          });
        } else if (type == "submit") {
          ttsEngine(element.val());
        } else {
          ttsEngine(type + " input");
          $("body").keydown((e) => {
            if (
              e.ctrlKey &&
              e.altKey &&
              e.key === "s" &&
              element.is(":focus")
            ) {
              ttsEngine(codeParse(element.val()));
            }
          });
        }
      } else if (element.is("p")) {
        let text = "";
        if (element.text()) {
          text = text + element.text();
        }
        if (element.attr("aria-label")) {
          text = text + element.attr("aria-label");
        }
        if (element.attr("aria-description")) {
          text = text + element.attr("aria-description");
        }
        ttsEngine(codeParse(text));
      } else if (element.is("img") || element.is("video")) {
        ttsEngine(element.attr("alt"));
      } else {
        if (hasTextNodeWithContent(event.target)) {
          let text = "";
          if (element.text()) {
            text = text + element.text();
          }
          if (element.attr("aria-label")) {
            text = text + element.attr("aria-label");
          }
          if (element.attr("aria-description")) {
            text = text + element.attr("aria-description");
          }
          ttsEngine(codeParse(text));
        }
      }
    }
  }

  function hasTextNodeWithContent(element) {
    let hasTextNode = Array.from(element.childNodes).some(
      (node) =>
        node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0
    );

    let hasAria =
      ($(element).attr("aria-label") &&
        $.trim($(element).attr("aria-label")).length > 0) ||
      ($(element).attr("aria-description") &&
        $.trim($(element).attr("aria-description")).length > 0);

    return hasTextNode || hasAria;
  }

  function codeParse(text) {
    // text.replaceAll("!", "not").replaceAll("!==", "not equal to");
    let readable;
    console.log(detectContentType(text), text);
    if (detectContentType(text) == "HTML") {
      readable = text
        .replace(/<!--(.*?)/g, "HTML comment: $1.")
        .replace("-->", "HTML comment end.");
      // console.log(readable);
    } else {
      readable = text
        .replace(/\/\/(.*)/g, "Comment: $1.")
        .replace(
          /\/\*([\s\S]*?)/g,
          (match, p1) => `Comment block: ${p1.trim().replace(/\n/g, ". ")}`
        )
        .replace(/\*\//g, (match, p1) => `Comment block end.`)
        .replace(/=>/g, "Function")
        .replace(/\{/g, " open curly brace ")
        .replace(/\}/g, " close curly brace ")
        .replace(">", "greater than")
        .replace("<", "less than")
        .replace("!==", "not equal to")
        .replace(/!/g, "not");
      console.log(readable, text);
    }
    return readable;
  }

  function detectContentType(text) {
    const htmlRegex = /<\/?[a-z][^>]*>/i;
    const commentRegex = /<!--[\s\S]*?-->/;
    if (htmlRegex.test(text) || commentRegex.test(text)) {
      return "HTML";
    }

    if (/^[\s\S]*{[\s\S]*:[\s\S]*;[\s\S]*}$/gm.test(text)) {
      return "CSS";
    }

    return "Others";
  }

  $("input[name='tss-option']").on("change", function () {
    if (this.id == "speed") {
      globalVal.ttsSetting.speed = this.value;
      if (globalVal.tts) {
        ttsEngine(`Voice Speed changed to ${globalVal.ttsSetting.speed}`);
      }
    }
    if (this.id == "pitch") {
      globalVal.ttsSetting.pitch = this.value;
      if (globalVal.tts) {
        ttsEngine(`Voice Pitch changed to ${globalVal.ttsSetting.pitch}`);
      }
    }

    // console.log(globalVal.ttsSetting);
    sessionStorage.setItem("globalVal", JSON.stringify(globalVal));
  });

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
    $("#tss-voice").val(0);
    $("#tss-voice").trigger("change");
    sessionStorage.setItem("globalVal", JSON.stringify(globalVal));
    if (globalVal.tts) {
      ttsEngine(`Voice Speed and pitch reset to 1`);
    }
  });

  $("input[name='tts']").on("change", function () {
    if ($(this).is(":checked")) {
      globalVal.tts = true;
      ttsEngine(
        "Text to Speech has been enabled. Hover over the elements of the website to hear their content. For active inputs, press control, alt and s to read."
      );
      document.addEventListener("mouseover", handleMouseEnter);
    } else {
      globalVal.tts = false;
      ttsEngine("Text to Speech has been disabled");
      document.removeEventListener("mouseover", handleMouseEnter);
    }
    sessionStorage.setItem("globalVal", JSON.stringify(globalVal));
  });
});
