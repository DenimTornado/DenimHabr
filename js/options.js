var attach_panel;
var show_new;
var show_tracker;

// var isAttach = localStorage.getItem("pl_attach_panel");


document.addEventListener('DOMContentLoaded', function()
{
	attach_panel = document.getElementById("attach_panel");
	show_new = document.getElementById("show_new");
	show_tracker = document.getElementById("show_tracker");
	
	document.querySelector('#attach_panel').addEventListener('change', saveSettings);
	document.querySelector('#show_new').addEventListener('change', saveSettings);
	document.querySelector('#show_tracker').addEventListener('change', saveSettings);

	restoreCheckBox(attach_panel, "pl_attach_panel");
	restoreCheckBox(show_new, "pl_show_new");
	restoreCheckBox(show_tracker, "pl_show_tracker");
});

function restoreCheckBox(element, storagevar)
{
	var strvar = localStorage.getItem(storagevar);
	if(strvar==null)
	{
		strvar = true;
		localStorage.setItem(storagevar, strvar);
	}
	if(strvar=="true")	element.checked = true;
	if(strvar=="false")	element.checked = false;
}

function saveSettings(evt)
{
	chrome.storage.local.set(
		{"pl_attach_panel":attach_panel.checked,
		"pl_show_new":show_new.checked,
		"pl_show_tracker":show_tracker.checked
		}
	);
	var name = 'pl_'+evt.target.id
	localStorage.setItem(name, evt.target.checked);
}


document.addEventListener('DOMContentLoaded', function () {
    var save= document.getElementById('save');
    save.addEventListener('click', save_options);

    restore_options();
});

// Saves options to localStorage.
function save_options() {
    var login = document.getElementById("login");
    var username = login.value;
    if (!username || username == "" || username == "undefined") {
        username = "";
    }
    localStorage["username"] = username;
    //console.log(localStorage["username"]);

    localStorage["showStats"] = document.getElementById("showStats").checked;
    //console.log(localStorage["showStats"]);

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "HabrInfo - Настройки сохранены!";
    setTimeout(function () {
        status.innerHTML = "";
    }, 1000);

    chrome.extension.getBackgroundPage().changeUsername();
    console.log(localStorage["username"]);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var username = localStorage["username"];
    if (!username || username == "" || username == "undefined") {
        username = "";
    }
    var login = document.getElementById("login");
    login.value = username;

    document.getElementById("showStats").checked = (localStorage["showStats"]=="false")?false:true;

}