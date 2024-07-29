let ROW =document.querySelector("#ROW");
let SB =document.querySelector("#SB");
let Searchinput=document.querySelector("#Searchinput");

let All={};
let ALD={};


SB.addEventListener('click',function()
{
    let VS=Searchinput.value;
    GetData(VS);
});
  
  async function GetData(V)
  {
      try
      {
          const response= await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${V}&days=3&key=92d4820346b64139939105653240806`);  
          const data= await response.json();
          All=data;
          await GLOC();
          Display();  
} 
catch (error)
  {
    ROW.innerHTML=`
      <div class=" mt-5 d-flex justify-content-center ">
        <img class="" src="../weatherimgs/cant-see-shit.gif" alt="">
      </div>`;
}}


function Display()
{
  let cartona =``;
  for (let i = 0; i < All.forecast.forecastday.length; i++)
  {
    let x=All.forecast.forecastday[i].date;
    let A =x.split("-");
const M=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

for (let k = 0; k < M.length; k++)
  {
    if(A[1]===`0${k}`)
      {
        var T =`${A[2]} ${M[k-1]}`;
        }
        else if(A[1]===`1${k}`)
          {
            var T1 = `${A[2]} ${M[A[1]-1]}`;
            }
  }
            const dayNames =["Sun", "Mon", "Tues", "Wed","Thur", "Fri", "Sat"];
            let R = new Date(x);
            let Q =R.getDay();
    cartona+=
    `
<div class="col-md-4 pt-5 py-5">
<div class="inner">
<div class="d-flex justify-content-between bg-black">
<h4 class="bg-black ps-3 pb-3 pt-3 ps-3 text-white">${dayNames[Q]}</h4>
<h4 class="bg-black ps-3 pb-3 pt-3 pe-3 text-white">${T}</h4>
</div>
<div class="one-div py-4">
<h2 class="text-center mb-4 text-nowrap">${All.location.name}</h2>
<p class="h5 fw-bold ps-3">High temp : ${All.forecast.forecastday[i].day.maxtemp_c}</span></h4>
<p class="h5 fw-bold ps-3">Low temp :  ${All.forecast.forecastday[i].day.mintemp_c}</p>
<div class="icon d-flex justify-content-center align-items-center flex-column">
<h5 class="text-center pt-3"> ${All.forecast.forecastday[i].day.condition.text}</h5>
<img class="" src="${All.forecast.forecastday[i].day.condition.icon}" alt="">
<div class="text-center">${ALD.city}</div>
<div class="text-center">${ALD.timezone}</div>
<div class="text-center">IP-Address : ${ALD.ip}</div>
<div class="text-center">IP-Location : ${ALD.loc}</div>

</div>
</div>
</div>
</div> `
}
  
ROW.innerHTML=cartona;
}


async function GLOC() 

  {
try
{
  const R = await fetch(`https://ipinfo.io/json?token=1c728ab59ba935`);
  const LD = await R.json();
  ALD=LD;
}
catch(error)
{
  console.log(`can't Find Location ${error}`);
}


  }
