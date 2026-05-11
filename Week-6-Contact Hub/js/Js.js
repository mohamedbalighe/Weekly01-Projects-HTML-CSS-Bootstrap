var Full_NameInput=document.getElementById("FullName");
var Phon_NumberInput=document.getElementById("PhonNumber");
var Email_Input=document.getElementById("Email");
var Address_Input=document.getElementById("Address");
var groupSelect_Choosen=document.getElementById("groupSelect");
var message_Input=document.getElementById("message");

var flexCheckFavorite_Choosen=document.getElementById("flexCheckFavorite");
var flexCheckEmergency_Choosen=document.getElementById("flexCheckEmergency");

var Total_Badge=document.getElementById("Total");
var Favorite_Badge=document.getElementById("Favorite");
var EMERGENCY_Badge=document.getElementById("EMERGENCY");

var Favorites_side=document.getElementById("Favo_rites");
var Emergency_side=document.getElementById("Emer_gency2");

var Warning_Phrase=document.getElementById("Warning-Phrase");

var SaveB=document.getElementById("saveB");
var AddB=document.getElementById("AddB");
var Search_Value=document.getElementById("SearchInput");




var Row=document.getElementById("RowData");

if(localStorage.getItem("UserInfo") != null){
    var User_list=JSON.parse(localStorage.getItem("UserInfo"));
    Display_UserInfo(User_list);
}else{
    var User_list=[];
}


function SaveContant() {

    if( Validattion(FullName)
     && (Validattion(PhonNumber))
     && Validattion(Email))
{
    { 
        var UserInfo={
    FullName:Full_NameInput.value,
    PhonNumber:Phon_NumberInput.value,
    Email:Email_Input.value,
    Address:Address_Input.value,
    groupSelect:groupSelect_Choosen.value,
    message:message_Input.value,
    Favorite:flexCheckFavorite_Choosen.checked,
    Emergency:flexCheckEmergency_Choosen.checked,
    Total_Badge:Total_Badge.innerText,
    Favorite_Badge:Favorite_Badge.innerText,
    EMERGENCY_Badge:EMERGENCY_Badge.innerText,
}
    User_list.push(UserInfo);
    localStorage.setItem("UserInfo",JSON.stringify(User_list));
    Display_UserInfo(User_list);
    clearForm();
}
}else{
     Swal.fire({
        title: "Mising Input",
        text: "You won't be able to add it!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Try Again!"
    })
}
}

function Display_UserInfo(arr) {
    var mainCont = "";
    var favCont = "";
    var emgCont = "";

    for (var i = 0; i < arr.length; i++) {
        mainCont += `
             <div class="col-md-6">
                    <div class="contact-card">
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <div class="avatar" style="background-color: #ec4899;">
                            ${arr[i].FullName.charAt(0).toUpperCase()} 
                             <div class="badge-dot bg-warning"><i class="fas fa-star"></i></div>
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold">${arr[i].FullName}</h6>
                                <p class="text-muted small mb-0"><i class="fa-solid fa-phone"></i> ${arr[i].PhonNumber}</p>
                            </div>
                        </div>
                        <p class="small text-secondary mb-2"><i class="fa-regular fa-massage fa-envelope"></i>${arr[i].Email}</p>
                        <div class="d mb-3"><i class="fa-solid fa-loaction fa-location-dot"></i> ${arr[i].Address}</div>

                        <span class="tag-badge bg-primary-subtle text-primary mb-3 d-inline-block">${arr[i].groupSelect}</span>
                        
                        <div class="d-flex border-top pt-3 justify-content-between align-items-center">
                            <div>
                                <button class="action-btn text-success"><i class="fas phone2 fa-phone"></i></button>
                                <button class="action-btn text-primary"><i class="fas envalope2 fa-envelope"></i></button>
                            </div>
                            <div>
                                <button onclick="EditFavorite(${i})" class="action-btn text-warning"><i class=" ${arr[i].Favorite ? "fas fa-star " : "fas fa-star text-danger"}"></i></button>
                                <button onclick="EditEmergency(${i})" class="action-btn">
                                 <i class="${arr[i].Emergency ? 'fas fa-heart text-danger' : 'far fa-heart'}"></i>
                                   </button>
                                    <button onclick="SetFormForupdate(${i})" class="action-btn text-info"><i class="fas fa-pen"></i></button>
                                <button onclick="DeleteContant(${i})" class="action-btn text-danger"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    </div> `;

        if (arr[i].Favorite) {
            favCont += `
                <div class="side-item G shadow-sm d-flex align-items-center p-3 mb-2 w-100">
                    <div class="avatar sm me-2" style="background: #f59e0b; width: 40px; height: 40px; font-size: 0.8rem;">
                        ${arr[i].FullName.charAt(0)}
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="info1 mb-0 small fw-bold">${arr[i].FullName}</h6>
                        <span class="text-muted smaller">${arr[i].PhonNumber}</span>
                    </div>
                    <button class="btn btn-sm btn-light text-success rounded-circle"><i class="fas fa-phone"></i></button>
                </div>`;
        }

        if (arr[i].Emergency) {
            emgCont += `
                <div class="side-item G2 shadow-sm d-flex align-items-center p-3 mb-2 w-100">
                    <div class="avatar sm me-2" style="background: #ef4444; width: 40px; height: 40px; font-size: 0.8rem;">
                        ${arr[i].FullName.charAt(0)}
                    </div>
                    <div class=" flex-grow-1">
                        <h6 class="mb-0 small fw-bold">${arr[i].FullName}</h6>
                        <span class="text-muted smaller">${arr[i].PhonNumber}</span>
                    </div>
                    <button class="btn btn-sm btn-light text-danger rounded-circle"><i class="fas fa-phone"></i></button>
                </div>`;
        }
    }

    Total_Badge.innerText = arr.length;
    Favorite_Badge.innerText = arr.filter(u => u.Favorite).length;
    EMERGENCY_Badge.innerText = arr.filter(u => u.Emergency).length;

    Row.innerHTML = mainCont;
    Favorites_side.innerHTML = favCont;
    Emergency_side.innerHTML = emgCont;
}


function clearForm(){
    Full_NameInput.value=null;
    Phon_NumberInput.value=null;
    Address_Input.value=null;
    groupSelect_Choosen.value=null;
    message_Input.value=null;
    flexCheckFavorite_Choosen.value=null;
    flexCheckEmergency_Choosen.value=null;
    
}


var currentIndex;

function SetFormForupdate(index) {
    currentIndex = index; 
    
    Full_NameInput.value = User_list[index].FullName;
    Phon_NumberInput.value = User_list[index].PhonNumber;
    Email_Input.value = User_list[index].Email;
    Address_Input.value = User_list[index].Address;
    groupSelect_Choosen.value = User_list[index].groupSelect;
    message_Input.value = User_list[index].message;
    flexCheckFavorite_Choosen.checked = User_list[index].Favorite;
    flexCheckEmergency_Choosen.checked = User_list[index].Emergency;

    AddB.classList.add("d-none");
    saveB.classList.remove("d-none");
};

function Save_Updates(){
if( Validattion(FullName)
     && (Validattion(PhonNumber))
     && Validattion(Email)){
 Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Updated it!"
    }).then((result) => {
        if (result.isConfirmed) {
              User_list[currentIndex].FullName=  Full_NameInput.value,
    User_list[currentIndex].PhonNumber=  Phon_NumberInput.value,
    User_list[currentIndex].Email=  Email_Input.value,
    User_list[currentIndex].Address=  Address_Input.value,
    User_list[currentIndex].groupSelect=  groupSelect_Choosen.value,
    User_list[currentIndex].message=  message_Input.value,
    User_list[currentIndex].Favorite=  flexCheckFavorite_Choosen.checked,
    User_list[currentIndex].Emergency=  flexCheckEmergency_Choosen.checked,

    Display_UserInfo(User_list);
    localStorage.setItem("UserInfo",JSON.stringify(User_list));
    saveB.classList.add("d-none");
    AddB.classList.remove("d-none");
    clearForm();

            Swal.fire({
                title: "Updated!",
                text: "Your contact has been Updated.",
                icon: "success"
            });
        }
    });


} 
}
function DeleteContant(i) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
             User_list.splice(i, 1);
            localStorage.setItem("UserInfo", JSON.stringify(User_list));
            Display_UserInfo(User_list);

            Swal.fire({
                title: "Deleted!",
                text: "Your contact has been deleted.",
                icon: "success"
            });
        }
    });
}
    
   



function EditEmergency(i) {
    User_list[i].Emergency = !User_list[i].Emergency;
    localStorage.setItem("UserInfo", JSON.stringify(User_list));
    Display_UserInfo(User_list);
}

function EditFavorite(i) {
    User_list[i].Favorite = !User_list[i].Favorite;
    localStorage.setItem("UserInfo", JSON.stringify(User_list));
    Display_UserInfo(User_list);
}


function SearchButtom(){
    var SearchArray =[];
    for (var i=0 ;i<User_list.length ;i++ ){
        if (User_list[i].FullName.toLowerCase().includes(Search_Value.value.toLowerCase()) 
            || (User_list[i].Email.includes(Search_Value.value))
            || (User_list[i].PhonNumber.toString().includes(Search_Value.value)) ) {
            SearchArray.push(User_list[i]);
        }
    }
    Display_UserInfo(SearchArray);
}


function Validattion(element){
    var regax={
        FullName:/^[a-zA-Z\s]{2,50}$/,
        PhonNumber:/^[01][0125][0-9]{8}$/,
        Email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    };

       if(regax[element.id].test(element.value)){
       element.nextElementSibling.classList.add("d-none");
       element.classList.remove("is-invalid");
       element.classList.add("is-valid");
        return true;
         
    }else{
       element.nextElementSibling.classList.remove("d-none");
       element.classList.add("is-invalid");
       element.classList.remove("is-valid");
        return false;

    }
};




