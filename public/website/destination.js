var assistance = {
    base_url: null,
    init: function () {
      assistance.bind_events();
      assistance.load_packages();
    },
    bind_events: function (e) {},
  
    load_packages: function () {
      var $request = $.ajax({
        url: `${assistance.base_url}/admin/list_destination`,
        type: "GET",
        dataType: "json",
        contentType: "application/json",
      });
  
      $request.done(function (data) {
        if (data.status) {
          var html = ``;
          console.log(data)
          data.data.map((info) => {
            console.log(info);
  
            html += `<div class="col-lg-4 col-md-4 col-sm-6" style="cursor:pointer" data-name="${info.country_name}" onclick="assistance.render_page(this)">
            <div class="single-cat mb-30">
                <div class="cat-img">
                    <img src="${assistance.base_url}/files/${info.banner_img}" alt>
                </div>
                <div class="cat-cap" style="min-height: 160px ">
                    <div class="pricing d-flex justify-content-between">
                        <h4><a >${info.name}</a></h4>
                    </div>
                    <p style="text-align: justify;font-size:20px"> <i class="fa fa-map-marker" aria-hidden="true"></i> ${info.country_name}</p>
                    <hr>
                    <p class="description">${truncateText(info.description, 100)}</p>
                    <p class="read-more" data-description="${info.description}" style="color:#F9931D"> Read More</p>
                </div>
            </div>
        </div>`;
          });
        }
  
        $("#render_data").append(html);

        $(".read-more").on("click", function () {
            var $description = $(this).siblings(".description");
            var fullText = $(this).data("description");

            if ($description.hasClass("truncate")) {
                $description.text(truncateText(fullText, 100));
                $(this).text("Read More");
                $description.removeClass("truncate");
            } else {
                $description.text(fullText);
                $(this).text("Read Less");
                $description.addClass("truncate");
            }
        });
      });
    },
  
    render_page: function (e) {
      var name = $(e).attr("data-name");
      console.log(name);
  
      window.location = "/packages?name=" + name;
    },
  };
  
  // Function to truncate text
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "";
    } else {
        return text;
    }
}
