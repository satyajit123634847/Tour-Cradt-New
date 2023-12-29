var assistance = {
  base_url: null,
  init: function () {
    assistance.bind_events();
    assistance.load_packages();
  },
  bind_events: function (e) {},

  load_packages: function () {
    var $request = $.ajax({
      url: `${assistance.base_url}/admin/list_packages`,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
    });

    $request.done(function (data) {
      if (data.status) {
        var html = ``;
        data.data.map((info) => {
          console.log(info);

          html += `     <div class="col-lg-4 col-md-4 col-sm-6" style="cursor:pointer" data-name="${info.name
          }" onclick="assistance.render_page(this)">
              <div class="single-cat mb-30">
                  <div class="cat-img">
                      <img src="${assistance.base_url}/files/${info.banner_img
          }" alt>
                  </div>
                  <div class="cat-cap">
                  <div><h5><a href="" style="text-align: justify;">${info.name}</a></h5></div>
                  <hr>
                      <div class="pricing mb-3" style="text-align: justify;" >
                     
                          <span class="price">Price:  ${info.price}</span>
                      </div>
                      <p><a href="#">${info.days.length} Days ${info.days.length - 1
          } Night</a> ${info.tour_type}</p>
                  </div>
              </div>
          </div>`;
        });
      }

      $("#render_data").append(html);

      // 4. Single Img slder
      $(".services-active").slick({
        dots: false,
        infinite: true,
        autoplay: false,
        speed: 400,
        arrows: true,
        prevArrow:
          '<button type="button" class="slick-prev"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      });
    });
  },

  render_page: function (e) {
    var name = $(e).attr("data-name");
    console.log(name);

    window.location = "/packages-details?name=" + name;
  },
};
