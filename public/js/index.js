window.onload = (function() {
		
		var liss = document.getElementById('liss');
		var liss_li = liss.getElementsByTagName('li');
		var pic = document.getElementById('pic');
		var mun = -1;
		setInterval(function() {
				mun++;
				if (mun > 4) {
					mun = 0;
				}
				for (var i = 0; i < liss_li.length; i++) {
					liss_li[i].className = '';
				}
				liss_li[mun].className = 'border';
				pic.innerHTML = '<li>' + liss_li[mun].innerHTML + '</li>';
			}, 2000)
			
	
	
	;
	}())
