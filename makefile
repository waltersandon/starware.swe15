OUT = ../../../../pdfs/1_RR
CC = pdflatex -file-line-error -halt-on-error -output-directory $(OUT)

rr:
	make compile-rr
	make compile-rr # genera l'indice
	make clean-rr

compile-rr:
	mkdir -p pdfs/1_RR
	(cd doc/1_RR/esterni/PianoDiProgetto; $(CC) PianoDiProgetto.tex)
	(cd doc/1_RR/esterni/PianoDiQualifica; $(CC) PianoDiQualifica.tex)
	(cd doc/1_RR/interni/NormeDiProgetto; $(CC) NormeDiProgetto.tex)
	(cd doc/1_RR/interni/NormeDiProgetto; $(CC) NormeDiProgetto2.tex)
	(cd doc/1_RR/interni/StudioDiFattibilita; $(CC) StudioDiFattibilita.tex)

clean-rr:
	find pdfs/1_RR ! -name "*.pdf" -type f -delete
