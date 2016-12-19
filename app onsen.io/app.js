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

var db = null;
function onError(tx, e)
{
	alert("Er ging iets fout! onze excuses" + e.Message);
}

function onSucces(tx, r);
{
	
}

function openDb()
{
db = openDatabase("gewichtlijst", "1", "gewicht lijst" 1024*1024);
db.transaction(function(tx)
{
	tx.executeSql("CREATE TABLE IF NOT EXISTS gewicht (ID INTEGER PRIMARY KEY ASC, gewicht TEXT)", []);
});
	
}
function getGewicht()
{
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM gewicht",[], renderGewicht, onError);
	});
}

function renderGewicht(tx, rs)
{
	var output = "";
	var list = document.getElementById('gewichtlijst');
	
	for (i = 0; i < rs.rows.length; i++)
	{
		
	}
}

