(function ($) {
  "use strict";

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  $("body").scrollspy({
    target: "#sideNav",
  });

  $("#themeToggle").click(function () {
    $("body").toggleClass("dark-mode");

    const themeIcon = $("#themeIcon");
    if ($("body").hasClass("dark-mode")) {
      themeIcon.removeClass("fa-sun").addClass("fa-moon");
    } else {
      themeIcon.removeClass("fa-moon").addClass("fa-sun");
    }
  });

  function loadTranslations(language) {
    $.getJSON("js/languages.json")
      .done(function (translations) {
        // Lógica de tradução
        $.each(translations[language], function (key, value) {
          const element = $("#" + key);
          if (element.length) {
            element.html(value);
          } else {
            console.warn("Elemento com ID:", key, "não encontrado no HTML.");
          }
        });
      })
      .fail(function (jqxhr, textStatus, error) {
        console.error("Falha ao carregar o arquivo JSON: ", textStatus, error);
      });
  }

  $("#languageSelector").change(function () {
    const selectedLanguage = $(this).val();
    loadTranslations(selectedLanguage);
  });

  $(document).ready(function () {
    const defaultLanguage = "pt";
    loadTranslations(defaultLanguage);
  });
})(jQuery);
