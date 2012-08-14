<?php
	
	namespace sampProj\data {
		
		/**
		 * sZigBus is data class used by ZigZagPrediction class for 
		 * storing resultant array indenpendent of the scope at which it is handled. 
		 */
		class ZigZagData
		{
			public $aCalArr		 = array();
			public $aChOut		 = array();
			public $aFinalVal	 = array();
			public $aMidPoints	 = array();
		}
	}
?>