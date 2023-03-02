const loadAllData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAllData(data.data.tools))
    .catch((erorr) => {
      console.log(erorr);
    });
};

const displayAllData = (data) => {
  const dataShowContainer = document.getElementById("show-all-conainer");
  data.forEach((datas) => {
    console.log(datas);
  });
  // console.log(data);
};
