/* ====== Index ======

1. JEKYLL INSTANT SEARCH
2. SCROLLBAR CONTENT
3. TOOLTIPS AND POPOVER
4. JVECTORMAP DASHBOARD
5. JVECTORMAP ANALYTICS
6. JVECTORMAP WIDGET
7. MULTIPLE SELECT
8. LOADING BUTTON
  8.1. BIND NORMAL BUTTONS
  8.2. BIND PROGRESS BUTTONS AND SIMULATE LOADING PROGRESS
9. TOASTER
10. PROGRESS BAR

====== End ======*/

$(document).ready(function() {
  "use strict";

  /*======== 1. JEKYLL INSTANT SEARCH ========*/

  var searchInput = $('#search-input');
  if(searchInput.length != 0){
    SimpleJekyllSearch.init({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('search-results'),
      dataSource: '/assets/data/search.json',
      searchResultTemplate: '<li><div class="link"><a href="{link}">{label}</a></div><div class="location">{location}</div><\/li>',
      noResultsText: '<li>No results found</li>',
      limit: 10,
      fuzzy: true,
    });
  }


  /*======== 2. SCROLLBAR CONTENT ========*/

  var dataScrollHeight = $("[data-scroll-height]");
  function scrollWithBigMedia(media) {
    if (media.matches) {
      /* The viewport is greater than, or equal to media screen size */
      dataScrollHeight.each(function () {
        var scrollHeight = $(this).attr("data-scroll-height");
        $(this).css({ height: scrollHeight + "px", overflow: "hidden" });
      });

      //For content that needs scroll
      $(".slim-scroll")
        .slimScroll({
          opacity: 0,
          height: "100%",
          color: "#999",
          size: "5px",
          wheelStep: 10
        })
        .mouseover(function () {
          $(this)
            .next(".slimScrollBar")
            .css("opacity", 0.4);
        });
    } else {
      /* The viewport is less than media screen size */
      dataScrollHeight.css({ height: "auto", overflow: "auto" });
    }
  }

  if (dataScrollHeight.length != 0) {
    var media = window.matchMedia("(min-width: 992px)");
    scrollWithBigMedia(media); // Call listener function at run time
    media.addListener(scrollWithBigMedia); // Attach listener function on state changes
  }

  /*======== 3. TOOLTIPS AND POPOVER ========*/
  var tooltip = $('[data-toggle="tooltip"]')
  if(tooltip.length != 0){
    tooltip.tooltip({
      container: "body",
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });
  }

  var popover = $('[data-toggle="popover"]')

  if(popover.length != 0){
    popover.popover();
  }

  /*======== 4. JVECTORMAP DASHBOARD ========*/
  var mapData = {
    US: 1298,
    FR: 540,
    DE: 350,
    BW: 450,
    NA: 250,
    ZW: 300,
    AU: 760,
    GB: 120,
    ZA: 450
  };

  var worldMap = $("#world")

  if (worldMap.length != 0) {
    worldMap.vectorMap({
      map: "world_mill",
      backgroundColor: "transparent",
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: "#e4e4e4",
          "fill-opacity": 0.9,
          stroke: "none",
          "stroke-width": 0,
          "stroke-opacity": 0
        }
      },
      markerStyle: {
        initial: {
          stroke: "transparent"
        },
        hover: {
          stroke: "rgba(112, 112, 112, 0.30)"
        }
      },

      markers: [
        {
          latLng: [54.673629, -62.347026],
          name: "America",
          style: {
            fill: "limegreen"
          }
        },
        {
          latLng: [62.466943, 11.797592],
          name: "Europe",
          style: {
            fill: "orange"
          }
        },
        {
          latLng: [23.956725, -8.768815],
          name: "Africa",
          style: {
            fill: "red"
          }
        },
        {
          latLng: [-21.943369, 123.102198],
          name: "Australia",
          style: {
            fill: "royalblue"
          }
        }
      ]
    });
  }

  /*======== 5. JVECTORMAP ANALYTICS ========*/
  var mapData2 = {
    IN: 19000,
    US: 13000,
    TR: 9500,
    DO: 7500,
    PL: 4600,
    UK: 4000
  };

  var analyticWorldMap = $("#analytic-world")

  if (analyticWorldMap.length != 0) {
    analyticWorldMap.vectorMap({
      map: "world_mill",
      backgroundColor: "transparent",
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: "#e4e4e4",
          "fill-opacity": 0.9,
          stroke: "none",
          "stroke-width": 0,
          "stroke-opacity": 0
        }
      },

      series: {
        regions: [
          {
            values: mapData2,
            scale: ["#6a9ef9", "#b6d0ff"],
            normalizeFunction: "polynomial"
          }
        ]
      }
    });
  }

  /*======== 6. JVECTORMAP WIDGET ========*/
  var demoWorldMap = $("#demoworld")
  if (demoWorldMap.length != 0) {
    demoWorldMap.vectorMap({
      map: "world_mill",
      backgroundColor: "transparent",
      regionStyle: {
        initial: {
          fill: "#9c9c9c"
        }
      }
    });
  }

  /*======== 7. MULTIPLE SELECT ========*/
  var multipleSelect = $(".js-example-basic-multiple");
  if(multipleSelect.length != 0){
    multipleSelect.select2();
  }

  /*======== 8. LOADING BUTTON ========*/

  var laddaButton = $('.ladda-button');

  if(laddaButton.length != 0){
    /* 8.1. BIND NORMAL BUTTONS */
    Ladda.bind(".ladda-button", {
      timeout: 5000
    });

    /* 7.2. BIND PROGRESS BUTTONS AND SIMULATE LOADING PROGRESS */
    Ladda.bind(".progress-demo button", {
      callback: function (instance) {
        var progress = 0;
        var interval = setInterval(function () {
          progress = Math.min(progress + Math.random() * 0.1, 1);
          instance.setProgress(progress);

          if (progress === 1) {
            instance.stop();
            clearInterval(interval);
          }
        }, 200);
      }
    });
  }

  /*======== 9. TOASTER ========*/

  var toaster = $('#toaster')

  function callToaster(positionClass) {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: positionClass,
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };
    toastr.success("Welcome to Sleek", "Howdy!");
  }

  if(toaster.length != 0){

    if (document.dir != "rtl") {
      callToaster("toast-top-right");
    } else {
      callToaster("toast-top-left");
    }

  }

  /*======== 10. PROGRESS BAR ========*/
  NProgress.done();
});
