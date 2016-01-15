PATH_RR		= doc/1_RR/
PATH_RP		= doc/2_RP/
PATH_RQ		= doc/3_RQ/
PATH_RA		= doc/4_RA/

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

RR_PDF		= pdfs/1_RR
OUT_RR		= ../../../../$(RR_PDF)
OUT_RR_BACK	= ../../../$(RR_PDF)

P2L		= pdflatex -synctex=1 -interaction=nonstopmode -file-line-error -halt-on-error -synctex=1
MKG		= makeglossaries

rr: mkdir-rr compile-rr

mkdir-rr:
	mkdir -p $(RR_PDF)

compile-rr: rr-adr rr-ldp rr-pdp rr-pdq rr-ndp rr-sdf clean-rr
	
rr-adr:
	cd $(PATH_RR)$(ADR); $(P2L) -output-directory $(OUT_RR) $(ADR_FILE).tex; $(MKG) -d $(OUT_RR) $(ADR_FILE); $(P2L) -output-directory $(OUT_RR) $(ADR_FILE).tex;
	
rr-ldp:
	cd $(PATH_RR)$(LDP); $(P2L) -output-directory $(OUT_RR) $(LDP_FILE).tex; $(MKG) -d $(OUT_RR) $(LDP_FILE); $(P2L) -output-directory $(OUT_RR) $(LDP_FILE).tex;
	
rr-pdp:
	cd $(PATH_RR)$(PDP); $(P2L) -output-directory $(OUT_RR) $(PDP_FILE).tex; $(MKG) -d $(OUT_RR) $(PDP_FILE); $(P2L) -output-directory $(OUT_RR) $(PDP_FILE).tex;
	
rr-pdq:
	cd $(PATH_RR)$(PDQ); $(P2L) -output-directory $(OUT_RR) $(PDQ_FILE).tex; $(MKG) -d $(OUT_RR) $(PDQ_FILE); $(P2L) -output-directory $(OUT_RR) $(PDQ_FILE).tex;

rr-ndp:
	cd $(PATH_RR)$(NDP); $(P2L) -output-directory $(OUT_RR) $(NDP_FILE).tex; $(MKG) -d $(OUT_RR) $(NDP_FILE); $(P2L) -output-directory $(OUT_RR) $(NDP_FILE).tex;
	
rr-sdf:
	cd $(PATH_RR)$(SDF); $(P2L) -output-directory $(OUT_RR) $(SDF_FILE).tex; $(MKG) -d $(OUT_RR) $(SDF_FILE); $(P2L) -output-directory $(OUT_RR) $(SDF_FILE).tex;
	
clean-rr:
	find $(RR_PDF) ! -name "*.pdf" -type f -delete
