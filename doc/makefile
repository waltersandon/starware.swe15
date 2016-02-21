SRC 		= src/
OUT			= pdf/
SRC_FILES 	:= $(wildcard src/*.tex)
PDF_FILES 	:= $(addprefix pdf/,$(notdir $(SRC_FILES:.tex=.pdf)))

P2L		= pdflatex -synctex=1 -interaction=nonstopmode -file-line-error -halt-on-error -synctex=1 -output-directory $(OUT)
MKG		= makeglossaries

all: $(OUT) $(PDF_FILES)

pdf/%.pdf: src/%.tex
	$(P2L) $<; $(MKG) -d $(OUT) %; $(P2L) $<

$(OUT):
	mkdir -p $(OUT)
