var assistance = {
  base_url: null,
  init: function () {
    assistance.bind_events();
    assistance.load_packages();
    assistance.load_location();
  },
  bind_events: function (e) { },

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

          html += `    <div class="col-lg-4 col-md-4 col-sm-6" style="cursor:pointer" data-name="${info.name
            }" onclick="assistance.render_page(this)">
                <div class="single-cat mb-30">
                    <div class="cat-img">
                        <img src="${assistance.base_url}/files/${info.banner_img
            }" alt>
                    </div>
                    <div class="cat-cap">
                        <div class="pricing d-flex justify-content-between">
                            <h3><a href="">${info.name}</a></h3>
                            <span class="price">${info.price}</span>
                        </div>
                        <p><a href="#">${info.days.length} Days ${info.days.length - 1
            } Night</a> ${info.tour_type}</p>
                    </div>
                </div>
            </div>`;
        });

        $("#render_data").append(html);
      }


    });
  },
  load_location: function () {
    var $request = $.ajax({
      url: `${assistance.base_url}/admin/list_location`,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
    });

    $request.done(function (data) {
      if (data.status) {
        var html = `<option value="0">Please Select Location</option>`;
        data.data.map((info) => {
          html += `<option value="${info._id}">${info.location_name}, ${info.country_name}</option>`;
        });
      }

      // Clear existing options before appending new ones
      $("#location_name").empty();

      var Select = `<label for="exampleInputEmail1">Select Location<span style="color: red;"></span></label>
        <select id="location_name" style='width: 100%;' >
           ${html}

        </select>`;

      $("#location_section").append(Select);

      new Choices("#location_name", {
        removeItemButton: false,
        searchEnabled: true,
        placeholder: true,
        placeholderValue: "Select Location",
      });
    });
  },

  render_page: function (e) {
    var name = $(e).attr("data-name");
    console.log(name);

    window.location = "/packages-details?name=" + name;
  },

  filter: function (e) {

    if ($("#location_name").val() == "0" && $("#duration").val() == "0") {

      toastr.options.positionClass = 'toast-bottom-right';
      toastr.error("Please Select Any One Option.. ", '', { timeOut: 3000 })
    } else {

      var obj = new Object();
      obj.location_id = $("#location_name").val();
      obj.duration = $("#duration").val();

      console.log(obj);

      var $request = $.ajax({
        url: `${assistance.base_url}/admin/filter_packages`,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(obj),
      });

      $request.done(function (data) {
        var html = ``;
        data.data.map((info) => {
          console.log(info);

          html += `    <div class="col-lg-4 col-md-4 col-sm-6" style="cursor:pointer" data-name="${info.name
            }" onclick="assistance.render_page(this)">
                <div class="single-cat mb-30">
                    <div class="cat-img">
                        <img src="${assistance.base_url}/files/${info.banner_img
            }" alt>
                    </div>
                    <div class="cat-cap">
                        <div class="pricing d-flex justify-content-between">
                            <h3><a href="">${info.name}</a></h3>
                            <span class="price">${info.price}</span>
                        </div>
                        <p><a href="#">${info.days.length} Days ${info.days.length - 1
            } Night</a> ${info.tour_type}</p>
                    </div>
                </div>
            </div>`;
        });

        $("#render_data").html("");
        $("#render_data").append(html);
        // Calculate 30% of the window's height
        var scrollPosition = $(window).height() * 0.4;

        // Set the scroll position
        $(window).scrollTop(scrollPosition);
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.success("Filter Applied... ", '', { timeOut: 3000 })
      });

    }

  },
};
