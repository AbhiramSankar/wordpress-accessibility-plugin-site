const $ = jQuery;

let globalVal = {
  fontSize: 0,
  colorMode: "normal",
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

    $("body *").each(function () {
      if ($(this).text().length > 0) {
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
      }
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

  $("input[name='color-mode']").on("click", function () {
    if (this.id == "grayscale") {
      globalVal.colorMode == "grayscale";
      $("html").addClass("grayscale_filter");
    } else {
      globalVal.colorMode == "normal";
      $("html").removeClass("grayscale_filter");
    }
  });
});
