/**
 * Call this to start using ML System. Listen to variable ML_FR to know what
 * conditions are. function Launch_ML(switch_bool, ML_fea1, ML_fea2, ML_fea3,
 * ML_fea4) switch_bool is the switch of this function. ML_fea1, ML_fea2, ML_fea3,
 * ML_fea4 are sit,stand,walk and run are feature data. Each of them is a 6X42 array.
 */

var Mo_x;
var Mo_y;
var Mo_z;
var ML_finalResult = [ 99, 99, 99 ];
var ML_FRFlag = 0;
var ML_FR = 4;
var data_x = Array(81);
var data_y = Array(81);
var data_z = Array(81);
var flag = 0;
var User_flag = 0;
var ML_feature = [];
var ML_Interval;

function Launch_ML(switch_bool, ML_fea1, ML_fea2, ML_fea3, ML_fea4) {

	if (switch_bool) {
		// start Listening.
		window.addEventListener("devicemotion", handleMotion, true);

		// catch data every 50 mile seconds.
		ML_Interval = setInterval(function() {
			CatchIntoArray(Mo_x, Mo_y, Mo_z);
			if (flag == 80) {
				initial_ML(ML_fea1, ML_fea2, ML_fea3, ML_fea4);
				cleanArray(data_x);
				cleanArray(data_y);
				cleanArray(data_z);
			}
		}, 50);
	} else {
		clearInterval(ML_Interval);
	}
}

function initial_ML(ID1, ID2, ID3, ID4) {
	ML_finalResult[ML_FRFlag] = ML_MainSYS(ID1, ID2, ID3, ID4, data_x, data_y,
			data_z);
	if (ML_FRFlag == 2) {
		if ((ML_finalResult[0] == ML_finalResult[1])
				&& (ML_finalResult[1] == ML_finalResult[2])) {
			ML_FR = ML_finalResult[0];
		}
		ML_finalResult[0] = ML_finalResult[1];
		ML_finalResult[1] = ML_finalResult[2];
		ML_finalResult[2] = 4;
		ML_FRFlag = 2;
	} else {
		ML_FRFlag++;
	}
	// document.getElementById('ML_FR').innerHTML = "ML_FR:" + ML_FR;
	// document.getElementById('ML_finalResult').innerHTML = "ML_finalResult:" + ML_finalResult;
	// SlideWinodw(data_x, data_y, data_z);
	// StartSlide();
}

function handleMotion(event) {
	var interval = event.interval;
	var acceleration = event.accelerationIncludingGravity;
	interval = 49;
	Mo_x = acceleration.x;
	Mo_y = acceleration.y;
	Mo_z = acceleration.z;
}

function CatchIntoArray(x, y, z, ID1, ID2, ID3, ID4) {

	data_x[flag] = x;
	data_y[flag] = y;
	data_z[flag] = z;
	// document.getElementById('xyz').innerHTML = "flag" + " " + flag + " " + "X:"
			+ " " + data_x[flag] + " Y:" + " " + data_y[flag] + " Z:" + " "
			+ data_z[flag];
	if (flag == 80) {
		flag = 0;
	} else {
		flag++;
	}
}

function SlideWinodw(arr_x, arr_y, arr_z) {
	for (var i = 0; i < 40; i++) {
		arr_x[i] = arr_x[40 + i];
		arr_x[40 + i] = 0;
		arr_y[i] = arr_y[40 + i];
		arr_y[40 + i] = 0;
		arr_z[i] = arr_z[40 + i];
		arr_z[40 + i] = 0;
	}
}

function cleanArray(tar_arr) {
	for (var i = 0; i < 80; i++) {
		tar_arr[i] = 0;
	}
}
/*
 * function StartSlide(ID1,ID2,ID3,ID4) { ML_SlideInterval =
 * setInterval(function() { ML_finalResult[ML_FRFlag] =
 * ML_MainSYS(ID1,ID2,ID3,ID4, data_x, data_y, data_z); SlideWinodw(data_x,
 * data_y, data_z); if (ML_FRFlag == 2) { if ((ML_finalResult[0] ==
 * ML_finalResult[1]) && (ML_finalResult[1] == ML_finalResult[2])) { ML_FR =
 * ML_finalResult[0]; } ML_finalResult[0] = ML_finalResult[1]; ML_finalResult[1] =
 * ML_finalResult[2]; } ML_FRFlag++; document.getElementById('ML_FR').innerHTML =
 * "ML_FR:" + ML_FR; document.getElementById('ML_finalResult').innerHTML =
 * "ML_finalResult:" + ML_finalResult; }, 2000); }
 */

