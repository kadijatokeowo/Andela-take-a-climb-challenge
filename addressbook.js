window.onload = function(){
	//Buttons
	var quickAddBtn= document.getElementById("QuickAdd");
	var AddBtn = document.getElementById("Add");
	var CancelBtn = document.getElementById("Cancel");
	var quickAddFormDiv = document.querySelector('.quickaddForm');

//form fields
var fullname = document.getElementById("fullname");
var phone = document.getElementById("phone");
var email = document.getElementById("email");


//Addressbook display
var addBookDiv = document.querySelector(".addbook");

//create storage array
var addressBook = [];

//event listeners
quickAddBtn.addEventListener("click", function(){
	quickAddFormDiv.style.display = "block";
});

CancelBtn.addEventListener("click", function(){
	quickAddFormDiv.style.display ="none";
});
/*listens for activity on the add button*/
AddBtn.addEventListener("click", addToBook);

addBookDiv.addEventListener("click", removeEntry);

/*constructor function*/
function jsonStructure(fullname, phone,email){
	this.fullname = fullname;//constructor variables
	this.phone = phone;//constructor variables
	this.email = email;//constructor variables
}

function addToBook(){
	var isNull = fullname.value != '' && phone.value !='' && email.value != '';
	if(isNull){
		//Add the contents of the form to the array & localstorage
		var obj = new jsonStructure(fullname.value,phone.value,email.value);
		addressBook.push(obj);
		localStorage['addbook'] = JSON.stringify(addressBook);//local storage acts like a database in the browser
		
		//hide the form panel
		quickAddFormDiv.style.display = "none";

		//clear the form
		clearform();

		//updating & displaying all reco0rds in the addressbook
		showAddressBook();

		}
	}

	function removeEntry(e){
							if(e.target.classList.contains("delbutton")){
								var remID = e.target.getAttribute("data-id");
								//Remove the JSon entry from the array with the index num = remID;
								addressBook.splice(remID, 1);
								localStorage['addbook'] = JSON.stringify(addressBook);
								showAddressBook();
							}
	}

		function clearForm(){
					var frm = document.querySelectorAll(".formFields");
					for(var i in frm){
						frm[i].value = '';
					}		
		}


		function showAddressBook(){
			//check if the key'addbook' exists in localStorage or else create it
			//if it exists, load contents from the localStorage and loop > display it on the page
			//localstorage can only store strings not array
			if(localStorage['addbook'] === undefined){
				localStorage['addbook'] = "[]";
			}else{
				addressBook = JSON.parse(localStorage['addbook']);//parde is a way of saying process
				addBookDiv.innerHTML ='';
				for(var n in addressBook){
					var str = '<div class = "entry">';
						str += '<div class= "name"><p>' + addressBook[n].fullname + '</p> </div>';
						str += '<div class= "email"><p>' + addressBook[n].email + '</p> </div>';
						str += '<div class= "phone"><p>' + addressBook[n].phone + '</p> </div>';
						str += '<div class= "del"><a href = "#" class ="delbutton" data-id="" + n + ""> Delete</a> </div>';
						str += '</div>'
						str += "<hr />";
						addBookDiv.innerHTML += str;
						
				}
			}
		}

	showAddressBook();
}

