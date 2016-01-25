PATH_RR		= doc/1_RR/
PATH_RP		= doc/2_RP/
PATH_RQ		= doc/3_RQ/
PATH_RA		= doc/4_RA/

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

RR_PDF		= pdfs/1_RR/
OUT_RR		= ../../../../$(RR_PDF)

P2L		= pdflatex -synctex=1 -interaction=nonstopmode -file-line-error -halt-on-error -synctex=1
MKG		= makeglossaries
ZIP		= esterni/ interni/ LetteraDiPresentazione.pdf

rr: mkdir-rr compile-rr zip-rr

mkdir-rr:
	mkdir -p $(RR_PDF); mkdir -p $(RR_PDF)esterni; mkdir -p $(RR_PDF)interni;

compile-rr: rr-adr rr-ldp rr-pdp rr-pdq rr-ndp rr-sdf clean-rr
	
rr-adr:
	cd $(PATH_RR)$(ADR); $(P2L) -output-directory $(OUT_RR)esterni $(ADR_FILE).tex; $(MKG) -d $(OUT_RR)esterni $(ADR_FILE); $(P2L) -output-directory $(OUT_RR)esterni $(ADR_FILE).tex; mv $(OUT_RR)esterni/$(ADR_FILE).pdf $(OUT_RR)esterni/$(ADR_FILE)$(VRR)
	
rr-ldp:
	cd $(PATH_RR)$(LDP); $(P2L) -output-directory $(OUT_RR) $(LDP_FILE).tex; $(MKG) -d $(OUT_RR) $(LDP_FILE); $(P2L) -output-directory $(OUT_RR) $(LDP_FILE).tex;
	
rr-pdp:
	cd $(PATH_RR)$(PDP); $(P2L) -output-directory $(OUT_RR)esterni $(PDP_FILE).tex; $(MKG) -d $(OUT_RR)esterni $(PDP_FILE); $(P2L) -output-directory $(OUT_RR)esterni $(PDP_FILE).tex; mv $(OUT_RR)esterni/$(PDP_FILE).pdf $(OUT_RR)esterni/$(PDP_FILE)$(VRR)
	
rr-pdq:
	cd $(PATH_RR)$(PDQ); $(P2L) -output-directory $(OUT_RR)esterni $(PDQ_FILE).tex; $(MKG) -d $(OUT_RR)esterni $(PDQ_FILE); $(P2L) -output-directory $(OUT_RR)esterni $(PDQ_FILE).tex; mv $(OUT_RR)esterni/$(PDQ_FILE).pdf $(OUT_RR)esterni/$(PDQ_FILE)$(VRR)

rr-ndp:
	cd $(PATH_RR)$(NDP); $(P2L) -output-directory $(OUT_RR)interni $(NDP_FILE).tex; $(MKG) -d $(OUT_RR)interni $(NDP_FILE); $(P2L) -output-directory $(OUT_RR)interni $(NDP_FILE).tex; mv $(OUT_RR)interni/$(NDP_FILE).pdf $(OUT_RR)interni/$(NDP_FILE)$(VRR)
	
rr-sdf:
	cd $(PATH_RR)$(SDF); $(P2L) -output-directory $(OUT_RR)interni $(SDF_FILE).tex; $(MKG) -d $(OUT_RR)interni $(SDF_FILE); $(P2L) -output-directory $(OUT_RR)interni $(SDF_FILE).tex; mv $(OUT_RR)interni/$(SDF_FILE).pdf $(OUT_RR)interni/$(SDF_FILE)$(VRR)

zip-rr:
	cd $(RR_PDF); zip -r RR_starware.zip $(ZIP)
	
clean-rr:
	find $(RR_PDF) ! -name "*.pdf" -type f -delete
