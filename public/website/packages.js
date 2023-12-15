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

  render_page: function (e) {
    var name = $(e).attr("data-name");
    console.log(name);

    window.location = "/packages-details?name=" + name;
  },
};
