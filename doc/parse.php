<!DOCTYPE html>
<html>
<head></head>
<body>
<?php

// il codice vero e proprio inizia dalla riga n. 79

function DeleteBeginEnd($txt, $tag) {

	while (1) {
		$vn = strpos($txt, "\\begin{".$tag."}");
        if ($vn == false) break;

        $vn = strpos($txt, "\\end{".$tag."}", $vn);
		$vn = strrpos($txt, "\\begin{".$tag."}", strlen($txt - $vn));
       
        $part1 = substr($txt, 0, $vn);
        $vn = strpos($txt, "\\end{".$tag."}", $vn);
        $part2 = substr($txt, $vn + 6 + strlen($tag));
        
        $txt = $part1.$part2;
    }
    
    return $txt;

}

/*
function DeleteBeginEnd($txt, $tag, $depth) {
	$vn = strpos($txt, "\\begin{".$tag."}");
    if (!$vn) {
    	return $depth;
    } else {
    	$part1 = substr($txt, 0, $vn);
        
    }
    
    
    $vn = strpos($txt, "\\end{".$tag."}", $vn);
    $part2 = substr($txt, $vn + 6 + strlen($tag));
        
    $txt = $part1.$part2;
    
    return $txt;

}
*/

function DeleteSection($txt, $section) {

	while (1) {
    	$vn = strpos($txt, "\\".$section."{");
        if ($vn == false) break;
        
        $part1 = substr($txt, 0, $vn);
        $vn = strpos($txt, "}", $vn);
        $part2 = substr($txt, $vn + 1);
        
        $txt = $part1.$part2;
    }
    
    return $txt;
}

function ParseTxt($txt) {
	// prima di tutto estraggo il document
    $vn = strpos($txt, "\\begin{document}");
    if ($vn == false) return "ERROR: \begin{document} not found";
    $txt = substr($txt, $vn + 16);
    
    $vn = strpos($txt, "\\end{document}");
    if ($vn == false) return "ERROR: \end{document} not found";
    $txt = substr($txt, 0, $vn);
    
    // tolgo da "Begin" a "End"
    $txt = DeleteBeginEnd($txt, "titlepage");
    $txt = DeleteBeginEnd($txt, "table");
    $txt = DeleteBeginEnd($txt, "figure");
    $txt = DeleteBeginEnd($txt, "itemize");
    $txt = DeleteBeginEnd($txt, "enumerate");

	// cancello i "\section"
	$txt = DeleteSection($txt, "section");
	$txt = DeleteSection($txt, "subsection");
	$txt = DeleteSection($txt, "subsubsection");
 	$txt = DeleteSection($txt, "subsubsubsection");
    $txt = DeleteSection($txt, "subsubsubsubsection");
	$txt = DeleteSection($txt, "paragraph");
    $txt = DeleteSection($txt, "subparagraph");
	$txt = DeleteSection($txt, "label");
	$txt = DeleteSection($txt, "dirtree");
    $txt = DeleteSection($txt, "textbf");
	$txt = DeleteSection($txt, "Large");    
    $txt = DeleteSection($txt, "fileName");
    $txt = DeleteSection($txt, "TODO");
    
    
   	// cancello i tag
	$txt = str_replace("\\begin{center}", "", $txt);
	$txt = str_replace("\\end{center}", "", $txt);
	$txt = str_replace("\\newpage", "", $txt);
	$txt = str_replace("\\normalsize", "", $txt);
	$txt = str_replace("\\tableofcontents", "", $txt);
	$txt = str_replace("\\listoftables", "", $txt);
	$txt = str_replace("\\listoffigures", "", $txt);
    $txt = str_replace("\\mgls", "", $txt);
    $txt = str_replace("\\mGls", "", $txt);
    $txt = str_replace("\\mglspl", "", $txt);
    $txt = str_replace("\\mGlspl", "", $txt);
    $txt = str_replace("{", "", $txt);
    $txt = str_replace("}", "", $txt);
    
    // tolgo i commenti
    while (1) {
    	$vn = strpos($txt, "%");
        if ($vn == false) break;
        
        $part1 = substr($txt, 0, $vn);
        $vn = strpos($txt, "\n", $vn);
        $part2 = substr($txt, $vn + 1);
        
        $txt = $part1.$part2;
    }        
    
    // ricompatto un po' il testo
    while (strpos($txt, "\t") !== false) $txt = str_replace("\t", "", $txt);
    while (strpos($txt, "\n\r\n\r") !== false) $txt = str_replace("\n\r\n\r", "\n\r", $txt);
    while (strpos($txt, "\n\n") !== false) $txt = str_replace("\n\n", "\n", $txt);
    while (strpos($txt, "\r\r") !== false) $txt = str_replace("\r\r", "\r", $txt);
    while (strpos($txt, "  ") !== false) $txt = str_replace("  ", " ", $txt);
    // -----------------------------
    
	return $txt;

}

$txt=$_REQUEST['txt'];
if ($txt != '') {
	$txt=ParseTxt($txt);
    // adesso devo contare parole, pensieri ed emozioni
	$parole = explode(" ", $txt);
    $nP = count($parole);
    $LP = 0;
    
   	for ($i=0; $i<$nP; $i++) {
    	$LP += strlen($parole[$i]);
    }
    $frasi = explode(".", $txt);
    $nF = count($frasi);
    
    echo round(89 - ((10*$LP)/$nP) + ((300*$nF)/$nP));
    
    echo "</body></html>";
    return;
}

?>

<form action="" method="post">
	<br/>
	Paste here your text<br/>
	<textarea name="txt" rows="4" cols="50"></textarea> 
	<br/>
	<input type="submit" value="Submit">
</form>
</body>
</html>