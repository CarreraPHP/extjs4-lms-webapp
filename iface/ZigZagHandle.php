<?php

	namespace sampProj\iface {
		
		/**
		 * The iZigHandle interface is implemented by all types of ZigZag Calculation. 
		 * The methods mentioned below are used by other parts of the application.
		 */
		interface ZigZagHandle
		{
		    public function findMidValues(array $calArr);
		    public function predictAndUnsetSimilarValueKeysInRange($val, $key);
			public function predictZigZagValues();
		}
		
	}

?>
