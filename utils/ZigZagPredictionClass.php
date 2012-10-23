<?php

	namespace sampProj\utils {
		use \sampProj\data\ZigZagData;
		use \sampProj\iface\ZigZagHandle;
		
		require_once 'configuration/Application.php';
		
		\sampProj\configuration\Application::load("\sampProj\iface\ZigZagHandle");
		\sampProj\configuration\Application::load("\sampProj\data\ZigZagData");
		
		/**
		 * The ZgiZagPredictionClass is used for generating values for plotting the ZigZag of any selected Commodity.
		 * 
		 * Usage:
		 * $calArray = array(14077, 14073, 14073, 14073, 14073, 14073, 14073, 14073, 14073, 14071, 14071, 14071, 14069, 14069, 14079, 14077, 14079, 14077, 14077, 14077, 14077, 14077, 14075, 14077, 14084, 14080, 14080, 14076, 14080, 14080, 14076, 14076, 14072, 14068, 14075, 14079, 14079, 14079, 14075, 14075, 14075, 14075, 14075, 14063, 14063, 14063, 14063, 14063, 14067, 14071, 14071, 14071, 14093, 14088, 14088, 14093, 14093, 14088, 14088, 14088, 14088, 14088, 14088, 14088, 14088, 14083, 14083, 14083, 14083, 14083, 14087, 14087, 14087, 14092, 14092, 14092, 14092, 14092, 14092, 14092, 14092, 14089, 14089, 14085, 14081, 14081, 14081, 14081, 14086, 14086, 14086, 14086, 14102, 14098, 14098, 14094, 14099, 14104, 14104, 14104, 14104, 14104, 14109, 14109, 14109, 14108, 14108, 14108, 14113, 14109, 14114, 14110, 14106, 14106, 14111, 14116, 14116, 14116, 14141, 14137, 14142, 14142, 14147, 14143, 14148, 14153, 14149, 14154, 14159, 14159, 14159, 14141, 14141, 14146, 14146, 14146, 14142, 14138, 14134, 14134, 14130, 14130, 14126, 14122, 14111, 14106, 14111, 14111, 14106, 14111, 14106, 14111, 14116, 14121, 14121, 14121, 14121, 14105, 14105, 14105, 14110, 14110, 14105, 14110, 14110, 14115, 14110, 14110, 14110, 14115, 14115, 14144, 14149, 14149, 14144, 14149, 14149, 14144, 14149, 14154, 14159, 14164, 14159, 14154);
		 * $zzObj = new ZigZagPredictionClass($calArray);
		 * $zzObj->predictZigZagValues();
		 * 
		 * data class:
		 * ZigZagData.php
		 * 
		 * output function
		 * $this -> oZigZagData -> finalVal;
		 * 
		 * debug:
		 * $zzObj->debugValues();
		 * 
		 * @author Yogesh Surendran
		 */
		class ZigZagPredictionClass implements ZigZagHandle{
			
			protected $oZigZagData;
		
			public function __construct(array $calculationArray, ZigZagData &$ZigBus)
		    {
				$this -> oZigZagData = $ZigBus;
				$this -> oZigZagData ->  aCalArr = $calculationArray;
				$this -> oZigZagData ->  aMidPoints = $this -> findMidValues($this -> oZigZagData ->  aCalArr);
		    }
			
			/**
			 * #rangeVal has been calculated, based on that make the comparison of vales and 
			 * plot the graph according to middle, middleLow, middleHigh, low, high values...
			 */
			function findMidValues(array $aCalArr)
			{
				
				$this -> oZigZagData -> sortedCalArr = $this -> oZigZagData -> aCalArr;
				asort($this -> oZigZagData ->  sortedCalArr);
		
				$tempArr = $this -> oZigZagData -> aCalArr;
				sort($tempArr);
				$tempArrCount = count($tempArr);
				$highVal = $tempArr[$tempArrCount - 1];
		
				for($i = 0; $i < $tempArrCount; $i++) {
					if(isset($tempArr[$i]) && $tempArr[$i] != '') {
						$lowVal = $tempArr[$i];
						break;
					}
				}
		
				$middleVal = round(($highVal + $lowVal) / 2);
				$middleLowVal = round(($middleVal + $lowVal) / 2);
				$middleHighVal = round(($middleVal + $highVal) / 2);
				$rangeVal = round((($highVal - $lowVal) * 5) / 100);
		
				return array(
							"low" => $lowVal, 
							"middleLow" => $middleLowVal, 
							"middle" => $middleVal, 
							"middleHigh" => $middleHighVal, 
							"high" => $highVal, 
							"range" => $rangeVal
							);
			}
		
			protected function _findCloseOrExtactValues(&$aCalArr, $comparisonVal)
			{				
				if($comparisonVal != '') {
					$compArrVal['val'] = $comparisonVal;
					$compArrVal['out'] = array();
					$compArrVal['actCount'] = count($this -> oZigZagData -> aCalArr);
					$compArrVal['rangeVal'] = $this -> oZigZagData ->  aMidPoints['range'];
					array_walk($aCalArr, array($this, 'compareValueINArray'), $compArrVal);
				}
			}
		
			protected function compareValueINArray($val, $key, &$compArrVal)
			{
				$rStartVal = $compArrVal['rangeVal'];
				$rEndVal = 0 - $compArrVal['rangeVal'];
		
				if($val == $compArrVal['val']) {
					$compArrVal['out'][$key] = $val;
				} else {
					($val > $compArrVal['val']) ? $diff = $val - $compArrVal['val'] : $diff = $compArrVal['val'] - $val;
					if(in_array($diff, range($rStartVal, $rEndVal))) {
						$compArrVal['out'][$key] = $val;
					}
				}
		
				if($key == $compArrVal['actCount'] - 1) {
					$this -> _storeOutPutValue($compArrVal['out']);
				}
			}
		
			protected function _storeOutPutValue($_o)
			{	
				if(count($this -> oZigZagData ->  aChOut) > 0){
					$this -> oZigZagData ->  aChOut = $_o + $this -> oZigZagData ->  aChOut;
				}else{
					$this -> oZigZagData ->  aChOut = $_o + (array)$this -> oZigZagData ->  aChOut;
				}
				
				ksort($this -> oZigZagData ->  aChOut);
			}
		
			public function predictZigZagValues()
			{				
				$this -> _findCloseOrExtactValues($this -> oZigZagData ->  aCalArr, $this -> oZigZagData ->  aMidPoints['middle']);
				$this -> _findCloseOrExtactValues($this -> oZigZagData ->  aCalArr, $this -> oZigZagData ->  aMidPoints['middleHigh']);
				$this -> _findCloseOrExtactValues($this -> oZigZagData ->  aCalArr, $this -> oZigZagData ->  aMidPoints['middleLow']);
				$this -> _findCloseOrExtactValues($this -> oZigZagData ->  aCalArr, $this -> oZigZagData ->  aMidPoints['low']);
				$this -> _findCloseOrExtactValues($this -> oZigZagData ->  aCalArr, $this -> oZigZagData ->  aMidPoints['high']);
		
				$this -> _refineZigZagValues();
			}
		
			/**
			 The refinement process is carried out on the @chOut value in order to remove equal values occuring in the next to next position. This way the graph plotted will consider only one unique point and will be more precise to draft.
			 */
			protected function _refineZigZagValues() {				
				$CalkeyArr = array_keys($this -> oZigZagData ->  aCalArr);
				$calArrCount = (int)end($CalkeyArr) + 1;
				$this -> oZigZagData ->  aFinalVal = array();
				for($i = 0; $i < $calArrCount; ) {
					if(isset($this -> oZigZagData ->  aChOut[$i])) {
						$retArray = $this -> predictAndUnsetSimilarValueKeysInRange($this -> oZigZagData ->  aChOut[$i], $i);
						if(isset($retArray['key']) && $retArray['value']) {
							$this -> oZigZagData ->  aFinalVal = $this -> oZigZagData ->  aFinalVal + array($retArray['key'] => $retArray['value']);
						}
						$i = $retArray['stoppedAt'];
					} else {
						$i++;
					}
		
				}
		
				/*
				 * The initial value is set as the initial value of the calArr 
				 * array using loop in order to neglect the null values at the start...
				 */
				for($i = 0; $i < $calArrCount; $i++) {
					if(isset($this -> oZigZagData ->  aCalArr[$i])) {
						if(!isset($this -> oZigZagData ->  aFinalVal[$i]))
							$this -> oZigZagData ->  aFinalVal[$i] = $this -> oZigZagData ->  aCalArr[$i];
						break;
					} else {
						if($i == 0)
							$this -> oZigZagData ->  aFinalVal[$i] = '';
					}
				}
		
				if(!isset($this -> oZigZagData ->  aFinalVal[$calArrCount - 1])) {
					$this -> oZigZagData ->  aFinalVal[$calArrCount - 1] = $this -> oZigZagData ->  aCalArr[$calArrCount - 1];
				}
			}
		
			public function predictAndUnsetSimilarValueKeysInRange($val, $key) 
			{				
				$range = $this -> oZigZagData ->  aMidPoints['range'];
				/*
				 * check for negative range.
				 * This calculation is a least case scenario. 
				 * only when the previous values are not subjected to this calculation then this will occur.
				 */
				$nveArray = array();
				for($i = $key - 1; $i >= $key - 10; $i--) {
					if(isset($this -> oZigZagData ->  aChOut[$i]) && ($this -> oZigZagData ->  aChOut[$i] == $val || ($this -> oZigZagData ->  aChOut[$i] - $val) < $range || ($this -> oZigZagData ->  aChOut[$i] - $val) > -$range)) {
						$nveArray[] = $i;
					} else {
						break;
					}
				}
		
				/*
				 check for positive range.
				 */
				$pveArray = array();
				for($i = $key + 1; $i <= $key + 10; $i++) {
					if(isset($this -> oZigZagData ->  aChOut[$i]) && ($this -> oZigZagData ->  aChOut[$i] == $val || ($this -> oZigZagData ->  aChOut[$i] - $val) < $range || ($this -> oZigZagData ->  aChOut[$i] - $val) > -$range)) {
						$pveArray[] = $i;
					} else {
						break;
					}
				}
		
				$totArray = array_merge($nveArray, $pveArray, array($key));
				sort($totArray);
				$totArrayCount = count($totArray);
		
				if($totArrayCount > 1) {
					$highLowValArr = $totArray;
					array_walk($highLowValArr, array($this, 'getValueAtValueAsKey'));
					$highLowValArr = array_combine($totArray, $highLowValArr);
		
					asort($highLowValArr);
		
					if($highLowValArr[$totArray[0]] >= $this -> oZigZagData ->  aMidPoints['middle'] && $highLowValArr[$totArray[$totArrayCount - 1]] >= $this -> oZigZagData ->  aMidPoints['middle']) {
						$tUniqueKey = array_keys($highLowValArr);
						$uniqueKey = end($tUniqueKey);
					}else if($highLowValArr[$totArray[0]] <= $this -> oZigZagData ->  aMidPoints['middle'] && $highLowValArr[$totArray[$totArrayCount - 1]] <= $this -> oZigZagData ->  aMidPoints['middle']) {
						$uniqueKey = array_keys($highLowValArr);
						$uniqueKey = $uniqueKey[0];
					} else {
						if(($totArrayCount % 2) == 0) {
							$uniqueKey = round(($totArray[0] + $totArray[$totArrayCount - 2]) / 2);
						} else {
							$uniqueKey = round(($totArray[0] + $totArray[$totArrayCount - 1]) / 2);
						}
					}
		
				} else {
					if(($totArrayCount % 2) == 0) {
						$uniqueKey = round(($totArray[0] + $totArray[$totArrayCount - 2]) / 2);
					} else {
						$uniqueKey = round(($totArray[0] + $totArray[$totArrayCount - 1]) / 2);
					}
				}
		
				return array("key" => $uniqueKey, "value" => $this -> oZigZagData ->  aChOut[$uniqueKey], "stoppedAt" => $i);
			}
		
			protected function getValueAtValueAsKey(&$val, $key) {
				$val = $this -> oZigZagData ->  aChOut[$val];
			}
		
			public function debugValues() {
				$calOut = array();
				
				echo "<table><tr valign=\"top\"><td colspan=\"3\"><pre>";
				echo "array(";
				foreach($this -> oZigZagData -> aCalArr as $k => $v) {
					$calOut[] = $k . " => " . $v;
				}
				echo implode(', ', $calOut);
				echo ")";
				echo "</pre></td></tr><tr valign=\"top\"><td><pre>";
				print_r($this -> oZigZagData ->  aMidPoints);
				echo "</pre></td><td><pre>";
				print_r($this -> oZigZagData ->  aCalArr);
				echo "</pre></td><td><pre>";
				print_r($this -> oZigZagData ->  aChOut);
				echo "</pre></td><td><pre>";
				print_r($this -> oZigZagData ->  aFinalVal);
				echo "</pre></td></tr></table>";
			}
		
			/**
			 * destory any temp variable or nullify all the variables that are used for the calculation.
			 */
			function __destruct() {}
		
		} 
		
	}
 
?>
