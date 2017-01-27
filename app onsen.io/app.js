var prev = function() {
  var carousel = document.getElementById('carousel');
  carousel.prev();
};

var next = function() {
  var carousel = document.getElementById('carousel');
  carousel.next();
};

ons.ready(function() {
  var carousel = document.addEventListener('postchange', function(event) {
    console.log('Changed to ' + event.activeIndex)
  });
});


document.addEventListener('init', function(event)
{
	if(event.target.id == "home"){
		openDb();
		getItems();
	}
});

var db = null;
function onError(tx, e)
{
	alert("Er ging iets fout! onze excuses" + e.Message);
}

function onSucces(tx, r)
{
	getItems();
}

function openDb()
{
db = openDatabase("ShoppingList", "1", "shopping list" ,1024*1024);
db.transaction(function(tx)
{
	tx.executeSql("CREATE TABLE IF NOT EXISTS items (ID INTEGER PRIMARY KEY ASC, item TEXT)", []);
});
	
}
function getItems()
{
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM items",[], renderItems, onError);
	});
}

function renderItems(tx, rs)
{
	var output = "";
	var list = document.getElementById('shoppinglist');
	
	for (i = 0; i < rs.rows.length; i++)
	{
		var row = rs.rows.item(i);
		output+= "<ons-list-item>" + row.item + "   KG" +
		"<div class=\"right\"> <ons-button onclick='deleteItem(" + row.ID + ");')> <ons-icon icon=\"trash\"> </ons-icon> </ons-button> </div>" +
		"</ons-list-item>";
	}
	
	list.innerHTML = output;
}

function addItem()
{
	var textbox = document.getElementById("item");
	var value = textbox.value;
	
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO items (item) VALUES (?)" , [value], onSucces, onError);
	});
	
	textbox.value="";
	//fn.load('home.html');
}
	function deleteItem(id)
	{
		db.transaction(function(tx){
			tx.executeSql("DELETE FROM items WHERE ID=?", [id], onSucces, onError); 
		});
	}