DOC		= doc/

VRR		= _v1.2.0.pdf

ADR		= esterni/AnalisiDeiRequisiti
LDP		= esterni/LetteraDiPresentazione
PDP		= esterni/PianoDiProgetto
PDQ		= esterni/PianoDiQualifica
NDP		= interni/NormeDiProgetto
SDF		= interni/StudioDiFattibilita

ADR_FILE	= AnalisiDeiRequisiti
LDP_FILE	= LetteraDiPresentazione
PDP_FILE	= PianoDiProgetto
PDQ_FILE	= PianoDiQualifica
NDP_FILE	= NormeDiProgetto
SDF_FILE	= StudioDiFattibilita

PDF		= pdfs/
OUT		= ../../../../$(PDF)

P2L		= pdflatex -synctex=1 -interaction=nonstopmode -file-line-error -halt-on-error -synctex=1
MKG		= makeglossaries
ZIP		= esterni/ interni/ LetteraDiPresentazione.pdf

rr: make-dirs compile

make-dirs:
	mkdir -p $(PDF); mkdir -p $(PDF)esterni; mkdir -p $(PDF)interni;

compile: adr ldp pdp pdq ndp sdf clean
	
adr:
	cd $(DOC)$(ADR); $(P2L) -output-directory $(OUT)esterni $(ADR_FILE).tex; $(MKG) -d $(OUT)esterni $(ADR_FILE); $(P2L) -output-directory $(OUT)esterni $(ADR_FILE).tex; mv $(OUT)esterni/$(ADR_FILE).pdf $(OUT)esterni/$(ADR_FILE)$(VRR)
	
ldp:
	cd $(DOC)$(LDP); $(P2L) -output-directory $(OUT) $(LDP_FILE).tex; $(MKG) -d $(OUT) $(LDP_FILE); $(P2L) -output-directory $(OUT) $(LDP_FILE).tex;
	
pdp:
	cd $(DOC)$(PDP); $(P2L) -output-directory $(OUT)esterni $(PDP_FILE).tex; $(MKG) -d $(OUT)esterni $(PDP_FILE); $(P2L) -output-directory $(OUT)esterni $(PDP_FILE).tex; mv $(OUT)esterni/$(PDP_FILE).pdf $(OUT)esterni/$(PDP_FILE)$(VRR)
	
pdq:
	cd $(DOC)$(PDQ); $(P2L) -output-directory $(OUT)esterni $(PDQ_FILE).tex; $(MKG) -d $(OUT)esterni $(PDQ_FILE); $(P2L) -output-directory $(OUT)esterni $(PDQ_FILE).tex; mv $(OUT)esterni/$(PDQ_FILE).pdf $(OUT)esterni/$(PDQ_FILE)$(VRR)

ndp:
	cd $(DOC)$(NDP); $(P2L) -output-directory $(OUT)interni $(NDP_FILE).tex; $(MKG) -d $(OUT)interni $(NDP_FILE); $(P2L) -output-directory $(OUT)interni $(NDP_FILE).tex; mv $(OUT)interni/$(NDP_FILE).pdf $(OUT)interni/$(NDP_FILE)$(VRR)
	
sdf:
	cd $(DOC)$(SDF); $(P2L) -output-directory $(OUT)interni $(SDF_FILE).tex; $(MKG) -d $(OUT)interni $(SDF_FILE); $(P2L) -output-directory $(OUT)interni $(SDF_FILE).tex; mv $(OUT)interni/$(SDF_FILE).pdf $(OUT)interni/$(SDF_FILE)$(VRR)

zip:
	cd $(PDF); zip -r starware.zip $(ZIP)
	
clean:
	find $(PDF) ! -name "*.pdf" -type f -delete
