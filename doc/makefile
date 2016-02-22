SRC 		= src/
PDF			= pdf/
SRC_FILES 	:= $(wildcard src/*.tex)
PDF_FILES 	:= $(addprefix pdf/,$(notdir $(SRC_FILES:.tex=.pdf)))

P2L		= pdflatex -synctex=1 -interaction=nonstopmode -file-line-error -halt-on-error -synctex=1 -output-directory ../$(PDF)
MKG		= makeglossaries -d $(PDF)

all: $(PDF) $(PDF_FILES)

pdf/%.pdf: src/%.tex
	cd $(SRC); $(P2L) $(notdir $<); $(MKG) $(notdir $<); $(P2L) $(notdir $<)

$(PDF):
	mkdir -p $(PDF)
