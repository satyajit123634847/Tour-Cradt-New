var assistance = {
  base_url: null,
  init: function () {
    assistance.bind_events();
    assistance.load_data();
    assistance.load_packages();

  },
  bind_events: function (e) {},

  load_data: function () {
    let params = new URLSearchParams(location.search);

    var name = params.get("name");

    console.log(name);
    var $request = $.ajax({
      url: `${assistance.base_url}/admin/list_packages_by_name/${name}`,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
    });

    $request.done(function (data) {
      console.log(data);
      if (data.status) {
        var html = ``;

        var info = data.data[0];

        $("#duration").text(
          `${info.days.length} Days ${info.days.length - 1} Night`
        );
        $("#type").text(info.tour_type);
        $("#group_size").text(info.group_size);

        $("#name").text(info.name);
        $("#location").text(`${info.location_id.location_name}, ${info.location_id.country_name}`);


        info.packages_imgs.push(info.banner_img);
        var img = "";
        console.log("...", assistance.base_url);
        info.packages_imgs.map((info) => {
          img += `<li class="splide__slide">
          <img src="${assistance.base_url}/files/${info}" style="width:100%; height:500px">
      </li>`;
        });

        var html = `<section class="splide" aria-labelledby="carousel-heading">

        <div class="splide__track">
            <ul class="splide__list" id="">
${img}
               
            </ul>
        </div>
    </section>`;

        $("#render_img").html(html);

        console.log(html);

        var splide = new Splide(".splide", {
          type: "loop",
          rewind: true,
          autoplay: "pause",
          perPage: 1,
        });

        splide.mount();

        var days = ``;

        info.days.map((info) => {
          days += `<div class="col-12 my-1" style="background-color: #FCFCFC;padding: 15px;    border: 1px solid #D7DCE3;
          border-left: 6px solid var(#1a2b48, #5191FA); border-radius: 4px;">
              <h2>${info.name}</h2>
              <p class="mt-3" style="text-align: justify;">${info.description}  </p>
          </div>
`;
        });

        $("#days_section").append(days);
      }

      // $("#render_data").append(html);
    });
  },

  render_page: function (e) {
    var name = $(e).attr("data-name");
    console.log(name);

    window.location = "/packages-details?name=" + name;
  },

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

          html += `    <div class="col-lg-4 col-md-4 col-sm-6" style="cursor:pointer" data-name="${
            info.name
          }" onclick="assistance.render_page(this)">
                <div class="single-cat mb-30">
                    <div class="cat-img">
                        <img src="${assistance.base_url}/files/${
            info.banner_img
          }" alt>
                    </div>
                    <div class="cat-cap">
                        <div class="pricing d-flex justify-content-between">
                            <h3><a href="">${info.name}</a></h3>
                            <span class="price">${info.price}</span>
                        </div>
                        <p><a href="#">${info.days.length} Days ${
            info.days.length - 1
          } Night</a> ${info.tour_type}</p>
                    </div>
                </div>
            </div>`;
        });
      }

      $("#render_data").append(html);
    });
  },
};
