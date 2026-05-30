// 1. دالة جلب البيانات وعرضها بشكل متزامن
async function get_NasaAPOD(){
    try {
        var Request = await fetch("https://api.nasa.gov/planetary/apod?api_key=CMHipi3PdcMabhzKQZ4TulopIX8FcM0N013D7W95");
        var Picture = await Request.json();
        console.log(Picture);
        // استدعاء دالة العرض فوراً وتمرير البيانات المستلمة لها
        Display_NasaAPOD(Picture);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
    }
}

// 2. دالة العرض وتستقبل البيانات كـ Object
function Display_NasaAPOD(data){
    // تأكد أن لديك عنصر في صفحة HTML الأساسية يحمل هذا الـ ID ليتم الحقن بداخله
    var container = document.getElementById("header_Data");  
    // if(!header_Data) {
    //     console.error("العنصر .header_Data غير موجود في صفحة HTML");
    //     return;
    // }

    // بناء واجهة العرض باستخدام بيانات الكائن مباشرة دون الحاجة لحلقة for
    var Box = `<div class="max-w-7xl mx-auto header_Data">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
                Today in Space
              </h2>
              <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
                Astronomy Picture of the Day - ${data.date}
              </p>
            </div>
            <div class="flex items-center space-x-2 md:space-x-3">
              <label for="apod-date-input" class="date-input-wrapper">
                <input
                  type="date"
                  id="apod-date-input"
                  class="custom-date-input"
                  value="${data.date}"
                  max=""
                  min="1995-06-16"
                />
                <span class="text-sm">${data.date}</span>
              </label>
              <button
                id="load-date-btn"
                class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
              >
                <i class="fas fa-search"></i>
                <span class="hidden sm:inline">Load</span>
              </button>
              <button
                id="today-apod-btn"
                class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
              >
                Today
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div class="xl:col-span-2">
              <div
                id="apod-image-container"
                class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
              >
                <img
                  id="apod-image"
                  class="w-full h-full object-cover"
                  src="${data.url}"
                  alt="${data.title}"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div class="absolute bottom-6 left-6 right-6">
                    <a
                      href="${data.hdurl || data.url}" 
                      target="_blank"
                      class="w-full block text-center py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
                    >
                      <i class="fas fa-expand mr-2"></i>View Full Resolution
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-4 md:space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
              >
                <h3
                  id="apod-title"
                  class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
                >
                  ${data.title}
                </h3>
                <div
                  class="flex items-center space-x-4 mb-4 text-sm text-slate-400"
                >
                  <span id="apod-date-detail"
                    ><i class="far fa-calendar mr-2"></i>${data.date}</span
                  >
                </div>
                <p
                  id="apod-explanation"
                  class="text-slate-300 leading-relaxed mb-4"
                >
                  ${data.explanation}
                </p>
                <div
                  id="apod-copyright"
                  class="text-xs text-slate-400 italic mb-4"
                >
                  ${data.copyright ? `&copy; ${data.copyright}` : ''}
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                  Image Details
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Date</span>
                    <span id="apod-date-info" class="font-medium"
                      >${data.date}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Media Type</span>
                    <span id="apod-media-type" class="font-medium">${data.media_type}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Source</span>
                    <span class="font-medium">NASA APOD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

    container.innerHTML = Box;
}

// 3. تشغيل الدالة الأساسية عند تحميل الصفحة
get_NasaAPOD();

document.querySelector(".Clicking").addEventListener("click",function(){
   getlaunches();
  async function getlaunches(){
    try{
      var Request2= await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
      var Data2= await Request2.json();
      display_launches(Data2);

    }catch(error){
      console.log("Wrong Event");
    }

}

})


var cartoona=""
function display_launches(launchesData){
 cartoona = `
        <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
          <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
            <div class="flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                    <i class="fas fa-star"></i>
                    Featured Launch
                  </span>
                  <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                    Go
                  </span>
                </div>
                
                <h3 class="text-3xl font-bold mb-3 leading-tight">
                  ${launchesData.englishName || launchesData.name}
                </h3>
                
                <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-building"></i>
                    <span>SpaceX</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fas fa-rocket"></i>
                    <span>Starship</span>
                  </div>
                </div>
                <div class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
                  <i class="fas fa-clock text-2xl text-blue-400"></i>
                  <div>
                    <p class="text-2xl font-bold text-blue-400">2</p>
                    <p class="text-xs text-slate-400">Days Until Launch</p>
                  </div>
                </div>
                <div class="grid xl:grid-cols-2 gap-4 mb-6">
                  <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                      <i class="fas fa-calendar"></i>
                      Launch Date
                    </p>
                    <p class="font-semibold">${launchesData.date}</p>
                  </div>
                  <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                      <i class="fas fa-clock"></i>
                      Launch Time
                    </p>
                    <p class="font-semibold">${launchesData.Time}</p>
                  </div>
                  <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                      <i class="fas fa-map-marker-alt"></i>
                      Location
                    </p>
                    <p class="font-semibold text-sm">${launchesData.location}</p>
                  </div>
                  <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                      <i class="fas fa-globe"></i>
                      Country
                    </p>
                    <p class="font-semibold">${launchesData.Country}</p>
                  </div>
                </div>
                <p class="text-slate-300 leading-relaxed mb-6">
                    ${launchesData.description} 
                    </p>
              </div>
            </div>
            
            <div class="relative">
              <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
                <div class="flex items-center justify-center h-full min-h-[400px] bg-slate-800">
                  <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                </div>
                <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>`;

     document.querySelector("#featured-launch").innerHTML = cartoona;
}



document.querySelector("#planets").addEventListener("click",function(){
  display_All_Planets(data3)
  async function gatAll_Planets(){
    var req= await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");
    var data3= await req.json();
    display_All_Planets(data3)

  }
})

var cartoona2=""

function display_All_Planets(data3){
  var cartoona2=`<div class="max-w-7xl mx-auto">
          <div class="mb-4 md:mb-6">
            <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
              Explore Our Solar System
            </h2>
            <p class="text-slate-400 text-xs md:text-sm">
              Discover the planets, moons, and celestial bodies in our cosmic
              neighborhood
            </p>
          </div>
          <div
            id="planets-grid"
            class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-8 gap-3 md:gap-4 mb-8 md:mb-12"
          >
            <!-- Mercury -->
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="mercury"
              style="--planet-color: #eab308"
              onmouseover="this.style.borderColor='#eab30880'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/mercury.png"
                  alt="Mercury"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">Mercury</h4>
              <p class="text-xs text-slate-400 text-center">0.39 AU</p>
            </div>
            <!-- Venus -->
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="venus"
              style="--planet-color: #f97316"
              onmouseover="this.style.borderColor='#f9731680'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/venus.png"
                  alt="Venus"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">Venus</h4>
              <p class="text-xs text-slate-400 text-center">0.72 AU</p>
            </div>
            <!-- Earth -->
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="earth"
              style="--planet-color: #3b82f6"
              onmouseover="this.style.borderColor='#3b82f680'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/earth.png"
                  alt="Earth"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">Earth</h4>
              <p class="text-xs text-slate-400 text-center">1.00 AU</p>
            </div>
            <!-- Mars -->
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="mars"
              style="--planet-color: #ef4444"
              onmouseover="this.style.borderColor='#ef444480'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/mars.png"
                  alt="Mars"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">Mars</h4>
              <p class="text-xs text-slate-400 text-center">1.52 AU</p>
            </div>
            <!-- Jupiter -->
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="jupiter"
              style="--planet-color: #fb923c"
              onmouseover="this.style.borderColor='#fb923c80'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/jupiter.png"
                  alt="Jupiter"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">Jupiter</h4>
              <p class="text-xs text-slate-400 text-center">5.20 AU</p>
            </div>
            <!-- Saturn -->
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="saturn"
              style="--planet-color: #facc15"
              onmouseover="this.style.borderColor='#facc1580'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/saturn.png"
                  alt="Saturn"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">Saturn</h4>
              <p class="text-xs text-slate-400 text-center">9.58 AU</p>
            </div>
            <!-- Uranus -->
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="uranus"
              style="--planet-color: #06b6d4"
              onmouseover="this.style.borderColor='#06b6d480'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/uranus.png"
                  alt="Uranus"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">Uranus</h4>
              <p class="text-xs text-slate-400 text-center">19.22 AU</p>
            </div>
            <!-- Neptune -->
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="neptune"
              style="--planet-color: #2563eb"
              onmouseover="this.style.borderColor='#2563eb80'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/neptune.png"
                  alt="Neptune"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">Neptune</h4>
              <p class="text-xs text-slate-400 text-center">30.05 AU</p>
            </div>
          </div>
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div
              class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data3.image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data3.name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data3.description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${data3.density}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    ${data3.meanRadius}                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    6,371 km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    ${data3.mass}
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    5.97 × 10²⁴ kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    5.51 g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    ${data3.type}
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    365.25 days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    24 hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">1</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    9.8 m/s²
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovered By</span>
                    <span
                      id="planet-discoverer"
                      class="font-semibold text-right"
                      >Known since antiquity</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold"
                      >Ancient</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold"
                      >Planet</span
                    >
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">N/A</span>
                  </div>
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Only known planet with liquid water</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Atmosphere contains 78% nitrogen</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Magnetic field protects from solar wind</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Formed 4.54 billion years ago</span
                    >
                  </li>
                </ul>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold"
                      >147.1M km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold"
                      >152.1M km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold"
                      >0.0167</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold"
                      >0.00°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold"
                      >23.44°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">15°C</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold"
                      >11.2 km/s</span
                    >
                  </div>
                </div>
              </div>
              <button
                class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                <i class="fas fa-book mr-2"></i>Learn More
              </button>
            </div>
          </div>
          <div class="mt-8">
            <h2 class="text-xl md:text-2xl font-space font-bold mb-4 md:mb-6">
              Planet Comparison
            </h2>
            <div
              class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl overflow-hidden"
            >
              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full min-w-[800px]">
                  <thead class="bg-slate-900/50">
                    <tr>
                      <th
                        class="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold whitespace-nowrap sticky left-0 bg-slate-900 z-10"
                      >
                        Planet
                      </th>
                      <th
                        class="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold whitespace-nowrap"
                      >
                        Distance (AU)
                      </th>
                      <th
                        class="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold whitespace-nowrap"
                      >
                        Diameter (km)
                      </th>
                      <th
                        class="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold whitespace-nowrap"
                      >
                        Mass (Earth=1)
                      </th>
                      <th
                        class="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold whitespace-nowrap"
                      >
                        Orbital Period
                      </th>
                      <th
                        class="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold whitespace-nowrap"
                      >
                        Moons
                      </th>
                      <th
                        class="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold whitespace-nowrap"
                      >
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    id="planet-comparison-tbody"
                    class="divide-y divide-slate-700"
                  >
                    <!-- Mercury -->
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: #eab308"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >Mercury</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        0.39
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        4,879
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        0.055
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        88 days
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        0
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-orange-500/50 text-orange-200"
                          >Terrestrial</span
                        >
                      </td>
                    </tr>
                    <!-- Venus -->
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: #f97316"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >Venus</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        0.72
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        12,104
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        0.815
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        225 days
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        0
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-orange-500/50 text-orange-200"
                          >Terrestrial</span
                        >
                      </td>
                    </tr>
                    <!-- Earth -->
                    <tr
                      class="hover:bg-slate-800/30 transition-colors bg-blue-500/5"
                    >
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: #3b82f6"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >Earth</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        1.00
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        12,742
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        1.000
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        365.2 days
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        1
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-blue-500/50 text-blue-200"
                          >Terrestrial</span
                        >
                      </td>
                    </tr>
                    <!-- Mars -->
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: #ef4444"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >Mars</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        1.52
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        6,779
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        0.107
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        687 days
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        2
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-red-500/50 text-red-200"
                          >Terrestrial</span
                        >
                      </td>
                    </tr>
                    <!-- Jupiter -->
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: #fb923c"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >Jupiter</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        5.20
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        139,820
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        317.8
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        11.9 years
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        79
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-purple-500/50 text-purple-200"
                          >Gas Giant</span
                        >
                      </td>
                    </tr>
                    <!-- Saturn -->
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: #facc15"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >Saturn</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        9.58
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        116,460
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        95.2
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        29.5 years
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        82
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-yellow-500/50 text-yellow-200"
                          >Gas Giant</span
                        >
                      </td>
                    </tr>
                    <!-- Uranus -->
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: #06b6d4"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >Uranus</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        19.22
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        50,724
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        14.5
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        84.0 years
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        27
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-cyan-500/50 text-cyan-200"
                          >Ice Giant</span
                        >
                      </td>
                    </tr>
                    <!-- Neptune -->
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: #2563eb"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >Neptune</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        30.05
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        49,244
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        17.1
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        164.8 years
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        14
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-blue-500/50 text-blue-200"
                          >Ice Giant</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>`

        document.querySelector("#planetss").innerHTML=cartoona2;
}
