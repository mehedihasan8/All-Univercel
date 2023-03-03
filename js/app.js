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
    const { features, image, name, id } = datas;
    const singleDiv = document.createElement("div");
    singleDiv.classList.add("col");
    singleDiv.innerHTML = `
        <div class="card px-3 h-100">
            <div >
            <img  src="${image}" style="  border-radius: 10px;" class="card-img-top my-3"     alt="..." />
            </div>
            <div class="card-body p-0 m-0">
              <h4 class="card-title">  Features  </h4>
              <p class="card-text">
                <ol class = 'm-0 p-3 '>
                    <li>${features[0]}</li>
                    <li>${features[1]}</li>
                    <li>${features[2] ? features[2] : "Not Available"}</li>
                </ol>
              </p>
            </div>
            <hr/>
            <div class="d-flex px-1 justify-content-between align-items-center">
              <div class="">
                <h5>${name}</h5>
                <p><i class="fa-solid fa-calendar-days"></i> 10.12.5874</p>
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
  // console.log(data);
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
  const { description, integrations, features, image_link, pricing } =
    singleDetailData;
  modalBody.innerHTML = `
        <div class="row row-cols-md-2 m-1 g-4">
              <div class="bg-danger p-2 rounded rounded-3 text-white">
                <p class="my-2 px-2 ">
                  ${description}
                </p>
                <div
                  class="d-flex gap-2 my-3 justify-content-evenly align-items-center"
                >
                  <div
                    class="text-center bg-white rounded rounded-3 text-success"
                  >
                    <p class="my-2 px-1">${pricing[0].price}</p>
                  </div>
                  <div
                    class="border bg-white rounded rounded-3 text-center text-secondary"
                  >
                    <p class="my-2 px-1">$50/month Pro</p>
                  </div>
                  <div
                    class="border bg-white rounded rounded-3 text-center text-success"
                  >
                    <p class="my-2 px-1">Contact us Enterprise</p>
                  </div>
                </div>
                <div class="d-flex justify-content-around my-2">
                  <div class="">
                    <h5>Features</h5>
                    <ul>
                      <li>${features[1].feature_name}</li>
                      <li>${features[2].feature_name}</li>
                      <li>${features[3].feature_name}</li>
                    </ul>
                  </div>
                  <div class="">
                    <h5>Integrations</h5>
                    <ul>
                      <li>${integrations[0]}</li>
                      <li> ${integrations[1]}</li>
                      <li> ${integrations[2]}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <img style="border-radius: 10px;" class ="img-fluid p-2" src="${
                  image_link[0] ? image_link[0] : "picture"
                }" alt="" />
                <h6 class="text-center">Hi, how are you doing today?</h6>
                <p class="text-center">
                  I'm doing well, thank you for asking. How can I assist you
                  today?
                </p>
              </div>
            </div>
    `;
  console.log(singleDetailData);
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
