/**
 * 如欲使用使用者自訂 請呼叫 UserTraining_ML(train_type) train_type是你要訓練的類型 1是坐 2是站 3是走 4是跑 
 * 呼叫30秒後 使用var 自訂名稱 = JSON.parse(localStorage["變數名稱"]) 取出陣列 EX: var ML_train1data = JSON.parse(localStorage["ML_train1"]);
 */

var ML_train1 = Array(6);
var ML_train2 = Array(6);
var ML_train3 = Array(6);
var ML_train4 = Array(6);

function UserTraining_ML(train_type) {
	var train_flag = 0;
	if (train_type != null) {
		window.addEventListener("devicemotion", handleMotion, true);
		var inter = setInterval(function() {
			CatchIntoArray(Mo_x, Mo_y, Mo_z);
			if (flag == 80) {
				if (train_flag == 5) {
					CatchIntoArrayForUser(data_x, data_y, data_z, train_type,
							train_flag);
					clearInterval(inter);
				} else {
					CatchIntoArrayForUser(data_x, data_y, data_z, train_type,
							train_flag);
					train_flag++;
				}
			}
		}, 50);
	}
}

function CatchIntoArrayForUser(x, y, z, ID, flag) {
	switch (ID) {
	case 1:
		ML_train1[flag] = DataTrasfer(x, y, z);
		localStorage["ML_train1"] = JSON.stringify(ML_train1);
		//var ML_train1data = JSON.parse(localStorage["ML_train1"]);
		break;
	case 2:
		ML_train2[flag] = DataTrasfer(x, y, z);
		localStorage["ML_train2"] = JSON.stringify(ML_train2);
		break;
	case 3:
		ML_train3[flag] = DataTrasfer(x, y, z);
		localStorage["ML_train3"] = JSON.stringify(ML_train3);
		break;
	case 4:
		ML_train4[flag] = DataTrasfer(x, y, z);
		localStorage["ML_train4"] = JSON.stringify(ML_train4);
		break;
	default:
		console.log("User catch arrayID goes wrong!");
	}
};

function DataTrasfer(X, Y, Z) {
	var counted_data = [];
	var fea_det_arr = Array(42);

	counted_data = preCount(X, Y, Z);
	// alert(counted_data);
	preSort(counted_data); // Sort data from min.
	// alert(counted_data);
	// (x,y,z)
	fea_det_arr[0] = getAvg(counted_data);
	fea_det_arr[1] = getStdDev(counted_data);
	fea_det_arr[2] = getMin(counted_data);
	fea_det_arr[3] = getMax(counted_data);
	fea_det_arr[4] = counted_data[7]; // 10%
	fea_det_arr[5] = counted_data[19]; // 25%
	fea_det_arr[6] = counted_data[39]; // 50%
	fea_det_arr[7] = counted_data[59]; // 75%
	fea_det_arr[8] = counted_data[71]; // 90%
	fea_det_arr[9] = getAccumulate(0, 3, counted_data); // 1%~5%
	fea_det_arr[10] = getAccumulate(0, 7, counted_data); // 1%~10%
	fea_det_arr[11] = getAccumulate(0, 19, counted_data); // 1%~25%
	fea_det_arr[12] = getAccumulate(0, 59, counted_data); // 1%~75%
	fea_det_arr[13] = getAccumulate(0, 71, counted_data); // 1%~90%
	fea_det_arr[14] = getAccumulate(0, 76, counted_data); // 1%~95%
	fea_det_arr[15] = getAccumulateSqrt(0, 3, counted_data); // 1%~5%
	fea_det_arr[16] = getAccumulateSqrt(0, 7, counted_data); // 1%~10%
	fea_det_arr[17] = getAccumulateSqrt(0, 19, counted_data); // 1%~25%
	fea_det_arr[18] = getAccumulateSqrt(0, 59, counted_data); // 1%~75%
	fea_det_arr[19] = getAccumulateSqrt(0, 71, counted_data); // 1%~90%
	fea_det_arr[20] = getAccumulateSqrt(0, 76, counted_data); // 1%~95%

	// (x,z)
	// an 0 array for Y.
	var zero = Array(80);
	for (var i = 0; i < 80; i++) {
		zero[i] = 0;
	}
	counted_data = preCount(X, zero, Z);
	preSort(counted_data);

	fea_det_arr[21] = getAvg(counted_data);
	fea_det_arr[22] = getStdDev(counted_data);
	fea_det_arr[23] = getMin(counted_data);
	fea_det_arr[24] = getMax(counted_data);
	fea_det_arr[25] = counted_data[7]; // 10%
	fea_det_arr[26] = counted_data[19]; // 25%
	fea_det_arr[27] = counted_data[39]; // 50%
	fea_det_arr[28] = counted_data[59]; // 75%
	fea_det_arr[29] = counted_data[71]; // 90%
	fea_det_arr[30] = getAccumulate(0, 3, counted_data); // 1%~5%
	fea_det_arr[31] = getAccumulate(0, 7, counted_data); // 1%~10%
	fea_det_arr[32] = getAccumulate(0, 19, counted_data); // 1%~25%
	fea_det_arr[33] = getAccumulate(0, 59, counted_data); // 1%~75%
	fea_det_arr[34] = getAccumulate(0, 71, counted_data); // 1%~90%
	fea_det_arr[35] = getAccumulate(0, 76, counted_data); // 1%~95%
	fea_det_arr[36] = getAccumulateSqrt(0, 3, counted_data); // 1%~5%
	fea_det_arr[37] = getAccumulateSqrt(0, 7, counted_data); // 1%~10%
	fea_det_arr[38] = getAccumulateSqrt(0, 19, counted_data); // 1%~25%
	fea_det_arr[39] = getAccumulateSqrt(0, 59, counted_data); // 1%~75%
	fea_det_arr[40] = getAccumulateSqrt(0, 71, counted_data); // 1%~90%
	fea_det_arr[41] = getAccumulateSqrt(0, 76, counted_data); // 1%~95%
	// alert(fea_det_arr);

	return fea_det_arr;
}
