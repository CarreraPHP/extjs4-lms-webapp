<?PHP

namespace sabreHcode\data\service {

    class Quiz {

        private $_oDbInstance;

        public function __construct($dbInstance) {

            $this->_oDbInstance = $dbInstance;
        }

        public function getAllSingleQuiz($course_id, $topic_id, $content_id) {

            $quesArray = array();
            $ansArray = array();
            $totalQuesArr = array();
            $finalArray = array();
            $totalAnsArr = array();
            $currentReference = &$aRecordCollection;
            $key = array();
            $user_id = '';
            if (isset($_SESSION['userDetails'])) {
                $user_id = $_SESSION['userDetails'][0]['id'];
            }
            $course_id = preg_replace('/cou/', '', $course_id);
            echo $sql = "SELECT `ques_id`, GROUP_CONCAT(ans_id order by ans_id ASC) AS `ans_id`, `quiz_id` FROM `pt_quiz_meta` WHERE `course_id` = '$course_id' AND `topic_id` = '$topic_id' AND `content_id` = '$content_id' GROUP BY `quiz_id` ASC, `ques_id` ASC";
            exit;
            $Result = $this->_oDbInstance->query($sql);
            if ($Result->num_rows > 0) {
                while ($Record = $Result->fetch_assoc()) {
                    $quesArray[] = $Record['ques_id'];
                    $ansArray[] = $Record['ans_id'];
                    $totalArr[] = $Record;
                }
                $quesString = implode(",", $quesArray);
                $ansString = implode(",", $ansArray);
                $sSql = "SELECT `id` AS que_id, `name` AS ques, `quiz_type` FROM `sabre`.`pt_quiz_content` WHERE `id` IN($quesString)";
                $Result = $this->_oDbInstance->query($sSql);
                if ($Result->num_rows > 0) {
                    $i = 0;
                    while ($Record = $Result->fetch_assoc()) {
                        $Record['id'] = ++$i;
                        $totalQuesArr[] = $Record;
                    }
                }
                $sSql = "SELECT `id` AS ans_id, `name` AS Ans FROM `sabre`.`pt_quiz_content` WHERE `id` IN($ansString) ";
                $Result = $this->_oDbInstance->query($sSql);
                if ($Result->num_rows > 0) {
                    while ($Record = $Result->fetch_assoc()) {
                        $totalAnsArr[] = $Record;
                    }
                }
                $sql = "SELECT `ans_id` FROM `sabre`.`pt_quiz_meta` WHERE result = 'T' AND `course_id` = '$course_id' AND `topic_id` = '$topic_id' AND `content_id` = '$content_id'";
                $result = $this->_oDbInstance->query($sql);
                if ($result->num_rows > 0) {
                    while ($record = $result->fetch_assoc()) {
                        $correctAnsArr[] = $record;
                    }
                }
                $queArrayCount = count($totalQuesArr);
                $totalAnsCount = count($totalAnsArr);
                for ($i = 0; $i < $queArrayCount; $i++) {
                    $tempQue = array();
                    $tempQue = $totalQuesArr[$i];
                    $ansArrayExp[] = explode(',', $ansArray[$i]);
                    $ansCount = count($ansArrayExp[$i]);
                    for ($j = 0; $j < $totalAnsCount; $j++) {
                        for ($k = 0; $k < $ansCount; $k++) {
                            if ($ansArrayExp[$i][$k] == $totalAnsArr[$j]['ans_id'])
                                $tempQue['ans'][] = $totalAnsArr[$j];
                        }
                        if ($totalAnsArr[$j]['ans_id'] == $correctAnsArr[$i]['ans_id']) {
                            $tempQue['correctAns'][] = $totalAnsArr[$j]['Ans'];
                        }
                    }
                    //$tempQue['type'][] = $type_id;
                    $tempQue['course_id'][] = $course_id;
                    $tempQue['topic_id'][] = $topic_id;
                    $tempQue['content_id'][] = $content_id;

                    $aRecordCollection[] = $tempQue;
                }
                return array("data" => $aRecordCollection, "total" => count($aRecordCollection));
            } else {
                return $aRecordCollection[] = array('name' => "No Records Found");
            }
        }

        public function getSingleQuizResult($type_id, $course_id, $topic_id, $content_id) {
            $quesArray = array();
            $totalQuesArr = array();
            $finalArray = array();
            $totalAnsArr = array();
            $CorrectAnsArr = array();
            $SelectedAnsArr = array();
            $role_id = '';
            $database = 'sabre';
            $course_id = preg_replace('/cou/', '', $course_id);
            if (isset($_SESSION['userDetails'])) {
                $user_id = $_SESSION['userDetails'][0]['id'];
                $role_id = $_SESSION['userDetails'][0]['role_id'];
            }
            if ($role_id != '' && $role_id == 1) {
                $table = 'pt_admin_quiz';
            } else {
                $table = 'pt_quiz_result';
            }
            $sql = "SELECT `ques_id`, GROUP_CONCAT(ans_id order by ans_id ASC) AS `ans_id`, `quiz_id` FROM `pt_quiz_meta` WHERE `quiz_id` = '$type_id' AND `course_id` = '$course_id' AND `topic_id` = '$topic_id' AND `content_id` = '$content_id' GROUP BY `quiz_id` ASC, `ques_id` ASC";
            $Result = $this->_oDbInstance->query($sql);
            if ($Result->num_rows > 0) {
                while ($Record = $Result->fetch_assoc()) {
                    $quesArray[] = $Record['ques_id'];
                    $ansArray[] = $Record['ans_id'];
                }
                $quesString = implode(",", $quesArray);
                $ansString = implode(",", $ansArray);
                $sSql = "SELECT `id` AS que_id, `name` AS ques FROM `sabre`.`pt_quiz_content` WHERE `id` IN($quesString)";
                $Result = $this->_oDbInstance->query($sSql);
                if ($Result->num_rows > 0) {
                    $i = 0;
                    while ($Record = $Result->fetch_assoc()) {
                        $Record['id'] = ++$i;
                        $totalQuesArr[] = $Record;
                    }
                }
                $sSql = "SELECT `id` AS ans_id, `name` AS Ans FROM `sabre`.`pt_quiz_content` WHERE `id` IN($ansString) ";
                $Result = $this->_oDbInstance->query($sSql);
                if ($Result->num_rows > 0) {
                    while ($Record = $Result->fetch_assoc()) {
                        $totalAnsArr[] = $Record;
                    }
                }
                $sql = "SELECT `selected_ans_id` FROM `" . $database . "`" . ".`$table` WHERE `course_id` = '$course_id' AND `topic_id` = '$topic_id' AND `content_id` = '$content_id' AND `que_id` IN($quesString)";
                $oResult = $this->_oDbInstance->query($sql);
                if ($oResult->num_rows > 0) {
                    while ($oRecord = $oResult->fetch_assoc()) {
                        $SelectedAnsArr[] = $oRecord;
                    }
                }
                $sql = "SELECT m1.`ques_id`, m1.`ans_id`, m1.`result`, m2.`name` FROM `sabre`.`pt_quiz_meta` AS m1 LEFT JOIN `sabre`.`pt_quiz_content` AS m2 ON m1.ans_id = m2.id WHERE m1.course_id = '$course_id' AND m1.topic_id = '$topic_id' AND m1.content_id = '$content_id' AND m1.result = 'T'";
                $oResult = $this->_oDbInstance->query($sql);
                if ($oResult->num_rows > 0) {
                    while ($oRecord = $oResult->fetch_assoc()) {
                        $CorrectAnsArr[] = $oRecord;
                    }
                }
                $queArrayCount = count($totalQuesArr);
                $totalAnsCount = count($totalAnsArr);
                for ($i = 0; $i < $queArrayCount; $i++) {
                    $tempQue = array();
                    $tempQue = $totalQuesArr[$i];
                    for ($j = 0; $j < $totalAnsCount; $j++) {
                        if ($CorrectAnsArr[$i]['ans_id'] == $totalAnsArr[$j]['ans_id']) {
                            $tempQue['ans'] = $CorrectAnsArr[$i]['name'];
                            $tempQue['ans_id'] = $CorrectAnsArr[$i]['ans_id'];
                        }
                        if ($SelectedAnsArr[$i]['selected_ans_id'] == $totalAnsArr[$j]['ans_id']) {
                            $tempQue['selectedAns'] = $totalAnsArr[$j]['Ans'];
                        }
                        if ($SelectedAnsArr[$i]['selected_ans_id'] == $CorrectAnsArr[$i]['ans_id']) {
                            $tempQue['icon'] = "resources/images/icons/accept.png";
                        } else {
                            $tempQue['icon'] = "resources/images/icons/cancel.png";
                        }
                    }
                    $aRecordCollection[] = $tempQue;
                }
                return array("data" => $aRecordCollection, "total" => count($aRecordCollection));
            } else {
                return $aRecordCollection[] = array('name' => "No Records Found");
            }
        }

        public function setQuizAttempt($user_id, $course_id, $topic_id, $content_id) {
            $course_id = preg_replace('/cou/', '', $course_id);
            $aRecordCollection = array();
            $sql = "SELECT * FROM `sabre`.`pt_quiz_attempt` WHERE user_id = '$user_id' AND `course_id` = '$course_id' AND `topic_id` = '$topic_id' AND `content_id` = '$content_id'";
            $Result = $this->_oDbInstance->query($sql);
            if ($Result->num_rows == 0) {
                $attempt = 1;
                $insert = "INSERT INTO `sabre`.`pt_quiz_attempt` (`user_id`,`attempt`,`course_id`, `topic_id`, `content_id`, `created_by`,`created_date`,`updated_by`,`update_date`)VALUES('$user_id',$attempt,'$course_id','$topic_id','$content_id',1',NOW(),'1',NOW())";
                $Result = $this->_oDbInstance->query($insert);
                if ($Result) {
                    $sSql = "SELECT `id`, `user_id`, `attempt` FROM `sabre`.`pt_quiz_attempt` WHERE user_id = '$user_id'";
                    $Result = $this->_oDbInstance->query($sSql);
                    while ($Record = $Result->fetch_assoc()) {
                        $aRecordCollection[] = $Record;
                    }
                }
                return json_encode(array('success' => true, 'message' => 'Record inserted successfully', 'data' => $aRecordCollection));
            } else {
                while ($Record = $Result->fetch_assoc()) {
                    $attempt = $Record['attempt'] + 1;
                    $id = $Record['id'];
                    $update = "UPDATE `sabre`.`pt_quiz_attempt` SET `attempt` = $attempt WHERE user_id = '$user_id' AND `id` = $id";
                    $Result = $this->_oDbInstance->query($update);
                    if ($Result) {
                        $sSql = "SELECT `id`, `user_id`, `attempt` FROM `sabre`.`pt_quiz_attempt` WHERE user_id = '$user_id'";
                        $Result = $this->_oDbInstance->query($sSql);
                        while ($Record = $Result->fetch_assoc()) {
                            $aRecordCollection[] = $Record;
                        }
                    }
                }
                return json_encode(array('success' => true, 'message' => 'Record updated successfully', 'data' => $aRecordCollection));
            }
        }

        public function SaveQuiz($data) {
            $role_id = '';
            $course_id = preg_replace('/cou/', '', $data['course_id']);
            $database = 'sabre';
            if (isset($_SESSION['userDetails'])) {
                $user_id = $_SESSION['userDetails'][0]['id'];
                $role_id = $_SESSION['userDetails'][0]['role_id'];
            }
            if ($role_id != '' && $role_id == 1) {
                $table = 'pt_admin_quiz';
                $field = 'percentage';
            } else {
                $table = 'pt_quiz_result';
                $field = 'percentage %';
            }
            $sql = "SELECT `result` FROM `sabre`.`pt_quiz_meta` WHERE `ans_id` = '" . $data['Answer'] . "'";
            $Result = $this->_oDbInstance->query($sql);
            while ($Record = $Result->fetch_assoc()) {
                if ($Record['result'] == 'T') {
                    $percentage = "100%";
                } else {
                    $percentage = "0%";
                }
                $select = "SELECT * FROM `" . $database . "`" . ".`$table` WHERE `user_id` = '$user_id' AND que_id = '" . $data['que_id'] . "'";
                $oResult = $this->_oDbInstance->query($select);
                if ($oResult->num_rows == 0) {
                    $insert = "INSERT INTO `" . $database . "`" . ".`$table`";
                    $insert .= "(`user_id`,`que_id`,`selected_ans_id`,`result`, `$field`, `course_id`, `topic_id`, `content_id`, ";
                    $insert .= "`created_by`,`created_date`,`updated_by`,`updated_date`)";
                    $insert .= "VALUES('$user_id','" . $data['que_id'] . "','" . $data['Answer'] . "','" . $Record['result'] . "','$percentage', '$course_id', '" . $data['topic_id'] . "', '" . $data['content_id'] . "', '$user_id',NOW(),'$user_id',NOW())";
                    $Result = $this->_oDbInstance->query($insert);
                } else {
                    while ($oRecord = $oResult->fetch_assoc()) {
                        $update = "UPDATE `" . $database . "`" . ".`$table` SET `selected_ans_id` = '" . $data['Answer'] . "', `result` = '" . $Record['result'] . "', `$field` = '$percentage', `updated_date` = NOW() WHERE user_id = '$user_id' AND `id` = '" . $oRecord['id'] . "'";
                        $Result = $this->_oDbInstance->query($update);
                    }
                }
                return array('success' => true);
            }
        }

        public function AddQuiz($data) {
            $course_id = preg_replace('/cou/', '', $data['course_id']);
            $data['question'] = addslashes($data['question']);
            $ansArr = array();
            $ansArr['answer'][] = addslashes($data['answer1']);
            $ansArr['answer'][] = addslashes($data['answer2']);
            $ansArr['answer'][] = addslashes($data['answer3']);
            $ansArr['answer'][] = addslashes($data['answer4']);
            if ($data['quiz_type'] == 4) {
                if ($data['id'] == 'new') {
                    if (isset($data['question'])) {
                        $select = "SELECT * FROM `sabre`.`pt_quiz_content` WHERE `name` = '" . $data['question'] . "'";
                        $oResult = $this->_oDbInstance->query($select);
                        if ($oResult->num_rows == 0) {
                            $insert = "INSERT INTO `sabre`.`pt_quiz_content` (`name`,`content_type`,`quiz_type`,";
                            $insert .= "`course_id`,`topic_id`,`content_id`,`created_by`,`created_date`,`updated_by`,`updated_date`)";
                            $insert .= "VALUES('" . $data['question'] . "', 'Q', '" . $data['quiz_type'] . "', '$course_id', '" . $data['topic_id'] . "', '" . $data['content_id'] . "', '1', NOW(), '1', NOW())";
                            $Result = $this->_oDbInstance->query($insert);
                            if ($Result) {
                                $sql = "SELECT `id` FROM `sabre`.`pt_quiz_content` ORDER BY `id` DESC LIMIT 0, 1";
                                $oResult = $this->_oDbInstance->query($sql);
                                while ($oRecord = $oResult->fetch_assoc()) {
                                    $ansCount = count($ansArr['answer']);
                                    for ($i = 0; $i < $ansCount; $i++) {
                                        $insert = "INSERT INTO `sabre`.`pt_quiz_content` (`name`,`content_type`,`quiz_type`,";
                                        $insert .= "`course_id`,`topic_id`,`content_id`,`created_by`,`created_date`,`updated_by`,`updated_date`)";
                                        $insert .= "VALUES('" . $ansArr['answer'][$i] . "', 'A', '" . $data['quiz_type'] . "', '$course_id', '" . $data['topic_id'] . "', '" . $data['content_id'] . "', '1', NOW(), '1', NOW())";
                                        $Result = $this->_oDbInstance->query($insert);
                                        if ($Result) {
                                            $sql = "SELECT `id` FROM `sabre`.`pt_quiz_content` ORDER BY `id` DESC LIMIT 0, 1";
                                            $result = $this->_oDbInstance->query($sql);
                                            while ($record = $result->fetch_assoc()) {
                                                if ($data['CorrectAns'] == $i + 1) {
                                                    $results = 'T';
                                                } else {
                                                    $results = 'F';
                                                }
                                                $ins = "INSERT INTO `sabre`.`pt_quiz_meta`(`ques_id`,`ans_id`,`quiz_id`,`course_id`,`topic_id`,`content_id`,`result`,`created_by`,`created_date`,`updated_by`,`updated_date`)";
                                                $ins .= " VALUES('" . $oRecord['id'] . "', '" . $record['id'] . "', '" . $data['quiz_type'] . "', '$course_id', '" . $data['topic_id'] . "', '" . $data['content_id'] . "', '$results', '1', NOW(), '1', NOW())";
                                                $Res = $this->_oDbInstance->query($ins);
                                            }
                                        }
                                    }
                                }
                            }
                            return array("success" => true);
                        } else {
                            return array("success" => false);
                        }
                    }
                } else {
                    $ansIdArr = array();
                    $metaIdArr = array();

                    $update = "UPDATE `sabre`.`pt_quiz_content` SET `name` = '" . $data['question'] . "', `updated_date` = NOW() WHERE `id` =" . $data['id'];
                    $Res = $this->_oDbInstance->query($update);
                    if ($Res) {
                        $sql = "SELECT `id`, `ans_id` FROM `sabre`.`pt_quiz_meta` WHERE `ques_id` ='" . $data['id'] . "'";
                        $result = $this->_oDbInstance->query($sql);
                        while ($record = $result->fetch_assoc()) {
                            $ansIdArr[] = $record['ans_id'];
                            $metaIdArr[] = $record['id'];
                        }
                        $ansIdCount = count($ansIdArr);
                        $metaIdCount = count($metaIdArr);
                        for ($j = 0; $j < $metaIdCount; $j++) {
                            $updateResult = "UPDATE `sabre`.`pt_quiz_meta` SET `result` = 'F' WHERE `id` = '" . $metaIdArr[$j] . "'";
                            $results = $this->_oDbInstance->query($updateResult);
                        }

                        for ($i = 0; $i < $ansIdCount; $i++) {
                            $update = "UPDATE `sabre`.`pt_quiz_content` SET `name` = '" . $ansArr['answer'][$i] . "', `updated_date` = NOW() WHERE `id` =" . $ansIdArr[$i];
                            $res = $this->_oDbInstance->query($update);
                            if ($res) {
                                if ($data['CorrectAns'] == $i + 1) {
                                    $select = "SELECT `id` FROM `sabre`.`pt_quiz_content` WHERE `name` ='" . $ansArr['answer'][$i] . "'";
                                    $oResult = $this->_oDbInstance->query($select);
                                    while ($oRecord = $oResult->fetch_assoc()) {
                                        $sql = "SELECT `id`, `ans_id` FROM `sabre`.`pt_quiz_meta` WHERE `ans_id` = '" . $oRecord['id'] . "'";
                                        $result = $this->_oDbInstance->query($sql);
                                        while ($record = $result->fetch_assoc()) {
                                            $update = "UPDATE `sabre`.`pt_quiz_meta` SET `result` = 'T', `updated_date` = NOW() WHERE `id` = '" . $record['id'] . "'";
                                            $res = $this->_oDbInstance->query($update);
                                            if ($res) {
                                                return array("success" => true);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        return array("success" => false);
                    }
                }
            } else if ($data['quiz_type'] == 3) {
                $corAns = array();
                if (isset($data['CorrectAns1'])) {
                    $corAns[$data['CorrectAns1']] = $data['CorrectAns1'];
                }
                if (isset($data['CorrectAns2'])) {
                    $corAns[$data['CorrectAns2']] = $data['CorrectAns2'];
                }
                if (isset($data['CorrectAns3'])) {
                    $corAns[$data['CorrectAns3']] = $data['CorrectAns3'];
                }
                if (isset($data['CorrectAns4'])) {
                    $corAns[$data['CorrectAns4']] = $data['CorrectAns4'];
                }
                $ansArr = array();
                $ansArr['answer'][] = addslashes($data['answer1']);
                $ansArr['answer'][] = addslashes($data['answer2']);
                $ansArr['answer'][] = addslashes($data['answer3']);
                $ansArr['answer'][] = addslashes($data['answer4']);
                if ($data['id'] == 'new') {
                    if (isset($data['question'])) {
                        $select = "SELECT * FROM `sabre`.`pt_quiz_content` WHERE `name` = '" . $data['question'] . "'";
                        $oResult = $this->_oDbInstance->query($select);
                        if ($oResult->num_rows == 0) {
                            $insert = "INSERT INTO `sabre`.`pt_quiz_content` (`name`,`content_type`,`quiz_type`,";
                            $insert .= "`course_id`,`topic_id`,`content_id`,`created_by`,`created_date`,`updated_by`,`updated_date`)";
                            $insert .= "VALUES('" . $data['question'] . "', 'Q', '" . $data['quiz_type'] . "', '$course_id', '" . $data['topic_id'] . "', '" . $data['content_id'] . "', '1', NOW(), '1', NOW())";
                            $Result = $this->_oDbInstance->query($insert);
                            if ($Result) {
                                $sql = "SELECT `id` FROM `sabre`.`pt_quiz_content` ORDER BY `id` DESC LIMIT 0, 1";
                                $oResult = $this->_oDbInstance->query($sql);
                                while ($oRecord = $oResult->fetch_assoc()) {
                                    $ansCount = count($ansArr['answer']);
                                    for ($i = 0; $i < $ansCount; $i++) {
                                        $insert = "INSERT INTO `sabre`.`pt_quiz_content` (`name`,`content_type`,`quiz_type`,";
                                        $insert .= "`course_id`,`topic_id`,`content_id`,`created_by`,`created_date`,`updated_by`,`updated_date`)";
                                        $insert .= "VALUES('" . $ansArr['answer'][$i] . "', 'A', '" . $data['quiz_type'] . "', '$course_id', '" . $data['topic_id'] . "', '" . $data['content_id'] . "', '1', NOW(), '1', NOW())";
                                        $Result = $this->_oDbInstance->query($insert);
                                    }
                                    $sql = "SELECT `id` FROM `sabre`.`pt_quiz_content` ORDER BY `id` DESC LIMIT 0, 1";
                                    $result = $this->_oDbInstance->query($sql);
                                    while ($record = $result->fetch_assoc()) {
                                        $ans_id[] = $record;
                                    }
                                        if (count($corAns) < 0) {
                                            if ($data['CorrectAns'] == $i + 1) {
                                                $results = 'T';
                                            } else {
                                                $results = 'F';
                                            }
                                            $ins = "INSERT INTO `sabre`.`pt_quiz_meta`(`ques_id`,`ans_id`,`quiz_id`,`course_id`,`topic_id`,`content_id`,`result`,`created_by`,`created_date`,`updated_by`,`updated_date`)";
                                            $ins .= " VALUES('" . $oRecord['id'] . "', '" . $record['id'] . "', '" . $data['quiz_type'] . "', '$course_id', '" . $data['topic_id'] . "', '" . $data['content_id'] . "', '$results', '1', NOW(), '1', NOW())";
                                            $Res = $this->_oDbInstance->query($ins);
                                        } else {
                                            $results = array();

                                            $ansCount = count($ansArr['answer']);
                                            for ($z = 0; $z < $ansCount; $z++) {
                                                if (isset($corAns[$z + 1])) {
                                                    $results[] = 'T';
                                                } else {
                                                    $results[] = 'F';
                                                }
                                            }
                                            $ins = '';
                                            for ($y = 0; $y < count($results); $y++) {
                                                $ins = "INSERT INTO `sabre`.`pt_quiz_meta`(`ques_id`,`ans_id`,`quiz_id`,`course_id`,`topic_id`,`content_id`,`result`,`created_by`,`created_date`,`updated_by`,`updated_date`) VALUES('" . $oRecord['id'] . "', '" . $record['id'] . "', '" . $data['quiz_type'] . "', '$course_id', '" . $data['topic_id'] . "', '" . $data['content_id'] . "', '$results[$y]', '1', NOW(), '1', NOW())";
                                                $Res = $this->_oDbInstance->query($ins);
                                            }
                                        }
                                    
                                }
                            }
                            return array("success" => true);
                        } else {
                            return array("success" => false);
                        }
                    }
                }
            }
        }

        public function getQuizType() {
            $quizType = array();
            $sql = "SELECT `id`, `name` FROM `sabre`.`pt_quiz_type` WHERE `deleted` = 'F'";
            $oResult = $this->_oDbInstance->query($sql);
            if ($oResult->num_rows > 0) {
                while ($oRecord = $oResult->fetch_assoc()) {
                    $quizType[] = $oRecord;
                }
            }
            return array("data" => $quizType);
        }

        public function getQuizResultChart($course_id, $topic_id, $content_id) {
            if (isset($_SESSION['userDetails'])) {
                $user_id = $_SESSION['userDetails'][0]['id'];
                $role_id = $_SESSION['userDetails'][0]['role_id'];
            }
            if ($role_id != '' && $role_id == 1) {
                $table = 'pt_admin_quiz';
                $field = 'percentage';
            } else {
                $table = 'pt_quiz_result';
                $field = 'percentage %';
            }
            $database = 'sabre';
            $course_id = preg_replace('/cou/', '', $course_id);
            $percentage = array();
            $count = '';
            $ansCount = array();
            $total = 100;
            $finalArray = array();

            $sql = "SELECT `$field` FROM `" . $database . "`" . ".`$table` WHERE `user_id` = '$user_id' AND `course_id` = '$course_id' AND `topic_id` = '$topic_id' AND `content_id` = '$content_id'";
            $oResult = $this->_oDbInstance->query($sql);
            if ($oResult->num_rows > 0) {
                $count = $oResult->num_rows;

                while ($oRecord = $oResult->fetch_assoc()) {
                    if ($oRecord[$field] == 100) {
                        $ansCount[] = $oRecord[$field];
                    }
                    $percentage[] = $oRecord[$field];
                }

                $i = 0;
                $outOf = count($ansCount);
                $avg = array_sum($percentage) / $count;

                if ($avg != 0) {
                    $finalArray[$i]['name'] = 'Pass ' . round($avg) . '%';
                    $finalArray[$i]['result'] = round($avg);
                    $finalArray[$i]['count'] = $count;
                    $finalArray[$i]['correct'] = $outOf;
                    $finalArray[$i + 1]['name'] = 'Fail ' . round($total - $avg) . '%';
                    $finalArray[$i + 1]['result'] = round($total - $avg);
                    $finalArray[$i + 1]['count'] = $count;
                    $finalArray[$i + 1]['correct'] = $outOf;
                } else {
                    $finalArray[$i]['name'] = 'Fail ' . round($total - $avg) . '%';
                    $finalArray[$i]['result'] = $total;
                    $finalArray[$i]['count'] = $count;
                    $finalArray[$i]['correct'] = $outOf;
                }
            }
            return array("data" => $finalArray);
        }

    }

}
?>
