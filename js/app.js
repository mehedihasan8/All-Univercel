const loadAllData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAllData(data.data))
    .catch((erorr) => {
      console.log(erorr);
    });
};

const displayAllData = (data) => {
  const dataShowContainer = document.getElementById("show-all-conainer");
  dataShowContainer.innerHTML = "";
  data.tools.length = 6;
  data.tools.forEach((datas) => {
    const { features, image, name } = datas;
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
                <a data-bs-toggle="modal"
                    data-bs-target="#showDetails">
                 <i class="fa-solid text-dark fs-5 fa-circle-right"></i></a>
              </div>
            </div>
          </div>
      `;
    dataShowContainer.appendChild(singleDiv);
    console.log(data.tools[0].image);
  });
  // console.log(data);
};

document
  .getElementById("details-btn")
  .addEventListener("click", function () {});
