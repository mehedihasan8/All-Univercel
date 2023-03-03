const loadAllData = (dataLimite) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAllData(data.data, dataLimite))
    .catch((erorr) => {
      console.log(erorr);
    });
};

const displayAllData = (data, dataLimite) => {
  const dataShowContainer = document.getElementById("show-all-conainer");
  dataShowContainer.innerHTML = "";

  const seeMoreAll = document.getElementById("see-more");
  if (dataLimite && data.tools.length > 6) {
    data.tools = data.tools.slice(0, 6);
    seeMoreAll.classList.remove("d-none");
  } else {
    seeMoreAll.classList.add("d-none");
  }
  data.tools.forEach((datas) => {
    // console.log(datas);
    const { features, image, name, id, published_in } = datas;
    const singleDiv = document.createElement("div");
    singleDiv.classList.add("col");
    singleDiv.innerHTML = `
        <div class="card px-3 h-100">
            <div >
            <img  src="${image}" style="  border-radius: 10px;" class="card-img-top my-3"     alt="..." />
            </div>
            <div class="card-body p-0 m-0">
              <h4 class="card-title fw-bolder mt-3 ">  Features  </h4>
              <p class="card-text">
                <ol  class =  'm-0 p-3 '>
                    <li class = "${
                      features[0] === undefined ? "d-none" : ""
                    }">${features[0]}</li>
                    <li class = "${
                      features[1] === undefined ? "d-none" : ""
                    }">${features[1]}</li>
                    <li class = "${
                      features[2] === undefined ? "d-none" : ""
                    }">${features[2]}</li>
                    <li class = "${
                      features[3] === undefined ? "d-none" : ""
                    }">${features[3]}</li>
                </ol>
              </p>
            </div>
            <hr/>
            <div class="d-flex px-1 justify-content-between align-items-center">
              <div class="">
                <h5 class="fw-bolder my-3">${name}</h5>
                <p><i class="fa-solid fa-calendar-days"></i> ${published_in}</p>
              </div>
              <div id ="details-btn" class="">
                <a data-bs-toggle="modal" data-bs-target="#showDetails">
                 <i onclick = "loadDetailData('${id}')" class="fa-solid text-dark fs-4 fa-circle-right"></i></a>
              </div>
            </div>
          </div>
      `;
    dataShowContainer.appendChild(singleDiv);
  });

  toggleSpinner(false);
};

const loadDetailData = (id) => {
  const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((singleDetailData) => showDetailData(singleDetailData.data))
    .catch((error) => {
      console.log(error);
    });
};
const showDetailData = (singleDetailData) => {
  const modalBody = document.getElementById("modal-body");
  const {
    description,
    integrations,
    input_output_examples,
    features,
    image_link,
    pricing,
    accuracy,
  } = singleDetailData;
  console.log(singleDetailData);
  // console.log(pricing ? pricing[0].price : "no data");
  const accuracyData = accuracy.score * 100;
  console.log(accuracyData);
  modalBody.innerHTML = `
        <div class="row row-cols-md-2 mb-5 m-1 g-4">
              <div class="bg-danger-subtle p-3 rounded rounded-3 fw-bold text-dark">
                <p class="my-4 px-2 ">
                  ${description}
                </p>
                <div
                  class="d-flex gap-2 my-3 justify-content-evenly align-items-center"
                >
                  <div
                    class="text-center bg-white rounded rounded-3 text-success"
                  >
                    <p class="my-2 px-1">${
                      pricing === null ||
                      pricing[0].price === "0" ||
                      pricing[0].price === "No cost"
                        ? "Free of Cost"
                        : pricing[0].price
                    } ${pricing ? pricing[0].plan : ""}</p>
                  </div>
                  <div
                    class="border bg-white rounded rounded-3 text-center text-secondary"
                  >
                    <p class="my-2 px-1">${
                      pricing === null ||
                      pricing[1].price === "0" ||
                      pricing[1].price === "No cost"
                        ? "Free of Cost"
                        : pricing[1].price
                    } ${pricing ? pricing[1].plan : ""}</p>
                  </div>
                  <div
                    class="border bg-white rounded rounded-3 text-center text-warning"
                  >
                    <p class="my-2 px-1">${
                      pricing === null ||
                      pricing[1].price === "0" ||
                      pricing[1].price === "No cost"
                        ? "Free of Cost"
                        : pricing[2].price
                    } ${pricing ? pricing[2].plan : ""}</p>
                  </div>
                </div>
                <div class="d-flex justify-content-around my-2">
                  <div class="">
                    <h5  class="fw-bolder">Features</h5>
                    <ul class = "m-0 px-3">
                      <li class = "${
                        features[1].feature_name === undefined ? "d-none" : ""
                      }">${features[1].feature_name}</li>
                      <li class = "${
                        features[2].feature_name === undefined ? "d-none" : ""
                      }">${features[2].feature_name}</li>
                      <li class = "${
                        features[3].feature_name === undefined ? "d-none" : ""
                      }">${features[3].feature_name}</li>
                    </ul>
                  </div>
                  <div>
                    <h5  class="fw-bolder">Integrations</h5>
                    <ul  class = "m-0 px-3">
                    <li class = "list-unstyled"> ${
                      integrations ? "" : "Data Not Found"
                    } </li>
                      <li class = "${
                        integrations === null || integrations[0] === undefined
                          ? "d-none"
                          : ""
                      }">${
    integrations ? integrations[0] : "Data Not found"
  }</li>
                      <li class = "${
                        integrations === null || integrations[1] === undefined
                          ? "d-none"
                          : ""
                      }">${
    integrations ? integrations[1] : "Data Not found"
  }</li>
                      <li class = "${
                        integrations === null || integrations[2] === undefined
                          ? "d-none"
                          : ""
                      }">${
    integrations ? integrations[2] : "Data Not found"
  }</li>
                      <li class = "${
                        integrations === null || integrations[3] === undefined
                          ? "d-none"
                          : ""
                      }">${
    integrations ? integrations[3] : "Data Not found"
  }</li>
                      <li class = "${
                        integrations === null || integrations[4] === undefined
                          ? "d-none"
                          : ""
                      }">${
    integrations ? integrations[4] : "Data Not found"
  }</li>
                      <li class = "${
                        integrations === null || integrations[5] === undefined
                          ? "d-none"
                          : ""
                      }">${
    integrations ? integrations[5] : "Data Not found"
  }</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div class = "position-relative">
                    <div class="badge text-bg-warning position-absolute start-50 mt-3 p-2 ms-5 ${
                      accuracyData === 0 ? "d-none" : ""
                    } "> ${accuracyData ? accuracyData : ""}% accuracy</div>
                    <img src="${
                      image_link ? image_link[0] : "picture"
                    }" class ="img-fluid rounded-top p-2"  alt="" />
                </div>
                <h4 class="text-center fw-bold my-2">${
                  input_output_examples
                    ? input_output_examples[0].input
                    : "Can you give any example?"
                }</h4>
                <p class="text-center">
                  ${
                    input_output_examples
                      ? input_output_examples[1].output
                      : "No! Not Yet! Take a break!!!"
                  }
                </p>
              </div>
            </div>
    `;
  // console.log(singleDetailData);
};

const loopData = (data) => {
  data.forEach((loopSingelData) => {
    console.log(loopSingelData);
  });
};

// see more btn clikc here

document.getElementById("see-more-btn").addEventListener("click", function () {
  seeMore();
});

// see more heat

const seeMore = (dataLimite) => {
  loadAllData(dataLimite);
};

// spinner or loader hear

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
