//Learning data formula
function preCount(x, y, z) {
	var sum = new Array(80);
	for (var i = 0; i < 80; i++) {
		sum[i] = x[i]*x[i] + y[i]*y[i] + z[i]*z[i];
		//alert(i +" "+ sum[i]);
	}
	return sum;
}

function preSort(tar_arr) {
	tar_arr.sort(function(a, b) {
		return a - b;
	});
}

function getAvg(tar_arr) {
	var sum_av = 0;
	for (var i in tar_arr) {
	    sum_av = sum_av + tar_arr[i];
	}
	return sum_av / 80.0;
}

function getStdDev(tar_arr) {
	var m = getAvg(tar_arr);
	var sum = 0;
	var l = tar_arr.length;

	for (var i = 0; i < l; i++) {
		var dev = tar_arr[i] - m;
		sum += (dev * dev);
	}
	return Math.sqrt(sum / (l - 1));
}

function getMax(tar_arr) {
	return Math.max.apply(Math, tar_arr);
}

function getMin(tar_arr) {
	return Math.min.apply(Math, tar_arr);
}

function getAccumulate(start, end, tar_arr) {
	var sum = 0;
	for (var i = start; i <= end; i++) {
		sum += tar_arr[i];
	}
	return sum;
}

function getAccumulateSqrt(start, end, tar_arr) {
	var sum = 0;
	for (var i = start; i <= end; i++) {
		sum += Math.sqrt(tar_arr[i]);
	}
	return sum;
}

// Normalization

function Normalize(tar_arr, Tar1ID, Tar2ID, min, max) {
	var nor;
	nor = (tar_arr[Tar1ID][Tar2ID] - min * 0.95) / (max - min * 1.1);
	tar_arr[Tar1ID][Tar2ID] = nor;
}

function NormalizeFor1D(tar_arr, TarID, min, max) {
	var nor;
	nor = (tar_arr[TarID] - min * 0.95) / (max - min * 1.1);
	tar_arr[TarID] = nor;
}

// KNN

function distance(feature_arr, feature_ID, tar_arr) {
	var sum = 0;
	for (var i = 0; i < 42; i++) {
		sum += Math.sqrt(Math.abs(feature_arr[feature_ID][i] - tar_arr[i]));
	}
	return Math.pow(sum, 0.5);
}

function getArray_2D_Min(KNN_dis_arr) {
	var Top3ID = Array(3);
	var tempArray = Array(24);
	var tempTurn = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 6; j++) {
			tempArray[tempTurn] = KNN_dis_arr[i][j];
			tempTurn++;
		}
	}
	preSort(tempArray);

	loop1: for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 6; j++) {
			if (tempArray[0] == KNN_dis_arr[i][j]) {
				Top3ID[0] = i;
				break loop1;
			}
		}
	}

	loop2: for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 6; j++) {
			if (tempArray[1] == KNN_dis_arr[i][j]) {
				Top3ID[1] = i;
				break loop2;
			}
		}
	}

	loop3: for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 6; j++) {
			if (tempArray[2] == KNN_dis_arr[i][j]) {
				Top3ID[2] = i;
				break loop3;
			}
		}
	}

	return Top3ID;
}

function NearestKNN(ID1_arr, ID2_arr, ID3_arr, ID4_arr, tar_arr) {
	console.log(tar_arr);
	var KNN_dis = Array(4);
	var Top3ID_arr;
	for (var i = 0; i < 4; i++) {
		KNN_dis[i] = new Array(6);
	}

	for (var j = 0; j < 6; j++) {
		KNN_dis[0][j] = distance(ID1_arr, j, tar_arr);
	}

	for (var j = 0; j < 6; j++) {
		KNN_dis[1][j] = distance(ID2_arr, j, tar_arr);
	}

	for (var j = 0; j < 6; j++) {
		KNN_dis[2][j] = distance(ID3_arr, j, tar_arr);
	}

	for (var j = 0; j < 6; j++) {
		KNN_dis[3][j] = distance(ID4_arr, j, tar_arr);
	}

	Top3ID_arr = getArray_2D_Min(KNN_dis);
	return Top3ID_arr;
}

function vote(Top3_arr) {
	var count_pop = [ 0, 0, 0, 0 ];
	var pop_max;
	var pop_maxID;
	for (var i = 0; i < 3; i++) {
		if (Top3_arr[i] == 0) {
			count_pop[0]++;
		} else if (Top3_arr[i] == 1) {
			count_pop[1]++;
		} else if (Top3_arr[i] == 2) {
			count_pop[2]++;
		} else if (Top3_arr[i] == 3) {
			count_pop[3]++;
		} else {
			console.log("vote LOOP goes wrong!");
		}
	}

	pop_max = getMax(count_pop);

	for (var i = 0; i < 4; i++) {
		if (pop_max == count_pop[i]) {
			pop_maxID = i;
			break;
		}
	}

	if ((count_pop[0] == count_pop[1]) && (count_pop[1] == count_pop[2])
			&& (count_pop[2] == count_pop[3])) {
		return 999;
	} else {
		return pop_maxID;
	}
}
