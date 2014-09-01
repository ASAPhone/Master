// Machine Learning Main JS.

function ML_MainSYS(category_arr1, category_arr2, category_arr3, category_arr4,
		X, Y, Z) {

	var counted_data = [];
	var fea_det_arr = Array(42);
	var Top3_ID;
	var vote_result;
	counted_data = preCount(X, Y, Z);
	//alert(counted_data);
	preSort(counted_data); // Sort data from min.
	//alert(counted_data);
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
	//alert(fea_det_arr);
	// Normalization
	var Nor_arr = Array(25);
	for (var i = 0; i < 25; i++) {
		Nor_arr[i] = new Array(42);
	}
	// ID1
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 42; j++) {
			Nor_arr[i][j] = category_arr1[i][j];
		}
	}

	// ID2
	for (var i = 6, k = 0; i < 12, k < 6; i++, k++) {
		for (var j = 0; j < 42; j++) {
			Nor_arr[i][j] = category_arr2[k][j];
		}
	}

	// ID3
	for (var i = 12, k = 0; i < 18, k < 6; i++, k++) {
		for (var j = 0; j < 42; j++) {
			Nor_arr[i][j] = category_arr3[k][j];
		}
	}

	// ID4
	for (var i = 18, k = 0; i < 24, k < 6; i++, k++) {
		for (var j = 0; j < 42; j++) {
			Nor_arr[i][j] = category_arr4[k][j];
		}
	}

	// Detected Data
	for (var i = 0; i < 42; i++) {
		Nor_arr[24][i] = fea_det_arr[i];
	}
	//alert(fea_det_arr);
	// Start Normalizing
	for (var i = 0; i < 42; i++) {
	   temp = Array(25);
		var col_Max;
		var col_Min;
		for (var k = 0; k < 25; k++) {
			temp[k] = Nor_arr[k][i];
		//	alert(temp[k]);
		}

		col_Max = getMax(temp);
		col_Min = getMin(temp);

		// ID1
		for (var j = 0; j < 6; j++) {
			Normalize(category_arr1, j, i, col_Min, col_Max);
		}

		// ID2
		for (var j = 0; j < 6; j++) {
			Normalize(category_arr2, j, i, col_Min, col_Max);
		}

		// ID3
		for (var j = 0; j < 6; j++) {
			Normalize(category_arr3, j, i, col_Min, col_Max);
		}

		// ID4
		for (var j = 0; j < 6; j++) {
			Normalize(category_arr4, j, i, col_Min, col_Max);
		}

		// Detected Data
		NormalizeFor1D(fea_det_arr, i, col_Min, col_Max);
	}

	//alert(temp);
	//alert(category_arr1);
	//alert(category_arr2);
	//alert(category_arr3);
    //alert(category_arr4);
	// KNN
	Top3_ID = NearestKNN(category_arr1, category_arr2, category_arr3,
			category_arr4, fea_det_arr);
	vote_result = vote(Top3_ID);
	if (vote_result == 999) {
		vote_result = Top3_ID[0];
	}
	return vote_result;
};

