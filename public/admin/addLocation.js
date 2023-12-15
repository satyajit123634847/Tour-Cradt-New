var assistance = {
  base_url: null,
  init: function () {
    assistance.bind_events();
    assistance.list_assistance();
  },
  bind_events: function (e) {
    // $('#submit_data').click(function (event) {
    //     $("#submit_data").attr("disabled", true);
    //     event.preventDefault(); // prevent default form submission
    //     $('#addAssistance').addClass('was-validated'); // trigger Parsley validation
    //     if ($('#addAssistance')[0].checkValidity() === false) {
    //         event.stopPropagation(); // prevent further propagation of the event
    //     }
    //     assistance.add_assistance()
    // });

    $("#addAssistance").submit(function (event) {
      event.preventDefault(); // Prevent default form submission
      $("#submit_data").attr("disabled", true);

      // Perform form validation using Parsley or other validation libraries
      if ($("#addAssistance").parsley().isValid()) {
        assistance.add_assistance();
      }
    });

    const countryList = [
      "Afghanistan",
      "Åland Islands",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas (the)",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia (Plurinational State of)",
      "Bonaire, Sint Eustatius and Saba",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory (the)",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cayman Islands (the)",
      "Central African Republic (the)",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands (the)",
      "Colombia",
      "Comoros (the)",
      "Congo (the Democratic Republic of the)",
      "Congo (the)",
      "Cook Islands (the)",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Curaçao",
      "Cyprus",
      "Czechia",
      "Côte d'Ivoire",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic (the)",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Falkland Islands (the) [Malvinas]",
      "Faroe Islands (the)",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories (the)",
      "Gabon",
      "Gambia (the)",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard Island and McDonald Islands",
      "Holy See (the)",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran (Islamic Republic of)",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea (the Democratic People's Republic of)",
      "Korea (the Republic of)",
      "Kuwait",
      "Kyrgyzstan",
      "Lao People's Democratic Republic (the)",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macao",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands (the)",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia (Federated States of)",
      "Moldova (the Republic of)",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands (the)",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger (the)",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands (the)",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine, State of",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines (the)",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Republic of North Macedonia",
      "Romania",
      "Russian Federation (the)",
      "Rwanda",
      "Réunion",
      "Saint Barthélemy",
      "Saint Helena, Ascension and Tristan da Cunha",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Martin (French part)",
      "Saint Pierre and Miquelon",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Sint Maarten (Dutch part)",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan (the)",
      "Suriname",
      "Svalbard and Jan Mayen",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Taiwan (Province of China)",
      "Tajikistan",
      "Tanzania, United Republic of",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands (the)",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates (the)",
      "United Kingdom of Great Britain and Northern Ireland (the)",
      "United States Minor Outlying Islands (the)",
      "United States of America (the)",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela (Bolivarian Republic of)",
      "Viet Nam",
      "Virgin Islands (British)",
      "Virgin Islands (U.S.)",
      "Wallis and Futuna",
      "Western Sahara",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ];

    // Convert the countryList array to an array of objects
    var countries = countryList.map(function (country) {
      return { id: country, text: country };
    });

    // Initialize Select2 with the countries data
    $("#country_name").select2({
      data: countries,
    });
  },
  list_assistance: function (e) {
    $("#add_assistance_table").DataTable({
      ajax: {
        url: this.base_url + "/admin/list_location_admin",
        type: "GET",
        datatype: "json",
      },
      buttons: [
        {
          extend: "excelHtml5",
          text: "Export to Excel",
          exportOptions: {
            columns: [1, 2, 3, 4], // indexes of the columns to export
          },
        },
      ],
      columns: [
        {
          data: "_id",
          visible: false,
        },
        {
          data: null,
          sTitle: "Sr.no",
        },
        {
          data: "location_name",
          sTitle: "Location Name",
          render: function (data, type, row) {
            if (data == null || data == "") {
              return "-";
            } else {
              return data;
            }
          },
        },

        {
          data: "country_name",
          sTitle: "Country Name",
          render: function (data, type, row) {
            if (data == null || data == "") {
              return "-";
            } else {
              return data;
            }
          },
        },
        {
            data: "status",
            sTitle: "Status",
            render: function (data, type, row) {
                if(data == true){
                    return "Active";
                } else{
                    return "Inactive";
                }  
            },
          },
        
        {
          data: "null",
          sTitle: "Action",
          //'class': 'center',
          render: function (data, type, row) {
            return '<a class="btn btn-warning mx-2" onclick="assistance.edit_assistance(this)" title="Edit"> Edit </a><a class="btn btn-danger" onclick="assistance.delete_assistance(this)" title="Edit"> Delete </a>';
          },
        },
      ],
      rowCallback: function (nRow, aData, iDisplayIndex) {
        var oSettings = this.fnSettings();
        $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
        return nRow;
      },
    });
  },
  add_assistance: function (e) {
    var obj = new Object();
    obj.location_name = $("#location_name").val();
    obj.country_name = $("#country_name").val();
    
   

   

    console.log(obj);
    // return
    var id = $("#id").val();

    if (id == null || id == "") {
      var $request = $.ajax({
        url: `${assistance.base_url}/admin/add_location`,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(obj),
      });

      $request.done(function (data) {
        if (data.status) {
          toastr.options.positionClass = "toast-bottom-right";
          toastr.success(data.message, "", { timeOut: 3000 });

          setTimeout(() => {
            window.location = "/add-location";
          }, 1000);
        } else {
          $("#submit_data").attr("disabled", false);

          toastr.options.positionClass = "toast-bottom-right";
          toastr.error(data.message, "", { timeOut: 3000 });
        }
      });
    } else {
      var $request = $.ajax({
        url: `${assistance.base_url}/admin/update_location/${id}`,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(obj),
      });

      $request.done(function (data) {
        if (data.status) {
          toastr.options.positionClass = "toast-bottom-right";
          toastr.success(data.message, "", { timeOut: 3000 });

          setTimeout(() => {
            window.location = "/add-location";
          }, 1000);
        } else {
          $("#submit_data").attr("disabled", false);

          toastr.options.positionClass = "toast-bottom-right";
          toastr.error(data.message, "", { timeOut: 3000 });
        }
      });
    }
  },

  edit_assistance: function (e) {
    let self = this;
    let row = $(e).closest("tr");
    let obj = $("#add_assistance_table").dataTable().fnGetData(row);
    console.log(obj);

    $("#location_name").val(obj.location_name);
    $("#id").val(obj._id);
   // Set the selected value of the country dropdown
   $("#country_name").val(obj.country_name);

   // Trigger change event to update Select2 rendering
   $("#country_name").trigger("change");
   
  },
  delete_assistance: function (e) {
    let self = this;
    let row = $(e).closest("tr");
    let obj = $("#add_assistance_table").dataTable().fnGetData(row);

    var id = obj._id;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        var $request = $.ajax({
          url: `${assistance.base_url}/admin/delete_location/${id}`,
          type: "PUT",
          dataType: "json",
          contentType: "application/json",
        });

        $request.done(function (data) {
          if (data.status) {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.success(data.message, "", { timeOut: 3000 });
            setTimeout(() => {
              window.location = "/add-location";
            }, 1000);
          }
        });
      }
    });
  },

  upload_gst_files: function (e) {
    // --------project banner img-----------------//
    var formData = new FormData();
    let media_length = $(e)[0].files.length;

    for (let i = 0; i <= media_length; i++)
      formData.append("files", $(e)[0].files[i]);

    var $request = $.ajax({
      url: `${assistance.base_url}/admin/upload-files`,
      data: formData,
      type: "POST",
      contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
      processData: false, // NEEDED, DON'T OMIT THIS
    });

    $request.done(async function (response) {
      if (response.status == true) {
        var project_img_array = [];

        await response.url.map((info) => {
          project_img_array.push(info.filename);
        });

        var img = "";
        project_img_array.map((info) => {
          var ex = info.split(".").pop();

          if (ex == "mp4") {
            img += `<div class="mx-1 remove_img_section gst_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                            <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="assistance.remove_project_images(this)">X</i></a>
                            </div>`;
          } else if (ex == "pdf") {
            img += `<div class="mx-1 remove_img_section gst_array_class"><img src="images/pdf.png" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                            <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="assistance.remove_project_images(this)">X</i></a>
                            </div>`;
          } else {
            img += `<div class="mx-1 remove_img_section gst_array_class"><img src="${assistance.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                        <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="assistance.remove_project_images(this)">X</i></a>
                        </div>`;
          }
        });

        $(e).siblings(".img_pre").html("");
        $(e).siblings(".img_pre").append(img);
      }
    });
  },

  remove_project_images: async function (e) {
    Swal.fire({
      title: "Are you sure to remove image?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $(e).parent(".a_tag").parent(".remove_img_section").remove();
        toastr.options.positionClass = "toast-bottom-right";
        toastr.success("Images remove successfully...!", "", { timeOut: 3000 });
      }
    });
  },
};
